create Datebase Messages;

use Messages;

create Table message(
    request varchar(50) not null primary key,
    response varchar(50) not null
);