const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 9999;

app.get('/', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:9997/laudos');
        const data = response.data;

        res.send(`
            <!DOCTYPE html>
            <html lang="pt-BR">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Dados da API</title>
            </head>
            <body>
                <h1>Laudos</h1>
                <table border="1"> <!-- Adicionei uma borda para a tabela -->
                    <thead>
                        <tr>
                            <th>Data</th>
                            <th>CRM</th>
                            <th>Texto</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${data.map(laudo => {
                            return `
                            <tr>
                                <td>${laudo.data}</td>
                                <td>${laudo.crm}</td>
                                <td>${laudo.texto}</td>
                                <td><a href="data:application/pdf;base64,${laudo.arquivo}" download="${laudo.crm}.pdf">Baixar PDF</a></td>
                            </tr>
                            `;
                        }).join('')} <!-- Junta os elementos do array em uma única string -->
                    </tbody>
                </table>
            </body>
            </html>
        `);        
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar dados da API.');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
