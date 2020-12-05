const mongoose = require('mongoose');
const Picture = mongoose.model('pictures');
const requireLogin = require('../middleware/requireLogin');
const awsS3 = require('../services/picture-upload-s3');
const sizeOf = require('image-size');
const url = require('url');
const https = require('https');

//const singleImageUpload = upload.single('image');

module.exports = app => {
    // A Function that sends all user photos and sends the photo back
    app.post('/api/pictureSend', requireLogin, async (req,res) => {
        const pictures = await Picture.find({ _user: req.body.userId });
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
    app.post('/api/uploadPicture', requireLogin, awsS3.upload.single('image'), async (req, res, next) => {
        const imageUrl = req.file.location;
        let options = url.parse(imageUrl);

        await https.get(options, (response) => {
            let chunks =[];
            response.on('data', (chunk) => {
                chunks.push(chunk);
            }).on('end', async () => {
                let buffer = Buffer.concat(chunks);
                let dimensions = sizeOf(buffer);
                let picsData = await uploadToDB(dimensions, imageUrl, req.user._id);
                res.send(picsData);
            });
        });
    });

    //deletes a picture
    app.post('/api/pictureDelete', requireLogin, async (req, res) => {
        const userId = req.user._id;
        const picture = await Picture.findOne({ _user: userId, _id: req.body.picId });
        await Picture.deleteOne({ _user: userId, _id: req.body.picId });
        // cut the src string at the end to get the img id and use it to delete object.
        const srcParse = picture.src.split("/");
        const awsKey = srcParse[srcParse.length - 1];

        awsS3.s3.deleteObject(
            { Bucket:"mango-media-album", Key: awsKey},
            (err, data) => {
                if(err) console.log(err, err.stack); // error
                else    console.log("Deleted");
            });
        const pictures = await Picture.find({ _user: userId });
        res.send(pictures);
    });
};
