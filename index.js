const debug = require('debug')('app:startup')
const config = require('config')
const express = require("express");
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan')
const courses = require('./routes/courses')

const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(helmet())

app.use('/api/courses', courses)

console.log('Application Name ' + config.get('name'))
console.log('Mail Server ' + config.get('mail.host'))
console.log('Mail Password ' + config.get('mail.password'))

if (app.get('env') === 'development'){ 
  app.use(morgan('tiny'))
  debug('Morgan enabled..')
}

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));