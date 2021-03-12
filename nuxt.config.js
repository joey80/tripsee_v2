export default {
  head: {
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Muli:400,700',
      },
    ],
  },
  mode: 'universal',
  serverMiddleware: ['~/serverMiddleware/api'],
  target: 'static',
};
