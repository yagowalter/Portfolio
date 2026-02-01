# 🚀 Portfólio Pessoal na AWS

Este repositório contém o código do meu **portfólio pessoal**, desenvolvido com foco em **arquitetura serverless**, automação de deploy e uso de **infraestrutura na AWS**.

O projeto hospeda um site estático com **formulário de contato funcional** e envio de e-mails utilizando serviços gerenciados.

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
