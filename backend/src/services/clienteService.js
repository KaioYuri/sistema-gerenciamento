import prisma from '../database.js';

/**
 * Cria um novo cliente com as atividades associadas.
 * 
 * @param {Object} dadosCliente - Os dados do cliente a ser criado.
 * @param {string} dadosCliente.nome - Nome do cliente.
 * @param {string} dadosCliente.empresa - Empresa do cliente.
 * @param {string} dadosCliente.contatoPrincipal - Contato principal do cliente.
 * @param {string} dadosCliente.email - Email do cliente.
 * @param {string} dadosCliente.telefone - Telefone do cliente.
 * @param {Array} [dadosCliente.atividades] - Lista de atividades associadas ao cliente.
 * @throws {Error} - Lança erro se algum colaborador associado não for encontrado.
 * @returns {Promise<Object>} - Dados do cliente criado.
 */
export const criarCliente = async (dadosCliente) => {
  // Validação de colaboradores associados às atividades
  if (dadosCliente.atividades) {
    for (const atividade of dadosCliente.atividades) {
      const colaboradorExistente = await prisma.colaborador.findUnique({
        where: { id: atividade.colaboradorId },
      });
      if (!colaboradorExistente) {
        throw new Error(`Colaborador com ID ${atividade.colaboradorId} não encontrado`);
      }
    }
  }

  // Criação do cliente no banco de dados
  return await prisma.cliente.create({
    data: {
      nome: dadosCliente.nome,
      empresa: dadosCliente.empresa,
      contatoPrincipal: dadosCliente.contatoPrincipal,
      email: dadosCliente.email,
      telefone: dadosCliente.telefone,
      atividades: dadosCliente.atividades
        ? {
            create: dadosCliente.atividades.map((atividade) => ({
              descricao: atividade.descricao,
              status: atividade.status || 'ABERTA',
              colaboradorId: atividade.colaboradorId,
              fotos: atividade.fotos || [],
            })),
          }
        : undefined,
    },
  });
};

/**
 * Lista todos os clientes cadastrados, incluindo as atividades associadas.
 * 
 * @returns {Promise<Array>} - Lista de clientes com suas atividades.
 */
export const listarClientes = async () => {
  return await prisma.cliente.findMany({
    include: {
      atividades: true, // Inclui as atividades associadas
    },
  });
};

/**
 * Obtém os dados de um cliente específico pelo ID, incluindo as atividades associadas.
 * 
 * @param {number} id - ID do cliente a ser buscado.
 * @returns {Promise<Object|null>} - Dados do cliente ou `null` se não encontrado.
 */
export const obterClientePorId = async (id) => {
  return await prisma.cliente.findUnique({
    where: { id },
    include: {
      atividades: true, // Inclui as atividades associadas ao cliente
    },
  });
};

/**
 * Atualiza os dados de um cliente específico pelo ID.
 * 
 * @param {number} id - ID do cliente a ser atualizado.
 * @param {Object} data - Dados a serem atualizados.
 * @returns {Promise<Object>} - Dados do cliente atualizado.
 */
export const atualizarCliente = async (id, data) => {
  return await prisma.cliente.update({
    where: { id },
    data,
  });
};

/**
 * Exclui um cliente específico pelo ID.
 * 
 * @param {number} id - ID do cliente a ser excluído.
 * @returns {Promise<Object>} - Dados do cliente excluído.
 */
export const deletarCliente = async (id) => {
  return await prisma.cliente.delete({
    where: { id },
  });
};

/**
 * Exporta todas as funções relacionadas ao gerenciamento de clientes.
 * 
 * @exports
 */
export default {
  criarCliente,
  listarClientes,
  obterClientePorId,
  atualizarCliente,
  deletarCliente,
};
