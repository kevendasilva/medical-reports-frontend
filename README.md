# Medical Reports Frontend

Medical Reports Frontend é um serviço Node.js com Express que exibe laudos médicos consumindo dados de uma API externa. A aplicação retorna uma página HTML com uma tabela contendo os laudos disponíveis, permitindo o download dos arquivos em formato PDF.

## 🚀 Tecnologias

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Axios](https://axios-http.com/)
- [Docker](https://www.docker.com/)
- [Jenkins](https://www.jenkins.io/)

## 📌 Pré-requisitos

- Node.js 16+
- Docker (opcional)
- Jenkins (opcional)

## ⚙️ Configuração

1. Clone o repositório:
```sh
git clone https://github.com/dasilvadev/medical-reports-frontend.git
cd medical-reports-frontend
```

2. Instale as dependências:
```sh
npm install
```

3. Crie um arquivo `.env` na raiz do projeto e defina a variável da API:
```sh
API_URL=http://localhost:9997/laudos
PORT=9999
```

4. Inicie o servidor:
```sh
node index.js
```
O servidor estará rodando em `http://localhost:9999`.

## 🐳 Docker

Para rodar a aplicação via Docker:

```sh
docker build -t medical-reports-frontend .
docker run -p 9999:9999 medical-reports-frontend
```

## 🛠️ Pipeline CI/CD

Este projeto utiliza **Jenkins** para automação do processo de entrega. O pipeline:

1. Clona ou atualiza o repositório.
2. Constrói a imagem Docker.
3. Faz login no Docker Hub.
4. Faz push da imagem para o Docker Hub.
