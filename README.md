# 🚀 Portfólio Pessoal na AWS

Este repositório contém o código do meu **portfólio pessoal**, desenvolvido com foco em **arquitetura serverless**, automação de deploy e uso de **infraestrutura na AWS**.

O projeto hospeda um site estático com **formulário de contato funcional** e envio de e-mails utilizando serviços gerenciados.

## Desenvolvimento local

Requisitos: Node.js 18 ou superior e npm.

```powershell
npm install
npm run dev
```

O Vite exibirá o endereço local, normalmente `http://localhost:5173`.

Para testar a versão compilada localmente, execute `npm run build` e depois `npm run preview`.

## API Spring Boot

A camada em `src/services/api.js` usa `GET {VITE_API_BASE_URL}/projects` e `POST {VITE_API_BASE_URL}/contact`. Sem `VITE_API_BASE_URL`, os projetos usam os dados locais e o formulário continua enviando ao endpoint API Gateway atual. Para habilitar a API Spring Boot, crie `.env.local` com `VITE_API_BASE_URL=http://localhost:8080/api`.

O código React fica em `src/`; os estilos originais são importados de `web/css/style.css`, e imagens/PDFs são servidos de `web/assets/` pelo Vite.

O `buildspec.yml` seleciona Node.js 18, instala dependências, gera `dist/`, sincroniza esse diretório com o bucket S3 e invalida o CloudFront.

---

## 🌐 Visão Geral

✅ Site estático hospedado na AWS  
✅ Deploy automático a cada commit no GitHub  
✅ Backend serverless para formulário de contato  
✅ Infraestrutura provisionada na AWS

🔗 **Site:** https://yagowalter.com.br

---

## 🧰 Serviços AWS Utilizados

🔹 **Amazon S3** – armazenamento dos arquivos do site  
🔹 **Amazon CloudFront** – CDN para entrega global e HTTPS  
🔹 **Amazon Route 53** – gerenciamento de DNS e domínio  
🔹 **AWS CodePipeline** – deploy automático integrado ao GitHub  
🔹 **Amazon API Gateway + AWS Lambda** – backend serverless do formulário  
🔹 **Amazon SES** – envio de e-mails com domínio verificado

---

## 🏗️ Infraestrutura

A infraestrutura do projeto é baseada em **serviços gerenciados da AWS**, priorizando baixo custo, escalabilidade automática e ausência de servidores para manutenção.

---

## 📩 Formulário de Contato

📨 O formulário envia os dados para um endpoint do **API Gateway**, que aciona uma **função Lambda** responsável por validar as informações e disparar o e-mail via **Amazon SES**.

🔐 Comunicação via HTTPS  
⚙️ Sem servidores dedicados

---

## 🚀 Deploy

🤖 O deploy é realizado automaticamente pelo **AWS CodePipeline** sempre que há um novo commit no repositório GitHub, atualizando o site hospedado no S3 e distribuído pelo CloudFront.

---

## 🎯 Objetivo do Projeto

🎓 Consolidar conhecimentos em AWS e arquitetura serverless  
🧩 Aplicar boas práticas de automação  
🌍 Criar um portfólio funcional, escalável e de baixo custo

---
