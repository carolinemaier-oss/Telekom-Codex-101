import { fiberLocations } from './fiber-locations.mjs';
import { googleMapsKey, googleMapId } from './google-maps-config.mjs';

const labels = {
  de: { available: 'Glasfaser verfügbar', planned: 'Glasfaser in Planung', sample: 'Beispiel' },
  en: { available: 'Fiber available', planned: 'Fiber planned', sample: 'Sample' },
};

export function setupCoverageMap(language, selectPostcode) {
  const plot = document.querySelector('.coverage-plot');
  const viewport = document.querySelector('.coverage-viewport');
  const list = document.querySelector('.coverage-locations');
  const selection = document.querySelector('.coverage-selection');
  const zoomIn = document.querySelector('[data-map-zoom="in"]');
  const zoomOut = document.querySelector('[data-map-zoom="out"]');
  const copy = labels[language];
  const controls = [];
  const googleMarkers = new Map();
  let googleMap;
  let zoom = 1;

  function control(location, text) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = text;
    button.setAttribute('aria-pressed', 'false');
    button.addEventListener('click', () => selectPostcode(location.postcode));
    controls.push([location.postcode, button]);
    return button;
  }

  for (const place of fiberLocations) {
    const title = `${place.city} ${place.postcode}: ${copy[place.status]} (${copy.sample})`;
    const pin = control(place, place.city);
    pin.className = `coverage-pin ${place.status}`;
    pin.dataset.postcode = place.postcode;
    pin.setAttribute('aria-label', title);
    // Match the geographic bounds and inset used by the local Germany outline.
    pin.style.left = `${13.02 + 73.96 * (place.lng - 5.99) / (15.02 - 5.99)}%`;
    pin.style.top = `${7 + 86 * (54.98 - place.lat) / (54.98 - 47.30)}%`;
    plot.append(pin);

    const item = document.createElement('li');
    item.className = `coverage-location ${place.status}`;
    const button = control(place, `${place.city} ${place.postcode}`);
    const status = document.createElement('span');
    status.className = 'coverage-status';
    status.textContent = copy[place.status];
    button.append(status);
    item.append(button);
    list.append(item);
  }

  function changeZoom(step) {
    const next = zoom + step;
    const x = (viewport.scrollLeft + viewport.clientWidth / 2) / zoom;
    const y = (viewport.scrollTop + viewport.clientHeight / 2) / zoom;
    zoom = next;
    plot.style.setProperty('--map-zoom', zoom);
    viewport.scrollTo(x * zoom - viewport.clientWidth / 2, y * zoom - viewport.clientHeight / 2);
    zoomIn.disabled = zoom >= 3;
    zoomOut.disabled = zoom <= 1;
  }

  zoomIn.addEventListener('click', () => changeZoom(.5));
  zoomOut.addEventListener('click', () => changeZoom(-.5));

  if (googleMapsKey) {
    startGoogleMap(language, googleMarkers, selectPostcode)
      .then(map => { googleMap = map; })
      .catch(error => console.warn('Google Maps could not load; using the local coverage map.', error));
  }

  return function updateCoverage(postcode, message) {
    for (const [value, button] of controls) {
      button.setAttribute('aria-pressed', String(value === postcode));
    }
    const place = fiberLocations.find(item => item.postcode === postcode);
    selection.textContent = place ? `${place.city} ${postcode} · ${copy[place.status]} (${copy.sample})` : message;
    const marker = googleMarkers.get(postcode);
    if (marker && googleMap) googleMap.panTo(marker.position);
  };
}

async function startGoogleMap(language, markers, selectPostcode) {
  const surface = document.querySelector('#google-coverage-map');
  const wrapper = surface.closest('.coverage-map');
  let authFailed = false;
  const restoreFallback = () => {
    authFailed = true;
    wrapper.classList.remove('google-ready');
    surface.inert = true;
    surface.setAttribute('aria-hidden', 'true');
  };
  await new Promise((resolve, reject) => {
    const script = document.createElement('script');
    const timeout = setTimeout(() => reject(new Error('Maps load timed out')), 12000);
    window.initStorefrontGoogleMap = () => {
      clearTimeout(timeout);
      resolve();
    };
    window.gm_authFailure = () => {
      clearTimeout(timeout);
      restoreFallback();
      reject(new Error('Maps authentication failed'));
    };
    script.onerror = () => {
      clearTimeout(timeout);
      reject(new Error('Maps script unavailable'));
    };
    const params = new URLSearchParams({
      key: googleMapsKey, loading: 'async', callback: 'initStorefrontGoogleMap', language, v: 'weekly',
    });
    script.src = `https://maps.googleapis.com/maps/api/js?${params}`;
    script.async = true;
    document.head.append(script);
  });
  const { Map: GoogleMap } = await google.maps.importLibrary('maps');
  const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary('marker');
  const map = new GoogleMap(surface, {
    center: { lat: 51.15, lng: 10.35 }, zoom: 5, mapId: googleMapId,
    mapTypeControl: false, streetViewControl: false, gestureHandling: 'cooperative',
  });
  const bounds = new google.maps.LatLngBounds();
  for (const place of fiberLocations) {
    const position = { lat: place.lat, lng: place.lng };
    const color = place.status === 'available' ? '#237050' : '#956117';
    const pin = new PinElement({ background: color, borderColor: color, glyphColor: '#fff' });
    const marker = new AdvancedMarkerElement({
      map, position, gmpClickable: true, title: `${place.city} ${place.postcode}: ${labels[language][place.status]}`,
    });
    marker.append(pin);
    marker.addListener('click', () => selectPostcode(place.postcode));
    markers.set(place.postcode, marker);
    bounds.extend(position);
  }
  map.fitBounds(bounds, 35);
  map.addListener('tilesloaded', () => {
    if (authFailed) return;
    wrapper.classList.add('google-ready');
    surface.inert = false;
    surface.removeAttribute('aria-hidden');
  });
  return map;
}
