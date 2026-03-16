# Senaflix API

API simples em Node.js + Express para gerenciar listas de filmes e séries em memória.

## 🚀 Visão Geral
Este projeto expõe endpoints REST para:

- Listar filmes e séries
- Filtrar por gênero (query param `genre`)
- Buscar item por `id`
- Criar novo filme ou série (POST)

Os dados são armazenados em memória enquanto o servidor estiver em execução (não há banco de dados). Sempre que o servidor reinicia, a lista volta ao estado inicial.

## 🧰 Pré-requisitos

- Node.js

## ⚙️ Instalação

No diretório do projeto, instale as dependências:

```bash
npm install
```

## ▶️ Executando a API

```bash
node index.js
```

O servidor será iniciado em:

- `http://localhost:3000`

## 🛠 Endpoints

### 🎬 Filmes

- `GET /filmes`
  - Lista todos os filmes.
  - Pode filtrar por gênero usando query param `genre` (ex: `/filmes?genre=Infantil`).

- `GET /filmes/:id`
  - Busca um filme pelo `id`.

- `POST /filmes`
  - Cria um novo filme.
  - Exemplo de body (JSON):
    ```json
    {
      "title": "Meu Filme",
      "description": "Descrição do filme",
      "genre": "Ação",
      "image": "https://...",
      "releaseYear": 2024
    }
    ```

### 📺 Séries

- `GET /series`
  - Lista todas as séries.
  - Pode filtrar por gênero usando query param `genre` (ex: `/series?genre=Comédia`).

- `GET /series/:id`
  - Busca uma série pelo `id`.

- `POST /series`
  - Cria uma nova série.
  - Exemplo de body (JSON):
    ```json
    {
      "title": "Minha Série",
      "description": "Descrição da série",
      "genre": "Drama",
      "image": "https://...",
      "releaseYear": 2024
    }
    ```

## ✨ Observações

- Todos os campos são obrigatórios para criação (`title`, `description`, `genre`, `image`, `releaseYear`).
- O `id` é gerado automaticamente e funciona como incrementador interno.

---