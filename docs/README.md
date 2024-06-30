# Informações do Projeto (TIDocs)

`TÍTULO DO PROJETO`  

Fios de Bondade.

`CURSO` 

Ciência da Computação

## Participantes
- Apolo Ribeiro Bagattini
- Luis Henrique Ferreira Costa
- Matheus Greco Morais Dall'Alba
- Rayssa Mell de Souza Silva

## Estrutura da Documentação

1. [Introdução]
2. [Contexto]
   - [Problema]
   - [Objetivos]
   - [Justificativa]
   - [Público-Alvo]
3. [Concepção]
    - [Especificações do Projeto]
       - [Personas e Mapas de Empatia]
       - [Histórias de Usuários]
       - [Requisitos]
          - [Requisitos Funcionais]
          - [Requisitos não Funcionais]
       - Projeto de Interfaces
          - User/Screen Flow 
          - Wireframes e Protótipo
4. [Metodologia]
    - [Ferramentas]
    - [Gestão do Projeto]
5. [Referências Bibliográficas]


# 1. Introdução 

O aumento significativo no consumo de roupas nos últimos anos tem contribuído significativamente para a poluição global, com o setor de vestuário sendo responsável por gerar de 2% a 8% do volume de emissões de dióxido de carbono (Programa de Nações Unidas para o Meio Ambiente - Pnuma, 2022). Diante deste cenário, diversas ONGs e instituições enfatizam a importância da doação de roupas como uma forma de reduzir o impacto ambiental e ajudar aqueles que mais necessitam. No entanto, para maximizar o alcance e eficácia das doações, é fundamental estabelecer uma comunicação eficaz entre os possíveis doadores e as instituições responsáveis pela recepção e distribuição das doações.

# 2. Contexto

## Problema

Muitas pessoas desejam doar roupas para ajudar aqueles em situação de vulnerabilidade, porém frequentemente enfrentam obstáculos no processo. A falta de informações transparentes sobre locais de doação, procedimentos para agendar as doações e a real necessidade das instituições beneficiadas podem desmotivar potenciais doadores. Paralelamente, organizações e indivíduos que dependem dessas doações enfrentam desafios para se conectar com doadores de forma eficiente e segura. Diante disso, o problema central que este projeto busca resolver é a carência de uma plataforma que facilite e centralize a conexão entre doadores e instituições, assegurando a confiabilidade, segurança e eficácia das doações realizadas.

## Objetivos

O objetivo geral deste trabalho é a criação de um Sistema Web que facilite e promova a doação de roupas de forma confiável e segura.

Como objetivos específicos, ressalta-se:
 - Elaborar um design intuitivo e responsivo para plataforma online de doação de roupas, assegurando a usabilidade e acessibilidade em diferentes dispositivos.
 - Integrar um sistema de localização para visualização dos pontos de coleta de ONGs e Instituições beneficiadas.
 - Integrar um sistema de agendamento de coletas, permitindo que os doadores escolham datas e horários convenientes para a retirada das doações.

## Justificativa

A cultura de doação  desempenha um papel crucial no fomento de uma sociedade mais justa e consciente. Através das doações, é possível não apenas auxiliar indivíduos em situação de vulnerabilidade, proporcionando-lhes dignidade e conforto, mas também promover a sustentabilidade ao incentivar o reuso de peças e reduzir o descarte inadequado, o que contribui significativamente para a preservação ambiental. Para efetivar o processo de doação de roupas de forma eficiente, é imprescindível estabelecer uma comunicação eficaz entre os potenciais doadores e as instituições receptoras das doações, que posteriormente repassam as peças às pessoas necessitadas. No entanto, o sistema atual é muitas vezes burocrático e conplicado, desestimulando potenciais doadores. A criação de uma plataforma online dedicada à doação de roupas visa simplificar e agilizar esse processo, facilitando a conexão direta entre doadores e instituições e garantindo uma distribuição eficaz das doações.

## Público-Alvo

