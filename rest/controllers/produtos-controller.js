const mysql = require("../mysql");


exports.getProdutos = async (req,res,next) => {

    try {
        const result  = await mysql.execute("SELECT * FROM produtos;")

        const produtos = result.map(produto =>{
            return {
                id_produto: produto.id_produto,
                nome: produto.nome,
                preco: produto.preco,
                id_categoria: produto.id_categoria
            }
        })

        return res.status(200).send(produtos)

    } catch (error) {return res.status(500).send({error:error})}
}

exports.getProdutosById = async (req,res,next) => {

    try {
        const query  ="SELECT * FROM produtos WHERE id_produto = ?;";
        const result  = await mysql.execute(query,req.params.id_produto)

        if(result.length == 0)
                return res.status(404).send({mensagem: "Produto não encontrado com este ID"});

        res.status(200).send(result[0]);

    } catch (error) {
        return res.status(500).send({error:error});
    }
}

exports.postProdutos = async (req,res,next) => {

    try {
        const query  ="INSERT INTO produtos (nome,preco,id_categoria) VALUES (?,?,?)"
        const result = await mysql.execute(query,
        [req.body.nome,req.body.preco,req.body.id_categoria])

        res.status(201).send({
            mensagem: 'Produto inserido com sucesso',
            id_produto : result.insertId
        });
        
    } catch (error) {
        return res.status(500).send({error:error});
    }
}


//incluir a troca de categoria depois
exports.updateProduto = async (req,res,next) =>{
    try {
        
        const query = `UPDATE produtos SET nome = ?, preco = ?
        WHERE id_produto = ?`;

        const result = await mysql.execute(query,[req.body.nome,req.body.preco,req.params.id_produto])

        res.status(202).send({
            mensagem: 'Produto atualizado com sucesso'
        });


    } catch (error) {
        return res.status(500).send({error:error});
    }
}

exports.deleteProdutos = async (req,res,next) => {
    try {
        const query = "DELETE FROM produtos WHERE id_produto = ?";
        const result = await mysql.execute(query,[req.params.id_produto])

        res.status(202).send({
            mensagem: 'Produto removido com sucesso !'
        });
        
    } catch (error) {
        if(error){return res.status(500).send({error:error});}
    }
}