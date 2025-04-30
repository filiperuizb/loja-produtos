# Projeto Loja

Este é o meu projeto pessoal para aprendizado de **Node.js** com **Express** e **VueJS**. Após o curso de Node e Express, decidi criar minha primeira API REST para praticar e solidificar os conhecimentos adquiridos.

### 📚 Tecnologias Utilizadas

#### Backend:
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)

#### Frontend:
[![Vue.js](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D)](https://vuejs.org/)

#### Banco de Dados / Scripts:
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)

---

### 🛠 Estrutura do Projeto

O projeto é dividido em três partes:

- **Script DB** (Python + PostgreSQL):
  - Localizado na pasta `/scripts-db`
  - Script que vai criar o banco de dados e as tabelas necessárias

- **Backend** (Node.js + Express): 
  - Localizado na pasta `/backend`
  - API RESTful para gerenciar produtos e clientes da loja

- **Frontend** (VueJs):
  - Localizado na pasta `/frontend`
  - Interface para interação com a API (exibição de produtos, criação de novos clientes, etc.)

---

### 📊 Funcionalidades da API

#### 🛒 Produtos
- **GET /produtos**: Retorna a lista de produtos.
- **POST /produtos**: Adiciona um novo produto.
- **DELETE /produtos/:idkey**: Deleta um produto pelo ID.

#### 👤 Usuários
- **GET /usuarios**: Retorna a lista de usuários.
- **POST /usuarios**: Adiciona um novo usuário.
- **DELETE /usuarios/:idkey**: Deleta um usuário pelo ID.

#### 🧾 Compras
- **GET /compras**: Retorna a lista de compras realizadas.
- **POST /compras**: Finaliza a compra com base nos itens do carrinho de um usuário.


---

### 🐛 Problemas Conhecidos

Pequenos erros que foram corrigidos durante o desenvolvimento, mas ainda estou aprimorando a API para garantir estabilidade e performance.

---

### 🎨 Créditos Finais

- 🔗 **Autor**: Filipe Ruiz Boligon  
- 📧 **Contato**: [filiperuizboligon9@gmail.com](mailto:filiperuizboligon9@gmail.com)  
- 💻 **GitHub**: [https://github.com/filiperuizb](https://github.com/filiperuizb)
