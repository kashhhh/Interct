const express=require('express');
const router = express.Router();
const pool = require('../Config/db');
const path= require('path');


//GET ALL POSTS
router.get('/', async (req,res) => {
  const allPosts= await pool.query(
    "SELECT users.user_id,users.username,users.display,posts.* FROM users INNER JOIN posts ON users.USER_ID = posts.user_id order by posts.created_at desc;"
  );

  return res.send(JSON.stringify(allPosts.rows, null, 4));
});


//POST A DUMMY POST
router.post('/', async (req,res) => {
  const user_id=3;
  const post_id=1;
  const imgPath= path.join(__dirname,'/../postImages',`u${user_id}p${post_id}.png`);
  const caption="Put request";
  const likes=60;

  const createPost= pool.query(
    'INSERT INTO POSTS (post_id,user_id,POST_IMAGE,CAPTION,LIKES) VALUES ($1,$2,$3,$4,$5);',
    
    [post_id,user_id,imgPath,caption,likes],
    (err,result) => {
      if(err){
        console.log(err);
      }
      res.status(201).json('Put successful');
    }
  );
  
});

//GET POSTS BASED ON USER ID
router.get('/:user_id',async (req,res) => {
  const userPosts= await pool.query(
    'SELECT users.user_id,users.username,users.display,posts.* FROM users INNER JOIN posts ON users.USER_ID = posts.user_id where posts.user_id=$1',[parseInt(req.params.user_id)]
  );
  
  return res.send(JSON.stringify(userPosts.rows, null, 4));
  //res.json(userPosts.rows);

})

//GET POST BASED ON POST AND USER ID
router.get('/:user_id/:post_id', async (req,res) => {
  const onePost= await pool.query(
    `select p.*,u.username,u.display from posts as p inner join users as u on p.user_id=u.user_id where p.user_id=${parseInt(req.params.user_id)} and p.post_id=${parseInt(req.params.post_id)}`
  );
  return res.send(JSON.stringify(onePost.rows, null, 4));
});

module.exports=router;