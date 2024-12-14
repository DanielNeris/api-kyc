# Build Stage: Use Node.js as the base image for building
FROM node:20 AS builder

# Define o diretório de trabalho
WORKDIR /app

# Copia o package.json e o lockfile para otimizar o cache
COPY package.json package-lock.json ./

# Instala dependências
RUN npm install

# Copia o restante do código
COPY . .

# Gera o código transpilado e migrações do Drizzle
RUN npm run build
RUN npx drizzle-kit generate:pg && npx drizzle-kit up:pg

# Production Stage
FROM node:20 AS production

# Define o diretório de trabalho
WORKDIR /usr/src/app

# Copia os artefatos necessários do builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.drizzle ./.drizzle
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/node_modules ./node_modules

# Copia o arquivo .env (opcional; prefira usar secrets em produção)
COPY .env .env

# Expõe a porta da aplicação
EXPOSE 3333

# Inicia a aplicação
CMD ["npm", "run", "start"]
