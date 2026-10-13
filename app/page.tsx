'use client';

import { isValidElement, useEffect, useMemo, useState, type ReactNode } from 'react';
import { useRouter } from '../lib/router';
import { type Components } from 'react-markdown';
import { MathMarkdown } from '../components/math-markdown';
import { parseMathSteps, parseReferencedEquation, type ReferencedEquation } from '../lib/authored-note-blocks';
import remarkMathHints from '@/lib/remark-math-hints';
import remarkEquationReferences from '@/lib/remark-equation-references';
import remarkNoteReferences from '@/lib/remark-note-references';
import { collectNoteReferences, resolveNoteReference, type NoteReference } from '@/lib/note-references';
import { DerivationSequence, Supplement } from '../components/derivation-sequence';
import { ThemeToggle } from '../components/theme-toggle';
import { ReferencePopover } from '../components/reference-popover';
import { ArrowLeft, ArrowRight, Menu, X } from 'lucide-react';
import { chapterFromPath, siteBasePath, sitePath } from '../lib/site-path';

import config from '../note.config.json';
const sourceFiles = import.meta.glob('../content/*.md', { query: '?raw', import: 'default', eager: true });
type Chapter = { id: string; section: string; shortTitle: string; content: string; plainTitle: string; plainDescription: string };
type ChapterHeading = { id: string; depth: 2 | 3; label: string };
const chapters: Chapter[] = config.chapters.map(chapter => ({
  ...chapter, shortTitle: chapter.title, content: sourceFiles['../' + chapter.file] as string,
}));
for (const chapter of chapters) {
  if (!chapter.content) throw new Error('Missing chapter source: ' + chapter.id);
}
function plainText(value: ReactNode): string {
  if (typeof value === 'string' || typeof value === 'number') return String(value);
  if (Array.isArray(value)) return value.map(plainText).join('');
  if (value && typeof value === 'object' && 'props' in value) return plainText((value as { props?: { children?: ReactNode } }).props?.children);
  return '';
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[$\\{}_^*`]/g, '').replace(/[\s・：、。／/]+/g, '-').replace(/[^\p{L}\p{N}-]/gu, '').replace(/^-+|-+$/g, '');
}

function headingId(chapterId: string, line: number | undefined, fallback: string) {
  return line ? `${chapterId}-heading-${line}` : `${chapterId}-${slugify(fallback)}`;
}

function extractChapterHeadings(chapter: Chapter): ChapterHeading[] {
  const headings: ChapterHeading[] = [];
  let inCodeBlock = false;

  chapter.content.split('\n').forEach((line, index) => {
    if (/^\s*```/.test(line)) {
      inCodeBlock = !inCodeBlock;
      return;
    }
    if (inCodeBlock) return;
    const match = line.match(/^(##|###)\s+(.+?)\s*#*\s*$/);
    if (!match) return;
    headings.push({
      id: headingId(chapter.id, index + 1, match[2]),
      depth: match[1].length as 2 | 3,
      label: match[2],
    });
  });

  return headings;
}

function extractReferencedEquations(markdown: string) {
  const equations = new Map<string, string>();
  const blocks = markdown.matchAll(/```equation\s*\n([\s\S]*?)```/g);
  for (const block of blocks) {
    const equation = parseReferencedEquation(block[1]);
    if (equation) equations.set(equation.id, equation.tex);
  }
  for (const match of markdown.matchAll(/^([ \t]*)\$\$[ \t]*\n([\s\S]*?)\n\1\$\$[ \t]*$/gm)) {
    const tag = match[2].match(/\\tag\*?\{([^}]+)\}/);
    if (tag) equations.set(tag[1], match[2].replace(tag[0], '').trim());
  }
  return equations;
}

const siteEquations = new Map(chapters.flatMap(chapter => [...extractReferencedEquations(chapter.content)]));
const equationReferenceOptions = { ids: [...siteEquations.keys()] };

function EquationBlock({ equation, preview = false }: { equation: ReferencedEquation; preview?: boolean }) {
  return <div
    id={preview ? undefined : `eq-${equation.id}`}
    className="referenced-equation"
  ><MathMarkdown>{`$$\n${equation.tex}\n$$`}</MathMarkdown></div>;
}

function EquationReference({ id, tex, children }: { id: string; tex: string; children: ReactNode }) {
  return <ReferencePopover label={children} title={`式 (${id})`}>
    <MathMarkdown>{`$$\n${tex}\n$$`}</MathMarkdown>
  </ReferencePopover>;
}

const noteReferences = collectNoteReferences(chapters);

function NoteReferenceBody({ reference, components }: { reference: NoteReference; components: Components }) {
  return <>
    <div className="note-source-heading"><MathMarkdown>{reference.heading}</MathMarkdown></div>
    <MarkdownRenderer source={reference.content} components={components} />
    <a className="note-source-link" href={sitePath(reference.href)}>参照先の本文へ <ArrowRight size={14} aria-hidden="true" /></a>
  </>;
}

