let express = require('express');
let app = express();
let router = require('./routes/routes');
let productRoutes = require('./routes/productRoutes');
let categoryRoutes = require('./routes/categoryRoutes');
let parentRoutes = require('./routes/parentRoutes');
let dataRoutes = require('./routes/dataRoutes');
let pictureRoutes = require('./routes/pictureRoutes');
let userRoutes = require('./routes/userRoutes');

let bodyParser = require('body-parser');/*post方法*/
let session = require('express-session')

app.use('/node_modules/', express.static('./node_modules'));
app.use('/public/', express.static('./public'));
app.use(bodyParser.json());// 添加json解析
app.use(bodyParser.urlencoded({extended: false}));
app.engine('html', require('express-art-template'));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.use(router);
app.use(productRoutes);
app.use(categoryRoutes);
app.use(parentRoutes);
app.use(dataRoutes);
app.use(pictureRoutes);
app.use(userRoutes);

app.listen(8000);