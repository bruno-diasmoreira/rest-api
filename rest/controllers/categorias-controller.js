const mysql = require('../mysql');

exports.getCategorias = async (req,res,next) => {

    try {
        const result  = await mysql.execute("SELECT * FROM categorias;")

        const categorias = result.map(categoria =>{
            return {
                id_categoria: categoria.id_categoria,
                nome: categoria.nome
            }
        })

        return res.status(200).send(categorias)

    } catch (error) {return res.status(500).send({error:error})}
}