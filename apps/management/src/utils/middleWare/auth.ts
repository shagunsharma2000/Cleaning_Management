// import jwt from 'jsonwebtoken';


// const auth = (req, res, next) => {
//     const bearerHeader = req.headers.authorization;

//     if (bearerHeader) {
//         const bearer = bearerHeader.split(' ');
//         const token = bearer[1];

//         try {
//             const decoded = jwt.verify(token, process.env.SECRET_KEY);

           
//             req.user = decoded;
//             next();
//         } catch (error) {
           
//             console.error('Error verifying token:', error.message);
//             console.error('Token:', token);
          
//             return res.status(401).json({ message: 'Invalid token' });
//         }
//     } else {
  
//         return res.status(401).json({ message: 'Token is required' });
//     }
// };


//   export  default auth;








//2//

import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    const bearerHeader = req.headers.authorization;

    if (bearerHeader) {
        const bearer = bearerHeader.split(' ');
        const token = bearer[1];

        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);

            req.user = decoded;

            // Check if the role is 'admin'
            if (decoded.role === 'admin') {
                // If the role is 'admin', proceed with the next middleware
                next();
            } else {
                // If the role is not 'admin', deny access
                return res.status(403).json({ message: 'Access denied. Admin role required.' });
            }
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
