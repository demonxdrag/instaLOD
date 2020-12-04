CREATE TABLE users (
    user_id serial PRIMARY KEY,
    username VARCHAR (50) UNIQUE NOT NULL,
    password VARCHAR (64) NOT NULL,
    created_on TIMESTAMP NOT NULL
);
CREATE TABLE files (
    file_id serial,
    name VARCHAR(64),
    url VARCHAR(64),
    owner VARCHAR(50) REFERENCES users (username),
    filetype VARCHAR (16) NOT NULL,
    size BIGINT NOT NULL,
    created_on TIMESTAMP NOT NULL,
    last_edit TIMESTAMP,
    zip BOOLEAN DEFAULT false,
    PRIMARY KEY (file_id),
    FOREIGN KEY (owner) REFERENCES users(username)
);