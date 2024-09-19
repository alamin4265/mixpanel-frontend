export default [
    {
      context: [
          '/track',
          '/engage'
      ],
      target: 'https://api-eu.mixpanel.com/',
      secure: false,
      changeOrigin: true,
      logLevel: 'debug'
    }
  ];