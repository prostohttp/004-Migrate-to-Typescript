import express from "express";
import {
	getHandler,
	getAllHandler,
	createHandler,
	addHandler,
	updateHandler,
	deleteHandler,
} from "../api/uiBooksHandlers";

const uiBooksRouter = express.Router();

uiBooksRouter.get("/:id", getHandler);
uiBooksRouter.get("/", getAllHandler);
uiBooksRouter.get("/create", createHandler);
uiBooksRouter.post("/", addHandler);
uiBooksRouter.put("/:id", updateHandler);
uiBooksRouter.delete("/:id", deleteHandler);

export default uiBooksRouter;
