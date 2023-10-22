import { injectable } from "inversify";
import { Book as BookType } from "../types/book";
import Book from "../model/Book";
import BooksRepository from "../repositories/books.repository";

interface createBookDTO {
	id: BookType["id"];
	title: BookType["title"];
	description: BookType["description"];
	authors: BookType["authors"];
	favorite: BookType["favorite"];
	fileName: BookType["fileName"];
	filecover: BookType["filecover"];
	filebook: BookType["filebook"];
	originalNameFileCover: BookType["originalNameFileCover"];
	originalNameFileBook: BookType["originalNameFileBook"];
}

@injectable()
export default class Books extends BooksRepository {
	async createBook(book: createBookDTO) {
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

	async updateBook(book: BookType, id: number) {
		await Book.findByIdAndUpdate(id, book);
	}
}
