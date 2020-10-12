CREATE DATABASE socialmedia;

CREATE TABLE location
(
    locationId SERIAL UNIQUE NOT NULL,
    street varchar(255),
    city varchar(255),
    state varchar(255),
    zip varchar(255),
    country varchar(255),
    PRIMARY KEY (locationId),
    CONSTRAINT validLocation CHECK (city <> NULL OR state <> NULL OR country <> NULL)
);

CREATE TABLE profile
(
    userId SERIAL UNIQUE NOT NULL,
    locationId int,
    firstName varchar(255) NOT NULL,
    lastName varchar(255) NOT NULL,
    displayName varchar(255) NOT NULL,
    dob date NOT NULL,
    gender varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    avaSrc text,
    PRIMARY KEY (userId),
    FOREIGN KEY (locationId) REFERENCES location(locationId),
    CONSTRAINT validDob CHECK (dob <= CURRENT_DATE)
);

CREATE TABLE media
(
    mediaId SERIAL UNIQUE NOT NULL,
    mediaSrc text NOT NULL,
    mediaType varchar(255) NOT NULL,
    createdTime timestamp,
    PRIMARY KEY (mediaId),
    CONSTRAINT validType CHECK (mediaType IN ('Image', 'Video'))
);

CREATE TABLE post
(
    postId SERIAL UNIQUE NOT NULL,
    userId int NOT NULL,
    locationId int,
    caption text,
    mediaId int,
    createdTime timestamp,
    updatedTime timestamp,
    PRIMARY KEY (postId),
    FOREIGN KEY (userId) REFERENCES profile(userId),
    FOREIGN KEY (mediaId) REFERENCES media(mediaId),
    CONSTRAINT validPost CHECK (caption IS NOT NULL OR locationId IS NOT NULL OR mediaId IS NOT NULL)
);

CREATE TABLE newsfeed
(
    newsfeedId SERIAL UNIQUE NOT NULL,
    userId int NOT NULL,
    postId int NOT NULL,
    createdTime timestamp NOT NULL,
    PRIMARY KEY (newsfeedId),
    FOREIGN KEY (userId) REFERENCES profile(userId),
    FOREIGN KEY (postId) REFERENCES post(postId)
);

CREATE TABLE work
(
    workId SERIAL UNIQUE NOT NULL,
    userId int NOT NULL,
    locationId int,
    corpName text NOT NULL,
    duty text,
    description text,
    position text,
    startDate date,
    endDate date,
    toPresent boolean,
    PRIMARY KEY (workId),
    FOREIGN KEY (userId) REFERENCES profile(userId),
    FOREIGN KEY (locationId) REFERENCES location(locationId),
    CONSTRAINT validDate CHECK (startDate <= endDate OR toPresent = TRUE)
);

CREATE TABLE edu
(
    eduId SERIAL UNIQUE NOT NULL,
    userId int NOT NULL,
    locationId int,
    schoolName text NOT NULL,
    major text,
    description text,
    degree text,
    attendDate date,
    graduationDate date,
    isAttending boolean,
    PRIMARY KEY (eduId),
    FOREIGN KEY (userId) REFERENCES profile(userId),
    FOREIGN KEY (locationId) REFERENCES location(locationId),
    CONSTRAINT validDate CHECK (attendDate < graduationDate OR isAttending = TRUE)
);

CREATE TABLE liked
(
    likeId SERIAL UNIQUE NOT NULL,
    userId int NOT NULL,
    postId int NOT NULL,
    createdTime timestamp NOT NULL,
    PRIMARY KEY (likeId),
    FOREIGN KEY (userId) REFERENCES profile(userId),
    FOREIGN KEY (postId) REFERENCES post(postId)
);

CREATE TABLE comment
(
    commentId SERIAL UNIQUE NOT NULL,
    userId int NOT NULL,
    postId int NOT NULL,
    content text,
    imageSrc text,
    createdTime timestamp NOT NULL,
    updatedTime timestamp,
    PRIMARY KEY (commentId),
    FOREIGN KEY (userId) REFERENCES profile(userId),
    FOREIGN KEY (postId) REFERENCES post(postId),
    CONSTRAINT validComment CHECK (content <> NULL OR imageSrc <> NULL)
);

CREATE TABLE friend
(
    friendId SERIAL UNIQUE NOT NULL,
    userId int NOT NULL,
    otherId int NOT NULL,
    PRIMARY KEY (friendId),
    FOREIGN KEY (userId) REFERENCES profile(userId),
    FOREIGN KEY (otherId) REFERENCES profile(userId)
);

CREATE TABLE notification
(
    notificationId SERIAL UNIQUE NOT NULL,
    userId int NOT NULL,
    postId int NOT NULL,
    type varchar(255) NOT NULL,
    createdTime timestamp NOT NULL,
    PRIMARY KEY (notificationId),
    FOREIGN KEY (userId) REFERENCES profile(userId),
    FOREIGN KEY (postId) REFERENCES post(postId)
);
