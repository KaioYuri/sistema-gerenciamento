import * as clienteService from '../services/clienteService.js';

/**
 * Controlador para criar um novo cliente.
 */
export const criarCliente = async (req, res) => {
  try {
    const novoCliente = await clienteService.criarCliente(req.body);
    res.status(201).json({
      message: 'Cliente criado com sucesso',
      cliente: novoCliente,
    });
  } catch (error) {
    console.error('Erro ao criar cliente:', error);
    res.status(400).json({
      error: 'Erro ao criar cliente',
      detalhes: error.message,
    });
  }
};

/**
 * Controlador para listar todos os clientes.
 */
export const listarClientes = async (req, res) => {
  try {
    const clientes = await clienteService.listarClientes();
    res.status(200).json({
      message: 'Clientes listados com sucesso',
      clientes,
    });
  } catch (error) {
    console.error('Erro ao listar clientes:', error);
    res.status(500).json({
      error: 'Erro ao listar clientes',
      detalhes: error.message,
    });
  }
};

/**
 * Controlador para obter um cliente por ID.
 */
export const obterClientePorId = async (req, res) => {
  try {
    const { id } = req.params;
    const cliente = await clienteService.obterClientePorId(parseInt(id));

    if (!cliente) {
      return res.status(404).json({
        error: 'Cliente não encontrado',
        detalhes: `Não foi possível localizar o cliente com ID ${id}.`,
      });
    }

    res.status(200).json({
      message: 'Cliente encontrado',
      cliente,
    });
  } catch (error) {
    console.error('Erro ao obter cliente por ID:', error);
    res.status(500).json({
      error: 'Erro ao obter cliente',
      detalhes: error.message,
    });
  }
};

/**
 * Controlador para atualizar um cliente.
 */
export const atualizarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const clienteAtualizado = await clienteService.atualizarCliente(parseInt(id), req.body);

    if (!clienteAtualizado) {
      return res.status(404).json({
        error: 'Cliente não encontrado',
        detalhes: `Não foi possível atualizar o cliente com ID ${id}.`,
      });
    }

    res.status(200).json({
      message: 'Cliente atualizado com sucesso',
      cliente: clienteAtualizado,
    });
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error);
    res.status(400).json({
      error: 'Erro ao atualizar cliente',
      detalhes: error.message,
    });
  }
};

/**
 * Controlador para excluir um cliente.
 */
export const excluirCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const clienteExcluido = await clienteService.deletarCliente(parseInt(id));

    if (!clienteExcluido) {
      return res.status(404).json({
        error: 'Cliente não encontrado',
        detalhes: `Não foi possível excluir o cliente com ID ${id}.`,
      });
    }

    res.status(204).json({
      message: 'Cliente excluído com sucesso',
    });
  } catch (error) {
    console.error('Erro ao excluir cliente:', error);
    res.status(500).json({
      error: 'Erro ao excluir cliente',
      detalhes: error.message,
    });
  }
};
