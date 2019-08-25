const File = require('../models/File');
const Box = require('../models/Box');

class FileController {

    async store(req, res) {
        const box = await Box.findById(req.params.id);

        const file = await File.create({
            title: req.file.originalname,
            path: req.file.key,
        });

        box.files.push(file);
        await box.save();
        
        // envia a informação pros usuários conectados pelo IO também
        req.io.sockets.in(box._id).emit('file', file);

        return res.json(file);
    }

}

module.exports = new FileController();