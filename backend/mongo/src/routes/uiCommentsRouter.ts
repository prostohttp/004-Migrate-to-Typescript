import express from "express";
import cors from "../middleware/cors";
import {addHandler, deleteHandler, getAllHandler} from "../api/uiCommentsHandlers";

const uiCommentsRouter = express.Router();

uiCommentsRouter.get("/add", cors, addHandler);
uiCommentsRouter.get("/:id", getAllHandler);
uiCommentsRouter.delete("/:id/delete", deleteHandler);

export default uiCommentsRouter
