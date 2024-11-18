import prisma from '../database.js';

/**
 * Cria uma nova atividade no banco de dados.
 * 
 * @param {Object} data - Dados da atividade a ser criada.
 * @param {string} data.descricao - Descrição da atividade.
 * @param {string} data.status - Status da atividade (valores permitidos: 'ABERTA', 'CONCLUIDA').
 * @param {number} data.colaboradorId - ID do colaborador associado à atividade.
 * @param {number} data.clienteId - ID do cliente associado à atividade.
 * @param {Array<string>} [data.fotos] - Lista de caminhos para fotos relacionadas à atividade.
 * @throws {Error} - Lança erro se o status for inválido ou se IDs de colaborador/cliente não existirem.
 * @returns {Promise<Object>} - Dados da atividade criada.
 */
export const criarAtividade = async (data) => {
  // Validação do status
  if (!['ABERTA', 'CONCLUIDA'].includes(data.status)) {
    throw new Error(`Status inválido: ${data.status}. Valores permitidos: ABERTA, CONCLUIDA.`);
  }

  // Verifica se o colaborador existe
  const colaborador = await prisma.colaborador.findUnique({ where: { id: data.colaboradorId } });
  if (!colaborador) {
    throw new Error(`Colaborador com ID ${data.colaboradorId} não encontrado.`);
  }

  // Verifica se o cliente existe
  const cliente = await prisma.cliente.findUnique({ where: { id: data.clienteId } });
  if (!cliente) {
    throw new Error(`Cliente com ID ${data.clienteId} não encontrado.`);
  }

  return await prisma.atividade.create({
    data,
  });
};

/**
 * Lista todas as atividades cadastradas, com possibilidade de aplicar filtros.
 * 
 * @param {Object} [filtros] - Filtros opcionais para a busca de atividades.
 * @returns {Promise<Array>} - Lista de atividades com colaborador e cliente associados.
 */
export const listarAtividades = async (filtros = {}) => {
  return await prisma.atividade.findMany({
    where: filtros,
    include: {
      colaborador: true,
      cliente: true,
    },
  });
};

/**
 * Obtém uma atividade específica pelo ID.
 * 
 * @param {number} id - ID da atividade a ser buscada.
 * @returns {Promise<Object|null>} - Dados da atividade ou `null` se não encontrada.
 */
export const obterAtividadePorId = async (id) => {
  return await prisma.atividade.findUnique({
    where: { id },
    include: {
      colaborador: true,
      cliente: true,
    },
  });
};

/**
 * Atualiza os dados de uma atividade pelo ID.
 * 
 * @param {number} id - ID da atividade a ser atualizada.
 * @param {Object} data - Dados a serem atualizados.
 * @param {string} [data.status] - Status da atividade (valores permitidos: 'ABERTA', 'CONCLUIDA').
 * @throws {Error} - Lança erro se o status for inválido.
 * @returns {Promise<Object>} - Dados da atividade atualizada.
 */
export const atualizarAtividade = async (id, data) => {
  // Validação do status ao atualizar
  if (data.status && !['ABERTA', 'CONCLUIDA'].includes(data.status)) {
    throw new Error(`Status inválido: ${data.status}. Valores permitidos: ABERTA, CONCLUIDA.`);
  }

  return await prisma.atividade.update({
    where: { id },
    data,
  });
};

/**
 * Atualiza o status de uma atividade pelo ID.
 * 
 * @param {number} id - ID da atividade a ser atualizada.
 * @param {string} status - Novo status da atividade.
 * @throws {Error} - Lança erro se o status for inválido.
 * @returns {Promise<Object>} - Dados da atividade com o status atualizado.
 */
export const atualizarStatus = async (id, status) => {
  // Validação do status
  if (!['ABERTA', 'CONCLUIDA'].includes(status)) {
    throw new Error(`Status inválido: ${status}. Valores permitidos: ABERTA, CONCLUIDA.`);
  }

  return await prisma.atividade.update({
    where: { id },
    data: { status },
  });
};

/**
 * Exclui uma atividade pelo ID.
 * 
 * @param {number} id - ID da atividade a ser excluída.
 * @returns {Promise<Object>} - Dados da atividade excluída.
 */
export const deletarAtividade = async (id) => {
  return await prisma.atividade.delete({
    where: { id },
  });
};

/**
 * Adiciona uma foto à lista de fotos de uma atividade.
 * 
 * @param {number} id - ID da atividade.
 * @param {string} fotoPath - Caminho da foto a ser adicionada.
 * @returns {Promise<Object>} - Dados da atividade após a adição da foto.
 */
export const adicionarFoto = async (id, fotoPath) => {
  return await prisma.atividade.update({
    where: { id },
    data: {
      fotos: {
        push: fotoPath,
      },
    },
  });
};

/**
 * Exporta todas as funções relacionadas ao gerenciamento de atividades.
 * 
 * @exports
 */
export default {
  criarAtividade,
  listarAtividades,
  obterAtividadePorId,
  atualizarAtividade,
  atualizarStatus,
  deletarAtividade,
  adicionarFoto,
};
