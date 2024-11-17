import atividadeService from '../services/atividadeService.js';
import upload from '../middlewares/upload.js'; 

const MENSAGENS = {
  sucessoCriar: 'Atividade criada com sucesso',
  sucessoListar: 'Atividades obtidas com sucesso',
  sucessoEncontrar: 'Atividade encontrada',
  sucessoAtualizar: 'Atividade atualizada com sucesso',
  sucessoExcluir: 'Atividade excluída com sucesso',
  sucessoFoto: 'Foto adicionada com sucesso',
  erroGenerico: 'Ocorreu um erro durante o processamento',
  naoEncontrada: 'Atividade não encontrada',
  semFoto: 'Nenhuma foto foi enviada',
};

export const criarAtividade = async (req, res) => {
  try {
    const novaAtividade = await atividadeService.criarAtividade(req.body);
    res.status(201).json({
      message: MENSAGENS.sucessoCriar,
      atividade: novaAtividade,
    });
  } catch (error) {
    console.error('Erro ao criar atividade:', error);
    res.status(500).json({
      error: MENSAGENS.erroGenerico,
      detalhes: error.message,
    });
  }
};

export const obterAtividades = async (req, res) => {
  try {
    const filtros = req.query; // Obtém filtros passados via query string
    const atividades = await atividadeService.listarAtividades(filtros);
    res.status(200).json({
      message: MENSAGENS.sucessoListar,
      atividades,
    });
  } catch (error) {
    console.error('Erro ao obter atividades:', error);
    res.status(500).json({
      error: MENSAGENS.erroGenerico,
      detalhes: error.message,
    });
  }
};

export const obterAtividadePorId = async (req, res) => {
  try {
    const { id } = req.params;
    const atividade = await atividadeService.obterAtividadePorId(parseInt(id));

    if (!atividade) {
      return res.status(404).json({
        error: MENSAGENS.naoEncontrada,
        detalhes: `Não foi possível localizar a atividade com ID ${id}.`,
      });
    }

    res.status(200).json({
      message: MENSAGENS.sucessoEncontrar,
      atividade,
    });
  } catch (error) {
    console.error('Erro ao obter atividade por ID:', error);
    res.status(500).json({
      error: MENSAGENS.erroGenerico,
      detalhes: error.message,
    });
  }
};

export const atualizarAtividade = async (req, res) => {
  try {
    const { id } = req.params;
    const atividadeAtualizada = await atividadeService.atualizarAtividade(parseInt(id), req.body);

    if (!atividadeAtualizada) {
      return res.status(404).json({
        error: MENSAGENS.naoEncontrada,
        detalhes: `Não foi possível atualizar a atividade com ID ${id}.`,
      });
    }

    res.status(200).json({
      message: MENSAGENS.sucessoAtualizar,
      atividade: atividadeAtualizada,
    });
  } catch (error) {
    console.error('Erro ao atualizar atividade:', error);
    res.status(500).json({
      error: MENSAGENS.erroGenerico,
      detalhes: error.message,
    });
  }
};

export const excluirAtividade = async (req, res) => {
  try {
    const { id } = req.params;
    const atividadeExcluida = await atividadeService.deletarAtividade(parseInt(id));

    if (!atividadeExcluida) {
      return res.status(404).json({
        error: MENSAGENS.naoEncontrada,
        detalhes: `Não foi possível excluir a atividade com ID ${id}.`,
      });
    }

    res.status(204).end();
  } catch (error) {
    console.error('Erro ao excluir atividade:', error);
    res.status(500).json({
      error: MENSAGENS.erroGenerico,
      detalhes: error.message,
    });
  }
};

export const adicionarFoto = async (req, res) => {
  try {
    // A linha abaixo garante que o middleware upload seja executado primeiro.
    upload.single('foto')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          error: MENSAGENS.semFoto,
          detalhes: err.message,
        });
      }

      const { id } = req.params;
      const foto = req.file; // O arquivo de foto será enviado via form-data (usando multer)

      if (!foto) {
        return res.status(400).json({
          error: MENSAGENS.semFoto,
        });
      }

      // Chama a função do service para adicionar a foto
      const fotoPath = foto.path; // Supondo que o caminho da foto seja armazenado como `foto.path`
      const atividadeComFoto = await atividadeService.adicionarFoto(parseInt(id), fotoPath);

      if (!atividadeComFoto) {
        return res.status(404).json({
          error: MENSAGENS.naoEncontrada,
          detalhes: `Não foi possível adicionar a foto à atividade com ID ${id}.`,
        });
      }

      res.status(200).json({
        message: MENSAGENS.sucessoFoto,
        atividade: atividadeComFoto,
      });
    });
  } catch (error) {
    console.error('Erro ao adicionar foto:', error);
    res.status(500).json({
      error: MENSAGENS.erroGenerico,
      detalhes: error.message,
    });
  }
};

