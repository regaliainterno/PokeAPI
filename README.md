Projeto Pokémon Explorer (Ionic com Angular)

Este repositório contém a aplicação *mobile* e PWA (Progressive Web App) desenvolvida com **Ionic e Angular**, que serve como uma interface interativa para explorar a **PokeAPI v2**. O objetivo é oferecer uma experiência fluida e moderna para buscar e visualizar informações sobre Pokémons.

---

#Tecnologias Utilizadas

O projeto foi construído com as seguintes tecnologias principais:

* **Ionic Framework**: Framework de UI *open source* para desenvolvimento de aplicativos móveis híbridos e PWAs.
* **Angular**: Plataforma e *framework* para construir aplicações *single-page* robustas e escaláveis.
* **PokeAPI v2**: Uma API REST abrangente e gratuita que fornece dados sobre Pokémons.
* **RxJS**: Biblioteca para programação reativa, fundamental no Angular para manipulação de fluxos de dados.
* **localStorage**: Utilizado para persistência de dados (como Pokémons favoritos) diretamente no navegador, garantindo funcionalidade robusta.

---

#Ciclo de Desenvolvimento do Projeto

Este projeto passou por diversas fases de implementação e depuração, refletindo um ciclo de desenvolvimento ágil e focado na resolução de desafios.

### **Versão 0.1 — Base e Primeiro Contato**
A fase inicial concentrou-se na configuração do ambiente e na exibição básica de dados:
* Configuração do projeto Ionic com Angular (template de abas).
* Configuração inicial do GitHub para controle de versão.
* Criação e implementação do `PokemonService` para consumir a PokeAPI.
* Exibição de uma lista inicial de Pokémons na `Tab1` (tela principal).

### **Versão 0.2 — Aprimoramento da Lista e Navegação Essencial**
Nesta etapa, a experiência da lista foi melhorada e a base para a navegação foi estabelecida:
* Implementação de paginação com *Infinite Scroll* para carregamento contínuo da lista de Pokémons.
* Estilização e organização visual dos cards de Pokémon na lista principal.
* Implementação da navegação para uma tela de detalhes ao clicar em um Pokémon.
* Geração da estrutura básica para a página de detalhes (`PokemonDetailsPage`).

### **Versão 0.3 — Tela de Detalhes Detalhada e Início dos Favoritos**
Foco na riqueza das informações do Pokémon e na introdução da persistência:
* Desenvolvimento da `PokemonDetailsPage` para exibir informações adicionais (altura, peso, habilidades, estatísticas base, sprites).
* Estilização da tela de detalhes para adotar um visual de "carta de Pokémon".
* Início da implementação da funcionalidade de favoritos, com a configuração do `FavoriteService`.
* Adição do botão de favoritar/desfavoritar na tela de detalhes.
* **Desafios:** Enfrentamento de problemas complexos de inicialização de armazenamento (`Ionic Storage`) e de corrupção de URLs em tempo de execução, que exigiram depurações aprofundadas e uso de `localStorage` direto.

### **Versão 1.0 — Funcionalidade Completa e Estabilidade**
A versão final e totalmente funcional, com a funcionalidade de favoritos robusta e integrada:
* **Resolução definitiva** dos problemas de inicialização de armazenamento, garantindo que os Pokémons sempre apareçam na lista principal.
* **Funcionalidade completa de Favoritos:**
    * Ícone visual de favorito/desfavoritar nos cards da lista principal.
    * Uma lista dedicada de "Meus Favoritos" exibida condicionalmente na própria `Tab1` (tela principal).
    * Comportamento dinâmico de favoritos: Pokémons favoritados **desaparecem** da lista "Todos os Pokémons" e **reaparecem** quando desfavoritados (após a atualização da lista).
* **Refinamento do fluxo de dados RxJS**, garantindo que a lista e os favoritos sejam carregados e atualizados de forma eficiente e sem conflitos.
* Otimizações de código e tratamento de warnings para um projeto limpo e pronto.

---

#Status Atual: Projeto Funcional e Completo

Todas as funcionalidades do escopo inicial foram implementadas e estão operacionais. O aplicativo oferece uma experiência fluida para explorar Pokémons, com favoritos persistentes e uma interface responsiva.

---

#Contato

Se tiver alguma dúvida ou sugestão, sinta-se à vontade para entrar em contato:

**Email:** [contatolucasscremin@gmail.com](mailto:contatolucasscremin@gmail.com)