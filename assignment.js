const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Set up middleware to parse request bodies as JSON
app.use(bodyParser.json());

// Serve static index.html file when root route is requested
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

// Initialize empty array to store books
let books = [];

// Get all books
app.get("/books", function (req, res) {
  res.json(books);
});

// Add a book to the collection
app.post("/books", function (req, res) {
  const book = req.body;
  if (!book.title || !book.author) {
    return res.status(400).json({ error: "title and author are required" });
  }

  book.id = Date.now().toString();
  book.publishedDate = book.publishedDate || "";
  books.push(book);
  res.json(book);
});

// Delete a book from the collection
app.delete("/books/:id", function (req, res) {
  const id = req.params.id;
  const index = books.findIndex((book) => book.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "book not found" });
  }
  books.splice(index, 1);
  res.json({ message: "book deleted" });
});

// Start the server
app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}`);
});
