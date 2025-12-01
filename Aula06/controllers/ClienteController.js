const Cliente = require('../models/Cliente.js');
const Sequelize = require('sequelize');

module.exports = class ClienteController {
    // Listar todos os clientes
    static async listAll(req, res) {
        try {
            const clientes = await Cliente.findAll();
            res.status(200).json(clientes);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao listar clientes' });
        }
    }

    static async listByParam(req, res) {
            try {
                const { name, email } = req.body;
                const clientes = await Cliente.findAll({
                    where: {
                        name: { [Sequelize.Op.like]: `%${name}%` },
                        email: { [Sequelize.Op.like]: `%${email}%` }
                    }
                });
                res.status(200).json(clientes);
            } catch (error) {
                res.status(500).json({ error: 'Erro ao listar clientes' });
            }
    }

    static async getById(req, res) {
        const { id } = req.params;
        try {
            const cliente = await Cliente.findByPk(id);
            if (cliente) {
                res.status(200).json(cliente);
            } else {
                res.status(404).json({ error: 'Cliente não encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar cliente' });
        }
    }

     static async delete(req, res) {
        const { id } = req.params;
        try {
            const cliente = await Cliente.findByPk(id);
            if (cliente) {
                await cliente.destroy();
                res.status(204).json({ message: 'Cliente apagado com sucesso!' });
            } else {
                res.status(404).json({ error: 'Cliente não encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar cliente' });
        }
    }

    static async update(req, res) {
        const { id } = req.params;
        try {
            const allCliente = await Cliente.findByPk(id);
            if (allCliente) {
                const { name, email, password, endereco } = req.body;
                allCliente.name = name;
                allCliente.email = email;
                allCliente.password = password;
                allCliente.endereco = endereco;
                await allCliente.save();
                res.status(200).json(allCliente);
            } else {
                res.status(404).json({ error: 'Cliente não encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar cliente' });
        }
    }

    static async create(req, res) {
        const { name, email, password, endereco } = req.body;
        try {
            const newCliente = await Cliente.create({ name, email, password, endereco });
            res.status(201).json(newCliente);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar cliente' });
        }
    }


}   
