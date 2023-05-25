import { db } from "../config/db.js";

export const getVendas = (_, res) => {
  const q = "SELECT * FROM vendas";

  db.query(q, (err, data) => {
    if (err) return res.json(err);
    if (data.length != 0) {
      return res.status(200).json(data);
    } else {
      return res.status(404).send({ message: "Vendas não encontradas" });
    }
  });
};


export const getVendaById = (req, res) => {
    const q = "SELECT * FROM vendas WHERE `id` = ?";
    
    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.json(err);
    if (data.length == 0) {
        return res.status(404).send({ message: "Venda não encontrada!" });
    } else {
        return res.status(200).json(data);
    }
});
};

export const addVenda = (req, res) => {
    const q =
    "INSERT INTO vendas (`nome_empresa`, `nome_cliente`, `cnpj`, `telefone`, `valor_total`, `valor_frete`, `nome_produto`, `quantidade`, `compensada`, `usuarios_id`) VALUES(?)";

    "CREATE TABLE IF NOT EXISTS vendas (id INT AUTO_INCREMENT PRIMARY KEY, nome_empresa VARCHAR(45), nome_cliente VARCHAR(45), cnpj VARCHAR(45), telefone VARCHAR(45), valor_total FLOAT, valor_frete FLOAT, nome_produto VARCHAR(45), quantidade INT, compensada INT, usuarios_id INT, FOREIGN KEY (usuarios_id) REFERENCES usuarios(id))"
    
    const values = [
        req.body.nome_empresa,
        req.body.nome_cliente,
        req.body.cnpj,
        req.body.telefone,
        req.body.valor_total,
        req.body.valor_frete,
        req.body.nome_produto,
        req.body.quantidade,
        req.body.compensada,
        req.body.usuarios_id,
    ];
    
  db.query(q, [values], (err) => {
      if (err) return res.json(err);
      return res.status(200).send([ { message: "Venda cadastrada com sucesso!"}]);
    });
};

export const updateVenda = (req, res) => {
    const q =
    "UPDATE vendas SET `nome_empresa` = ?, `nome_cliente` = ?, `cnpj` = ?, `telefone` = ?, `valor_total` = ?, `valor_frete` = ?, `nome_produto` = ?, `quantidade` = ?, `compensada` = ?, `usuarios_id` = ? WHERE `id` = ?";
    
    const values = [
        req.body.nome_empresa,
        req.body.nome_cliente,
        req.body.cnpj,
        req.body.telefone,
        req.body.valor_total,
        req.body.valor_frete,
        req.body.nome_produto,
        req.body.quantidade,
        req.body.compensada,
        req.body.usuarios_id,
    ];
    
    db.query(q, [...values, req.params.id], (err) => {
        if (err) return res.json(err);
        return res.status(200).json("Venda atualizada com sucesso.");
    });
};

export const deleteVenda = (req, res) => {
  const q = "DELETE FROM vendas WHERE `id` = ?";

  db.query(q, [req.params.id], (err, result) => {
    if (err) return res.json(err);
    if (result.affectedRows == 0) {
      return res.status(404).send({ message: "Venda não encontrada!" });
    }
    return res.status(200).json("Venda deletada com sucesso.");
  });
};