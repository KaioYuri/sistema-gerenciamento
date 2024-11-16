# Dockerfile para o backend
FROM node:18

WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o diretório prisma contendo o schema.prisma
COPY prisma ./prisma

# Copia o restante dos arquivos da aplicação
COPY . .

# Gera o cliente do Prisma
RUN npx prisma generate

# Comando para iniciar o backend
CMD ["npm", "run", "dev"]
