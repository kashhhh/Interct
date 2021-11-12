const express=require('express');
const router = express.Router();
const pool = require('../Config/db');
const path= require('path');


//GETS ALL COMMENTS
router.get('/', async (req,res) => {
  const allComments= await pool.query(
    'select * from postComments'
  );
  return res.send(JSON.stringify(allComments.rows, null, 4));
});


//GETS COMMENTS ON A SPECIFIC POST
router.get('/:user/:post', async (req,res) => {
  const commentOnPost = await pool.query(
    'select pc.*, us.username, us.display from postComments as pc inner join users as us on pc.COMMENTUSER_ID = us.user_id where pc.USER_ID=$1 AND pc.post_id =$2;',
    [req.params.user,req.params.post]
  );
  return res.send(JSON.stringify(commentOnPost.rows, null, 4));
});

router.post('/:user/:post', async (req,res) => {
  const commentText=req.body.Comment;
  const commentedUser=req.body.CommentedUser;
  const post_id = req.params.post;
  const user_id = req.params.user;

  const createComment = await pool.query(
    'insert into postComments (user_id,post_id,commentuser_id,comment_desc)  values ($1,$2,$3,$4);',
    [user_id,post_id,commentedUser,commentText]
  );
  console.log("Comment Created");

  return res.status(302).json('Comment Created');

})



module.exports=router;