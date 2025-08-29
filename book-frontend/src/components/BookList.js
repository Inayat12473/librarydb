import React, { useEffect, useState } from "react";
import axios from "axios";
import AddBook from "./AddBook";

function BookList() {
  const [books, setBooks] = useState([]);

  const fetchBooks = () => {
    axios.get("http://localhost:8080/books")
      .then(response => setBooks(response.data))
      .catch(error => console.error("Error fetching books:", error));
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleBookAdded = (book) => {
    setBooks([...books, book]);
  };

  return (
    <div>
      <h2>Books in Library</h2>
      <ul>
        {books.map(book => (
          <li key={book.id}>
            {book.title} — {book.author}
          </li>
        ))}
      </ul>

      <AddBook onBookAdded={handleBookAdded} />
    </div>
  );
}

export default BookList;