O público-alvo da plataforma de doação de roupas é composto por dois principais segmentos: indivíduos doadores e instituições beneficentes. Os doadores são pessoas de diferentes faixas etárias e origens socioeconômicas, unidas pelo desejo de contribuir para o bem-estar social. Esses doadores podem ser: jovens e adultos: pessoas entre 18 e 65 anos, com uma consciência social desenvolvida, interessadas em ajudar as comunidades. E os receptores são as instituições beneficiadas pela plataforma, as quais incluem uma variedade de organizações que trabalham com pessoas em situação de vulnerabilidade, tais como: Instituições Religiosas que promovem ações sociais e distribuem doações a comunidades carentes ou Organizações Não Governamentais dedicadas a diferentes causas sociais, desde apoio a refugiados até assistência a famílias de baixa renda.

# 3. Concepção

## Especificações do Projeto 
As personas levantadas durante o processo de entendimento do problema são apresentadas nas imagens que se seguem.

![Persona 1](https://github.com/ICEI-PUC-Minas-PMGCC-TI/ti-1-pmg-cc-t-20241-fios-de-bondade/assets/60720014/8a200675-ccd6-4f60-a70e-0e58a96f72a5)
![Persona 2)](https://github.com/ICEI-PUC-Minas-PMGCC-TI/ti-1-pmg-cc-t-20241-fios-de-bondade/assets/60720014/64ff9c0f-ea0f-475f-b1a7-7e30db5b9ba7)
![Persona 3)](https://github.com/ICEI-PUC-Minas-PMGCC-TI/ti-1-pmg-cc-t-20241-fios-de-bondade/assets/60720014/0686b171-b1d3-421e-a427-8ef85114a412)


### Histórias de Usuários

Com base na análise das personas, foram identificadas as seguintes histórias de usuários:

|EU COMO... `PERSONA`|    QUERO/PRECISO ... `FUNCIONALIDADE`   |         PARA ... `MOTIVO/VALOR`               |
|--------------------|-----------------------------------------|-----------------------------------------------|
|Flávio              |  cadastrar a ONG na plataforma.         | receber doações de roupas.                     |                        
|Márcia              |  atualizar as necessidades de doação de | manter atualizada as informações sobre os     | 
|                    |  roupas da organização.                 | tipos e tamanhos de roupas mais necessários.  |                        
|Robson              |  acessar o histórico de doações da      | avaliar o impacto das contribuições e planejar|
|                    |  organização.                           | futuras campanhas de doação.                  |
|Amanda              |  me cadastrar na plataforma.            | encontrar pontos de coleta próximos para doar.|
|Jonas               |  agendar coleta da minha doação.        | para que as roupas sejam retiradas em minha   |
|                    |                                         | residência no horário conveniente.            |


## Requisitos

- Requisitos Funcionais (RF)
  
|ID    |            Descrição do Requisito                                                | Prioridade |
|------|----------------------------------------------------------------------------------|------------|
|RF-001| O sistema deve permitir que os usuários se cadastrem  no sistema, após preencher |   ALTA     |
|      | um formulário. Além disso, é permitido ao usuário editar ou deletar seu cadastro.|            |
|RF-002| O sistema deve oferecer, durante o cadastro, a opção de ser pessoa física ou     |   ALTA     | 
|      | jurídica.                                                                        |            |
|RF-003| O sistema deve permitir ao usuário receptor escolher os tipos e tamanho de       |   ALTA     | 
|      | roupas que ele deseja doar.                                                      |            |
|RF-004| O sistema deve fornecer a localização dos pontos de coleta das organizações      |   ALTA     |
|      | cadastradas.                                                                     |            |
|RF-005| O sistema deve permitir ao usuário pessoa jurídica fazer solicitações de roupas  |   MÉDIA    |
|      | com maiores demandas de doação.                                                  |            |
|RF-006| O sistema deve oferecer ao usuário pessoa física a opção de agendar  a doação.   |   MÉDIA    | 
|RF-007| O sistema deve permitir visualizar o histórico de doações.                       |   BAIXA    |
|RF-008| O sistema deve fornecer um FAQ para sanar possíveis dúvidas do usuário.          |   BAIXA    |    

- Requisitos Não Funcionais (RNF)

|ID     |            Descrição do Requisito                       | Prioridade  |
|-------|---------------------------------------------------------|-------------|
|RNF-001| O sistema deve ser publicado em um ambiente acessível   |   ALTA      |
|       | publicamente na Internet.                               |             |
|RNF-002| O sistema deve ser responsivo permitindo a visualização |   ALTA      |
|       | em dispositivéis móveis de forma adequada.              |             |
|RNF-003| O sistema não deve permitir que outros usuários alterem |   ALTA      | 
|       | informações de outros perfis cadastrados.               |             |
|RNF-004| O sistema deve ser compatível com os principais         |   ALTA      |
|       | navegadores do mercado (Google Chrome, Firefox, Edge).  |             |

## Projeto de Interface

### User Flow
Após entender o problema, foi estabelecido o fluxo de tela do usuário para mapear o caminho de interação dele com o produto digital. O fluxo a seguir, mostra  as telas que o usuário vai visualizar.

![fluxo do usuário](https://github.com/ICEI-PUC-Minas-PMGCC-TI/ti-1-pmg-cc-t-20241-fios-de-bondade/blob/master/docs/assets/images/fluxo%20do%20usu%C3%A1rio.png)

Para melhor visualização acesse:  https://www.figma.com/design/sDgDJDKH2rflnW2TfHTOaD/Wireframing-in-Figma?node-id=0-1
Para visualização do Protótipo Interativo acesse: https://www.figma.com/proto/RCRZJsFUrpQPk9XJbm83Wb/Prot%C3%B3tipo-Interativo?node-id=2107-3369&starting-point-node-id=2107%3A3369

### Wireframes
Conforme fluxo de telas do projeto, apresentado no item anterior, as telas do sistema são apresentadas em detalhes nos itens que se seguem. 

- Tela de Apresentação: A tela de apresentação mostra ao usuário algumas das funcionalidades do sistema e à que ele terá acesso ao usar a plataforma.
  
    ![tela apresentação](https://github.com/ICEI-PUC-Minas-PMGCC-TI/ti-1-pmg-cc-t-20241-fios-de-bondade/assets/60720014/d2f71288-4b0d-46f4-a429-21cb9d636069)

- Tela de Cadastro: A tela de cadastro do usuário apresenta opção de pessoa física ou jurídica. As informações preenchidas dependem da opção escolhida.
     - Pessoa Jurídica
      
    ![cadastro pessa jurídica](https://github.com/ICEI-PUC-Minas-PMGCC-TI/ti-1-pmg-cc-t-20241-fios-de-bondade/assets/60720014/b298bd63-7518-4183-a91a-906af72c7f3a)

     - Pessoa Física
    
    ![cadastro pessa física](https://github.com/ICEI-PUC-Minas-PMGCC-TI/ti-1-pmg-cc-t-20241-fios-de-bondade/assets/60720014/38788e77-a0de-484b-b7c5-0cb25f7b1a51)

- Tela de Login: Se o usuário já estiver cadastrado na plataforma, ele terá a opção de fazer login.
  
    ![login](https://github.com/ICEI-PUC-Minas-PMGCC-TI/ti-1-pmg-cc-t-20241-fios-de-bondade/assets/60720014/10d04039-3144-4d73-9b66-f3b4c6e207e7)

- Tela Principal: A tela principal fornece ao usuário a localização dos pontos de coleta das organizações cadastradas, além de sanar possíveis dúvidas por meio de um FAQ. Além disso, ao clicar no botão “Quero Doar”, o usuário é encaminhado para a tela de doações.
  
    ![tela principal](https://github.com/ICEI-PUC-Minas-PMGCC-TI/ti-1-pmg-cc-t-20241-fios-de-bondade/assets/60720014/f6867e7b-4e0c-4abf-8b76-87ae93504e98)

- Tela de Doações: A tela de realizar a doação permite ao usuário preencher tipo, tamanho e situação das roupas que serão doadas. Além disso, é possível agendar a doação com a ONG, com base na data e horário que sejam convenientes para ele.
  
    ![tela doações](https://github.com/ICEI-PUC-Minas-PMGCC-TI/ti-1-pmg-cc-t-20241-fios-de-bondade/assets/60720014/45654002-5ccd-4672-9ccc-761eceddc2ae)

- Tela Perfil Receptor: A tela de perfil do receptor apresenta as informações fornecidas durante o cadastro e permite a ele atualizar ou excluir seu perfil, fazer solicitações de roupas e visualizar o histórico de doações recebidas.
  
    ![tela perfil_receptor](https://github.com/ICEI-PUC-Minas-PMGCC-TI/ti-1-pmg-cc-t-20241-fios-de-bondade/blob/master/docs/assets/images/perfil_receptor.png)

- Tela Perfil Doador: A tela de perfil do daodor apresenta as informações fornecidas durante o cadastro e permite a ele atualizar ou excluir seu perfil e visualizar o histórico de doações realizadas.
  
    ![tela perfil_doador](https://github.com/ICEI-PUC-Minas-PMGCC-TI/ti-1-pmg-cc-t-20241-fios-de-bondade/blob/master/docs/assets/images/perfil_receptor.png)

# Metodologia

## Ferramentas

|Ambiente                    |	Plataforma	      |                  Link de Acesso                                                   |
|----------------------------|--------------------|-----------------------------------------------------------------------------------|
|Processo de Design Thinking |  Miro	          | https://miro.com/app/board/uXjVKZvbArk=/                                          |
|Repositório de código	     |  GitHub	          | https://github.com/ICEI-PUC-Minas-PMGCC-TI/ti-1-pmg-cc-t-20241-fios-de-bondade.git|
|Hospedagem do site	    	 |  Replit            | https://replit.com/                                                               |
|Projeto de Interfaces	     |  Figma	          | https://figma.com/                                                                |
|Editor de Código            |  Visual Studio Code| https://code.visualstudio.com/                                                    |

## Gestão do Projeto
A equipe utiliza metodologias ágeis, tendo escolhido o Scrum como base para definição do processo de desenvolvimento. Para organização e distribuição das tarefas do projeto, a equipe está utilizando o Kanban. Esta ferramenta prioriza a produtividade e organização de tarefas, cuja estrutura consiste em um quadro dividido em três colunas, “todo”, “in progress” e “done”, tornando o fluxo de trabalho produtivo e eficiente. Quanto à divisão de tarefas, todas foram realizadas em conjuntos visando a maior integração e eficiência entre os membros da equipe.

O quadro kanban do grupo no Github está disponível através da URL https://github.com/orgs/ICEI-PUC-Minas-PMGCC-TI/projects/22.
![quadro_tarefas](https://github.com/ICEI-PUC-Minas-PMGCC-TI/ti-1-pmg-cc-t-20241-fios-de-bondade/assets/60720014/c08a1a5d-7f58-4253-b192-16cb12ebc96d)


**Referências Bibliográficas**:

- [Organização das Nações Unidas (ONU). ONU pede a consumidores de moda mais reflexão antes de comprar](https://news.un.org/pt/story/2022/10/1804067))
- [Totvs. Kanban: conceito, como funciona, vantagens e implementação.](https://www.totvs.com/blog/negocios/kanban/#:~:text=O%20termo%20%E2%80%9CKanban%E2%80%9D%20%C3%A9%20de,ele%20se%20move%20pelo%20process)
- [Como Montar Uma Justificativa do TCC Com Apenas 4 Perguntas](https://guiadamonografia.com.br/como-montar-justificativa-do-tcc/#google_vignette)
- [Voluntas mostram como a doação de roupas pode ajudar as pessoas e o meio ambiente.](https://www.greenpeace.org/brasil/blog/voluntas-mostram-como-a-doacao-de-roupas-pode-ajudar-as-pessoas-e-o-meio-ambiente)
- [Transparência e prestação de contas ainda são desafios para doadores e organizações, aponta estudo.](https://gife.org.br/transparencia-e-prestacao-de-contas-ainda-sao-desafios-para-doadores-e-organizacoes-aponta-estudo)
