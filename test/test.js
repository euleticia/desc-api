const { PrismaClient } = require('@prisma/client');
const  supertest  = require('supertest');
const { expect } = require('chai');
const app = require('../src/index')

const prisma = new PrismaClient();

describe('API de Alunos', () => {
  before(async () => {
    await prisma.$connect();
  });

  after(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    await prisma.aluno.deleteMany();
  });

  it('deve listar todos os alunos', (done) => {
    supertest(app)
      .get('/api/alunos')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('deve criar um novo aluno', (done) => {
    const novoAluno = { name: 'João Silva', cpf: '12345678901', email: 'joao@example.com' };
    supertest(app)
      .post('/api/alunos')
      .send(novoAluno)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.include(novoAluno);
        done();
      });
  });

  it('deve atualizar um aluno existente', async () => {
    const aluno = await prisma.aluno.create({
      data: { name: 'Maria Silva', cpf: '12345678902', email: 'maria@example.com' },
    });

    const alunoAtualizado = { name: 'Maria Souza', cpf: '12345678902', email: 'maria@example.com' };

    return supertest(app)
      .put(`/api/alunos/${aluno.id}`)
      .send(alunoAtualizado)
      .expect(200)
      .then((res) => {
        expect(res.body.name).to.equal('Maria Souza');
      });
  });

  it('deve deletar um aluno existente', async () => {
    const aluno = await prisma.aluno.create({
      data: { name: 'Carlos Silva', cpf: '12345678903', email: 'carlos@example.com' },
    });

    return supertest(app)
      .delete(`/api/alunos/${aluno.id}`)
      .expect(204);
  });
});
