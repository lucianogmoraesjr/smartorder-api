<h1 align="center" id="title">SmartOrder API</h1>

<p align="center"><img src="https://socialify.git.ci/lucianogmoraesjr/smartorder-api/image?description=1&amp;descriptionEditable=SmartOrder%20API&amp;font=Inter&amp;language=1&amp;name=1&amp;owner=1&amp;pattern=Solid&amp;theme=Auto" alt="project-image"></p>

<p id="description">Aplicação para realização de pedidos</p>

<p align="center"><img src="https://img.shields.io/badge/version-v1-%23339933" alt="shields"><img src="https://img.shields.io/badge/WIP-node?style=flat&amp;logo=nodedotjs&amp;color=%235B5B5B" alt="shields"></p>



<h2>🧐 Features</h2>

Here're some of the project's best features:

*   WIP

### 🧭 API Endpoints
| HTTP Verbs | Endpoints | Action |
| --- | --- | --- |
| `GET` | /docs | To access API Docs with Swagger |
| `POST` | /products | To create a new product |
| `GET` | /products | To fetch all products |
| `GET` | /categories/:categoryId/products | To fetch all products by category |
| `POST` | /categories | To create a new category |
| `GET` | /categories | To fetch all categories |
| `POST` | /orders | To create a new order |
| `GET` | /orders | To fetch all orders |
| `PATCH` | /orders/:orderId | To update a order status |
| `DELETE` | /orders/:orderId | To cancel a order |

<h2>🛠️ Installation Steps:</h2>

### Configurando o ambiente

Para iniciar a aplicação localmente é necessário ter [Node](https://nodejs.org), [pnpm](https://pnpm.io) e [Docker](https://docker.com) previamente instalados.

### Docker Compose

A aplicação precisa de um banco de dados [Postgres](https://postgresql.org), com o arquivo `docker-compose.yml` o processo de criação do container é automatizado, basta rodar o comando:

```bash
$ docker compose up -d
```
### Environment Variables

O arquivo `.env.example` contém todas as variáveis preenchidas para rodar localmente, basta copiar e alterar o nome para `.env`:

```bash
$ cp .env.example .env
```

### Migrations

Para criar as tabelas do banco de dados, é necessário rodar as migrations:

```bash
$ pnpm prisma migrate deploy
```
### Seed

O banco de dados pode ser pré-populado com o arquivo de seed, basta rodar o comando:

```bash
$ pnpm prisma db seed
```
### API

Com o ambiente devidamente configurado, a aplicação está pronta para iniciar:

```bash
$ pnpm dev
```
Por padrão, a aplicação está rodando no endereço: `http://localhost:3333`

Acesse `http://localhost:3333/docs` para a documentação


<h2>💻 Built with</h2>

Tecnologias utilizadas no projeto:

* [![Node.js][node]][node-url]
* [![TypeScript][typescript]][typescript-url]
* [![Prisma][prisma]][prisma-url]

<!-- MARKDOWN LINKS & IMAGES -->
[node]: https://img.shields.io/badge/Node.js-20232A?style=for-the-badge&logo=node.js&logoColor=%23339933
[node-url]: https://nodejs.org/en
[TypeScript]: https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=%233178C6&labelColor=20232A
[typescript-url]: https://www.typescriptlang.org/
[prisma]: https://img.shields.io/badge/Prisma-%232D3748?style=for-the-badge&logo=prisma&logoColor=fff&labelColor=141414
[prisma-url]: https://www.prisma.io/
