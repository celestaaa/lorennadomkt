// Recebe o briefing do site e grava uma linha por envio na planilha.
// Cole este arquivo em Extensões > Apps Script, dentro da planilha.

var ABA = "briefings";
var COLUNAS = [
  "data", "nome", "whatsapp", "email", "instagram", "perfil_tipo", "ramo", "servicos",
  "plan_situacao", "plan_redes", "rot_qtd", "rot_grava", "rot_tom",
  "ed_qtd", "ed_material", "ed_duracao", "ed_ref",
  "de_qtd", "de_formato", "de_identidade", "av_itens", "av_qtd",
  "si_tipo", "si_dominio", "objetivo", "inicio", "plano", "permuta", "permuta_oque",
  "referencias", "mensagem", "tempo", "origem", "status"
];

function limpa(v) {
  v = String(v == null ? "" : v).slice(0, 2000);
  // evita que a planilha trate o texto como fórmula
  return /^[=+\-@]/.test(v) ? "'" + v : v;
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
    var p = (e && e.parameter) || {};
    if (p.empresa_site) return saida("ok");               // isca anti-robô
    if (!p.nome || !p.whatsapp) return saida("faltou");
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var aba = ss.getSheetByName(ABA);
    if (!aba) {
      aba = ss.insertSheet(ABA);
      aba.appendRow(COLUNAS);
      aba.setFrozenRows(1);
      aba.getRange(1, 1, 1, COLUNAS.length).setFontWeight("bold");
    }
    var linha = COLUNAS.map(function (c) {
      if (c === "data") return Utilities.formatDate(new Date(), "America/Sao_Paulo", "dd/MM/yyyy HH:mm");
      if (c === "status") return "novo";
      return limpa(p[c]);
    });
    aba.appendRow(linha);
    notificar(p);
    return saida("ok");
  } catch (err) {
    return saida("erro");
  } finally {
    try { lock.releaseLock(); } catch (x) {}
  }
}

// Avisa a dona do script a cada briefing novo.
// 1) E-mail para a conta Google que implantou o script (sempre).
// 2) WhatsApp via CallMeBot, só se as propriedades CALLMEBOT_FONE e CALLMEBOT_CHAVE existirem.
// Falha de aviso nunca derruba o registro na planilha.
function notificar(p) {
  var nome = String(p.nome || "").replace(/[\r\n]+/g, " ").slice(0, 80);
  var zap = String(p.whatsapp || "").replace(/[\r\n]+/g, " ").slice(0, 30);
  var dig = zap.replace(/\D/g, "");
  var link = dig ? "https://wa.me/" + (dig.length <= 11 ? "55" + dig : dig) : "";
  var curto = "Novo briefing: " + nome + "\nWhatsApp: " + zap + "\nServiços: " +
    String(p.servicos || "").slice(0, 200) + (link ? "\nResponder: " + link : "");
  try {
    MailApp.sendEmail(
      Session.getEffectiveUser().getEmail(),
      "Novo briefing: " + nome,
      curto + "\n\n" + String(p.resumo || "").slice(0, 3000) +
        "\n\nPlanilha: " + SpreadsheetApp.getActiveSpreadsheet().getUrl()
    );
  } catch (e) {}
  try {
    var props = PropertiesService.getScriptProperties();
    var fone = props.getProperty("CALLMEBOT_FONE");
    var chave = props.getProperty("CALLMEBOT_CHAVE");
    if (fone && chave) {
      UrlFetchApp.fetch(
        "https://api.callmebot.com/whatsapp.php?phone=" + encodeURIComponent(fone) +
          "&text=" + encodeURIComponent(curto) + "&apikey=" + encodeURIComponent(chave),
        { muteHttpExceptions: true }
      );
    }
  } catch (e) {}
}

function doGet() { return saida("ok"); }

function saida(t) {
  return ContentService.createTextOutput(t).setMimeType(ContentService.MimeType.TEXT);
}
