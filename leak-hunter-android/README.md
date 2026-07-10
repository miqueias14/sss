# Leak Hunter Stats Android

Projeto Android pronto para GitHub e preparado para build automatico sem Android Studio.

## O que esta incluido

- app Android nativo em Kotlin
- WebView carregando o app local em `assets`
- tema escuro estilo dashboard
- icone inicial simples
- workflow do GitHub Actions para gerar `.apk` e `.aab`

## Como subir para o GitHub

1. Crie um repositorio novo no GitHub.
2. Envie todo o conteudo desta pasta.
3. Use a branch `main`.

## Como gerar o app sem Android Studio

1. Suba o projeto para o GitHub.
2. Abra a aba `Actions`.
3. Rode o workflow `Android Build`.
4. Ao final, baixe os artefatos:
   - `leak-hunter-debug-apk`
   - `leak-hunter-release-aab`

## Onde esta a automacao

- `.github/workflows/android-build.yml`

Ela gera:

- APK de teste para instalar no celular
- AAB de release para seguir para a Play Store

## Importante sobre Play Store

O `.aab` gerado hoje e de release, mas para publicacao real na Play Store o ideal e assinar com a sua chave definitiva.

Antes de publicar de verdade, recomendo:

- trocar o icone por um final de marca
- revisar nome do pacote e versao
- criar politica de privacidade
- adicionar screenshots reais
- configurar assinatura definitiva do app

## Proximo passo

Se voce quiser, eu posso configurar o workflow para usar segredos do GitHub e gerar o `.aab` ja assinado para a Play Store.
