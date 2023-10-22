import { Book } from "../types/book";

abstract class BooksRepository {
	abstract getBooks(): Promise<Book[] | null>
	abstract getBook(id: number): Promise<Book | null>
	abstract createBook(book: Book): void;
	abstract updateBook(book: Book, id: number): void;
	abstract deleteBook(id: number): void;
}

export default BooksRepository;