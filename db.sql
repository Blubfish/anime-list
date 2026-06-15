-- -- CREATE TABLE users (
-- -- user_id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
-- -- username varchar(50) NOT NULL UNIQUE,
-- -- );

-- -- ALTER TABLE users
-- -- ADD COLUMN name varchar(30) NOT NULL;

-- INSERT INTO users (username, email, name)
-- VALUES ('Calcur', 'calcur@gmail.com', 'Caleb Curry');

-- -- UPDATE users
-- -- SET name = 'John Smith'
-- -- WHERE user_id = 1;

-- -- DELETE FROM users
-- -- WHERE user_id = 1;

-- CREATE TABLE posts (
--     post_id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
--     user_id int REFERENCES users(user_id),
--     title text NOT NULL, 
--     body text NOT NULL
-- );

-- SELECT * FROM users; 

-- INSERT INTO posts (user_id, title, body)
-- VALUES (2, 'This is a post title', 'this is more information thanks for reading'),
-- (2, 'This is a second post', 'this is the post body');

-- SELECT * FROM posts;

-- CREATE VIEW post_info AS
-- SELECT title, username 
-- FROM posts INNER JOIN users 
-- ON posts.user_id = users.user_id; 


-- INSERT INTO anime (name, rating, status, note)
-- VALUES ('My Hero Academia', 8, 'Watching', 'Kinda Mid');

-- ALTER TABLE anime
-- ADD COLUMN anilist_id integer,
-- ADD COLUMN episodes integer,
-- ADD COLUMN tags text[] DEFAULT '{}'::text[];


-- ALTER TABLE anime
-- ALTER COLUMN image SET NOT NULL,
-- ALTER COLUMN genres SET NOT NULL,
-- ALTER COLUMN anilist_id SET NOT NULL,
-- ALTER COLUMN episodes SET NOT NULL,
-- ALTER COLUMN tags SET NOT NULL;

ALTER TABLE anime 
ADD COLUMN episodes_watched integer;