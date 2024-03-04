export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      nav: {
        home: 'Home',
        experiments: 'Experiments',
        tutorial: 'Tutorial',
        prerequisities: 'Prerequisities',
        environment: 'Environment',
        visualization: 'Visualization',
        furtherReading: 'Further Reading',
      },
    },
    sk: {
      nav: {
        home: 'Domov',
        experiments: 'Experimenty',
        tutorial: 'Návod',
        prerequisities: 'Požiadavky',
        environment: 'Prostredie',
        visualization: 'Vizualizácia',
        furtherReading: 'Ďalšie čítanie',
      },
    },
  },
}));
