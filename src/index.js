require('dotenv').config();
const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const port = process.env.PORT || 3000;
const prisma = new PrismaClient();

app.use(express.json());

app.get('/api/alunos', async (req, res) => {
    const { name, cpf, email } = req.query;
    const filter = {};

    if (name) filter.name = { contains: name, mode: 'insensitive' };
    if (cpf) filter.cpf = cpf;
    if (email) filter.email = { contains: email, mode: 'insensitive' };

    try {
        const alunos = await prisma.aluno.findMany({ where: filter });
        res.json(alunos);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching students' });
    }
});

app.post('/api/alunos', async (req, res) => {
    const { name, cpf, email } = req.body;

    try {
        const newAluno = await prisma.aluno.create({
            data: { name, cpf, email }
        });
        res.status(201).json(newAluno);
    } catch (error) {
        res.status(400).json({ error: 'An error occurred while creating the student' });
    }
});

app.put('/api/alunos/:id', async (req, res) => {
    const { id } = req.params;
    const { name, cpf, email } = req.body;

    try {
        const updatedAluno = await prisma.aluno.update({
            where: { id },
            data: { name, cpf, email }
        });
        res.json(updatedAluno);
    } catch (error) {
        res.status(400).json({ error: 'An error occurred while updating the student' });
    }
});

app.delete('/api/alunos/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.aluno.delete({
            where: { id }
        });
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: 'An error occurred while deleting the student' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
