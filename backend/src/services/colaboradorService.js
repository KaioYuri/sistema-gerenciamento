import prisma from '../database.js';

/**
 * Cria um novo colaborador no banco de dados.
 * 
 * @param {Object} data - Dados do colaborador a ser criado.
 * @param {string} data.nome - Nome do colaborador.
 * @param {string} data.cargo - Cargo do colaborador.
 * @param {string} data.email - Email do colaborador.
 * @param {string} data.telefone - Telefone do colaborador.
 * @param {string} data.status - Status do colaborador (valores permitidos: 'ATIVO', 'INATIVO').
 * @throws {Error} - Lança erro se o status for inválido.
 * @returns {Promise<Object>} - Dados do colaborador criado.
 */
export const criarColaborador = async (data) => {
  // Validação do status
  if (!['ATIVO', 'INATIVO'].includes(data.status)) {
    throw new Error(`Status inválido: ${data.status}. Valores permitidos: ATIVO, INATIVO.`);
  }

  try {
    console.log('Dados para criação do colaborador:', data);
    return await prisma.colaborador.create({
      data,
    });
  } catch (error) {
    console.error("Erro ao criar colaborador:", error); // Loga o erro
    throw new Error(`Erro ao criar colaborador: ${error.message}`);
  }
};

/**
 * Lista todos os colaboradores cadastrados, incluindo as atividades associadas.
 * 
 * @returns {Promise<Array>} - Lista de colaboradores com suas atividades.
 */
export const listarColaboradores = async () => {
  try {
    return await prisma.colaborador.findMany({
      include: {
        atividades: true, // Inclui as atividades associadas
      },
    });
  } catch (error) {
    console.error("Erro ao listar colaboradores:", error);
    throw new Error(`Erro ao listar colaboradores: ${error.message}`);
  }
};

/**
 * Obtém os dados de um colaborador específico pelo ID, incluindo as atividades associadas.
 * 
 * @param {number} id - ID do colaborador a ser buscado.
 * @returns {Promise<Object|null>} - Dados do colaborador ou `null` se não encontrado.
 */
export const obterColaboradorPorId = async (id) => {
  try {
    return await prisma.colaborador.findUnique({
      where: { id },
      include: {
        atividades: true, // Inclui as atividades associadas ao colaborador
      },
    });
  } catch (error) {
    console.error("Erro ao obter colaborador por ID:", error);
    throw new Error(`Erro ao obter colaborador: ${error.message}`);
  }
};

/**
 * Atualiza os dados de um colaborador específico pelo ID.
 * 
 * @param {number} id - ID do colaborador a ser atualizado.
 * @param {Object} data - Dados a serem atualizados.
 * @param {string} [data.status] - Status do colaborador (valores permitidos: 'ATIVO', 'INATIVO').
 * @throws {Error} - Lança erro se o status for inválido.
 * @returns {Promise<Object>} - Dados do colaborador atualizado.
 */
export const atualizarColaborador = async (id, data) => {
  // Validação do status, se presente
  if (data.status && !['ATIVO', 'INATIVO'].includes(data.status)) {
    throw new Error(`Status inválido: ${data.status}. Valores permitidos: ATIVO, INATIVO.`);
  }

  try {
    return await prisma.colaborador.update({
      where: { id },
      data,
    });
  } catch (error) {
    console.error("Erro ao atualizar colaborador:", error);
    throw new Error(`Erro ao atualizar colaborador: ${error.message}`);
  }
};

/**
 * Exclui um colaborador específico pelo ID.
 * 
 * @param {number} id - ID do colaborador a ser excluído.
 * @returns {Promise<Object>} - Dados do colaborador excluído.
 */
export const deletarColaborador = async (id) => {
  try {
    return await prisma.colaborador.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Erro ao deletar colaborador:", error);
    throw new Error(`Erro ao deletar colaborador: ${error.message}`);
  }
};

/**
 * Exporta todas as funções relacionadas ao gerenciamento de colaboradores.
 * 
 * @exports
 */
export default {
  criarColaborador,
  listarColaboradores,
  obterColaboradorPorId,
  atualizarColaborador,
  deletarColaborador,
};
