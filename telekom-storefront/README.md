# Telekom Storefront

A bilingual consumer storefront for comparing home internet, mobile plans, and TV. Plan prices and fiber availability use sample data.

## Run locally

Requires Node.js 22 or later and Python 3. The files in `dist/` are served directly.

```sh
npm run dev
```

Open [the local preview](http://127.0.0.1:4173/). Use the header to switch between German and English. Try a city on the fiber availability map or enter a sample postcode such as 10115 or 53111.

## Checks

- `npm run check:smoke` checks internal links and postcode results.
- `npm test` runs all checks. The baseline intentionally fails the 30 GB pricing consistency test for [TEL-1](https://theaicompany-demo.atlassian.net/browse/TEL-1). Fix that issue on a branch and open a pull request against `main`.

See [routing](docs/routing.md), [UI and content](docs/ui.md), and [the availability checker](docs/availability.md) for implementation notes.
