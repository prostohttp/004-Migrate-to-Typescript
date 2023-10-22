import Book from "../model/Book";

abstract class BooksRepository {
	abstract getBooks();
	abstract getBook(id: number)
	abstract createBook(book: typeof Book);
	abstract updateBook(book: typeof Book, id: number);
	abstract deleteBook(id: number);
}

export default BooksRepository;
