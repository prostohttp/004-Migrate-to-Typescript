import { injectable } from "inversify";
import Book from "../model/Book";
import BooksRepository from "../repositories/books.repository";

@injectable()
export default class Books extends BooksRepository {
	async createBook(book: typeof Book) {
		const newBook = new Book(book);
		await newBook.save();
		return newBook;
	}

	async getBook(id: number) {
		const book = await Book.findById(id).select("-__v");
		return book;
	}

	async getBooks() {
		const books = await Book.find().select("-__v");
		return books;
	}

	async deleteBook(id: number) {
		await Book.findByIdAndDelete(id);
	}

	async updateBook(book: typeof Book, id: number) {
		await Book.findByIdAndUpdate(id, book);
	}
}
