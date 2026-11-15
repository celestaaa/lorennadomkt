# Publicar o site no GitHub Pages (domínio gratuito)

Quem faz: seu namorado, com a conta GitHub dele ou a sua.
Endereço final: `https://USUARIO.github.io` (ou `https://USUARIO.github.io/NOME-DO-REPO`).

## Arquivos

`Downloads\lorennadomkt-site.zip` (12 MB). Extrair antes de usar. Dentro: `index.html`, `foto.png`, `carteira.png`, `fonts/`, `capas/` (105 imagens) e `.nojekyll`.

## Passo a passo

| # | O que fazer |
|---|---|
| 1 | Criar o repositório no GitHub, público. Nome `USUARIO.github.io` dá o endereço mais limpo (sem `/nome` no final). |
| 2 | Subir **o conteúdo** da pasta extraída, com o `index.html` na raiz do repositório (não a pasta dentro de outra pasta). |
| 3 | Settings > Pages > Source: "Deploy from a branch", branch `main`, pasta `/ (root)`. Salvar. |
| 4 | Esperar 1 a 3 minutos e abrir o endereço. |

Aviso: o envio de arquivos pelo navegador do GitHub aceita no máximo 100 arquivos por vez, e o site tem 110. Por isso use git no terminal (abaixo) ou o GitHub Desktop.

```bash
cd caminho/da/pasta/extraida
git init -b main
git add .
git commit -m "site lorenna do mkt"
git remote add origin https://github.com/USUARIO/NOME-DO-REPO.git
git push -u origin main
```

## Atualizar depois

Trocar o arquivo na pasta, depois `git add .`, `git commit -m "atualiza"`, `git push`. O site atualiza sozinho em 1 a 3 minutos.

## Ligar o formulário

Só depois do site no ar: siga `COMO-LIGAR.md` (planilha + Apps Script), cole a URL `/exec` em `var ENDPOINT = "";` dentro do `index.html`, e suba de novo. Sem isso, o briefing só sai pelo WhatsApp.

## Domínio próprio (opcional, pago)

Comprar em registro.br (`.com.br`, uns R$ 40 por ano), depois Settings > Pages > Custom domain. O domínio fica no nome dela.

## Conferir depois de publicar

- Capa carrega com a fonte Bootzy, foto e estrelas girando.
- Botão "serviços e valores" abre o PDF no Google Drive (link público, não está no repositório).
- Capas dos trabalhos aparecem e cada uma abre o post no Instagram.
- Menu leva a cada seção. Abrir no celular também.
- Briefing: preencher como teste e ver se a linha entra na planilha.
