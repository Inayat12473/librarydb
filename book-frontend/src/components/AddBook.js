import React, { useState } from "react";
import axios from "axios";

function AddBook({ onBookAdded }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBook = { title, author };

    axios.post("http://localhost:8080/books", newBook)
      .then(response => {
        onBookAdded(response.data); // tell parent new book added
        setTitle("");
        setAuthor("");
      })
      .catch(error => console.error("Error adding book:", error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Book</h2>
      <input
        type="text"
        placeholder="Enter book title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <br /><br />
      <input
        type="text"
        placeholder="Enter author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
      />
      <br /><br />
      <button type="submit">Add</button>
    </form>
  );
}

export default AddBook;
