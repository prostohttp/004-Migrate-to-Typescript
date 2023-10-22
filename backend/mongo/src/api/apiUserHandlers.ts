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
			res.status(404).json({ error: "Такой пользователь уже существует" });
		}
	} catch (error: Error | any) {
		res.status(500).json(error.message);
	}
};

export const loginHandler = async (req: Request, res: Response) => {
	res.json(req.user);
};

export const profileHandler = async (req: Request, res: Response) => {
	const user = req.user;
	if (!user) {
		res.status(404).json({ error: "Пользователь не авторизован" });
	} else {
		res.json(req.user);
	}
};

export const getLoginHandler = (req: Request, res: Response) => {
	res.send("страница с формой входа / регистрации");
};
