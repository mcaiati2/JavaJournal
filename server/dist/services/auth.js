import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js';
const { verify } = jwt;
dotenv.config();
export const authenticate = async ({ req, res }) => {
    const shop_token = req.cookies?.shop_token;
    if (shop_token) {
        try {
            if (!process.env.JWT_SECRET) {
                console.log('MUST ADD JWT_SECRET TO .env!');
                return {
                    req: req,
                    res: res
                };
            }
            const userData = verify(shop_token, process.env.JWT_SECRET);
            if (!userData || typeof userData === 'string') {
                return {
                    req: req,
                    res: res
                };
            }
            const user = await User.findById(userData.user_id);
            req.user = user;
        }
        catch (error) {
            console.log('JWT VERIFICATION ERROR', error);
        }
    }
    return {
        req: req,
        res: res
    };
};
