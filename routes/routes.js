module.exports = (app) =>{
    //importing controller.js functions to routes.js
    const notes = require('../controller/controller');

    //create a note
    app.post('/api/create', notes.create);

    //retrive all notes
    app.get('/api/notes', notes.findAll);

    //retrive a note by id
    app.get('/api/note/:noteId', notes.findOne);

    //update a note with id
    app.put('/api/update/:noteId', notes.update);

    //delete a note with id
    app.delete('/api/delete/:noteId', notes.delete);
}