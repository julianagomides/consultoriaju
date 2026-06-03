(function () {
  var email = "julianac.gomides@gmail.com";
  var copyButton = document.querySelector("[data-copy-email]");
  var status = document.querySelector(".copy-status");
  var contactForm = document.querySelector("#contact-form");

  function setStatus(message) {
    if (status) {
      status.textContent = message;
    }
  }

  if (copyButton) {
    copyButton.addEventListener("click", function () {
      var emailToCopy = copyButton.getAttribute("data-copy-email") || email;

      if (!navigator.clipboard) {
        setStatus("Se o botão não funcionar aqui, o e-mail está logo acima para copiar.");
        return;
      }

      navigator.clipboard.writeText(emailToCopy).then(function () {
        setStatus("E-mail copiado. Agora é só começar pelo começo.");
      }).catch(function () {
        setStatus("Não consegui copiar automaticamente, mas o e-mail está visível logo acima.");
      });
    });
  }

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!contactForm.reportValidity()) {
        return;
      }

      var formData = new FormData(contactForm);
      var subject = "Quero entender meu caminho na Consultoria Ju Campos";
      var body = [
        "Oi, Ju.",
        "",
        "Quero entender qual caminho da consultoria faz sentido para meu momento.",
        "",
        "Nome: " + formData.get("nome"),
        "Contato: " + formData.get("contato"),
        "Área de atuação: " + formData.get("area"),
        "",
        "Momento ou desafio:",
        formData.get("desafio"),
        "",
        "Entendo que esses dados serão usados apenas para retorno comercial."
      ].join("\n");

      window.location.href = "mailto:" + email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
      setStatus("Abrindo seu e-mail com a mensagem preenchida. Se não abrir, use WhatsApp ou copie o e-mail.");
    });
  }
}());
