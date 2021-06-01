const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/auth/google',
    createProxyMiddleware({
      target: 'http://localhost:5000',
    })
  );
  app.use(
    '/logout',
    createProxyMiddleware({
      target: 'http://localhost:5000',
    })
  );
  app.use(
    '/currentuser',
    createProxyMiddleware({
      target: 'http://localhost:5000',
    })
  );
  app.use(
    '/payment',
    createProxyMiddleware({
      target: 'http://localhost:5000',
    })
  );
  app.use(
    '/api/surveys',
    createProxyMiddleware({
      target: 'http://localhost:5000',
    })
  );
  app.use(
    '/api/success',
    createProxyMiddleware({
      target: 'http://localhost:5000',
    })
  );
  app.use(
    '/api/delete',
    createProxyMiddleware({
      target: 'http://localhost:5000',
    })
  );
  app.use(
    '/save/surveys',
    createProxyMiddleware({
      target: 'http://localhost:5000',
    })
  );
};
