import express from 'express';
import {
  criarColaborador,
  listarColaboradores,
  obterColaboradorPorId,
  atualizarColaborador,
  excluirColaborador
} from '../controllers/colaboradorController.js';

const router = express.Router();

router.post('/', criarColaborador);              // Criar um novo colaborador
router.get('/', listarColaboradores);             // Obter todos os colaboradores
router.get('/:id', obterColaboradorPorId)         // Obter um colaborador pelo ID
router.put('/:id', atualizarColaborador);        // Atualizar um colaborador pelo ID
router.delete('/:id', excluirColaborador);       // Excluir um colaborador pelo ID

export default router;
