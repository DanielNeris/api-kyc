# Build Stage: Use Node.js as the base image for building
FROM node:20 AS builder

# Define o diretório de trabalho
WORKDIR /app

# Copia o arquivo package.json e yarn.lock para otimizar o cache
COPY package.json yarn.lock ./

# Instala dependências
RUN yarn install

# Copia o restante do código para o container
COPY . .

# Gera o código transpilado (se você usa TypeScript) e migrações do Drizzle
RUN yarn build
RUN npx drizzle-kit generate && npx drizzle-kit up

# Production Stage
FROM node:20 AS production

# Define o diretório de trabalho
WORKDIR /usr/src/app

# Copia os artefatos necessários do estágio de build
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.migrations ./.migrations
COPY --from=builder /app/.migrations/meta ./.migrations/meta
COPY --from=builder /app/package.json /app/yarn.lock ./
COPY --from=builder /app/node_modules ./node_modules

# Copia o arquivo .env (opcional; prefira usar secrets em produção)
COPY .env .env

# Expõe a porta da aplicação
EXPOSE 3333

# Inicia a aplicação
CMD ["yarn", "start"]
