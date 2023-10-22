import { Request, Response } from "express";
import Books from "./Books";
import container from "../containers/container";

const repo = container.get(Books);

export const getAllHandler = async (req: Request, res: Response) => {
	try {
		const books = await repo.getBooks();
		res.json(books);
	} catch (error) {
		res.status(500).json(error);
	}
};

export const getHandler = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const book = await repo.getBook(+id);
		if (book) {
			res.json(book);
		} else {
			res.status(404).json({ message: "book not found" });
		}
	} catch (error: Error | any ) {
		res.status(500).json(error.message);
	}
};

export const addHandler = async (req: Request, res: Response) => {
	try {
		const {
			id,
			title,
			description,
			authors,
			favorite,
			fileName,
			filecover,
			filebook,
			originalNameFileBook,
			originalNameFileCover,
		} = req.body;
		const book = {
			id,
			title,
			description,
			authors,
			favorite,
			fileName,
			filecover,
			filebook,
			originalNameFileBook,
			originalNameFileCover,
		} as any;
		const newBook = await repo.createBook(book);
		res.status(201).json(newBook);
	} catch (error: Error | any) {
		res.status(500).json(error.message);
	}
};

export const deleteHandler = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		await repo.deleteBook(+id);
		res.status(200).json({ message: "ok" });
	} catch (error: Error | any) {
		res.status(500).json(error.message);
	}
};

export const updateHandler = async (req: Request, res: Response) => {
	const { id } = req.params;
	const {
		title,
		description,
		authors,
		favorite,
		fileName,
		filecover,
		filebook,
		originalNameFileCover,
		originalNameFileBook,
	} = req.body;

	const book = {
		title,
		description,
		authors,
		favorite,
		filecover,
		fileName,
		filebook,
		originalNameFileCover,
		originalNameFileBook,
	} as any;
	try {
		repo.updateBook(book, +id);
		res.json({ message: "ok" });
	} catch (error: Error | any) {
		res.status(500).json(error.message);
	}
};
