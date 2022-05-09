const httpStatus = require('http-status');
const { escapeText, readableDate } = require('./helper');

/**
 * Gets the comment data from DB, for a given commentId
 * @param commentId
 * @param callback
 */
const getCommentById = (commentId, callback) => {
    db.query(`SELECT * FROM Comment WHERE ID=${commentId}`, (err, data) => {
        if (err) {
            callback(new SyntaxError(err), null);
        }
        callback(null, data.pop());
    });
}

/**
 * Get all users
 * @param req
 * @param res
 * @returns {*|void}
 */
function getUsers(req, res) {
    try {
        db.query('SELECT * from User', (err, data) => {
            if (err) {
                throw new SyntaxError(err);
            }
            res.status(200).json(data);
        });
    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
    }
}

/**
 * Get all comments
 * @param req
 * @param res
 * @returns {*|void}
 */
function getComments(req, res) {
    try {
        db.query('SELECT * from Comment', (err, data) => {
            if (err) {
                throw new SyntaxError(err);
            }
            // Add additional attribute readableDate, that the front-end can display to the user
            res.map((comment) => comment.dateFormatted = readableDate(comment.date));
            res.status(200).json(data);
        });
    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
    }
}

/**
 * Add a new comment
 * @param req
 * @param res
 * @returns {*|void}
 */
function addComment(req, res) {
    try {
        // Check if userId and text are present
        const { userId, text, parentCommentId = null } = req.body;
        const canAddComment = (() => {
            return !(!userId || !text || text.length === 0);

        })();
        // canAddComment === false
        if (!canAddComment) {
            return res.status(httpStatus.BAD_REQUEST).send();
        }
        // canAddComment === true
        // Need to escape special chars to prevent SQL errors
        const queryString = `INSERT INTO Comment (userId, text, parentCommentId) VALUES (${userId}, '${escapeText(text)}', ${parentCommentId})`;
        db.query(queryString, (err, data) => {
            if (err) {
                throw new SyntaxError(err);
            }
            console.log('data.insertId', data.insertId);
            // Fetch the comment from the DB and return
            getCommentById(data.insertId, (error, comment) => {
                res.status(200).json(comment);
            });
        });
    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
    }
}

function addVote(req, res) {
    try {
        // Step 1: Check if userId and commentId are present
        const { userId, commentId  } = req.body;
        const canUpvote = userId && commentId;
        if (!canUpvote) {
            return res.status(httpStatus.BAD_REQUEST).send();
        }
        // Step 2: Check if commentId is valid
        getCommentById(commentId, (error, comment) => {
            if (!comment && !comment.id) {
                return res.status(httpStatus.BAD_REQUEST).send();
            }
            // Step 3: Increase vote count for comment
            const updatedVoteCount = comment.voteCount + 1;
            db.query(`UPDATE Comment SET voteCount=${updatedVoteCount} WHERE id=${commentId}`, (err, data) => {
                if (err) {
                    throw new SyntaxError(err);
                }
            });
            // Step 4: Return the comment with updatedVoteCount
            res.status(200).json({...comment, voteCount: updatedVoteCount});
        });
    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
    }
}

module.exports = {
    getUsers,
    getComments,
    addComment,
    addVote
}