CREATE DATABASE blog_api;

use blog_api;

CREATE TABLE users(
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(60) NOT NULL,
  email VARCHAR(255) NOT NULL,
  pwd VARCHAR(60) NOT NULL,
  created_on timestamp NOT NULL DEFAULT now(),
  display varchar(255) NOT NULL DEFAULT 'C:\Users\Aakash\Documents\CS\Js\React\social-network\src\backend\Uploads\default-profile.png'
);


DROP TABLE USERS ;

CREATE TABLE posts(
	post_id SERIAL,
	user_id SERIAL,
	post_image varchar(255),
	caption varchar(255),
	created_at timestamp NOT NULL DEFAULT now(),
	PRIMARY KEY(user_id,post_id),
	CONSTRAINT fk_poster
		FOREIGN KEY (user_id)
			REFERENCES users(user_id)
);

CREATE TABLE postComments(
	comment_id SERIAL,
	post_id SERIAL,
	user_id SERIAL,
	commentUser_id SERIAL,
	comment_desc varchar(200) NOT NULL,
	comment_at timestamp NOT NULL DEFAULT now(),
	PRIMARY KEY(user_id,post_id,comment_id),
	CONSTRAINT fk_postComment
		FOREIGN KEY (user_id,post_id)
			REFERENCES posts(user_id,post_id),
	CONSTRAINT fk_userComment
		FOREIGN KEY (commentUser_id)
			REFERENCES users(user_id)
);

CREATE TABLE likes(
	post_id SERIAL,
	user_id SERIAL,
	liked_by integer NOT NULL,
	PRIMARY KEY (user_id,post_id),
	CONSTRAINT fk_likedby
		FOREIGN KEY (liked_by)
			REFERENCES users(user_id),
	CONSTRAINT fk_likedpost
		FOREIGN KEY (user_id,post_id)
			REFERENCES posts(user_id,post_id)
);

DROP TABLE likes;

SELECT * FROM posts;

DROP TABLE POSTCOMMENTS ;

INSERT into users (username,email,pwd)
VALUES ('Aakash', 'rajpurkaraakash@gmail.com','aakash,12'),
		('Apurva', 'apurva@gmail.com', 'apurva@12'),
		('Neha', 'neha@yahoo.com', 'neha1234'),
		('Uday', 'udayraj@yahoo.co.in', 'uday@12#');
	
INSERT INTO POSTS (user_id,POST_IMAGE,CAPTION)
	VALUES (1,'C:\Users\Aakash\Documents\CS\Js\React\social-network\src\backend\postImages\p1u1.jpg','good day today');
	

SELECT * FROM users;
