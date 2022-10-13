const Pool=require('pg').Pool;

const pool= new Pool({
  user: "postgres",
  password: "postgres",
  database: "blog_api",
  host: "localhost",
  post:5432
});

module.exports= pool;