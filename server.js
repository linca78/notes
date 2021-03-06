const express        = require('express');
const bodyParser     = require('body-parser');
const path           = require('path');
const db             = require('./config/db');
const mongoose       = require('mongoose');
const app            = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));
mongoose.Promise = global.Promise;

mongoose.connect(db.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database.', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to EasyNotes application."});
});

require('./app/routes/note_routes.js')(app);

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});