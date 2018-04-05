const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

//change to accept dynamic port to use with Heroku
const port = process.env.PORT || 3000;

var app = express();

//register partials to enable partial views
hbs.registerPartials(__dirname + '/views/partials');

//set viewengine as handlebar will use for template based html pages
app.set('view engine', 'hbs');

//register helper to use for functions with and without parameters
hbs.registerHelper("copyRightYear", () => {
  return new Date().getFullYear();
});

//register helper to use for functions with and without parameters
hbs.registerHelper("screamIt", (text) => {
  return text.toUpperCase();
});

//express middleware
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method}, ${req.url}`
  console.log(log);
  fs.appendFile('logger.log', log);
  next(); //if we will not call next here then next followed code will not call.
});

//express middleware
app.use((req, res, next) => {
  res.render('maintenance.hbs');
  //next(); //if we will not call next here then next followed code will not call.
});

//default route
app.get('/', (req, res) => {
  //res.send('Hello Express.');
  //render using Handle bar plugin for template
  res.render('home.hbs', {
      pageTitle: 'Home page',
      welcomeMessage: 'Welcome to Home Page.',
      //copyRightYear: new Date().getFullYear()
  });
});

//about route
app.get('/about', (req, res) => {
  //res.send('About page.');
  //render using Handle bar plugin for template
  res.render('about.hbs', {
      pageTitle: 'About page',
      welcomeMessage: 'Welcome to About Page.',
      //copyRightYear: new Date().getFullYear()
  });
});

//bad route (sending json as response)
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'A bad request'
  });
});

//change to accept dynamic port to use with Heroku
app.listen(port, ()=> {
  console.log(`Listening to port ${port}`);
});