function PreviousNoteReference({ reference, children, components }: { reference: NoteReference; children: ReactNode; components: Components }) {
  return <ReferencePopover label={children} title={`${reference.section} · 本文の参照`}>
    <NoteReferenceBody reference={reference} components={components} />
  </ReferencePopover>;
}


function MarkdownRenderer({ source, components }: { source: string; components: Components }) {
  return <MathMarkdown
    remarkPlugins={[remarkNoteReferences, remarkMathHints, [remarkEquationReferences, equationReferenceOptions]]}
    components={components}
  >{source}</MathMarkdown>;
}

function createMarkdownComponents(equations: Map<string, string>, chapterId: string, preview = false): Components {
  const components: Components = {
  div: ({ node, children, ...props }) => {
    const hint = node?.properties.dataMathHint;
    if (typeof hint === 'string' && preview) return <>{children}</>;
    if (typeof hint === 'string') return <div className="hinted-equation">{children}<Supplement note={hint} /></div>;
    return <div {...props}>{children}</div>;
  },
  table: ({ children }) => <div className="table-scroll" tabIndex={0} role="region" aria-label="表。横にスクロールできます。"><table>{children}</table></div>,
  summary: ({ children }) => <summary className="disclosure-summary">
    <svg className="disclosure-marker" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M4 2 9 6 4 10Z" fill="currentColor" /></svg>
    <span>{children}</span>
  </summary>,
  h1: ({ children }) => <h1>{children}</h1>,
  h2: ({ node, children }) => <h2 id={preview ? undefined : headingId(chapterId, node?.position?.start.line, plainText(children))}>{children}</h2>,
  h3: ({ node, children }) => <h3 id={preview ? undefined : headingId(chapterId, node?.position?.start.line, plainText(children))}>{children}</h3>,
  h4: ({ children }) => <h4 id={preview ? undefined : slugify(plainText(children))}>{children}</h4>,
  img: ({ src, alt, title }) => {
    if (typeof src === 'string' && src.startsWith('/diagrams/')) {
      // Keep phrasing content valid inside Markdown paragraphs; keyboard focus enables scrolling. SVGs need no image optimization.
      // oxlint-disable-next-line jsx-a11y/no-noninteractive-tabindex, jsx-a11y/prefer-tag-over-role, next/no-img-element
      return <span className="concept-figure" tabIndex={0} role="region" aria-label="説明図。画面幅が狭い場合は横にスクロールできます。"><img src={sitePath(src)} alt={alt ?? ''} title={title} loading="lazy" /></span>;
    }
    // Preserve the native Markdown image behavior for other authored images.
    // oxlint-disable-next-line next/no-img-element
    return <img src={typeof src === 'string' ? sitePath(src) : src} alt={alt ?? ''} title={title} loading="lazy" />;
  },
  a: ({ href, children }) => {
    if (href === '../sources/references.md') return <a href={sitePath('/references')}>{children}</a>;
    const reference = resolveNoteReference(href, chapterId, noteReferences);
    if (reference && !preview) {
      const sourceChapter = chapters.find(chapter => chapter.id === reference.chapterId)!;
      const sourceComponents = createMarkdownComponents(equations, sourceChapter.id, true);
      return <PreviousNoteReference reference={reference} components={sourceComponents}>{children}</PreviousNoteReference>;
    }
    if (preview) {
      const destination = href?.startsWith('#') ? `/${chapterId}${href}` : href;
      return <a href={sitePath(destination)}>{children}</a>;
    }

    const equationId = href?.startsWith('#eq-') ? decodeURIComponent(href.slice('#eq-'.length)) : null;
    const equation = equationId ? equations.get(equationId) : null;
    if (equationId && equation) return <EquationReference id={equationId} tex={equation}>{children}</EquationReference>;

    if (href?.startsWith('#')) return <a href={href} onClick={(event) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      // Open before native anchor navigation, including repeated clicks on the same hash.
      revealFragment(href);
    }}>{children}</a>;
    return <a href={sitePath(href)} target={href?.startsWith('http') ? '_blank' : undefined} rel="noreferrer">{children}</a>;
  },
  pre: ({ children }) => {
    const child = Array.isArray(children) ? children[0] : children;
    const className = isValidElement<{ className?: string }>(child) ? child.props.className : undefined;
    return className === 'language-math-steps' || className === 'language-equation' ? <>{children}</> : <pre>{children}</pre>;
  },
  code: ({ className, children, ...props }) => {
    if (className === 'language-equation') {
      const equation = parseReferencedEquation(plainText(children));
      return equation ? <EquationBlock equation={equation} preview={preview} /> : <code className={className} {...props}>{children}</code>;
    }
    if (className === 'language-math-steps') {
      const derivation = parseMathSteps(plainText(children));
      return derivation ? <DerivationSequence {...derivation} /> : <code className={className} {...props}>{children}</code>;
    }
    return <code className={className} {...props}>{children}</code>;
  },
  };
  return components;
}

