const mongoose = require('mongoose');
const Picture = mongoose.model('pictures');
const requireLogin = require('../middleware/requireLogin');

//TODO: create requireLogin middleware and add to: create, delete, edit and send

/**
 * This file takes care of the requests for Profile Posts
 * TODO: need to block /api/login and /api/register for when a user is logged in!
 *  a.k.a. add the appropriate middleware to handle server side access control.
 *
 * - app.post('/api/postSend'):
 *   + This function sends all the posts that were found for the specific
 *     user.
 * - app.post('/api/postSend'):
 *   + This function receives the post href and the user id for the post.
 *   + Then it adds the post to the Post model inside the DB.
 * - app.post('postDelete'):
 *   + This function receives user ID and ID of the post ot be deleted.
 *   + Then it sends the user posts that are left, to update on the page.
 * - app.post('api/postEdit'):
 *   + This function receives user ID, ID of the post ot be edited and href.
 *   + Then it updates the href inside the model.
 *   + Once done with the above it sends the user posts with the edit, in order
 *     to update hte page.
 */


module.exports = app => {
    // A Function that sends all user photos and sends the photo back
    app.post('/api/pictureSend', requireLogin, async (req,res) => {
        const pictures = await Picture.find({ _user: req.href.userId });

        res.send(pictures);
    });

    // A Function that uploads a picture
    // need to check the href for validity
    // Also need to figure out the api(service) for pictures that I will use
    app.post('/api/pictureUpload', async (req, res) => {
        console.log(req.body);
        const { href, userId } = req.body;
        const picture = new Picture({ href: href, dateUploaded: new Date(), _user: userId});

        try {
            if (href) {
                await picture.save();
                res.send(picture);
            } else {
                console.log({message: 'Empty req href: Picture, did not upload!'});
            }
        } catch(err) {
            console.log({ message: err.message });
        }
    });

    //deletes a picture
    app.post('/api/pictureDelete', requireLogin, async (req, res) => {
        await Picture.deleteOne({ _user: req.user.id, _id: req.href.postId });
        // const pictures = await Picture.find({ _user: req.user.id });
        console.log(req.href);
        // res.send(pictures);
    });
};
