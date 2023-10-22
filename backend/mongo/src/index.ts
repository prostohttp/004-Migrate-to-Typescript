import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import passport from "./api/passport";
import apiBooksRouter from "./routes/apiBookRouter";
import uiBooksRouter from "./routes/uiBookRouter";
import apiUserRouter from "./routes/apiUserRouter";
import uiUserRouter from "./routes/uiUserRouter";
import uiCommentsRouter from "./routes/uiCommentsRouter";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	session({
		secret: "SECRET",
		resave: false,
		saveUninitialized: false,
	})
);

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use("/books", uiBooksRouter);
app.use("/api/user", apiUserRouter);
app.use("/api/books", apiBooksRouter);
app.use("/user", uiUserRouter);
app.use("/comments", uiCommentsRouter)

const start = async (port: number | string, url: string) => {
	await mongoose.connect(url, {
		dbName: "books",
	});
	await mongoose.connect(url, {
		dbName: "users",
	});
	await mongoose.connect(url, {
		dbName: "comments",
	});
	app.listen(port, () => {
		console.log(`Server started on port ${port}`);
	});
};

const PORT = process.env.PORT || 3334;
const URL_DB = process.env.URL_DB || "mongodb://root:example@mongo:27017/";
start(PORT, URL_DB);
