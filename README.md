🚀 Portfólio Pessoal na AWS

Este repositório contém o código e a infraestrutura do meu portfólio pessoal, desenvolvido com foco em arquitetura serverless, automação de deploy e infraestrutura como código (IaC).

O projeto hospeda um site estático com formulário de contato funcional e envio de e-mails utilizando serviços gerenciados da AWS.

🌐 Visão Geral

✅ Site estático hospedado na AWS
✅ Deploy automático a cada commit no GitHub
✅ Backend serverless para formulário de contato
✅ Infraestrutura definida como código (IaC)

🔗 Site: https://yagowalter.com.br

🧰 Serviços AWS Utilizados

🔹 Amazon S3 – armazenamento dos arquivos do site
🔹 Amazon CloudFront – CDN para entrega global e HTTPS
🔹 Amazon Route 53 – gerenciamento de DNS e domínio
🔹 AWS CloudFormation – definição da infraestrutura como código
🔹 AWS CodePipeline – deploy automático integrado ao GitHub
🔹 Amazon API Gateway + AWS Lambda – backend serverless do formulário
🔹 Amazon SES – envio de e-mails com domínio verificado

🏗️ Infraestrutura (IaC)

A infraestrutura do projeto é definida com AWS CloudFormation, permitindo versionamento, reprodutibilidade e automação do ambiente.

📁 Estrutura do repositório:

/
├── site/            # HTML, CSS, JS e assets
├── lambda/          # Função Lambda do formulário
├── infra/           # Templates CloudFormation
│   ├── s3.yaml
│   ├── cloudfront.yaml
│   ├── api-gateway.yaml
│   ├── lambda.yaml
│   └── ses.yaml
└── README.md


📌 Os templates provisionam:

hospedagem estática no S3

distribuição via CloudFront

endpoint HTTP via API Gateway

execução da função Lambda

envio de e-mails via Amazon SES

📩 Formulário de Contato

📨 O formulário envia os dados para um endpoint do API Gateway, que aciona uma função Lambda responsável por validar as informações e disparar o e-mail via Amazon SES.

🔐 Comunicação via HTTPS
⚙️ Sem servidores dedicados

🚀 Deploy & Automação

🤖 O deploy é feito automaticamente pelo AWS CodePipeline sempre que há um novo commit no repositório GitHub, atualizando o conteúdo hospedado no S3 e distribuído pelo CloudFront.

🎯 Objetivo do Projeto

🎓 Consolidar conhecimentos em AWS e arquitetura serverless
🧩 Aplicar boas práticas de automação e infraestrutura como código
🌍 Criar um portfólio funcional, escalável e de baixo custo