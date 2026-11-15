# Ligar o briefing à planilha

Tempo: uns 5 minutos. Faça com a conta Google em que a planilha vai morar.

| # | Passo |
|---|---|
| 1 | Abra sheets.new e dê o nome "briefings lorenna do mkt". |
| 2 | Menu Extensões > Apps Script. |
| 3 | Apague o código que aparece, cole o conteúdo de `Code.gs` e salve. |
| 4 | Implantar > Nova implantação > tipo "App da Web". |
| 5 | Executar como: **eu**. Quem tem acesso: **qualquer pessoa**. Implantar e autorizar o acesso quando o Google pedir. |
| 6 | Copie o endereço que termina em `/exec`. |
| 7 | No `index.html` do site, ache `var ENDPOINT = "";` e cole o endereço entre as aspas. |
| 8 | Suba o site de novo (GitHub Pages). |
| 9 | Preencha o briefing no site publicado como teste. Deve nascer a aba `briefings` com uma linha. |

## Aviso a cada briefing novo

O `Code.gs` já avisa sozinho, sem configurar nada:

| Canal | Como funciona |
|---|---|
| E-mail | Chega no Gmail da conta que implantou o script, com nome, WhatsApp, serviços, link `wa.me` para responder e o resumo completo. Com o app do Gmail no celular, vira notificação na hora. |
| WhatsApp | Opcional, via CallMeBot. Só liga se as duas propriedades abaixo existirem. |

No primeiro envio o Google pede autorização para o script mandar e-mail. Aceite (Avançado > Acessar o projeto).

**WhatsApp pelo CallMeBot (grátis, uso pessoal)**

1. Siga o passo a passo em callmebot.com/blog/free-api-whatsapp-messages/ para ativar o seu número e receber a chave (apikey). Na última conferência o bot estava lotado e sem número disponível; se estiver assim, tente de novo em alguns dias.
2. No Apps Script: Configurações do projeto > Propriedades do script > Adicionar:
   - `CALLMEBOT_FONE` = seu número com país, ex.: `+5511937799557`
   - `CALLMEBOT_CHAVE` = a chave que o bot mandou
3. Pronto. Cada briefing novo manda uma mensagem curta (nome, WhatsApp, serviços e link para responder). O resumo completo fica na planilha e no e-mail.

Limites do CallMeBot: é gratuito só para uso pessoal, não tem garantia de entrega, e a mensagem passa pelo servidor dele (nome e WhatsApp de quem preencheu). Para algo confiável e oficial, o caminho é o Twilio (WhatsApp Business API), que é pago e pede cadastro e aprovação do número.

Observações:

- A aba `briefings` é criada sozinha no primeiro envio, com uma coluna por pergunta e a coluna `status` começando em "novo".
- Se mudar o `Code.gs` depois, é preciso Implantar > Gerenciar implantações > editar > nova versão. O endereço continua o mesmo.
- O site não mostra se o envio funcionou no servidor (o navegador bloqueia a leitura da resposta). Por isso o teste do passo 9 é obrigatório.
- Enquanto o `ENDPOINT` estiver vazio, o site entrega o briefing pronto para mandar no WhatsApp.
- A planilha guarda nome e WhatsApp de terceiros. Mantenha ela privada e só com você.
