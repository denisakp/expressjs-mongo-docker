db = db.getSiblingDB("express");

db.createUser({
    user: "express",
    pwd: 'password',
    roles: [{ role: "readWrite", db: "express" }],
});

db.blog.insertOne({
    title: "My first blog post",
    content: "The first ever blog post i wrote",
    description: "In this post i'll introduce you to Technical writing"
});
