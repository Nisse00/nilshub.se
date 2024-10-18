CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
)

INSERT INTO users (username, password)
VALUES ('Nils', 'admin')

DELETE FROM users WHERE username = 'Nils';

INSERT INTO users (username, password) VALUES ('John', 'Smith');
INSERT INTO users (username, password) VALUES ('Jane', 'Doe');
