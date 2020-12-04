const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const keys = require('../config/keys');

aws.config.update({
    secretAccessKey: keys.AWS_SECRET_ACCESS_KEY_ID,
    accessKeyId: keys.AWS_ACCESS_KEY_ID,
    region: keys.AWS_REGION
});


const s3 = new aws.S3({ /* ... */ })

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'mango-media-album',
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: function (req, file, cb) {
            cb(null, {fieldName: "TESTING_METADATA"});
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString())
        }
    })
});

// const upload = multer({ dest: 'uploads/' });

module.exports ={
    upload: upload,
    s3: s3
}
