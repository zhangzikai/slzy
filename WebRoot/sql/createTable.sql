create table users(
       userid varchar2(32) primary key,
       username varchar2(32) not null,
       userrealname varchar2(32) not null,
       password varchar2(32) not null,
       sex number(2),
       age number(4),
       address varchar2(32)
);