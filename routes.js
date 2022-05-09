const express = require('express');
const router = express.Router();
const Controller = require('./controller');

// Log the request
router.use((req, res, next) => {
    const logData = {
        request: req.method,
        time: Date.now().toLocaleString(),
        url: req.url
    };
    console.log(logData);
    next()
})

router.get('/', (req, res) => {
    res.send('Server is up and running');
});


router.get('/getUsers', Controller.getUsers);
router.get('/getComments', Controller.getComments);
router.get('/getComment', Controller.getComment);
router.post('/comment', Controller.addComment);
router.post('/upvote', Controller.addVote);


module.exports = router;