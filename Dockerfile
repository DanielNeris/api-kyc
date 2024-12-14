# Use Node.js como imagem base
FROM node:20

# Definir o diretório de trabalho
WORKDIR /usr/src/app

# Copiar dependências
COPY package*.json yarn.lock ./

# Instalar dependências
RUN yarn install

# Copiar o script wait-for-it.sh
COPY wait-for-it.sh /usr/src/app/

# Copiar os arquivos da aplicação
COPY . .

# Definir o ambiente para produção
ENV NODE_ENV=production

# Compilar o TypeScript
RUN yarn build

# Esperar pelo banco de dados e rodar migrações
RUN ./wait-for-it.sh pg:5432 -- yarn migrate

# Expor a porta da aplicação
EXPOSE 3333

# Iniciar a aplicação
CMD ["yarn", "start"]
