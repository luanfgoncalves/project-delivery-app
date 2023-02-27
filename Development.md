<style>
  .intro {
    text-align: center;
  }
  
  .summary {
      font-size: 1.17em;
      font-weight: bolder;
  }

  .info {
      color: gray;
      font-size: 0.9em;
      font-weight: light;
  }
</style>

<div class="intro">
  <h1> Informações de desenvolvimento </h1>
  
  <div> Este arquivo contém instruções resumidas para acesso rápido e facilitação do desenvolvimento.</div>
  <div> Para fazer uso de todos os recursos visuais utilize a extensão: Markdown Preview Enchanced.</div>
  <div> Caso deseje editar, é recomendada a extensão: Markdown All in One.</div>
  <div> Ambas as extensões permitem a visualização direto no VScode com <b>CTRL+SHIFT+V</b>.</div>
</div>

#

<details>
  <summary class="summary">Entrega e Requsitos:</summary>

  #
  * Entrega Regular: <b>23/02/23 - 14:00 </b>
  * Entrega em Recuperação: <b>27/03/23 - 14:00</b>
  #
  * Aprovação: <b>32</b> Requsitos
  * Aprovação em recuperação: <b>40</b> Requisitos
  #
  * Requisitos Obrigatórios: <b>1-39</b> e <b>42</b>.
  * Requisitos Bonus: <b>40-41</b> e <b>43-44</b>.

</details>

#

<details>
  <summary class="summary">Como iniciar o projeto:</summary>
  
  #
  1. Execute `npm install` na Raiz do projeto - <i class="info">Instala as dependencias.</i>
  2. Adicione as váriaveis de ambiente`(./back-end/.env)` - <i class="info">Permite que o comando seguinte rode o sequelize.</i>
  3. Desenvolva as Seeders e Migrations<i class="info">Configurar o Sequelizer.</i>
  4. Execute `npm run dev:prestart` na Raiz do projeto - <i class="info">Instala os aplicativos(front e backend) e roda o sequelize.</i>
  > <b>Nota:</b> `npm run db:reset` restaurará o DB em caso de erro.

  <details>
  <summary class="summary">Docker:</summary>
  
  #
  > <b>Nota:</b> O readme não possui informações sobre o uso do Docker.
  <!-- * Dokerfiles estão prontos, só devem ser preenchidos.
  * É uma boa prática limpar imagens antigas do docker para evitar conflitos.
  * Devido ao Node V16 é necessário descomentar algumas linhas do docker
  * Para a execução é subir três containers - back(port: 3001),front(port: 3000) e DB(port: 3003)
  * Requisições do thunderClient serão na porta 3001.
  * Tem que criar os dockerfiles pra back e front obrigatóriamente!
  * Os containers <b>não devem ser subidos via <i>docker compose up</i></b>, utilize:
  <b>npm run compose:up</b>
  <b>npm run compose:up dev -- --build</b> <i>(Para desenvolvimento e testes)</i> -->

  </details>

  <details>
  <summary class="summary">Especificações:</summary>
  
  #
  * Node V16 - <i class="info">~ `node -v` informará a versão em uso.</i>
  * docker V20+ - <i class="info">~ `docker -v` informará a versão em uso.</i>
  * docker compose V1.29+ - <i class="info">~ `docker-compose -v` informará a versão em uso.</i>

  </details>

</details>

#

<details>
  <summary class="summary">Estrutura do projeto:</summary>
  
  #
  <b>Frontend:</b>
  
  <b>Home Screen:</b>
  
  * / 
  * /login
  * /register
  
  > <b>Nota:</b> As rotas "/" e "/login" devem redirecionar usuários logados a suas respectivas página iniciais.
  
  <b>Telas do Cliente:</b>
  
  * /customer
  * /customer/products - <i class="info">`Página inicial` dos clientes, tela com produtos a venda.</i>
  * /customer/checkout - <i class="info">Carrinho de compras.</i>
  * /customer/orders/ - <i class="info">Pedidos realizados pelo cliente.</i>
  * /customer/orders/:id - <i class="info">Detalhe de um pedido, cliente será redirecionado ao finalizar sua compra.</i>
  
  <b>Telas do Vendedor:</b>
  
  * /seller
  * /seller/orders - <i class="info">`Página inicial` dos vendedores, tela com todos pedidos recebidos.</i>
  * /seller/orders/:id - <i class="info">Detalhe de um pedido recebido pelo vendedor.</i>
  
  <b>Telas do Administrador:</b>
  
  * /admin
  * /admin/manage - <i class="info">`Página inicial` dos administradores, tela de gerenciamento do app.</i>
  * /admin/
  
  <b>Outras Telas:</b>
  
  * /notfound
  > A presença de uma rota de Erro 404 não é especificada, contudo provavelmente será necessária.
  
  #
  <b>Backend:</b>
  
</details>

#

<details>
  <summary class="summary">Scripts e comandos relevantes:</summary>
  
  #
  * npm start - <i class="info">Limpa as portas, restaura o DB e inicia a aplicação.</i>
  * npm stop - <i class="info">Para a deleta as aplicações rodando.</i>
  * npm run dev - <i class="info">Limpa as portas, restaura o DB e inicia a aplicação no modo `watch`.</i>
  * npm run dev:prestart - <i class="info">Instala as dependências(npm i) e roda o sequelize(se houver .env).</i>
  * npm run db:reset - <i class="info">Restaura o Banco de Dados.</i>
  * npm run db:reset:debug - <i class="info">Restaura o Banco de Dados retornando detalhes sobre os erros.</i>
  * npm test - <i class="info">Roda os testes usando o `DB de testes`.</i>
  * npm run test:dev - <i class="info">Roda os testes usando o `DB de desenvolvimento`.</i>
  * npm run test:dev:open - <i class="info">Similar ao anterior, mas abre uma janela mostrando os comportamentos das páginas.</i>
  * npm run test:dev:report - <i class="info">Similar ao anterior, mas devolve outputs de texto e gera logs.</i>
  > <b>Nota: Os logs ficam localizados em "./__tests__/reports".</b>
  * npm run test:coverage:json - <i class="info">Faz a avaliação da cobertura dos testes.</i>
  * npm run lint:styles - <i class="info">Verifica erros de linter.</i>
  > <b>Nota:</b> <i>test:coverage:json</i> deve ser realizado no fron e back, <i>lint:styles</i> só é aplicavel apenas ao front end.

