-- Active: 1710949347672@@127.0.0.1@3306@contact_app
### Create Table user
CREATE Table user (
    id INT NOT NULL AUTO_INCREMENT ,
    username VARCHAR(20) NOT NULL,
    password VARCHAR(10) NOT NULL,
    email VARCHAR(200) NOT NULL,
    phone INT ,
    refresh_token VARCHAR(255),
    profile_picture VARCHAR(300),
    create_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id),
    UNIQUE KEY username_unique (username)
)engine = innodb;


CREATE TABLE contact (
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(10) NOT NULL,
    last_name VARCHAR(10),
    phone INT ,
    create_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_id INT NOT NULL,
    PRIMARY KEY (id)
)engine = innodb;

ALTER Table contact 
    ADD constraint fk_user_id
        Foreign Key (user_id) REFERENCES  `user` (id);

    
CREATE Table contact_address (
    id INT AUTO_INCREMENT NOT NULL,
    street VARCHAR(100) NOT NULL,
    city VARCHAR(30) NOT NULL,
    country VARCHAR(30),
    create_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    contact_id INT NOT NULL,
    PRIMARY KEY (id)
)engine = innodb;

ALTER Table contact_address
    ADD constraint fk_contact_id 
        Foreign Key (contact_id) REFERENCES contact (id);


CREATE Table user_address (
    id INT AUTO_INCREMENT NOT NULL,
    street VARCHAR(100) NOT NULL,
    city VARCHAR(30) NOT NULL,
    country VARCHAR(30) ,
    create_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_id INT NOT NULL,
    PRIMARY KEY(id)
)engine = innodb;

ALTER Table user_address
    ADD constraint fk_to_user_address_id
        Foreign Key (user_id) REFERENCES user (id);
