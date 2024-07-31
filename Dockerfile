# Utilize uma imagem base Node.js LTS com Alpine Linux (leve)
FROM node:lts-alpine

# Crie o diretório da aplicação
WORKDIR /app

# Copie o package.json e package-lock.json para instalar as dependências
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código da aplicação
COPY . .

# Defina a porta que a aplicação irá escutar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "index.js"]