</details>

#

<details>
  <summary class="summary">Sobre o Banco de Dados:</summary>
  
  #
  * tabelas:
  1. Users: Contém os usuários, tanto clientes quanto vendedores com id do usuário, nome, email, senha e papel(vendedor, comprador ou admin)
  
  2. Sales: Contém as informações das vendas, como id do vendedor, id do comprador, preço total, endereço de entrega, número da entrega, horário da compra e estado do pedido.
  
  3. Seles Products - Contém id da venda, produto vendido e a quantidade.

  4. products - Contém dados dos produtos de uma venda, id da venda, nome do produto, preço e imagem do produto.

  > <b>Nota:</b> informações entre parênteses indicam a chave primária advindas da tabela à esquerda.
  
  | Users                   | Sales                   | SalesProducts           | products                |
  | :---------------------- | :---------------------- | :---------------------- | :---------------------- |
  | id INT                  | id INT                  | sale_id INT (id)        | id INT (product_id)     |
  | name VARCHAR            | user_id VARCHAR (id)    | product_id INT          | name VARCHAR            |
  | email VARCHAR           | seller_id VARCHAR (id)  | quantity INT            | price DECIMAL(4,2)      |
  | PASSWORD VARCHAR        | total_price DECIMAL     | .                       | url_image VARCHAR       |
  | role VARCHAR            | delivery_adress VARCHAR | .                       | .                       |
  | .                       | delivery_number VARCHAR | .                       | .                       |
  | .                       | sale_date DATETIME      | .                       | .                       |
  | .                       | status VARCHAR          | .                       | .                       |
  
  #

  <b>Sequelize:</b>
  
  > <b>Nota:</b> Qualquer execução referente ao sequelize-cli deve ser realizada dentro do diretório app/backend.
  * Sequelize será usado para o banco de dados, é preciso criar as migrations e models.
  * Não exclua a migration já criado e siga o modelo para futura migrations.
  * Não utilize <b>Sequelize-cli init</b>(para criar as migrations), elas já estão criadas só precisam ser alteradas.
  * Assim que criar uma migration você deve <b>renomear a seeder correspondente retirando o underline (_)</b> ao fim dela, assim o script db:reset vai usá-la nos testes e você se certificará se sua migration funcionou como o esperado.
  
  <b>Comandos:</b>
  
  * Gerar de Migration: $ <b>npx sequelize migration:generate --name migrationName</b>
  * Gerar Migration e model: $ <b>npx sequelize model:generate --name NomeDoModel --attributes nomeDoAtributo:string</b>
  > <b>Nota:</b> Os arquivos gerados através desse comando são de dificil leitura, é recomendável criar o Model a parte e então gerar a migration.
  
  * Executar Migrations: $ <b>npx sequelize db:migrate</b>
  * Desfazer Mirations(down): $ <b>npx sequelize db:migrate:undo</b>
  * Criar Seeds: <b>npx sequelize seed:generate --name users</b>
  * Executar seeds: $ <b>npx sequelize db:seed:all</b>
  * Desfazer seeds: $ <b>npx sequelize db:seed:undo:all</b>
  
</details>

#

<details>
  <summary class="summary">Dados de acesso dos usuários:</summary>

  #
  <b>Cliente:</b>

  * `zebirita@email.com`
  * `$#zebirita#$`
  #
  <b>Vendedor:</b>

  * `fulana@deliveryapp.com`
  * `fulana@123`
  #
  <b>Administrador:</b>

  * `admin@deliveryapp.com`
  * `--adm2@21--`

  > <b>Nota:</b> Estas são informações de acesso válidas que serão utilizadas pelo avaliador.

</details>

#

<details>
  <summary class="summary">Códigos de status de respostas HTTP:</summary>
  
  * <b>200</b> - <i class="info">OK</i>
  * <b>201</b> - <i class="info">Created</i>
  * <b>204</b> - <i class="info">No Content</i>
  * <b>400</b> - <i class="info">Bad Request</i>
  * <b>401</b> - <i class="info">Unauthorized</i>
  * <b>402</b> - <i class="info">Payment Required</i>
  * <b>403</b> - <i class="info">Forbidden</i>
  * <b>404</b> - <i class="info">Not Found</i>
  * <b>409</b> - <i class="info">Conflict</i>
  * <b>500</b> - <i class="info">Internal Server Error</i>
  
</details>

#

<details>
  <summary class="summary">Links uteis:</summary>
  
  * [Projeto](https://github.com/tryber/sd-023-b-project-delivery-app)
  * [Main Branch](https://github.com/tryber/sd-023-b-project-car-shop/pull/2)
  * [Trello/Kanban](https://trello.com/)
  * [Permanencia do LocalStorage](https://jdudzik.medium.com/persistent-data-with-react-hooks-and-context-api-3f3f18ce947)
  * [LinkedIn - Add lá ;)](https://www.linkedin/in/luanfgoncalves/)
  
</details>

#

<!-- Desenvolvido por Luan Filipe Gonçalves -->