export function renderLoginPage({ csrf }: { csrf: string }): string {
  const escaped = csrf.replace(/[&<>"']/g, (c) => {
    const map: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };
    return map[c] ?? c;
  });

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Entrar no Kiip</title>
  <style>
    :root {
      /* Kiip brand tokens (from frontend/src/designSystem/Tokens/colors.ts) */
      --black: #12161A;
      --darkest: #181D22;
      --darker: #1E242B;
      --dark: #242B33;
      --cloudy: #525C66;
      --clear: #A3AEBF;
      --lighter: #DFE7F2;
      --sky: #EFEEFD;

      --grape-dark: #4B44C1;
      --grape: #5A52E8;
      --grape-light: #ACA8F3;

      --danger: #EB144C;
    }
    * { box-sizing: border-box; }
    html, body {
      margin: 0; padding: 0; height: 100%;
      background: var(--darkest);
      color: var(--lighter);
      font-family: system-ui, -apple-system, 'SF Pro Text', 'Segoe UI', sans-serif;
      font-size: 15px;
    }
    body {
      display: flex; align-items: center; justify-content: center;
      background:
        radial-gradient(circle at 20% 10%, rgba(90,82,232,0.18), transparent 40%),
        radial-gradient(circle at 85% 90%, rgba(75,68,193,0.14), transparent 45%),
        var(--darkest);
    }
    main {
      width: 100%; max-width: 380px;
      background: var(--darker);
      border: 1px solid var(--dark);
      border-radius: 16px;
      padding: 32px 28px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.45);
    }
    .brand {
      display: flex; align-items: center; justify-content: center;
      margin-bottom: 6px;
    }
    .brand svg {
      display: block;
      height: 32px; width: auto;
    }
    h1 {
      font-size: 14px; font-weight: 500; color: var(--clear);
      text-align: center; margin: 0 0 26px 0; letter-spacing: -0.005em;
    }
    label {
      display: block; font-size: 12px; color: var(--clear);
      margin: 14px 0 6px; font-weight: 500;
    }
    .field { position: relative; }
    input[type="email"], input[type="password"], input[type="text"] {
      width: 100%; padding: 11px 12px;
      background: var(--dark);
      border: 1px solid var(--dark);
      color: var(--lighter);
      border-radius: 8px; font-size: 14px;
      outline: none;
      transition: border-color .15s ease, box-shadow .15s ease, background .15s ease;
    }
    input::placeholder { color: var(--cloudy); }
    input:focus {
      border-color: var(--grape);
      background: var(--dark);
      box-shadow: 0 0 0 3px rgba(90,82,232,0.25);
    }
    .toggle {
      position: absolute; right: 8px; top: 50%; transform: translateY(-50%);
      background: transparent; border: 0; color: var(--clear);
      cursor: pointer; padding: 4px 8px; font-size: 12px;
      border-radius: 6px;
      transition: color .15s ease, background .15s ease;
    }
    .toggle:hover { color: var(--lighter); background: rgba(255,255,255,0.04); }
    button.primary {
      width: 100%; margin-top: 20px; padding: 12px;
      background: var(--grape);
      color: white; font-weight: 600; font-size: 14px;
      border: 0; border-radius: 8px; cursor: pointer;
      transition: background .15s ease, transform .05s ease, box-shadow .15s ease;
      box-shadow: 0 6px 16px rgba(90,82,232,0.35);
    }
    button.primary:hover { background: var(--grape-dark); }
    button.primary:active { transform: translateY(1px); }
    button.primary:disabled {
      opacity: 0.55; cursor: not-allowed; box-shadow: none;
      background: var(--grape-dark);
    }
    #error {
      display: none; margin: 14px 0 0;
      padding: 10px 12px; border-radius: 8px;
      background: rgba(235,20,76,0.10);
      border: 1px solid rgba(235,20,76,0.30);
      color: #F589A5; font-size: 13px;
    }
    #success {
      display: none; text-align: center; padding: 12px 0;
    }
    #success .check {
      display: inline-flex; align-items: center; justify-content: center;
      width: 56px; height: 56px; border-radius: 50%;
      background: rgba(90,82,232,0.15);
      color: var(--grape);
      font-size: 30px; font-weight: 600; margin-bottom: 12px;
    }
    #success .heading { font-size: 16px; font-weight: 600; color: var(--lighter); margin-bottom: 4px; }
    #success p { color: var(--clear); margin: 6px 0 20px; font-size: 13px; }
    .close {
      display: inline-block; padding: 8px 16px; font-size: 13px;
      background: transparent; color: var(--lighter);
      border: 1px solid var(--dark); border-radius: 8px; cursor: pointer;
      transition: border-color .15s ease, background .15s ease;
    }
    .close:hover { border-color: var(--grape); background: rgba(90,82,232,0.08); }
  </style>
