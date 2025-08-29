package com.example.demo.controller;

import com.example.demo.model.Borrow;
import com.example.demo.model.Book;
import com.example.demo.model.student.Student;
import com.example.demo.repository.BorrowRepository;
import com.example.demo.repository.BookRepository;
import com.example.demo.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/borrows")
public class BorrowController {

    @Autowired
    private BorrowRepository borrowRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private BookRepository bookRepository;

    // ✅ Borrow a book
    @PostMapping
    public Borrow borrowBook(@RequestParam Long studentId, @RequestParam Long bookId) {
        Student student = studentRepository.findById(studentId).orElseThrow();
        Book book = bookRepository.findById(bookId).orElseThrow();

        if (!book.isAvailable()) {
            throw new RuntimeException("❌ Book is already borrowed!");
        }

        book.setAvailable(false); // mark as borrowed
        bookRepository.save(book);

        Borrow borrow = new Borrow(student, book, LocalDate.now());
        return borrowRepository.save(borrow);
    }

    // ✅ Return a book
    @PutMapping("/{borrowId}/return")
    public Borrow returnBook(@PathVariable Long borrowId) {
        Borrow borrow = borrowRepository.findById(borrowId).orElseThrow();

        if (borrow.getReturnDate() != null) {
            throw new RuntimeException("❌ Book already returned!");
        }

        borrow.setReturnDate(LocalDate.now());

        // mark book available again
        Book book = borrow.getBook();
        book.setAvailable(true);
        bookRepository.save(book);

        return borrowRepository.save(borrow);
    }

    // ✅ Get all borrow records
    @GetMapping
    public List<Borrow> getAllBorrows() {
        return borrowRepository.findAll();
    }
}
