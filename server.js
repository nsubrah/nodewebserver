const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();
hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('getCurrentYear',() => new Date().getFullYear());
hbs.registerHelper('capiTalize',(text) => text.toUpperCase());
app.set('view engine','hbs');

app.use((req,res,next) => {
  var now =new Date().toString();
  var log= `${now} : ${req.method} : ${req.url}`;
 fs.appendFileSync('server.log',log +'\n');
  next();
});
app.use(express.static(__dirname+'/public'));
// app.use((req,res,next) => {
//   res.render('maint.hbs');
// });

app.get('/',(request,response)=>{
  response.render('home.hbs',{
    welcomeTitle: 'Helloo Welcome to Home Page!!!'
  });
});
app.listen(port, () => {
  console.log(`Server up and running on port number ${port}`);
});

app.get('/about',(request,response)=>{
  response.render('about.hbs',{
    welcomeTitle: 'About Page Dynamic'
  });
});

app.get('/bad',(request,response)=>{
  response.send({
    errorMessage: 'Unable to serve the Request!!!'
  });
});
