DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS requests;
DROP TYPE IF EXISTS status;
DROP TYPE IF EXISTS urgency;
DROP TYPE IF EXISTS allowed_hours;

CREATE TYPE status AS ENUM ('RESOLVED', 'UNRESOLVED', 'REJECTED', 'APPROVED');
CREATE TYPE allowed_hours AS ENUM ('24', '72', '168');

CREATE TABLE users (
id SERIAL PRIMARY KEY,
first_name varchar(50) NOT null,
last_name varchar(50) NOT null,
phone varchar(30) NOT NULL UNIQUE,
email varchar(50) NOT NULL UNIQUE,
password varchar(255) NOT null,
address text NOT null,
is_admin BOOLEAN NOT null,
created_at TIMESTAMP NOT null,
updated_at timestamp
);

CREATE TABLE requests (
id SERIAL PRIMARY KEY,
title varchar(150) NOT null,
description text NOT null,
requested_on TIMESTAMP NOT null,
current_status status NOT null,
max_hour allowed_hours NOT null,
user_id INT NOT NULL REFERENCES users,
address text,
created_at TIMESTAMP NOT null,
updated_at timestamp
);