const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

module.exports = {
    //Definindo path para armazenamento dos arquivos independente de diretórios
    dest: path.resolve(__dirname, '..', '..', 'tmp'),

    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', '..', 'tmp'));
        },
        filename: (req, file, cb) => { //Armazenando arquivo no path do servidor
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err); //If error callback error requisition

                //Nome para arquivo, gera id e concatena com nome original, para não haver concorrencia entre nomes
                file.key = `${hash.toString('hex')}-${file.originalname}`; //Name to new File

                cb(null, file.key); //Armazena arquivo com novo nome criado
            })
        }
    })
}