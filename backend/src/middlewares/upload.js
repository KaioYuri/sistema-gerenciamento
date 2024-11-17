import multer from 'multer';
import path from 'path';

/**
 * Configuração do destino e nome do arquivo de upload.
 */
const storage = multer.diskStorage({
  /**
   * Define a pasta de destino dos arquivos enviados.
   * 
   * @param {Object} req - Objeto de requisição.
   * @param {Object} file - Arquivo enviado.
   * @param {Function} cb - Callback para definir o destino.
   */
  destination: (req, file, cb) => {
    cb(null, 'src/uploads/'); // Pasta onde os arquivos serão armazenados
  },

  /**
   * Define o nome do arquivo enviado, garantindo unicidade.
   * 
   * @param {Object} req - Objeto de requisição.
   * @param {Object} file - Arquivo enviado.
   * @param {Function} cb - Callback para definir o nome do arquivo.
   */
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const extension = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${extension}`);
  },
});

/**
 * Filtro para verificar se o arquivo enviado é uma imagem válida.
 * 
 * @param {Object} req - Objeto de requisição.
 * @param {Object} file - Arquivo enviado.
 * @param {Function} cb - Callback para aceitar ou rejeitar o arquivo.
 */
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const isExtensionValid = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const isMimeTypeValid = allowedTypes.test(file.mimetype);

  if (isExtensionValid && isMimeTypeValid) {
    cb(null, true);
  } else {
    cb(new Error('Apenas arquivos de imagem são permitidos!'));
  }
};

/**
 * Configuração final do multer, incluindo limite de tamanho e filtros.
 */
const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // Limite de 50MB
  fileFilter,
});

export default upload;
