const jwt = require('jsonwebtoken')
const authConfig = require('../config/hashtoken')


module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).send({error: 'No token provided'})
    }

//tokens sao enviado assim 'Bearer 716171gh1981ga01ujha'
//dividimos o token da palavra Bearer criando um array em parts
    const parts = authHeader.split(' ');

//se o array nao tiver duas posicoes ele retorna um erro
    if(!parts.length === 2){
        return res.status(401).send({error: 'Token error'})

    }
    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)){
        return res.status(401).send({error: 'Token Malformed'});
    }

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if(err) return res.status(401).send({error: 'Invalid token'});
        req.userId = decoded.id;
        return next();
    });
};
    

