// import Role from 'apps/management/src/utils/enums/indexEnums';
// eslint-disable-next-line @nx/enforce-module-boundaries
import Role from '../../../../management/src/utils/enums/indexEnums'
import jwt from 'jsonwebtoken';

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
      req.user = decoded; 
      return next();
    } else if (decoded.role === Role.user) {
      
      if (req.method === 'DELETE' || req.method === 'PUT') {
        req.user = decoded;
        return next();
      } else {
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

export default auth;
