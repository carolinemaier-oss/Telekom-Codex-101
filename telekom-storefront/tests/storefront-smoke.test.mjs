import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { checkPostcode } from '../dist/assets/availability.mjs';

test('All internal fragment links point to existing sections', async () => {
  const page = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
  const ids = new Set(Array.from(page.matchAll(/\bid="([^"]+)"/g), ([, id]) => id));
  for (const [, target] of page.matchAll(/\bhref="#([^"]+)"/g)) {
    assert.ok(ids.has(target), `Missing fragment target #${target}`);
  }
});

test('The simulated checker handles an available postcode', () => {
  assert.equal(checkPostcode(' 10115 '), 'In diesem Beispielszenario ist Glasfaser verfügbar.');
});

test('The simulated checker handles planned and unknown postcodes', () => {
  assert.match(checkPostcode('53111'), /noch in Planung/);
  assert.match(checkPostcode('00000'), /keine Daten/);
});

test('The checker can render each response in English', () => {
  assert.equal(checkPostcode('10115', 'en'), 'Fiber is available in this example.');
  assert.match(checkPostcode('53111', 'en'), /Fiber is planned/);
  assert.match(checkPostcode('00000', 'en'), /No sample data/);
});
