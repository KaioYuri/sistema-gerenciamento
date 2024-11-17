import express from 'express';
import {
  criarAtividade,
  obterAtividades,
  obterAtividadePorId,
  atualizarAtividade,
  excluirAtividade,
  adicionarFoto
} from '../controllers/atividadeController.js';

const router = express.Router();

router.post('/', criarAtividade);                // Criar uma nova atividade
router.get('/', obterAtividades);                // Obter todas as atividades
router.get("/:id", obterAtividadePorId);         // Obter atividades pelo ID
router.put('/:id', atualizarAtividade);          // Atualizar uma atividade pelo ID
router.delete('/:id', excluirAtividade);         // Excluir uma atividade pelo ID
router.post('/:id/foto', adicionarFoto);         // Adicionar uma foto na atividade

export default router;
