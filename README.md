# [Sistema de gerenciamento]() &middot; [![Autor Kaio](https://img.shields.io/badge/Autor-Kaio-%3C%3E)](https://kaioyuri.vercel.app)

Sistema de gerenciamento construido com [shadcn/ui](https://ui.shadcn.com) completo com responsividade para ambientes mobile e desktop.
Feito para um processo seletivo.

## Features

- Barra lateral retrátil, mini e larga
- Menu da barra lateral com rolagem
- Menu em estilo "sheet" para dispositivos móveis
- Menu agrupado com rótulos
- Submenu recolhível
- Lista de itens do menu extraída
- Formulário de registro de atividades (com upload de imagem), clientes e colaboradores.
- Tabela de pesquisa com filtro para atividades, clientes e colaboradores.


## Techs/frameworks usados no backend

- **Node.js**: Plataforma popular para backend, permitindo usar JavaScript tanto no frontend quanto no backend, com alta performance e escalabilidade.
- **Express**: Framework minimalista que facilita a criação de APIs e servidores web, proporcionando flexibilidade e simplicidade.
- **Prisma**: ORM moderno que simplifica a interação com bancos de dados, com foco em segurança e agilidade na manipulação de dados.
- **PostgreSQL**: Banco de dados relacional robusto, ideal para aplicações que exigem consistência, integridade e escalabilidade de dados.

## Techs/frameworks usados no frontend

- **Next.js 14**: Framework React com renderização do lado do servidor (SSR) e otimização automática de desempenho, ideal para SEO e alta performance.
- **TypeScript**: Linguagem que adiciona tipagem estática ao JavaScript, melhorando a qualidade e a manutenção do código.
- **Shadcn/ui**: Biblioteca de componentes de UI com design moderno e altamente usável, acelerando o desenvolvimento de interfaces.
- **Tailwind CSS**: Framework de CSS baseado em utilitários que facilita a criação de designs responsivos e personalizados de forma rápida.
- **Lucid-react**: Biblioteca de componentes prontos e otimizados para React, com foco em agilidade e consistência na interface.
- **Radix UI**: Coleção de componentes acessíveis e personalizáveis para React, priorizando a usabilidade e a flexibilidade.
- **Zustand**: Biblioteca simples e eficiente para gerenciamento de estado em React, sem necessidade de boilerplate complexo.
- **Axios**: Biblioteca para requisições HTTP, que facilita a integração entre o frontend e o backend de forma simples e configurável.
- **Zod**: Biblioteca para validação de esquemas em TypeScript, garantindo a segurança e consistência dos dados antes de seu uso.


## Instalação

### Requisitos

Esta aplicação utiliza `docker` para sua execução, então se você estiver no windows, é necessário baixar o `WSL` e em seguida
o [docker desktop](https://www.docker.com/products/docker-desktop/). Para usuários do linux basta apenas ter o `docker` e `docker-compose`.

### Executando o projeto

No diretório a sua escolha você irá:

1. Clonar o repositório
   ```bash
   git clone https://github.com/KaioYuri/sistema-gerenciamento.git
   ```

2. Abrir o repositório local:
   ```bash
   cd ./sistema-gerenciamento/
   ```
3. Executar o docker-compose
   ```bash
    docker-compose up --build
   ```

4. Va para a URL `http://localhost:3001/` onde estará o frontend. Já o backend estará sendo 
executado em `http://localhost:3000/`. É possível testar o retorno, das API's no proprio Browser,
`http://localhost:3000/api/atividades`. Caso deseje testar a API recomendo utilizar Postman ou Thunder Client.

### Rotas da API

1. Atividades:
- `http://localhost:3000/api/atividades`
- `http://localhost:3000/api/atividades/{id}`
- `http://localhost:3000/api/atividades/{id}/status`
- `http://localhost:3000/api/atividades/{id}/foto`

2. Clientes:
- `http://localhost:3000/api/clientes`
- `http://localhost:3000/api/clientes/{id}`

3. Colaboradores:
- `http://localhost:3000/api/colaboradores`
- `http://localhost:3000/api/colaboradores/{id}`