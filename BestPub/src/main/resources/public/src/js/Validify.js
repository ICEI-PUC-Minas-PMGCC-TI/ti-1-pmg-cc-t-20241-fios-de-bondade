class Validify {
  constructor() {
    this.containerError = document.querySelectorAll(".container-error");
  }

  verificaEmail(email) {
    // Verifica se o email está no formato válido:
    // - Deve conter caracteres alfanuméricos, '.', '_', '%', '+', e '-'.
    // - Deve haver exatamente um '@'.
    // - Após o '@', deve ter um domínio que pode conter caracteres alfanuméricos, '.' e '-'.
    // - Deve terminar com um TLD (Top Level Domain) de pelo menos duas letras.
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  // Verifica se o nome contém apenas letras e espaços, e se não está vazio
  verificaNome(name) {
    const namePattern = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
    return namePattern.test(name) && name.trim() !== "";
  }

  // Verifica se a senha tem pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula e um número
  verificaSenha(password) {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordPattern.test(password);
  }

  confirmaSenha(password, checkPassword) {
    let resp;
    if (password === checkPassword) {
      resp = true;
    } else {
      resp = false;
    }

    return resp;
  }

  enviarErro(input) {
    if (input == "email") {
      return `
        <div style="color: red; background-color: white; margin-top: .1em; font-size: 12px">
          <p><strong>ATENÇÃO:</strong> O seu email deve conter @, .com | Ex: exemplo@email.com.</p>
        </div>
      `;
    }

    if (input == "nome") {
      return `
        <div style="color: red; background-color: white; margin-top: .1em; font-size: 12px">
          <p><strong>ATENÇÃO:</strong> O seu nome deve conter apenas espaços e letras. | Ex: João Paulo</p>
        </div>
      `;
    }

    if (input == "senha") {
      return `
        <div style="color: red; background-color: white; margin-top: .1em; font-size: 12px">
          <p><strong>ATENÇÃO:</strong> Sua senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula e um número</p>
        </div>
      `;
    }

    if (input == "confirmaSenha") {
      return `
        <div style="color: red; background-color: white; margin-top: .1em; font-size: 12px">
          <p><strong>ATENÇÃO:</strong> Sua senha deve ser a mesma do campo acima</p>
        </div>
      `;
    }

    if (input == "login") {
      return `
        <div style="color: red; background-color: white; margin-top: .1em; font-size: 12px">
          <p><strong>ATENÇÃO:</strong> Login ou senha incorretos</p>
        </div>
      `;
    }
  }
}
