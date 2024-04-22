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

1. [Introdução](#introdução)
2. [Contexto](#contexto)
    - [Problema](#problema)
    - [Objetivos](#objetivos)
    - [Justificativa](#justificativa)
    - [Público-Alvo](#público-alvo)
3. [Concepção](#concepção)
    - [Especificações do Projeto](#especificações-do-projeto)
       - [Personas e Mapas de Empatia](#personas-e-mapas-de-empatia)
       - [Histórias de Usuários](#histórias-de-usuários)
       - [Requisitos](#requisitos)
          - [Requisitos Funcionais](#requisitos-funcionais)
          - [Requisitos não Funcionais](#requisitos-não-funcionais)
       - Projeto de Interfaces
          - User/Screen Flow 
          - Wireframes e Protótipo
4. [Metodologia](#metodologia)
    - [Ferramentas](#ferramentas)
    - [Gestão do Projeto](#gestao-do-projeto)
5. [Referências Bibliográficas](#referencias-bibliograficas)


# 1. Introdução 

O aumento significativo no consumo de roupas nos últimos anos tem contribuído significativamente para a poluição global, com o setor de vestuário sendo responsável por gerar de 2% a 8% do volume de emissões de dióxido de carbono (Programa de Nações Unidas para o Meio Ambiente - Pnuma, 2022). Diante deste cenário, diversas ONGs e instituições enfatizam a importância da doação de roupas como uma forma de reduzir o impacto ambiental e ajudar aqueles que mais necessitam. No entanto, para maximizar o alcance e eficácia das doações, é fundamental estabelecer uma comunicação eficaz entre os possíveis doadores e as instituições responsáveis pela recepção e distribuição das doações.

# 2. Contexto

## Problema

Muitas pessoas desejam doar roupas para ajudar aqueles em situação de vulnerabilidade, porém frequentemente enfrentam obstáculos no processo. A falta de informações transparentes sobre locais de doação, procedimentos para agendar as doações e a real necessidade das instituições beneficiadas pode desmotivar potenciais doadores. Paralelamente, organizações e indivíduos que dependem dessas doações enfrentam desafios para se conectar com doadores de forma eficiente e segura. Diante disso, o problema central que este projeto busca resolver é a carência de uma plataforma que facilite e centralize a conexão entre doadores e instituições, assegurando a confiabilidade, segurança e eficácia das doações realizadas.

## Objetivos

O objetivo geral deste trabalho é a criação de um Sistema Web que facilite e promova a doação de roupas de forma confiável e segura.

Como objetivos específicos, ressalta-se:
 - Elaborar um design intuitivo e responsivo para plataforma online de doação de roupas, assegurando a usabilidade e acessibilidade em diferentes dispositivos.
 - Implementar um sistema de cadastro seguro para os usuários interessados em doar e em receber doações, garantindo a proteção e privacidade de seus dados.
 - Integrar um sistema de localização para visualização dos pontos de coleta de ONGs e Instituições beneficiadas.
 - Integrar um sistema de agendamento de coletas, permitindo que os doadores escolham datas e horários convenientes para a retirada das doações.

## Justificativa

A cultura de doação  desempenha um papel crucial no fomento de uma sociedade mais justa e consciente. Através das doações, é possível não apenas auxiliar indivíduos em situação de vulnerabilidade, proporcionando-lhes dignidade e conforto, mas também promover a sustentabilidade ao incentivar o reuso de peças e reduzir o descarte inadequado, o que contribui significativamente para a preservação ambiental. Para efetivar o processo de doação de roupas de forma eficiente, é imprescindível estabelecer uma comunicação eficaz entre os potenciais doadores e as instituições receptoras das doações, que posteriormente repassam as peças às pessoas necessitadas. No entanto, o sistema atual é muitas vezes burocrático e ineficiente, desestimulando potenciais doadores. A criação de uma plataforma online dedicada à doação de roupas visa simplificar e agilizar esse processo, facilitando a conexão direta entre doadores e instituições e garantindo uma distribuição eficaz das doações.

## Público-Alvo

O público-alvo da plataforma de doação de roupas é bastante diversificado e composto por indivíduos interessados em realizar doações e instituições e ONGs que atuam com pessoas em situação de vulnerabilidade e que necessitam dessas contribuições. Os indivíduos que desejam doar roupas podem pertencer a diversas faixas etárias e backgrounds socioeconômicos. Em relação à hierarquia, esses doadores atuam de forma independente em suas ações de doação. Por outro lado, as instituições e ONGs beneficiadas pela plataforma incluem diversos tipos de organizações, tais como abrigos, instituições religiosas, centros de acolhimento e entidades de assistência social, entre outras.

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
|Flávio              |  cadastrar a ONG na plataforma.         | receber doações de roupas                     |                        
|Márcia              |  atualizar as necessidades de doação de | manter atualizada as informações sobre os     | 
|                    |  roupas da organização.                 | tipos e tamanhos de roupas mais necessários.  |                        
|Robson              |  acessar o histórico de doações da      | avaliar o impacto das contribuições e planejar|
|                    |  organização.                           | futuras campanhas de doação.                  |
|Amanda              |  me cadastrar na plataforma.            | encontrar pontos de coleta próximo para doar. |
|Jonas               |  agendar coleta da minha doação.        | para que as roupas sejam retiradas em minha   |
|                    |                                         | residência no horário conveniente.            |


## Requisitos

- Requisitos Funcionais (RF)
  
|ID    |            Descrição do Requisito                                                | Prioridade |
|------|----------------------------------------------------------------------------------|------------|
|RF-001| O site deve permitir que os usuários se cadastrem  no sistema, após preencher um |   ALTA     |
|      | um formulário. Além disso, é permitido ao usuário editar ou deletar seu cadastro.|            |
|RF-002| O site deve oferecer, durante o cadastro, a opção de ser pessoa física ou        |   ALTA     | 
|      | jurídica.                                                                        |            |
|RF-003| O site deve permitir ao usuário receptor escolher os tipos e tamanho de roupas   |   ALTA     | 
|      | que ele deseja doar.                                                             |            |
|RF-004| O site deve fornecer a localização dos pontos de coleta das organizações         |   ALTA     |
|      | cadastradas.                                                                     |            |
|RF-005| O site deve permitir ao usuário pessoa jurídica fazer solicitações de roupas com |   MÉDIA    |
|      | maiores demandas de doação.                                                      |            |
|RF-006| O site deve oferecer ao usuário pessoa física a opção de agendar  a doação.      |   MÉDIA    | 
|RF-007| O  site deve permitir visualizar o histórico de doações.                         |   BAIXA    |
|RF-008| O site deve fornecer um FAQ para sanar possíveis dúvidas do usuário.             |   BAIXA    |    

- Requisitos Não Funcionais (RNF)

|ID     |            Descrição do Requisito                     | Prioridade  |
|-------|-------------------------------------------------------|-------------|
|RNF-001| O site deve ser publicado em um ambiente acessível    |   ALTA      |
|       | publicamente na Internet.                             |             |
|RNF-002| O site deverá ser responsivo permitindo a visualização|   ALTA      |
|       | em dispositivéis móveis de forma adequada.            |             |
|RNF-003| O site não deve permitir que outros usuários alterem  |   ALTA      | 
|       | informações de outros perfis cadastrados.             |             |
|RNF-004| O site deve ser compatível com os principais          |   ALTA      |
|       | navegadores do mercado (Google Chrome, Firefox, Edge).|             |

## Projeto de Interface

### User Flow

![fluxo do usuário](https://github.com/ICEI-PUC-Minas-PMGCC-TI/ti-1-pmg-cc-t-20241-fios-de-bondade/assets/60720014/c68b2030-e653-4d73-ac81-e65d6aa39467)

### Wireframes
![tela apresentação](https://github.com/ICEI-PUC-Minas-PMGCC-TI/ti-1-pmg-cc-t-20241-fios-de-bondade/assets/60720014/d2f71288-4b0d-46f4-a429-21cb9d636069)
![cadastro pessa jurídica](https://github.com/ICEI-PUC-Minas-PMGCC-TI/ti-1-pmg-cc-t-20241-fios-de-bondade/assets/60720014/b298bd63-7518-4183-a91a-906af72c7f3a)
![cadastro pessa física](https://github.com/ICEI-PUC-Minas-PMGCC-TI/ti-1-pmg-cc-t-20241-fios-de-bondade/assets/60720014/38788e77-a0de-484b-b7c5-0cb25f7b1a51)
![login](https://github.com/ICEI-PUC-Minas-PMGCC-TI/ti-1-pmg-cc-t-20241-fios-de-bondade/assets/60720014/10d04039-3144-4d73-9b66-f3b4c6e207e7)
![tela principal](https://github.com/ICEI-PUC-Minas-PMGCC-TI/ti-1-pmg-cc-t-20241-fios-de-bondade/assets/60720014/f6867e7b-4e0c-4abf-8b76-87ae93504e98)
![tela doações](https://github.com/ICEI-PUC-Minas-PMGCC-TI/ti-1-pmg-cc-t-20241-fios-de-bondade/assets/60720014/45654002-5ccd-4672-9ccc-761eceddc2ae)



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
   - Utilização da ferramenta de controle de tarefas (Kanban).
     ![quadro_tarefas](https://github.com/ICEI-PUC-Minas-PMGCC-TI/ti-1-pmg-cc-t-20241-fios-de-bondade/assets/60720014/c08a1a5d-7f58-4253-b192-16cb12ebc96d)

## Controle de Versão




**Referências Bibliográficas**:

- [11 Passos Essenciais para Implantar Scrum no seu Projeto](https://mindmaster.com.br/scrum-11-passos/)
- [Scrum em 9 minutos](https://www.youtube.com/watch?v=XfvQWnRgxG0)
- [omo Montar Uma Justificativa do TCC Com Apenas 4 Perguntas](https://guiadamonografia.com.br/como-montar-justificativa-do-tcc/#google_vignette)

