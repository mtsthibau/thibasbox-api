const mongoose = require('mongoose');

//Mapeamento de schema data types
const File = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },

},
    {
        timestamps: true,
        toObject: { virtuals: true },
        toJSON: { virtuals: true } 
    }
);

//Tratamento para converter objeto json para arquivo fisico no path do servidor
File.virtual("url").get(function () {
    return `http://localhost:3333/files/${encodeURIComponent(this.path)}`;
});

module.exports = mongoose.model("File", File);
