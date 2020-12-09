const mongoose = require('mongoose');
const Picture = mongoose.model('pictures');
const User = mongoose.model('users');
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
        res.send({ pictures: pictures, pic: null });
    });

    let uploadToDB = async (dimensions, imageUrl, userId, uploadType) => {
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
                let pic = await picture.save();
                switch (uploadType){
                    case "cover":
                        await User.updateOne(
                            { _id: userId },
                            { $set: { 'coverSrc': imageUrl }});
                        console.log("Cover");
                        break;
                    case "avatar":
                        console.log("Avatar");
                        break;
                    default:
                        console.log("Gallery");
                        break;
                }
                return { pic: pic, pictures: await Picture.find({ _user: userId }), uploadType: uploadType};
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
        console.log("I AM HERE");
        console.log(req.file);
        console.log("Upload Type: ", req.body.uploadType);
        console.log("The coverSrc", req.user.coverSrc);
        const imageUrl = req.file.location;
        let options = url.parse(imageUrl);
        // add a flag variable that holds the type of upload.
        // is it to change profile pic, cover pic, or regular???
        // based on the flag update the proper value in the user model.

        await https.get(options, (response) => {
            let chunks =[];
            response.on('data', (chunk) => {
                chunks.push(chunk);
            }).on('end', async () => {
                let buffer = Buffer.concat(chunks);
                let dimensions = sizeOf(buffer);
                let uploadInfo = await uploadToDB(dimensions, imageUrl, req.user._id, req.body.uploadType);
                console.log("afdsa: ", uploadInfo);
                res.send(uploadInfo);
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
                else    console.log("Picture was Deleted Successfully!");
            });
        const pictures = await Picture.find({ _user: userId });
        res.send({ pictures: pictures, pic: null });
    });
};
