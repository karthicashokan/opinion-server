# 👨‍💻
# Ghost Coding challenge (Server)

### Introduction
- This is the server part of the coding challenge which is basically a simple REST API built using Node/Express/mySQL
- See it in action: http://143.198.57.130:3001/getUsers, http://143.198.57.130:3001/getComments

### API
- `/getUsers` - Returns a list of users (this is not part of the challege, the client will simply randomly chose of these as the current user)


- `/getcomments` - Returns a list of all the comments present in the DB
  - `id` - unique comment identifier
  - `userId` - user identifier (identifies which user wrote this comment)
  - `parentCommentId` - identifies the parent comment for a nested comment (when the user replies to an existing comment)
  - `text` - the comment itself
  - `date` - The date the comment was added
  - `dateFormatted` - The date the comment was added (user readable)
  - `voteCount` - The number of times this comment was upvoted


- `/comment` - Can create a new comment (POST)
  - `userId` - user identifier (identifies which user wrote this comment)
  - `text` - the comment itself

- `/upvote` - Can increate the voteCount of a comment by one (POST)
  - `commentId` - comment identifier
