let clientes = [];
let proximoId = 1;

exports.listarClientes = (req, res) => {
  res.status(200).json(clientes);
};

exports.obterCliente = (req, res) => {
  const cliente = clientes.find(c => c.id === parseInt(req.params.id));
  if (!cliente) {
    return res.status(404).json({ message: 'Cliente não encontrado' });
  }
  res.status(200).json(cliente);
};

exports.criarCliente = (req, res) => {
  const { nome, email } = req.body;

  if (!nome || !email) {
    return res.status(400).json({ message: 'Nome e email são obrigatórios' });
  }

  const novoCliente = {
    id: proximoId++,
    nome,
    email
  };
  clientes.push(novoCliente);
  res.status(201).json(novoCliente);
};

exports.atualizarCliente = (req, res) => {
  const { id } = req.params;
  const { nome, email } = req.body;
  const index = clientes.findIndex(c => c.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ message: 'Cliente não encontrado' });
  }
  
  const clienteAtualizado = { ...clientes[index], nome, email };
  clientes[index] = clienteAtualizado;
  
  res.status(200).json(clienteAtualizado);
};

exports.deletarCliente = (req, res) => {
  const { id } = req.params;
  const index = clientes.findIndex(c => c.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ message: 'Cliente não encontrado' });
  }

  clientes.splice(index, 1);
  res.status(204).send();
};

exports.resetClientes = () => {
    clientes = [];
    proximoId = 1;
}