function revealFragment(hash: string) {
  let id: string;
  try { id = decodeURIComponent(hash.slice(1)); } catch { return; }
  if (!id) return;
  const target = document.getElementById(id);
  if (!target) return;
  for (let element: HTMLElement | null = target; element; element = element.parentElement) {
    if (element instanceof HTMLDetailsElement) element.open = true;
  }
  target.scrollIntoView({ block: 'start' });
}

export function NotesReader({ initialId = chapters[0].id }: { initialId?: string }) {
  const router = useRouter();
  const [activeId, setActiveId] = useState(chapters.some((chapter) => chapter.id === initialId) ? initialId : chapters[0].id);
  const [mobileNav, setMobileNav] = useState(false);
  const [progress, setProgress] = useState(0);
  const activeIndex = chapters.findIndex((chapter) => chapter.id === activeId);
  const active = chapters[activeIndex];
  const activeHeadings = useMemo(() => extractChapterHeadings(active), [active]);
  const equations = useMemo(() => new Map([...siteEquations, ...extractReferencedEquations(active.content)]), [active.content]);

  const markdownComponents = useMemo(
    () => createMarkdownComponents(equations, activeId),
    [activeId, equations],
  );

  useEffect(() => {
    const sync = () => {
      const id = chapterFromPath(window.location.pathname);
      setActiveId(chapters.some(chapter => chapter.id === id) ? id : chapters[0].id);
      setMobileNav(false);
    };
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, []);
  useEffect(() => {
    document.title = active.plainTitle + ' | ' + config.title;
    document.documentElement.lang = config.language;
    document.querySelector('meta[name="description"]')?.setAttribute('content', active.plainDescription);
  }, [active]);
  useEffect(() => {
    const updateProgress = () => {
      const available = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(available > 0 ? Math.min(100, (window.scrollY / available) * 100) : 0);
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateProgress);
  }, [activeId]);

  useEffect(() => {
    const revealReference = () => { revealFragment(window.location.hash); };
    const frame = requestAnimationFrame(revealReference);
    window.addEventListener('hashchange', revealReference);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('hashchange', revealReference); };
  }, [activeId]);

  const chooseChapter = (id: string | undefined) => {
    if (!id) return;
    if (siteBasePath) {
      window.location.assign(sitePath(`/${id}/`)!);
      return;
    }
    setActiveId(id);
    setMobileNav(false);
    window.scrollTo(0, 0);
    router.push(`/${id}`);
  };

  const chooseHeading = (hash: string) => {
    setMobileNav(false);
    requestAnimationFrame(() => revealFragment(hash));
  };

  return (
    <div className="reader-shell">
      <div className="progress-line" style={{ width: `${progress}%` }} />

      <header className="reader-header">
        <button className="header-icon nav-toggle" onClick={() => setMobileNav(true)} aria-label="章一覧を開く"><Menu size={19} /></button>
        <a className="wordmark" href="#article-top">{config.title}</a>
        <ThemeToggle />
      </header>

      <aside className={`chapter-index ${mobileNav ? 'is-open' : ''}`} aria-label="章一覧">
        <div className="panel-mobile-head"><span>章一覧</span><button onClick={() => setMobileNav(false)} aria-label="章一覧を閉じる"><X size={18} /></button></div>
        <nav className="chapter-list" aria-label="章と節">
          {chapters.map((chapter) => {
            const isActive = chapter.id === activeId;
            return <div className="chapter-group" key={chapter.id}>
              <button className={isActive ? 'is-active' : ''} onClick={() => chooseChapter(chapter.id)} aria-label={`${chapter.section} ${chapter.shortTitle}`} aria-expanded={isActive} aria-current={isActive ? 'page' : undefined}>
                <span className="chapter-label"><b>{chapter.section}</b><strong><MathMarkdown inline>{chapter.shortTitle}</MathMarkdown></strong></span>
              </button>
              {isActive && <ol className="subsection-list" aria-label={`${chapter.section}の節`}>
                {activeHeadings.map((heading) => <li key={heading.id} className={`depth-${heading.depth}`}>
                  <a href={`#${heading.id}`} onClick={() => chooseHeading(`#${heading.id}`)}>
                    <MathMarkdown inline>{heading.label}</MathMarkdown>
                  </a>
                </li>)}
              </ol>}
            </div>;
          })}
        </nav>
      </aside>

      <main className="article-column" id="article-top">
        <div className="article-inner">
          <article className="note-content">
            <MarkdownRenderer source={active.content} components={markdownComponents} />
          </article>
          <nav className="chapter-pager" aria-label="前後の章">
            <button disabled={activeIndex === 0} onClick={() => chooseChapter(chapters[activeIndex - 1]?.id)}><ArrowLeft size={16} aria-hidden="true" />前の章</button>
            <button disabled={activeIndex === chapters.length - 1} onClick={() => chooseChapter(chapters[activeIndex + 1]?.id)}>次の章<ArrowRight size={16} aria-hidden="true" /></button>
          </nav>
        </div>
      </main>

      {mobileNav && <button className="screen-backdrop" onClick={() => setMobileNav(false)} aria-label="章一覧を閉じる" />}
    </div>
  );
}

export default function Home() {
  return <NotesReader />;
}
