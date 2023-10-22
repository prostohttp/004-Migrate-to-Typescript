import { v4 as uuidv4 } from "uuid";
import { Response, Request } from "express";
import { User } from "../model/User";

export const addHandler = async (req: Request, res: Response) => {
	const { userName, userLogin, userPassword } = req.body;
	const user = new User({
		userName,
		userLogin,
		userPassword,
	});
	try {
		const userExists = await User.findOne({ userLogin }).exec();
		if (!userExists) {
			await user.save();
			res.status(201).json(user);
		} else {
			res.status(404).send({ error: "Такой пользователь уже существует" });
		}
	} catch (error: Error | any) {
		res.status(500).json(error.message);
	}
};

export const loginHandler = async (req: Request, res: Response) => {
	if ("userId" in req.session) {
		req.session.userId = uuidv4();
	}
	let user;
	let userId;
	if (req.user && "userName" in req.user && "userLogin" in req.user) {
		user = {
			userName: req.user.userName,
			userLogin: req.user.userLogin,
		};
	}
	if ("userId" in req.session) {
		userId = req.session.userId;
	}
	res.json({ user, userId });
};

export const profileHandler = async (req: Request, res: Response) => {
	res.json({ isAuthorized: true });
};

export const getLoginHandler = (req: Request, res: Response) => {};
