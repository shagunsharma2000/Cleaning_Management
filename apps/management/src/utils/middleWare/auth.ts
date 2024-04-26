import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    const bearerHeader = req.headers.authorization;

    if (bearerHeader) {
        const bearer = bearerHeader.split(' ');
        const token = bearer[1];

        try {
            const decoded = jwt.verify(token, process.env.TOKEN);

           
            req.user = decoded;
            next();
        } catch (error) {
           
            console.error('Error verifying token:', error.message);
            console.error('Token:', token);
          
            return res.status(401).json({ message: 'Invalid token' });
        }
    } else {
  
        return res.status(401).json({ message: 'Token is required' });
    }
};

export default auth;
