const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.status(401).json({message: "username and/or password is missing."});
    }
    
    if (authenticatedUser(username, password)){
        let accessToken = jwt.sign({ data: username}, secretKey, {expiresIn: 60 * 60});
        req.session.authorization = { accessToken: accessToken, username: username};
        return res.status(200).json({message: "customer successfully logged in.", accessToken: accessToken});
    } else {
        return res.status(401).json({message: "Failed credentials. Invalid username or password"});
    }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const isbn = req.params.isbn;
  const reviewContent = req.query.review;
  const username = req.session.authorization.username;

  if (!reviewContent) {
    return res.status(400).json({message: "review content is required in the query."});
  }

  if (!books[isbn]){
    return res.status(404).json({message: `Book with ${isbn} not found.`})
  }

  if (!books[isbn].reviews){
    books[isbn].reviews = {};
  }

  books[isbn].reviews[username]=reviewContent;

  return res.status(200).json({message: `Review by ${username} for ISBN ${isbn} succesffully added or modified.`, reviews: books[isbn].reviews});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
