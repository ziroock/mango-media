const mongoose = require('mongoose');
const Picture = mongoose.model('pictures');
const requireLogin = require('../middleware/requireLogin');
const upload = require('../services/picture-upload-s3');

const singleImageUpload = upload.single('image');

module.exports = app => {
    // A Function that sends all user photos and sends the photo back
    app.post('/api/pictureSend', requireLogin, async (req,res) => {
        console.log(req.body);
        const pictures = await Picture.find({ _user: req.body.userId });
        console.log(pictures);
        res.send(pictures);
    });

    // A Function that uploads a picture
    // need to check the href for validity
    // Also need to figure out the api(service) for pictures that I will use
    app.post('/api/uploadPicture', requireLogin, async (req, res) => {
        console.log(req.body);
        console.log((req.body.file));
        // singleImageUpload(req, res, (err) => {
        //     return res.json({'imageURL': req.file.location});
        // });
        // res.send(null);
    //     const { src, height, width, desc } = req.body;
    //     const picture = new Picture({
    //         src: src,
    //         dateUploaded: new Date(),
    //         _user: req.user._id,
    //         height: height,
    //         width: width,
    //         desc: desc
    //     });
    //
    //     try {
    //         if (src) {
    //             await picture.save();
    //             res.send(picture);
    //         } else {
    //             console.log({message: 'Empty req href: Picture, did not upload!'});
    //         }
    //     } catch(err) {
    //         console.log({ message: err.message });
    //     }
    });

    //deletes a picture
    app.post('/api/pictureDelete', requireLogin, async (req, res) => {
        await Picture.deleteOne({ _user: req.user.id, _id: req.href.postId });
        // const pictures = await Picture.find({ _user: req.user.id });
        //console.log(req.href);
        // res.send(pictures);
    });
};
