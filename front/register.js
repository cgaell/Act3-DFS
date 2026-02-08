document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registerForm');
  const msg = document.getElementById('registerMessage');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    msg.textContent = '';
    try {
      const payload = {
        username: document.getElementById('regUsername').value.trim(),
        password: document.getElementById('regPassword').value
      };
      const res = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok) {
        msg.textContent = data.message || 'Registro exitoso';
        msg.style.color = 'lightgreen';
      } else {
        msg.textContent = data.error || 'Registro inválido';
        msg.style.color = '#E74C3C';
      }
    } catch {
      msg.textContent = 'Error conectando al servidor';
      msg.style.color = '#E74C3C';
    }
  });
});
