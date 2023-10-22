const Books = require("./Books");
const container = require("../containers/container");

const repo = container.get(Books);

const getAllBooksHandler = async (_, res) => {
	try {
		const books = await repo.getBooks();
		res.json(books);
	} catch (error) {
		res.status(500).json(error);
	}
};

const getBookHandler = async (req, res) => {
	try {
		const { id } = req.params;
		const book = await repo.getBook(id);
		if (book) {
			res.json(book);
		} else {
			res.status(404).json({ message: "book not found" });
		}
	} catch (error) {
		res.status(500).json(error.message);
	}
};

const addBookHandler = async (req, res) => {
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
		};
		const newBook = await repo.createBook(book);
		res.status(201).json(newBook);
	} catch (error) {
		res.status(500).json(error.message);
	}
};

const deleteBookHandler = async (req, res) => {
	try {
		const { id } = req.params;
		await repo.deleteBook(id);
		res.status(200).json({ message: "ok" });
	} catch (error) {
		res.status(500).json(error.message);
	}
};

const updateBookHandler = async (req, res) => {
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
	};
	try {
		repo.updateBook(book, id);
		res.json({ message: "ok" });
	} catch (error) {
		res.status(500).json(error.message);
	}
};

module.exports = {
	get: getBookHandler,
	getAll: getAllBooksHandler,
	add: addBookHandler,
	delete: deleteBookHandler,
	update: updateBookHandler,
};
