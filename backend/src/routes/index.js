import express from 'express';
import clienteRoutes from './clienteRoutes.js';
import colaboradorRoutes from './colaboradorRoutes.js';
import atividadeRoutes from './atividadeRoutes.js';

const router = express.Router();

router.use('/clientes', clienteRoutes);             // Unificação para a exportação das rotas de clientes
router.use('/colaboradores', colaboradorRoutes);    // Unificação para a exportação das rotas de colaboradores
router.use('/atividades', atividadeRoutes);         // Unificação para a exportação das rotas de atividades

export default router;
