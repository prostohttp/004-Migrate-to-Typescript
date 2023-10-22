import express from "express";
import passport from "../api/passport";
import {
	addHandler,
	profileHandler,
	getLoginHandler,
	loginHandler,
} from "../api/apiUserHandlers";

const apiUserRouter = express.Router();

apiUserRouter.post("/signup", addHandler);
apiUserRouter.post(
	"/login",
	passport.authenticate("local", {
		failureMessage: "Неправильный логин или пароль",
	}),
	loginHandler
);
apiUserRouter.get("/login", getLoginHandler);
apiUserRouter.get(
	"/me",
	(req, res, next) => {
		if (!req.isAuthenticated()) {
			return res.json({ error: "Пользователь не авторизован" });
		}
		next();
	},
	profileHandler
);

export default apiUserRouter;
