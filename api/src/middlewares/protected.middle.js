import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
	try {
		// LogIn Users Access Token
		const token = req.cookies?.accessToken;

		const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

		const user = await User.findById(decoded);
        console.log('User from DB: ', user);

		req.user = user;
		next();
	} catch (error) {
		console.log("Error in protectRoute middleware: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export default protectRoute;
