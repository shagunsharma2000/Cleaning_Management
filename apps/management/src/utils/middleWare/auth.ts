import jwt from 'jsonwebtoken';
import Role from '../enums/indexEnums';

const auth = (req, res, next) => {
    const bearerHeader = req.headers.authorization;

    if (!bearerHeader) {
        return res.status(401).json({ message: 'Token is required' });
    }

    const bearer = bearerHeader.split(' ');
    if (bearer.length !== 2 || bearer[0] !== 'Bearer') {
        return res.status(401).json({ message: 'Invalid token format' });
    }

    const token = bearer[1];

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        console.log('Decoded JWT payload:', decoded);

        // Check if the role is 'admin'
        if (decoded.Role === Role.Admin) {
            // If the role is 'admin', proceed with the next middleware
            req.user = decoded; // Attach decoded user to the request
            return next();
        } else {
            // If the role is not 'admin', deny access
            console.error('Access denied. Admin role required.');
            return res.status(403).json({ message: 'Access denied. Admin role required.' });
        }
    } catch (error) {
        console.error('Error verifying token:', error.message);
        console.error('Token:', token);
        return res.status(401).json({ message: 'Invalid token' });
    }
};

export default auth;
