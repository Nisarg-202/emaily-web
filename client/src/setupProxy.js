const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/auth/google',
    createProxyMiddleware({
      target: 'https://evening-shelf-64382.herokuapp.com',
    })
  );
  app.use(
    '/logout',
    createProxyMiddleware({
      target: 'https://evening-shelf-64382.herokuapp.com',
    })
  );
  app.use(
    '/currentuser',
    createProxyMiddleware({
      target: 'https://evening-shelf-64382.herokuapp.com',
    })
  );
  app.use(
    '/payment',
    createProxyMiddleware({
      target: 'https://evening-shelf-64382.herokuapp.com',
    })
  );
  app.use(
    '/api/surveys',
    createProxyMiddleware({
      target: 'https://evening-shelf-64382.herokuapp.com',
    })
  );
  app.use(
    '/api/success',
    createProxyMiddleware({
      target: 'https://evening-shelf-64382.herokuapp.com',
    })
  );
  app.use(
    '/api/delete',
    createProxyMiddleware({
      target: 'https://evening-shelf-64382.herokuapp.com',
    })
  );
  app.use(
    '/save/surveys',
    createProxyMiddleware({
      target: 'https://evening-shelf-64382.herokuapp.com',
    })
  );
};
