const jwt = require('jsonwebtoken');

const requireAuth = function (req,res,next) {
    const token = req.cookies.jwt;
    // check json web token exists & verified
    if(token){
        jwt.verify(token, 'net ninja secret', (err, decodedToken)=>{
            if(err){
                console.log(err.message);
                res.redirect('/login');
            }else{
                console.log(decodedToken);
                next();
            }
        });
    }else {
        res.redirect('/login');
    }
};

module.exports = {requireAuth};