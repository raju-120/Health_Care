import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
	try {
		const token = req.cookies?.accessToken;
        console.log('Token from cookies: ', req);
/*
		if (!token) {
			return res.status(401).json({ error: "Unauthorized - No Token Provided" });
		}
        console.log('Token not from cookies: ', !token);
 */
		const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        /* console.log('Decoded token: ', decoded);

		if (!decoded || !decoded.userId) {
			return res.status(401).json({ error: "Unauthorized - Invalid Token" });
		} */

		const user = await User.findById(decoded);
        console.log('User from DB: ', user);

		/* if (!user) {
			return res.status(404).json({ error: "User not found" });
		}
        console.log('!user: ', user) */

		req.user = user;
		next();
	} catch (error) {
		console.log("Error in protectRoute middleware: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export default protectRoute;
