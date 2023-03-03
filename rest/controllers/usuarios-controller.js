const mysql = require('../mysql');
const jwt = require('jsonwebtoken');


exports.cadastrarUsuario = async (req,res,next) => {

    try {
        const resultSelect = await mysql.execute("SELECT * FROM usuarios WHERE email = ?",
        [req.body.email]) 
        
        if(resultSelect.length > 0){
            return res.status(409).json({mensagem:"Usuário já cadastrado"});
        }

        const result = await mysql.execute("INSERT INTO usuarios (email,password) VALUES (?,?)",
        [req.body.email,req.body.password])

        res.status(201).json({
            mensagem: 'Usuario cadastrado com sucesso'
        });


    } catch (error) {
        return res.status(500).json({error:error});
    }

    // mysql.getConnection((error,conn) => {
    //     if(error) return res.status(500).send({error:error});

    //     conn.query('SELECT * FROM usuarios WHERE email = ?',
    //     [req.body.email],
    //     (error,result,fields) =>{
    //         if(error) {return res.status(500).send({error:error});}
            
    //         if(result.length > 0){
    //             return res.status(409).send({mensagem:"Usuário já cadastrado"});
    //         }

    //         conn.query(
    //             'INSERT INTO usuarios (email,password) VALUES (?,?)',
    //             [req.body.email,req.body.password],
    //             (error,result,field) => {
    //                  conn.release();
    //                  if(error){return res.status(500).send({error:error});}
    //                  res.status(201).send({
    //                     mensagem: 'Usuario cadastrado com sucesso'
    //                 });
    //             })
    //     })
    // });
}

exports.login = async (req,res,next) => {

    try {
        const result = await mysql.execute("SELECT * FROM usuarios WHERE email = ?",[req.body.email])

        if(result.length < 1){
            return res.status(401).send({mensagem:"Falha na autenticação"});
        }
        
        if(req.body.password == result[0].password){

            const token = jwt.sign({
                id_usuario: result[0].id_usuario,
                email: result[0].email}, process.env.JWT_KEY,{expiresIn: "1h"})

            return res.status(200).send({
                mensagem:"Autenticado com sucesso",
                token: token});
        }else{
            return res.status(401).send({mensagem:"Falha na autenticação"});
        }

    } catch (error) {
        return res.status(500).send({error:error});
    }
}