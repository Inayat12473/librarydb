
package com.example.demo.model;

import com.example.demo.model.student.Student;
import jakarta.persistence.*;

        import java.time.LocalDate;

@Entity
public class Borrow {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Student student;

    @ManyToOne
    private Book book;

    private LocalDate borrowDate;
    private LocalDate returnDate;

    public Borrow() {}

    public Borrow(Student student, Book book, LocalDate borrowDate, LocalDate returnDate) {
        this.student = student;
        this.book = book;
        this.borrowDate = borrowDate;
        this.returnDate = returnDate;
    }

    public Borrow(Student student, Book book, LocalDate now) {
    }

    // ✅ Getters & Setters
    public Long getId() { return id; }
    public Student getStudent() { return student; }
    public void setStudent(Student student) { this.student = student; }

    public Book getBook() { return book; }
    public void setBook(Book book) { this.book = book; }

    public LocalDate getBorrowDate() { return borrowDate; }
    public void setBorrowDate(LocalDate borrowDate) { this.borrowDate = borrowDate; }

    public LocalDate getReturnDate() { return returnDate; }
    public void setReturnDate(LocalDate returnDate) { this.returnDate = returnDate; }
}
