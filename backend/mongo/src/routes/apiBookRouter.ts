import express  from "express";
import {
	getHandler,
	getAllHandler,
	updateHandler,
	deleteHandler,
	addHandler,
} from "../api/apiBooksHandlers";

const apiBooksRouter = express.Router();

apiBooksRouter.get("/:id", getHandler);

apiBooksRouter.get("/", getAllHandler);

apiBooksRouter.post("/", addHandler);

apiBooksRouter.put("/:id", updateHandler);

apiBooksRouter.delete("/:id", deleteHandler);

export default apiBooksRouter;
