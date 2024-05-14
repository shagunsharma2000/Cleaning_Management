// import jwt from 'jsonwebtoken';
// import { Request, Response } from 'express';

// // eslint-disable-next-line consistent-return
// const auth = (req: Request, res: Response, next: any) => {
//   const bearerHeader = req.headers.authorization;

//   if (bearerHeader) {
//     const bearer = bearerHeader.split(' ');
//     const token = bearer[1];

//     try {
//       const decoded = jwt.verify(token, process.env.SECRET_KEY);

//       req.user = decoded;
//       next();
//     } catch (error) {
//       console.error('Error verifying token:', error.message);
//       console.error('Token:', token);

//       return res.status(401).json({ message: 'Invalid token' });
//     }
//   } else {
//     return res.status(401).json({ message: 'Token is required' });
//   }
// };

// export default auth;
