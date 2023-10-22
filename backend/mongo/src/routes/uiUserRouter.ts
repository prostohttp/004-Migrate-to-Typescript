import express from "express";
import passport from "../api/passport";
import {
	addHandler,
	loginHandler,
	getLoginHandler,
	profileHandler,
} from "../api/uiUserHandlers";

const uiUserRouter = express.Router();

uiUserRouter.post("/signup", addHandler);
uiUserRouter.post(
	"/login",
	passport.authenticate("local", { failureRedirect: "/login" }),
	loginHandler
);
uiUserRouter.get("/login", getLoginHandler);
uiUserRouter.get(
	"/me",
	(req, res, next) => {
		if (!req.isAuthenticated()) {
			return res.json({ isAuthorized: false });
		}
		next();
	},
	profileHandler
);

export default uiUserRouter;
