# Availability checker

The checker uses synthetic German postcode fixtures. Known postcodes and map
coordinates live in `dist/assets/fiber-locations.mjs`; other valid postcodes
return no sample data. Postcodes remain strings to preserve leading zeros.
Selecting a marker or a city uses the same result logic as the form.

The default map is local and supports zooming without a key. To show the Google
basemap and the same markers, set `googleMapsKey` in
`dist/assets/google-maps-config.mjs` to a browser key authorized for this
preview origin (`http://127.0.0.1:4173`) and the Maps JavaScript API. Use a
Google Maps Demo Key if suitable, or a billing-enabled Google Cloud project.
Google's `DEMO_MAP_ID` is configured for the prototype. Keep credentials out
of shared copies. The local map remains usable if Google Maps cannot load.

For UI changes, submit an available, planned and unknown postcode, test a
marker, and confirm invalid input retains native validation.
