# syntax=docker/dockerfile:1.5

# Usar uma imagem oficial leve do Node.js como base
FROM node:18-slim AS base

# Definir o diretório de trabalho na imagem
WORKDIR /usr/src/app

# Copiar apenas os arquivos necessários para instalar dependências
COPY package*.json ./

# Instalar dependências de produção diretamente (caso aplicável)
RUN npm install --production && \
    npm cache clean --force

# Copiar o restante dos arquivos da aplicação para o diretório de trabalho
COPY . .

# Adicionar e usar um usuário não-root para segurança
RUN useradd --create-home --shell /bin/bash appuser && \
    chown -R appuser:appuser /usr/src/app
USER appuser

# Expor a porta que a aplicação vai rodar
EXPOSE 9999

# Comando para iniciar a aplicação
CMD ["node", "index.js"]
