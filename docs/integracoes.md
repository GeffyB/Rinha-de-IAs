# Integrações de IA para Rinha de IAs

Este documento lista as opções de integração com modelos de IA para o projeto Rinha de IAs.

## 1. DeepSeek API

- **Descrição**: Oferece modelos avançados compatíveis com o formato da OpenAI API.
- **Base URL**: `https://api.deepseek.com/v1`
- **Autenticação**: Requer chave de API.
- **Modelos Disponíveis**:
  - `deepseek-chat`: Modelo generalista para conversação.
  - `deepseek-reasoner`: Focado em raciocínio lógico e tarefas matemáticas.
- **Documentação**: [DeepSeek API Docs](https://api-docs.deepseek.com/)

## 2. OpenRouter

- **Descrição**: Plataforma que fornece acesso unificado a diversos modelos de IA através de uma única API.
- **Base URL**: `https://openrouter.ai/api/v1`
- **Autenticação**: Requer chave de API.
- **Modelos Disponíveis**: Mais de 300 modelos, incluindo `deepseek/deepseek-r1`.
- **Documentação**: [OpenRouter API Docs](https://openrouter.ai/docs/quickstart)

## 3. Hugging Face Inference API

- **Descrição**: Oferece uma ampla gama de modelos de IA para diversas tarefas.
- **Base URL**: `https://api-inference.huggingface.co/models/{model_name}`
- **Autenticação**: Requer token de API.
- **Modelos Disponíveis**: Diversos modelos open-source, como `gpt2`, `bert-base-uncased`, entre outros.
- **Documentação**: [Hugging Face Inference API Docs](https://huggingface.co/docs/api-inference/en/index)

## 4. Integração com OpenRouter

A IA padrão atualmente utilizada no MVP é o modelo gratuito da DeepSeek, via OpenRouter.

- **ID usado**: `deepseek/deepseek-r1:free`
- **Limite de tokens**: ~666 (plano gratuito)
- **max_tokens configurado**: 300

Para trocar o modelo ou aumentar o limite:
- Atualize o mapeamento de modelos no arquivo `fight.js`
- Altere o campo `max_tokens` em `proxy-ia.js`