import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('The homepage and Mobile tab show the same monthly price for the 30 GB plan', async () => {
  const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
  const advertisedPrice = html.match(/<strong id="everyday-home-price">([^<]+)<\/strong>/)?.[1];
  const planPrice = html.match(/<strong id="everyday-plan-price">([^<]+)<\/strong>/)?.[1];

  assert.ok(advertisedPrice && planPrice, 'Both prices must appear in the storefront');
  assert.equal(advertisedPrice, planPrice, 'The featured monthly price should match the plan card');
});
