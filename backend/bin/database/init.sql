CREATE TABLE users (
    user_id serial PRIMARY KEY,
    username VARCHAR (50) UNIQUE NOT NULL,
    password VARCHAR (64) NOT NULL,
    created_on TIMESTAMP NOT NULL
);
CREATE TABLE files (
    file_id serial PRIMARY KEY,
    owner VARCHAR (50) NOT NULL,
    filetype VARCHAR (16) NOT NULL,
    size BIGINT NOT NULL,
    created_on TIMESTAMP NOT NULL
);