export type NoteSource = { id: string; section: string; content: string };
export type NoteReference = { href: string; chapterId: string; section: string; heading: string; content: string };

const rangePattern = /^<!-- reference: ([a-z0-9-]+) -->\s*\n([\s\S]*?)^<!-- \/reference -->[ \t]*$/gm;

/** Reference payloads are read from the displayed note, never a second definition. */
export function collectNoteReferences(notes: NoteSource[]) {
  const references = new Map<string, NoteReference>();
  for (const note of notes) {
    for (const match of note.content.matchAll(rangePattern)) {
      const href = `/${note.id}#ref-${match[1]}`;
      if (references.has(href)) throw new Error(`Duplicate note reference: ${href}`);
      const headings = [...note.content.slice(0, match.index).matchAll(/^#{1,6} (.+)$/gm)];
      references.set(href, {
        href, chapterId: note.id, section: note.section,
        heading: headings.at(-1)?.[1].replace(/^6\.[1-4]\s+/, '') ?? note.section,
        content: match[2].trim(),
      });
    }
  }
  return references;
}

export function resolveNoteReference(href: string | undefined, chapterId: string, references: Map<string, NoteReference>) {
  if (!href) return undefined;
  const key = href.startsWith('#') ? `/${chapterId}${href}` : href.replace(/\/#ref-/, '#ref-');
  return references.get(key);
}
