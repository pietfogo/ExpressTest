const { MongoClient, ServerApiVersion } = require('mongodb'); // Importa o MongoClient e a versão da API do MongoDB
const express = require('express'); // Importa o Express
const bodyParser = require('body-parser'); // Importa o body-parser para analisar o corpo das requisições
const app = express(); // Cria uma instância do Express
const cors = require('cors'); // Importa o CORS para permitir requisições de diferentes origens

const uri = "mongodb+srv://pietfogo25:5ZlWp0kRCzxQsOdz@cluster0.wfac1bt.mongodb.net/?retryWrites=true&w=majority"; // URI de conexão com o MongoDB

app.use(cors()); // Habilita o CORS para todas as rotas do Express

const client = new MongoClient(uri, { // Cria uma instância do MongoClient passando a URI de conexão
  serverApi: {
    version: ServerApiVersion.v1, // Define a versão da API do MongoDB a ser usada
    strict: true, // Habilita o modo estrito para a API
    deprecationErrors: true, // Habilita a exibição de erros deprecados
  }
});

client.connect(); // Conecta ao banco de dados MongoDB
client.db("admin").command({ ping: 1 }); // Pinga o banco de dados para verificar a conexão

console.log("Bem vindo ao banco de dados de Pietro Rodrigues"); // Exibe uma mensagem no console

app.use(bodyParser.urlencoded({ extended: false })); // Usa o body-parser para analisar requisições com dados codificados em URL
app.use(bodyParser.json()); // Usa o body-parser para analisar requisições com corpo JSON

async function inserirValores() {
  try {
    try {
      // Rota inicial
      app.get('/', (req, res) => {
        res.send('Essa é a primeira página de Express');
      });

      // Rota secundária
      app.route('/pizzas')
        .get((req, res) => {
          res.send("Essa é a segunda página do Express");
        })
        .post(async (req, res) => {
          const nomePizza = req.body.nomePizza; // Obtém o nome da pizza do corpo da requisição
          console.log(`1Você enviou a pizza: ${nomePizza}`);
          res.send(`Você enviou a pizza: ${nomePizza}`); // Envia uma resposta com o nome da pizza

          console.log(`2Você enviou a pizza: ${nomePizza}`);

          const collection = client.db("Formulário").collection("credenciais"); // Acessa a coleção "credenciais" no banco de dados "Formulário"
          console.log(`3Você enviou a pizza: ${nomePizza}`);
          await collection.insertOne({ nomeDaPizza: nomePizza }); // Insere um documento com o nome da pizza na coleção
          console.log(`4Você enviou a pizza: ${nomePizza}`);
          console.log("Pizza adicionada com sucesso!");
        });

      // Inicie o servidor
      app.listen(3025, () => {
        console.log('Servidor Express rodando na porta 3025');
      });
    } catch (error) {
      console.error("Erro ao inserir a pizza!", error);
    } finally {
      await client.close(); // Fecha a conexão com o banco de dados MongoDB
    }
  } catch (error) {
    console.log(error);
  }
}

inserirValores().catch(console.dir); // Chama a função para iniciar o servidor e tratar erros
