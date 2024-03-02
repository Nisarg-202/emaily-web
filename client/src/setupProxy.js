const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/auth/google",
    createProxyMiddleware({
      target: process.env.REACT_APP_SERVER_URL,
    })
  );
  app.use(
    "/logout",
    createProxyMiddleware({
      target: process.env.REACT_APP_SERVER_URL,
    })
  );
  app.use(
    "/currentuser",
    createProxyMiddleware({
      target: process.env.REACT_APP_SERVER_URL,
    })
  );
  app.use(
    "/payment",
    createProxyMiddleware({
      target: process.env.REACT_APP_SERVER_URL,
    })
  );
  app.use(
    "/api/surveys",
    createProxyMiddleware({
      target: process.env.REACT_APP_SERVER_URL,
    })
  );
  app.use(
    "/api/success",
    createProxyMiddleware({
      target: process.env.REACT_APP_SERVER_URL,
    })
  );
  app.use(
    "/api/delete",
    createProxyMiddleware({
      target: process.env.REACT_APP_SERVER_URL,
    })
  );
  app.use(
    "/save/surveys",
    createProxyMiddleware({
      target: process.env.REACT_APP_SERVER_URL,
    })
  );
};
