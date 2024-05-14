import jwt from 'jsonwebtoken';
import Role from '../enums/indexEnums';

// const auth = (req, res, next) => {
//   const bearerHeader = req.headers.authorization;

//   if (bearerHeader) {
//     const bearer = bearerHeader.split(' ');
//     const token = bearer[1];

//     try {
//       const decoded = jwt.verify(token, process.env.SECRET_KEY);

//       // Attach the decoded user information to the request object
//       req.user = decoded;
//       next();
//     } catch (error) {
//       // If token verification fails
//       if (error instanceof jwt.TokenExpiredError) {
//         return res.status(401).json({ message: 'Token expired' });
//       } else if (error instanceof jwt.JsonWebTokenError) {
//         return res.status(401).json({ message: 'Invalid token' });
//       } else {
//         // Handle other types of errors
//         console.error('Error verifying token:', error.message);
//         console.error('Token:', token);
//         return res.status(500).json({ message: 'Internal server error' });
//       }
//     }
//   } else {
//     // If no token provided in the request header
//     return res.status(401).json({ message: 'Token is required' });
//   }
// };

//export default auth;

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

    // Check the role is 'Admin' or 'Customer'
    if (decoded.role === Role.Admin) {
      // If the role is 'admin', proceed with the next middleware
      req.user = decoded; // Attach decoded user to the request
      return next();
    } else if (decoded.role === Role.user) {
      // If the role =customer', than only  allow  the access to delete and update data
      if (req.method === 'DELETE' || req.method === 'PUT') {
        req.user = decoded;
        return next();
      } else {
        // Deny access for other methoda
        console.error('Access denied. Customer role can only delete or update services.');
        return res.status(403).json({ message: 'Access denied. Customer role can only delete or update services.' });
      }
    } else {
      // If the role is neither 'admin' nor 'customer', deny access
      console.error('Access denied. Admin or customer role required.');
      return res.status(403).json({ message: 'Access denied. Admin or customer role required.' });
    }
  } catch (error) {
    console.error('Error verifying token:', error.message);
    console.error('Token:', token);
    return res.status(401).json({ message: 'Invalid token' });
  }
};
