const express=require('express');
const router = express.Router();
const pool = require('../Config/db');


//GET ALL THE USERS THAT LIKED THE POST
router.get('/:user_id/:post_id', async (req,res) => {
  const postLikes= await pool.query(
    "select * from likes where user_id=$1 and post_id=$2",[
      req.params.user_id,
      req.params.post_id,
    ]
  );
  return res.send(JSON.stringify(postLikes.rows, null, 4));
});

router.post('/:user_id/:post_id/:liked_by', async (req,res) => {
  const increaseLikes= await pool.query(
    "INSERT INTO likes (USER_ID,POST_ID,LIKED_BY) VALUES ($1,$2,$3);",
    [
      req.params.user_id,
      req.params.post_id,
      req.params.liked_by,
    ],
  );
  return res.status(201).json("Likes");;
});

router.delete('/:user_id/:post_id/:liked_by', async (req,res) => {
  const increaseLikes= await pool.query(
    "DELETE FROM likes WHERE USER_ID=$1 AND post_id=$2 AND LIKED_BY=$3;",
    [
      req.params.user_id,
      req.params.post_id,
      req.params.liked_by,
    ],
  );
  return res.status(201).json("Likes");;
});


module.exports=router;