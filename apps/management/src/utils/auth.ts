import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    const bearerHeader = req.headers.authorization;

    if (bearerHeader) {
        const bearer = bearerHeader.split(' ');
        const token = bearer[1];

        try {
            // Verify token using the correct environment variable
            const decoded = jwt.verify(token, process.env.TOKEN);

            // If verification succeeds, attach user data to the request and proceed to the next middleware
            if (decoded) {
                req.user = decoded;
                next();
            } else {
                return res.status(401).json({ message: 'Invalid token' });
            }
        } catch (error) {
            // Log specific error message and return appropriate response
            console.error('Error verifying token:', error.message);
            return res.status(401).json({ message: 'Invalid token. ' + error.message });
        }
    } else {
        // Return a response indicating that a token is required
        return res.status(401).json({ message: 'Token is required' });
    }
};

export default auth;


