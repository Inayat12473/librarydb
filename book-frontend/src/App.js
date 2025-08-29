import React, { useEffect, useState } from "react";

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [editingBook, setEditingBook] = useState(null); // 🆕 track editing book

  useEffect(() => {
    fetch("http://localhost:8080/books")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  const addBook = () => {
    fetch("http://localhost:8080/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, author }),
    })
      .then((res) => res.json())
      .then((newBook) => setBooks([...books, newBook]));
  };

  const deleteBook = (id) => {
    fetch(`http://localhost:8080/books/${id}`, { method: "DELETE" }).then(() =>
      setBooks(books.filter((book) => book.id !== id))
    );
  };

  // 🆕 update function
  const updateBook = () => {
    fetch(`http://localhost:8080/books/${editingBook.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, author }),
    })
      .then((res) => res.json())
      .then((updated) => {
        setBooks(
          books.map((book) => (book.id === updated.id ? updated : book))
        );
        setEditingBook(null);
        setTitle("");
        setAuthor("");
      });
  };

  // 🆕 set book for editing
  const startEdit = (book) => {
    setEditingBook(book);
    setTitle(book.title);
    setAuthor(book.author);
  };

  return (
    <div>
      <h1>Library Books</h1>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />

      {editingBook ? (
        <button onClick={updateBook}>✅ Update Book</button>
      ) : (
        <button onClick={addBook}>➕ Add Book</button>
      )}

      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.title} by {book.author}{" "}
            <button onClick={() => startEdit(book)}>✏️ Edit</button>
            <button onClick={() => deleteBook(book.id)}>❌ Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
