const Box = require("../models/Box");

class BoxController {
    async store(req, res) {
        const box = await Box.create(req.body);
        return res.json(box);
    }

    async showBox(req, res) {
        const box = await Box.findById(req.params.id).populate({
            path: 'files',
            options: {sort:{createAt: -1}} //-1 Decrescente
        });
        
        return res.json(box);
    }
}

module.exports = new BoxController();