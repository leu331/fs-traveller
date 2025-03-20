# Traveller

Traveller é uma aplicação web que permite explorar cidades e eventos com detalhes completos, incluindo descrição, avaliações, horários de funcionamento e muito mais.

## Tecnologias Utilizadas

- **Front-end**: React(NextJS, Chakra UI), TypeScript, Axios  
- **Back-end**: NestJS, Prisma, JWT para autenticação  
- **Banco de Dados**: PostgreSQL (rodando em um container Docker)  

## Funcionalidades

- Exploração de cidades e seus eventos  
- Filtro por "Mais Acessadas" e ordenação A-Z/Z-A  
- Busca de cidades por nome  
- Página de detalhes de eventos com informações completas  
- Autenticação de usuário com JWT  
- Adição e visualização de avaliações  

## Como Rodar o Projeto

### Requisitos
- Node.js  
- Docker e Docker Compose  

### Passos
1. Clone o repositório:  
   ```sh
   git clone https://github.com/seu-usuario/traveller.git
   cd traveller

2. Entre na pasta do back-end:
   ```sh
   cd back

3. Instale as dependências do back-end:
   ```sh
   npm i

4. Inicie o banco de dados com docker:
   ```sh
   docker-compose up -d

5. Rode a API:
   ```sh
   npm run start:dev

6. Importe o arquivo de rotas no Insomnia:
   ```sh
   Abra o Insomnia;
   Vá em Importar > Arquivo;
   Selecione rotas-insomnia.json (disponível no repositório);
   Alimente a API


7. Entre na pasta do Front-End(em outro terminal):
    ```sh
   cd ../front

8.  Instale as dependências do front:
     ```sh
    npm i

9. Rode o Front-End:
    ```sh\
    npm run dev

## A aplicação estará rodando em:

Frontend: http://localhost:3000 <br>
Backend: http://localhost:3333

## Contribuição
Sinta-se à vontade para contribuir! Abra uma issue ou envie um pull request.

## Licença
Este projeto está licenciado sob a MIT License.
