CREATE DATABASE IF NOT EXISTS CHATBOT;
USE CHATBOT;

CREATE TABLE IF NOT EXISTS MESSAGE(
    request varchar(50) not null,
    response varchar(50) not null
);
