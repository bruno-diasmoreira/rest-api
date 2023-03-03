const mysql = require('../mysql');

exports.getPedidos = async (req,res,next) => {
    try {
        const query = `SELECT 
        pedidos.id_pedido, pedidos.id_produto, pedidos.quantidade, produtos.nome, 
        produtos.preco FROM pedidos 
        INNER JOIN produtos ON pedidos.id_produto = produtos.id_produto;`;

        const result = await mysql.execute(query)

        const pedidos =  result.map(pedido =>{
            return {
                id_pedido: pedido.id_pedido,
                quantidade: pedido.quantidade,
                produtos: {
                    id_produto: pedido.id_produto,
                    nome: pedido.nome,
                    preco: pedido.preco
                }
            }
        })

        return res.status(200).json(pedidos)

    } catch (error) {
        return res.status(500).json({error:error});
    }
}

exports.getPedidosById = async (req,res,next) => {

    try {
        const query = "SELECT * FROM pedidos WHERE id_pedido = ?;"
        const result = await mysql.execute(query,[req.params.id_pedido])

        if(result.length == 0)
            return res.status(404).json({mensagem: "Pedido não encontrado com este ID"});

        res.status(200).json(result[0]);

    } catch (error) {
        return res.status(500).json({error:error});
    }
}

exports.postPedidos = async (req,res,next) => {

    try {
        const queryProdutos = "SELECT * FROM produtos WHERE id_produto = ?";
        const resultProdutos = await mysql.execute(queryProdutos,[req.body.id_produto]);

        if (resultProdutos.length == 0){
            return res.status(404).json({mensagem: 'Produto não encontrado'})
        }

        const query = "INSERT INTO pedidos (id_produto, quantidade) VALUES (?,?)";
        const result = await mysql.execute(query,[req.body.id_produto, req.body.quantidade]);

        // const response = {
        //     pedido_criado: {
        //         id_pedido: result.id_pedido,
        //         id_produto: req.body.id_produto,
        //         quantidade: req.body.quantidade,
        //     }
        // }

        const response = {
            id_pedido: result.id_pedido,
            id_produto: req.body.id_produto,
            quantidade: req.body.quantidade,
        }

        return res.status(201).json(response);

    } catch (error) {
        return res.status(500).json({ error: error })
    }

}



exports.updatePedido = async (req,res,next) =>{
    try {
        
        const query = `UPDATE pedidos SET quantidade = ?
        WHERE id_pedido = ?`;

        const result = await mysql.execute(query,[req.body.quantidade,req.params.id_pedido])

        res.status(202).json({
            mensagem: 'Pedido atualizado com sucesso'
        });


    } catch (error) {
        return res.status(500).json({error:error});
    }
}


exports.deletePedidos = async (req,res,next) => {
    try {
        const query = "DELETE FROM pedidos WHERE id_pedido = ?";
        const result = await mysql.execute(query,[req.params.id_pedido]);

        res.status(202).json({
            mensagem: 'Pedido removido com sucesso !'
            // teste: result.affectedRows
        });

    } catch (error) {
        return res.status(500).json({error:error});
    }
}