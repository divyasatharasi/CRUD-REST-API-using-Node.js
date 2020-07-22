const mongoose = require('mongoose');

//defining schema
const noteSchema = mongoose.Schema({
    title: {
        type: String,
    },
    author: {
        type: String,
    },
    content: {
        type: String,
    }
}, {
    timestamp: true
});

//exporting schema model
module.exports = mongoose.model('Note', noteSchema);