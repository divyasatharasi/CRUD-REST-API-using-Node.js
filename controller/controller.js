//to import note schema from model
const Note = require('../models/model');

//create and save a new note
exports.create = (req, res) => {
    let {title, author, content} = req.body;
    if(!title || !author || !content) return res.status(400).send({message: 'Every field is required'});

    /**
     * const newnote=Note({
        title: req.body.title,
        author: req.body.author,
        content: req.body.content
    });
     */
    const newNote = Note({title, author, content});

    Note.findOne({title: newNote.title}, (err, note) => {
        if(note) return res.status(400).json({message: 'same title exists'});

        newNote.save((err, doc) => {
            if(err) return res.status(400).json(err);
            res.status(201).json({
                post: true,
                note: doc
            });
        });
    });
};

//to get all notes
exports.findAll = (req, res) => {
    Note.find((err, doc) => {
        if(err) return res.status(400).send(err);
        res.status(200).json(doc);
    });
};

//to get a single note by id
exports.findOne = (req, res) => {
    Note.findById(req.params.noteId, (err, doc) => {
        if(err) return res.status(400).send(err);
        if(!doc) return res.status(404).json({message: 'Note with given id is not found'});
        res.status(200).send(doc);
    })
};

//to update a note by id
exports.update = (req, res) => {
    let {title, author, content} = req.body;
    if(!title || !author || !content) return res.status(400).json({message: 'Every field is required'});
    
    Note.findByIdAndUpdate(req.params.noteId, {title, author, content}, {new: true}, (err, doc) => {
        if(err) return res.status(400).send(err);
        if(!doc) return res.status(404).json({message: 'Note with given id is not found'});

        res.status(200).send({
            update: true,
            note:doc
        });
    });
};

//to delete a note by id
exports.delete = (req, res) => {
    Note.findByIdAndDelete(req.params.noteId, (err, doc) => {
        if(err) return res.status(400).send(err);
        if(!doc) return res.status(404).json({message: 'Note with given id is not found'});
        res.status(200).send({
            delete: true,
            note: doc
        });
    });
};