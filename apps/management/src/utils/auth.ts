import jwt from 'jsonwebtoken';

const auth =  (req, res, next) => {
    const bearerHeader =  req?.headers?.['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer =  bearerHeader?.split(' ');
        const token = bearer?.[1];
        req.token = token; 
        const Decoded = jwt.verify(token, process.env.TOKEN_KEY)
        // if (verified) {
            if (Decoded) {
            req.user = Decoded;
            next()
        } else {
            // Access Denied 
             res.status(401).json({ message: 'invaild token' });

        }
    } else {
        //Access the Token
        res.status(200).json({ message: 'Need Toekn After that Token verified successfully' });
       
    }
}

export default auth ;