</head>
<body>
  <main data-csrf="${escaped}">
    <div class="brand" aria-label="Kiip">
      <svg width="80" height="40" viewBox="0 0 64 32" fill="none" xmlns="http://www.w3.org/2000/svg" role="img">
        <title>Kiip</title>
        <path d="M63.6676 14.0138L60.3502 12.2258C60.0623 12.0685 59.6993 12.1629 59.524 12.4462C57.9092 15.0651 49.691 26.9699 33.6114 26.9699C18.8399 26.9699 12.0613 15.8646 9.53261 12.0999L13.2943 5.9996C13.5509 5.5778 13.2505 5.03639 12.7623 5.03639H8.96303C8.76273 5.03639 8.56871 5.13712 8.44979 5.3008L5.00728 10.4568V0.698794C5.00728 0.352542 4.72562 0.0692444 4.38137 0.0692444H0.62591C0.281659 0.0692444 0 0.352542 0 0.698794V19.6419C0 19.9882 0.281659 20.2715 0.62591 20.2715H4.38137C4.72562 20.2715 5.00728 19.9882 5.00728 19.6419V14.3348C7.62984 18.4143 15.7604 32 33.6114 32C52.6578 32 62.0715 17.9673 63.9117 14.8825C64.0932 14.5741 63.9868 14.1774 63.6676 14.0075V14.0138Z" fill="#5A52E8"/>
        <path d="M44.0641 16.8279H46.4488C50.9491 16.8279 54.8235 13.359 55.0488 8.83887C55.2867 4.01023 51.4436 0 46.6929 0H44.69C44.3458 0 44.0641 0.283297 44.0641 0.629549V5.03639H39.6827C39.3385 5.03639 39.0568 5.31969 39.0568 5.66594V19.7175C39.0568 20.0637 39.3385 20.347 39.6827 20.347H43.4382C43.7824 20.347 44.0641 20.0637 44.0641 19.7175V16.8279ZM50.0478 8.41078C50.0478 10.2742 48.5394 11.7915 46.6867 11.7915H44.0578V5.03639H46.6867C48.5394 5.03639 50.0478 6.55361 50.0478 8.41708V8.41078Z" fill="#5A52E8"/>
        <path d="M23.3842 8.82629H19.6287C19.283 8.82629 19.0028 9.10815 19.0028 9.45584V19.7175C19.0028 20.0652 19.283 20.347 19.6287 20.347H23.3842C23.7299 20.347 24.0101 20.0652 24.0101 19.7175V9.45584C24.0101 9.10815 23.7299 8.82629 23.3842 8.82629Z" fill="#5A52E8"/>
        <path d="M33.3987 8.82629H29.6432C29.2976 8.82629 29.0173 9.10815 29.0173 9.45584V19.7175C29.0173 20.0652 29.2976 20.347 29.6432 20.347H33.3987C33.7444 20.347 34.0246 20.0652 34.0246 19.7175V9.45584C34.0246 9.10815 33.7444 8.82629 33.3987 8.82629Z" fill="#5A52E8"/>
        <path d="M23.3842 0H19.6287C19.283 0 19.0028 0.281859 19.0028 0.629549V4.40685C19.0028 4.75454 19.283 5.0364 19.6287 5.0364H23.3842C23.7299 5.0364 24.0101 4.75454 24.0101 4.40685V0.629549C24.0101 0.281859 23.7299 0 23.3842 0Z" fill="#5A52E8"/>
        <path d="M33.3987 0H29.6432C29.2976 0 29.0173 0.281859 29.0173 0.629549V4.40685C29.0173 4.75454 29.2976 5.0364 29.6432 5.0364H33.3987C33.7444 5.0364 34.0246 4.75454 34.0246 4.40685V0.629549C34.0246 0.281859 33.7444 0 33.3987 0Z" fill="#5A52E8"/>
      </svg>
    </div>
    <form id="form" novalidate>
      <label for="email">Email</label>
      <div class="field">
        <input id="email" name="email" type="email" autocomplete="username" required autofocus />
      </div>
      <label for="password">Senha</label>
      <div class="field">
        <input id="password" name="password" type="password" autocomplete="current-password" required />
        <button type="button" class="toggle" id="reveal" aria-label="Mostrar senha">Mostrar</button>
      </div>
      <button type="submit" class="primary" id="submit">Entrar</button>
      <div id="error" role="alert"></div>
    </form>
    <div id="success">
      <div class="check">✓</div>
      <div class="heading">Logado</div>
      <p>Você pode fechar esta aba.</p>
      <button class="close" onclick="window.close()">Fechar</button>
    </div>
  </main>
  <script>
    (function() {
      var csrf = document.querySelector('main').getAttribute('data-csrf');
      var form = document.getElementById('form');
      var submit = document.getElementById('submit');
      var err = document.getElementById('error');
      var success = document.getElementById('success');
      var reveal = document.getElementById('reveal');
      var pw = document.getElementById('password');

      reveal.addEventListener('click', function() {
        pw.type = pw.type === 'password' ? 'text' : 'password';
        reveal.textContent = pw.type === 'password' ? 'Mostrar' : 'Ocultar';
      });

      form.addEventListener('submit', async function(ev) {
        ev.preventDefault();
        err.style.display = 'none';
        submit.disabled = true;
        submit.textContent = 'Entrando...';
        try {
          var res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-CSRF': csrf },
            body: JSON.stringify({
              email: document.getElementById('email').value,
              password: pw.value,
            }),
          });
          var data = await res.json().catch(function() { return {}; });
          if (res.ok && data.ok) {
            form.style.display = 'none';
            success.style.display = 'block';
          } else {
            err.textContent = data.message || 'Falha ao entrar.';
            err.style.display = 'block';
            submit.disabled = false;
            submit.textContent = 'Entrar';
          }
        } catch (e) {
          err.textContent = 'Erro de rede. Tente de novo.';
          err.style.display = 'block';
          submit.disabled = false;
          submit.textContent = 'Entrar';
        }
      });
    })();
  </script>
</body>
</html>`;
}
