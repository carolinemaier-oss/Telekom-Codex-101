import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('The homepage availability CTA opens the postcode checker', async () => {
  const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
  const cta = html.match(/<a\s+[^>]*\bid="hero-availability"[^>]*>/)?.[0];

  assert.ok(cta, 'The hero CTA must be a native link');
  assert.equal(cta.match(/\bhref="([^"]+)"/)?.[1], '#verfuegbarkeit');
  assert.match(html, /\bid="verfuegbarkeit"/);
});
