# Use Node.js como imagem base
FROM node:20

# Definir o diretório de trabalho
WORKDIR /usr/src/app

# Copiar as dependências
COPY package*.json yarn.lock ./

# Instalar as dependências
RUN yarn install

# Copiar os arquivos da aplicação
COPY . .

# Definir o ambiente para produção
ENV NODE_ENV=production

# Compilar o TypeScript
RUN yarn build

# Gerar e aplicar as migrações
RUN yarn migrate

# Expor a porta da aplicação
EXPOSE 3333

# Iniciar a aplicação
CMD ["yarn", "start"]
