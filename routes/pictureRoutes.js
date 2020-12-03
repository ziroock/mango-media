const mongoose = require('mongoose');
const Picture = mongoose.model('pictures');
const requireLogin = require('../middleware/requireLogin');
const upload = require('../services/picture-upload-s3');
const sizeOf = require('image-size');
const url = require('url');
const https = require('https');

//const singleImageUpload = upload.single('image');

module.exports = app => {
    // A Function that sends all user photos and sends the photo back
    app.post('/api/pictureSend', requireLogin, async (req,res) => {
        console.log(req.body);
        const pictures = await Picture.find({ _user: req.body.userId });
        console.log(pictures);
        res.send(pictures);
    });

    let uploadToDB = async (dimensions, imageUrl, userId) => {
        const { height, width } = dimensions;
        const picture = new Picture({
            src: imageUrl,
            dateUploaded: new Date(),
            _user: userId,
            height: height,
            width: width,
            desc: ''
        });

        try {
            if (imageUrl) {
                await picture.save();
                // res.send(picture);
                return await Picture.find({ _user: userId });
            } else {
                console.log({message: 'Empty req href: Picture, did not upload!'});
            }
        } catch(err) {
            console.log({ message: err.message });
        }
    }

    // A Function that uploads a picture
    // need to check the href for validity
    // Also need to figure out the api(service) for pictures that I will use
    app.post('/api/uploadPicture', requireLogin, upload.single('image'), async (req, res, next) => {
        // console.log(req.file);
        const imageUrl = req.file.location;
        let options = url.parse(imageUrl);

        await https.get(options, (response) => {
            let chunks =[];
            response.on('data', (chunk) => {
                chunks.push(chunk);
            }).on('end', async () => {
                let buffer = Buffer.concat(chunks);
                // console.log("Buffer: ");
                let dimensions = sizeOf(buffer);
                // console.log(dimensions);
                let picsData = await uploadToDB(dimensions, imageUrl, req.user._id);
                // console.log(picsData);
                res.send(picsData);
            });
        });
    });

    //deletes a picture
    app.post('/api/pictureDelete', requireLogin, async (req, res) => {
        await Picture.deleteOne({ _user: req.user.id, _id: req.href.postId });
        // const pictures = await Picture.find({ _user: req.user.id });
        //console.log(req.href);
        // res.send(pictures);
    });
};
