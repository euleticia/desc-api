# Usar uma imagem base oficial do Node.js
FROM node:20.11.0-alpine

# Definir o diretório de trabalho dentro do contêiner
WORKDIR /src

# Copiar package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar o restante do código da aplicação para o diretório de trabalho
COPY . .

# Expor a porta em que a aplicação vai rodar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
