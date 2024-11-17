import * as colaboradorService from '../services/colaboradorService.js';

/**
 * Controlador para criar um novo colaborador.
 */
export const criarColaborador = async (req, res) => {
  try {
    const novoColaborador = await colaboradorService.criarColaborador(req.body);
    res.status(201).json({
      message: 'Colaborador criado com sucesso',
      colaborador: novoColaborador,
    });
  } catch (error) {
    console.error('Erro ao criar colaborador:', error);
    res.status(400).json({
      error: 'Erro ao criar colaborador',
      detalhes: error.message,
    });
  }
};

/**
 * Controlador para listar todos os colaboradores.
 */
export const listarColaboradores = async (req, res) => {
  try {
    const colaboradores = await colaboradorService.listarColaboradores();
    res.status(200).json({
      message: 'Colaboradores listados com sucesso',
      colaboradores,
    });
  } catch (error) {
    console.error('Erro ao listar colaboradores:', error);
    res.status(500).json({
      error: 'Erro ao listar colaboradores',
      detalhes: error.message,
    });
  }
};

/**
 * Controlador para obter um colaborador por ID.
 */
export const obterColaboradorPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const colaborador = await colaboradorService.obterColaboradorPorId(parseInt(id));

    if (!colaborador) {
      return res.status(404).json({
        error: 'Colaborador não encontrado',
        detalhes: `Não foi possível localizar o colaborador com ID ${id}.`,
      });
    }

    res.status(200).json({
      message: 'Colaborador encontrado',
      colaborador,
    });
  } catch (error) {
    console.error('Erro ao obter colaborador por ID:', error);
    res.status(500).json({
      error: 'Erro ao obter colaborador',
      detalhes: error.message,
    });
  }
};

/**
 * Controlador para atualizar um colaborador.
 */
export const atualizarColaborador = async (req, res) => {
  try {
    const { id } = req.params;
    const colaboradorAtualizado = await colaboradorService.atualizarColaborador(parseInt(id), req.body);

    if (!colaboradorAtualizado) {
      return res.status(404).json({
        error: 'Colaborador não encontrado',
        detalhes: `Não foi possível atualizar o colaborador com ID ${id}.`,
      });
    }

    res.status(200).json({
      message: 'Colaborador atualizado com sucesso',
      colaborador: colaboradorAtualizado,
    });
  } catch (error) {
    console.error('Erro ao atualizar colaborador:', error);
    res.status(400).json({
      error: 'Erro ao atualizar colaborador',
      detalhes: error.message,
    });
  }
};

/**
 * Controlador para excluir um colaborador.
 */
export const excluirColaborador = async (req, res) => {
  try {
    const { id } = req.params;
    const colaboradorDeletado = await colaboradorService.deletarColaborador(parseInt(id));

    if (!colaboradorDeletado) {
      return res.status(404).json({
        error: 'Colaborador não encontrado',
        detalhes: `Não foi possível excluir o colaborador com ID ${id}.`,
      });
    }

    res.status(204).json({
      message: 'Colaborador excluído com sucesso',
    });
  } catch (error) {
    console.error('Erro ao excluir colaborador:', error);
    res.status(500).json({
      error: 'Erro ao excluir colaborador',
      detalhes: error.message,
    });
  }
};
