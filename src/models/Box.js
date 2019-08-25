const mongoose = require('mongoose');

const Box = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    files: [{type: mongoose.Schema.Types.ObjectId, ref: "File"}]
}, {
    timestamps: true // cria o createdAt e updatedAt
});

module.exports = mongoose.model("Box", Box);
