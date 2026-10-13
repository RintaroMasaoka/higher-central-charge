import type { DerivationSequenceStep } from '../components/derivation-sequence';

export type ReferencedEquation = { id: string; tex: string };

export function parseReferencedEquation(source: string): ReferencedEquation | null {
  const lines = source.trim().split('\n');
  const idLine = lines.shift()?.match(/^id:\s*([a-zA-Z0-9_-]+)$/);
  const tex = lines.join('\n').trim();
  return idLine && tex ? { id: idLine[1], tex } : null;
}

export function parseMathSteps(source: string): { lhs: string; steps: DerivationSequenceStep[] } | null {
  const sections = source.trim().split(/\n---\n/);
  const lhs = sections[0]?.match(/^lhs:\s*(.+)$/m)?.[1].trim();
  if (!lhs) return null;
  const steps: DerivationSequenceStep[] = [];
  for (const section of sections) {
    const step: DerivationSequenceStep = { parts: [] };
    for (const line of section.trim().split('\n')) {
      if (/^lhs:/.test(line)) continue;
      const note = line.match(/^(?:note|step):\s*(.+)$/);
      const math = line.match(/^popup-math:\s*(.+)$/);
      const part = line.match(/^part\s+([a-zA-Z0-9_-]+):\s*(.+)$/);
      if (note) step.note = note[1].trim();
      else if (math) step.popupMath = math[1].trim();
      else if (part) step.parts.push({ id: part[1], tex: part[2].trim() });
      else return null;
    }
    if (!step.parts.length) return null;
    steps.push(step);
  }
  return { lhs, steps };
}

