const english = {
  title: "Telekom Storefront | Internet, mobile & TV",
  description: "Compare home internet, mobile plans and TV. Explore fiber availability in selected cities.",
  mainNav: 'Main navigation',
  languageNav: 'Language',
  skip: 'Skip to content',
  home: 'Telekom Storefront homepage',
  service: "Support",
  mobile: 'Mobile',
  heroEyebrow: 'Home internet',
  headingFirst: 'Fiber for',
  headingSecond: 'your home.',
  intro: "For work, streaming and everything in between. Compare fiber and DSL and find a connection that fits your home.",
  availability: "Check availability",
  browseInternet: 'Explore internet options',
  productsTitle: "Stay connected at home and on the go",
  internetTitle: 'Fiber & DSL',
  internetDetail: "Start by comparing connection types. Your options depend on your address and the line installed in your building.",
  checkConnection: 'Check your connection',
  viewMobilePlans: 'View mobile plans',
  mobileHelp: 'Help choosing a plan',
  tvTitle: 'TV & streaming',
  tvHelp: 'TV & streaming help',
  mobilePlansTitle: 'How much data do you need?',
  mobilePlansIntro: 'Compare three SIM-only plans for the way you use your phone.',
  exampleOffers: "Sample prices",
  mobileLight: 'Light use',
  mobileLightDetail: 'For messaging, maps and occasional browsing.',
  mobileEveryday: 'Everyday use',
  mobileEverydayDetail: 'For music, social media and regular video.',
  mobileHeavy: 'Heavy use',
  mobileHeavyDetail: 'For frequent streaming and using your phone as a hotspot.',
  perMonth: 'per month',
  tvOptionsIntro: 'Choose how you want to watch at home and on the go.',
  tvAppDevices: 'Smart TV, tablet and smartphone',
  tvAppTitle: 'Stream with an app',
  tvAppDetail: 'Watch live TV and catch-up shows on your existing devices. Handy when you switch between screens.',
  tvBoxDevices: 'TV with an HDMI port',
  tvBoxTitle: 'Watch with a TV box',
  tvBoxDetail: 'Get live TV and streaming apps in one place, all controlled with one remote.',
  checkerTitle: 'Is fiber available in your area?',
  checkerExamples: "Sample postcodes:",
  or: 'or',
  postcode: "Postcode",
  submit: 'Check',
  fixturesOnly: "Illustrative results for selected postcodes.",
  coverageMapTitle: "Fiber availability map",
  coverageMapIntro: "Select one of nine cities to see the sample status for its postcode.",
  mapZoomIn: 'Zoom in',
  mapZoomOut: 'Zoom out',
  serviceTitle: 'Help choosing what you need',
  mobileFaq: 'How much mobile data do I need?',
  mobileAnswer: 'Check your data usage over the last few months in your phone settings. Allow extra if you often stream video or use your phone as a hotspot.',
  tvFaq: 'What do I need to stream at home?',
  tvAnswer: 'You need an internet connection and a compatible device, such as a smart TV or streaming stick. Check which apps are available on your device.',
  fiberOption: "Fiber",
  fiberOptionDetail: "Fiber is a good fit when several people stream, take video calls, or upload large files at the same time. If your building does not have a fiber line yet, you may need an installation appointment.",
  dslOptionDetail: "DSL uses the existing telephone line and can be enough for browsing, working from home, and streaming. The speeds you can get depend on the line at your address.",
  mobileBeforeSwitch: "Before you switch, check your data use over the last few months and whether your phone supports eSIM. If you want to keep your number, ask about transferring it.",
  tvBeforeChoose: "Before choosing a package, check that it supports your devices and includes the channels and streaming services you watch.",
  checkerContext: "Check a postcode or choose a city on the map. Availability at your address depends on the local rollout.",
  switchFaq: "What should I check before switching providers?",
  switchAnswer: "Check when your current contract ends, how much notice you need to give, and whether you must return a rented router. Coordinate your new installation with the end of your contract to reduce the chance of downtime.",
  routerFaq: "Can I keep using my router?",
  routerAnswer: "That depends on the router and the connection type. Check whether your model supports the new connection and whether you need a separate fiber modem.",
  supportIntro: "Find answers about getting connected, switching providers, choosing a data allowance, and setting up TV.",
  footerDescription: "Offers, prices and availability are examples.",
  backToTop: "Back to top",
  footerNav: "More links",
  internetNavDetail: "Fiber and DSL",
  mobileNavDetail: "Plans for your phone",
  tvNavDetail: "Live TV and streaming",
  availabilityEyebrow: "Fiber availability",
};

export function getLanguage(search) {
  return new URLSearchParams(search).get('lang') === 'en' ? 'en' : 'de';
}

export function translatePage(page, language) {
  page.documentElement.lang = language;
  for (const link of page.querySelectorAll('.language-switch a')) {
    if (link.hreflang === language) link.setAttribute('aria-current', 'true');
    else link.removeAttribute('aria-current');
  }
  if (language !== 'en') return;

  page.title = english.title;
  page.querySelector('meta[name="description"]').content = english.description;
  for (const element of page.querySelectorAll('[data-copy]')) {
    element.textContent = english[element.dataset.copy];
  }
  for (const element of page.querySelectorAll('[data-copy-label]')) {
    element.setAttribute('aria-label', english[element.dataset.copyLabel]);
  }
}
