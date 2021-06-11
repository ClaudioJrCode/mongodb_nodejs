const express = require('express');



const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//↓↓ 1 - repassando o authController para o app => continua em authController
require('./controllers/authController')(app);
require('./controllers/projectController')(app);

app.post ('/', (req, res) =>{
    return res.send('ok')
})
app.listen(3000, () => {
    console.log('conectado na porta 3000')
})

//npm jsonwebtoken/express/mongoose