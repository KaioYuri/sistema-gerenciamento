import express from 'express';
import {
  criarCliente,
  listarClientes,
  obterClientePorId,
  atualizarCliente,
  excluirCliente
} from '../controllers/clienteController.js';

const router = express.Router();

router.post('/', criarCliente);           // Criar um novo cliente
router.get('/', listarClientes);           // Obter todos os clientes
router.get('/:id', obterClientePorId);    // Obter um cliente pelo ID
router.put('/:id', atualizarCliente);     // Atualizar um cliente pelo ID
router.delete('/:id', excluirCliente);    // Excluir um cliente pelo ID

export default router;
