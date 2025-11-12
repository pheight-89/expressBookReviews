const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
 const username = req.body.username;
 const password = req.body.password;

 if (!username || !password) {
    return res.status(404).json({ message: "Unable to register. Username and/or password not provided."})
 }

 const userExists = users.find((user) => user.username === username);

 if (userExists) {
    return res.status(409).jsaon({ message: "User already exists"});
 }

 users.push({ "username": username, "password": password });
 return res.status(201).json({ message: "User succesfully registered. You may now log in."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.status(200).send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  let isbn = req.params.isbn;
  const book = books[isbn];

  if(book){
    return res.status(200).json(book);
  } else {
    return res.status(400).json({ message: `Book with ISBN ${isbn} not found.`});
  }
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  let author = req.params.author;
  const booksToFilter = Object.values(books);
  const filteredBooks = booksToFilter.filter((book) => book.author === author);

  if (filteredBooks.length > 0){
    return res.status(200).json({ booksbyauthor: filteredBooks });
  } else {
    return res.status(404).json({ message: `No books found by ${author}.`});
  }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  let title = req.params.title;
  const booksToFilter = Object.values(books);
  const filteredBooks = booksToFilter.filter((book) => book.title === title);

  if (filteredBooks.length > 0){
    return res.status(200).json({ booksbytitle: filteredBooks });
  } else {
    return res.status(404).json({ message: `No books found by ${title}.`});
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
let isbn = req.params.isbn;
const book = books[isbn];

if (book){
    const reviews = book.reviews;
    return res.status(200).json({reviews: reviews});
} else {
    return res.status(404).json({ message: `Book with ${isbn} not found.`});
}
});

module.exports.general = public_users;
