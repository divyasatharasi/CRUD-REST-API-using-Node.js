const express =  require('express');
const mongoose = require('mongoose');
const bodyparser =  require('body-parser');
const dburl = require('./database/url');

const PORT = process.env.PORT || 3000;

//create express app
const app = express();

//parse application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({extended: false}));

//parse application json
app.use(bodyparser.json());

//connect the database
mongoose.Promise = global.Promise;
mongoose.connect(dburl.url, {useNewUrlParser: true}).then(() => {
    console.log('database connected');
}).catch((err) => {
    console.log('error in database connection : ', err);
    process.exit();
});

//routes
app.get('/', (req, res) => {
    res.write("welcome!!!")
    res.json({message: "Hello..."});
});

require('./routes/routes')(app);

app.listen(PORT, () => {
    console.log("app is live at ", PORT);
});