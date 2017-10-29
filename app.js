const SwaggerExpress = require('swagger-express-mw');
const app = require('express')();

module.exports = app; // for testing

const config = {
  appRoot: __dirname, // required config
};

SwaggerExpress.create(config, (err, swaggerExpress) => {
  if (err) { throw err; }
  // install middleware if needed
  swaggerExpress.register(app);

  require('./api/schedulers');

  const port = process.env.PORT || 3000;
  app.listen(port);
});
