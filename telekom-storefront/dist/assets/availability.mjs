import { getLanguage, translatePage } from './language.mjs';

import { fiberLocations } from './fiber-locations.mjs';
import { setupCoverageMap } from './coverage-map.mjs';

const results = new Map(fiberLocations.map(place => [place.postcode, place.status]));

const messages = {
  de: {
    available: 'In diesem Beispielszenario ist Glasfaser verfügbar.',
    planned: 'In diesem Beispielszenario ist der Glasfaseranschluss noch in Planung.',
    unknown: 'Für diese Beispiel-PLZ liegen keine Daten vor.',
  },
  en: {
    available: 'Fiber is available in this example.',
    planned: 'Fiber is planned for this example postcode.',
    unknown: 'No sample data is available for this postcode.',
  },
};

export function checkPostcode(postcode, language = 'de') {
  const result = results.get(postcode.trim()) ?? 'unknown';
  return (messages[language] ?? messages.de)[result];
}

if (typeof document !== 'undefined') {
  const language = getLanguage(location.search);
  translatePage(document, language);

  const form = document.querySelector('#availability-form');
  const postcodeInput = form.elements.namedItem('postcode');
  const result = document.querySelector('#availability-result');
  const updateCoverage = setupCoverageMap(language, (postcode) => {
    postcodeInput.value = postcode;
    form.requestSubmit();
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const postcode = postcodeInput.value.trim();
    const message = checkPostcode(postcode, language);
    result.textContent = message;
    updateCoverage(postcode, message);
  });

  function openLinkedHelp() {
    const section = document.getElementById(location.hash.slice(1));
    if (section?.tagName === 'DETAILS') section.open = true;
  }

  const productTabs = [...document.querySelectorAll('.product-tabs a')];
  function updateProductTabs() {
    const current = productTabs.find((tab) => tab.hash === location.hash) ?? productTabs[0];
    for (const tab of productTabs) {
      if (tab === current) tab.setAttribute('aria-current', 'location');
      else tab.removeAttribute('aria-current');
    }
  }

  addEventListener('hashchange', updateProductTabs);
  updateProductTabs();

  addEventListener('hashchange', openLinkedHelp);
  openLinkedHelp();
}
