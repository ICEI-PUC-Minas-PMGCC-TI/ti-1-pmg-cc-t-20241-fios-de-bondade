# Informações do Projeto (TIDocs)

`TÍTULO DO PROJETO`  

Fios de Bondade.

`CURSO` 

Ciência da Computação

## Participantes
Apolo Ribeiro Bagattini
Luis Henrique Ferreira Costa
Matheus Greco Morais Dall'Alba
Rayssa Mell de Souza Silva

## Estrutura da Documentação

1. [Introdução](#introducao)
  - Descrição
2. Contexto
  - [Problema](#problema)
  - [Objetivos](#objetivos)
  - [Justificativa](#justificativa)
  - [Público-Alvo](#público-alvo)
3. Concepção
  - Projeto Design Thinking
  - Espefificações do Projeto
     - [Personas e Mapas de Empatia](#personas-e-mapas-de-empatia)
     - [Histórias de Usuários](#histórias-de-usuários)
     - [Requisitos](#requisitos)
        - [Requisitos Funcionais](#requisitos-funcionais)
        - [Requisitos não Funcionais](#requisitos-não-funcionais)
     - Projeto de Interfaces
        - User/Screen Flow e Protótipo interativo
        - Wireframes
5. Metodologia
  - [Ferramentas](#ferramentas)
  - [Gestão do rojeto](#gestao-do-projeto)
  - [Controle de Versão](#controle-de-versão)
6. Referências Bibliográficas


# Introdução 

Este projeto tem como objetivo principal facilitar o processo de doação de roupas, conectando pessoas interessadas em doar com instituições e ONGs necessitadas. Nós (Apolo, Luis Henrique, Matheus e Rayssa), alunos do curso de Ciência da Computação da PUC Minas, visamos criar uma interface amigável, simples e intuitiva, tornando mais fácil e rápido para os doadores encontrarem e entrarem em contato com as instituições beneficiadas.

# Contexto

## Problema

Muitas vezes, as pessoas têm boas intenções de doar roupas para quem precisa, mas encontram dificuldades no processo. Não sabem onde doar, como agendar a doação ou se a instituição beneficiada realmente necessita das roupas. Além disso, há uma falta de conexão entre doadores e instituições, o que pode resultar em doações desperdiçadas ou subutilizadas. Esse problema é exacerbado pela falta de uma plataforma centralizada e eficiente para facilitar o processo de doação de roupas.

## Objetivos

O objetivo geral deste trabalho é a criação de um Sistema Web intermediário que facilite e promova a doação de roupas de forma confiável e segura.

  - Elaborar o design e a interface da plataforma online de doação de roupas, assegurando a usabilidade e acessibilidade em diferentes dispositivos.
  - Implementar um sistema de cadastro seguro para os usuários interessados em doar e em receber doações.
  - Integrar um sistema de agendamento de coletas, permitindo que os doadores escolham datas e horários convenientes para a retirada das doações.

## Justificativa


A cultura de doação  desempenha um papel crucial no fomento de uma sociedade mais justa e consciente. Através das doações, é possível não apenas auxiliar indivíduos em situação de vulnerabilidade, proporcionando-lhes dignidade e conforto, mas também promover a sustentabilidade ao incentivar o reuso de peças e reduzir o descarte inadequado, o que contribui significativamente para a preservação ambiental. De acordo com o Pnuma (2022), o setor de vestuário é responsável por 2% a 8% das emissões de dióxido de carbono, evidenciando ainda mais a importância da prática de doação de roupas como uma ação sustentável.
Para efetivar o processo de doação de roupas de forma eficiente, é imprescindível estabelecer uma comunicação eficaz entre os potenciais doadores e as instituições receptoras das doações, que posteriormente repassam as peças às pessoas necessitadas. No entanto, o sistema atual é muitas vezes burocrático e ineficiente, desestimulando potenciais doadores. A criação de uma plataforma online dedicada à doação de roupas visa simplificar e agilizar esse processo, facilitando a conexão direta entre doadores e instituições e garantindo uma distribuição eficaz das doações.

**Links Úteis**:

- [Como montar a justificativa](https://guiadamonografia.com.br/como-montar-justificativa-do-tcc/)

## Público-Alvo

Descreva quem serão as pessoas que usarão a sua aplicação indicando os diferentes perfis. O objetivo aqui não é definir quem serão os clientes ou quais serão os papéis dos usuários na aplicação. A ideia é, dentro do possível, conhecer um pouco mais sobre o perfil dos usuários: conhecimentos prévios, relação com a tecnologia, relações hierárquicas, etc.

Adicione informações sobre o público-alvo por meio de uma descrição textual, ou diagramas de personas, mapa de stakeholders, ou como o grupo achar mais conveniente.

**Links Úteis**:

- [Público-alvo: o que é, tipos, como definir seu público e exemplos](https://klickpages.com.br/blog/publico-alvo-o-que-e/)
- [Qual a diferença entre público-alvo e persona?](https://rockcontent.com/blog/diferenca-publico-alvo-e-persona/)

## Personas

Relacione as personas identificadas no seu projeto e os respectivos mapas de empatia. Lembre-se que você deve ser enumerar e descrever precisamente e de forma personalizada todos os principais envolvidos com a solução almeja.

**Links Úteis**:

- [Persona x Público-alvo](https://flammo.com.br/blog/persona-e-publico-alvo-qual-a-diferenca/)
- [O que é persona?](https://resultadosdigitais.com.br/blog/persona-o-que-e/)
- [Rock Content](https://rockcontent.com/blog/personas/)
- [Criar personas (Hotmart)](https://blog.hotmart.com/pt-br/como-criar-persona-negocio/)

## Histórias de Usuários

Apresente aqui as histórias de usuário que são relevantes para o projeto de sua solução. As Histórias de Usuário consistem em uma ferramenta poderosa para a compreensão e elicitação dos requisitos funcionais e não funcionais da sua aplicação. Se possível, agrupe as histórias de usuário por contexto, para facilitar consultas recorrentes à essa parte do documento.

**Links Úteis**:

- [Histórias de usuários com exemplos e template](https://www.atlassian.com/br/agile/project-management/user-stories)
- [Como escrever boas histórias de usuário (User Stories)](https://medium.com/vertice/como-escrever-boas-users-stories-hist%C3%B3rias-de-usu%C3%A1rios-b29c75043fac)

## Requisitos

Os requisitos de um projeto são classificados em dois grupos:

- [Requisitos Funcionais (RF)](https://pt.wikipedia.org/wiki/Requisito_funcional):
  correspondem a uma funcionalidade que deve estar presente na plataforma (ex: cadastro de usuário).
- [Requisitos Não Funcionais (RNF)](https://pt.wikipedia.org/wiki/Requisito_n%C3%A3o_funcional):
  correspondem a uma característica técnica, seja de usabilidade, desempenho, confiabilidade, segurança ou outro (ex: suporte a dispositivos iOS e Android).

Lembre-se que cada requisito deve corresponder à uma e somente uma característica alvo da sua solução. Além disso, certifique-se de que todos os aspectos capturados nas Histórias de Usuário foram cobertos.

**Links Úteis**:

- [O que são Requisitos Funcionais e Requisitos Não Funcionais?](https://codificar.com.br/requisitos-funcionais-nao-funcionais/)
- [O que são requisitos funcionais e requisitos não funcionais?](https://analisederequisitos.com.br/requisitos-funcionais-e-requisitos-nao-funcionais-o-que-sao/)

## User Flow

Fluxo de usuário (User Flow) é uma técnica que permite ao desenvolvedor mapear todo fluxo de telas do site ou app. Essa técnica funciona para alinhar os caminhos e as possíveis ações que o usuário pode fazer junto com os membros de sua equipe.

**Links Úteis**:

- [User Flow: O Quê É e Como Fazer?](https://medium.com/7bits/fluxo-de-usu%C3%A1rio-user-flow-o-que-%C3%A9-como-fazer-79d965872534)
- [User Flow vs Site Maps](http://designr.com.br/sitemap-e-user-flow-quais-as-diferencas-e-quando-usar-cada-um/)
- [Top 25 User Flow Tools &amp; Templates for Smooth](https://www.mockplus.com/blog/post/user-flow-tools)

## Wireframes

Wireframes são protótipos das telas da aplicação usados em design de interface para sugerir a estrutura de um site web e seu relacionamentos entre suas páginas. Um wireframe web é uma ilustração semelhante ao layout de elementos fundamentais na interface.

**Links Úteis**:

- [Ferramentas de Wireframes](https://rockcontent.com/blog/wireframes/)
- [Figma](https://www.figma.com/)
- [Adobe XD](https://www.adobe.com/br/products/xd.html#scroll)
- [MarvelApp](https://marvelapp.com/developers/documentation/tutorials/)

## Gestão de Projetos

 Nesta parte do documento, você deve apresentar  o processo de trabalho baseado nas metodologias ágeis, a divisão de papéis e tarefas, as ferramentas empregadas e como foi realizada a gestão de configuração do projeto via GitHub.

Coloque detalhes sobre o processo de Design Thinking e a implementação do Framework Scrum seguido pelo grupo. O grupo poderá fazer uso de ferramentas on-line para acompanhar o andamento do projeto, a execução das tarefas e o status de desenvolvimento da solução.

**Links Úteis**:

- [Sobre Projects - GitHub Docs](https://docs.github.com/pt/issues/planning-and-tracking-with-projects/learning-about-projects/about-projects)
- [Gestão de projetos com GitHub | balta.io](https://balta.io/blog/gestao-de-projetos-com-github)
- [(460) GitHub Projects - YouTube](https://www.youtube.com/playlist?list=PLiO7XHcmTsldZR93nkTFmmWbCEVF_8F5H)
- [11 Passos Essenciais para Implantar Scrum no seu Projeto](https://mindmaster.com.br/scrum-11-passos/)
- [Scrum em 9 minutos](https://www.youtube.com/watch?v=XfvQWnRgxG0)
