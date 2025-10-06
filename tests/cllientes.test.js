const request = require('supertest');
const app = require('../app');
const { resetClientes } = require('../controllers/clienteController');

beforeEach(() => {
    resetClientes();
});

describe('API de Clientes', () => {

  it('deve criar um novo cliente', async () => {
    const res = await request(app)
      .post('/clientes')
      .send({
        nome: 'João Silva',
        email: 'joao.silva@example.com',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.nome).toBe('João Silva');
  });
  
  it('não deve criar um cliente sem nome', async () => {
    const res = await request(app)
      .post('/clientes')
      .send({
        email: 'semnome@example.com',
      });
    expect(res.statusCode).toEqual(400);
  });

  it('deve listar todos os clientes', async () => {
    await request(app).post('/clientes').send({ nome: 'Cliente Teste', email: 'teste@example.com' });

    const res = await request(app).get('/clientes');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty('id');
  });

  it('deve obter um cliente específico', async () => {
    const novoCliente = await request(app)
      .post('/clientes')
      .send({ nome: 'Maria Souza', email: 'maria.souza@example.com' });
    
    const idCliente = novoCliente.body.id;

    const res = await request(app).get(`/clientes/${idCliente}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.id).toBe(idCliente);
    expect(res.body.nome).toBe('Maria Souza');
  });
  
  it('deve retornar 404 para um cliente inexistente', async () => {
    const res = await request(app).get('/clientes/999');
    expect(res.statusCode).toEqual(404);
  });
  
  // Teste para a rota PUT /clientes/:id
  it('deve atualizar um cliente existente', async () => {
    const novoCliente = await request(app)
      .post('/clientes')
      .send({ nome: 'Carlos Pereira', email: 'carlos@example.com' });
      
    const idCliente = novoCliente.body.id;
    
    const res = await request(app)
      .put(`/clientes/${idCliente}`)
      .send({ nome: 'Carlos Pereira Atualizado', email: 'carlos.att@example.com' });
      
    expect(res.statusCode).toEqual(200);
    expect(res.body.nome).toBe('Carlos Pereira Atualizado');
  });

  it('deve deletar um cliente', async () => {
     const novoCliente = await request(app)
      .post('/clientes')
      .send({ nome: 'Cliente a Deletar', email: 'deletar@example.com' });
      
    const idCliente = novoCliente.body.id;

    const res = await request(app).delete(`/clientes/${idCliente}`);
    expect(res.statusCode).toEqual(204);
    
    const resBusca = await request(app).get(`/clientes/${idCliente}`);
    expect(resBusca.statusCode).toEqual(404);
  });
});