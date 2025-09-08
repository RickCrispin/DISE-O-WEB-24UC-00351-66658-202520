document.addEventListener('DOMContentLoaded', () => {
  console.log("✅ script.js cargado correctamente");

  // ------------ Header scroll efecto ------------
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scroll');
    } else {
      header.classList.remove('scroll');
    }
  });

  // ------------ Animación al hacer scroll ------------
  const secciones = document.querySelectorAll('section');
  const mostrarSeccionesVisibles = () => {
    const windowHeight = window.innerHeight;
    const triggerPoint = windowHeight * 0.8;
    secciones.forEach(sec => {
      const secTop = sec.getBoundingClientRect().top;
      if (secTop < triggerPoint) {
        sec.classList.add('mostrar');
      }
    });
  };
  mostrarSeccionesVisibles();
  window.addEventListener('scroll', mostrarSeccionesVisibles);

  // ------------ Validación del formulario ------------
  const formulario = document.getElementById('formulario-contacto');
  if (formulario) {
    formulario.addEventListener('submit', function (e) {
      e.preventDefault();
      const nombre = document.getElementById('nombre')?.value.trim();
      const correo = document.getElementById('correo')?.value.trim();
      const mensaje = document.getElementById('mensaje')?.value.trim();
      if (!nombre || !correo || !mensaje) {
        mostrarMensaje('Por favor, complete todos los campos requeridos.', 'error');
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(correo)) {
        mostrarMensaje('Por favor, introduce un correo electrónico válido.', 'error');
        return;
      }
      const btnEnviar = formulario.querySelector('.btn-enviar');
      btnEnviar.disabled = true;
      btnEnviar.innerHTML = 'Enviando... <i class="fas fa-spinner fa-spin"></i>';
      setTimeout(() => {
        mostrarMensaje(`¡Gracias ${nombre}! Tu mensaje ha sido enviado correctamente.`, 'exito');
        formulario.reset();
        btnEnviar.disabled = false;
        btnEnviar.textContent = 'Enviar mensaje';
      }, 1500);
    });
  }
  function mostrarMensaje(texto, tipo) {
    const alerta = document.createElement('div');
    alerta.className = `alert alert-${tipo === 'exito' ? 'success' : 'danger'} alert-dismissible fade show`;
    alerta.innerHTML = `
      <strong>${tipo === 'exito' ? '¡Éxito!' : 'Error'}</strong> ${texto}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    const seccionContacto = document.getElementById('contacto');
    seccionContacto.prepend(alerta);
    setTimeout(() => {
      alerta.classList.remove('show');
      alerta.addEventListener('transitionend', () => alerta.remove());
    }, 5000);
  }

  // ------------ Animaciones adicionales (solo elementos visibles) ------------
  const elementosAnimados = document.querySelectorAll('.contacto-metodo, .categoria-habilidad');
  const animarElementos = () => {
    const windowHeight = window.innerHeight;
    elementosAnimados.forEach((el, index) => {
      const elTop = el.getBoundingClientRect().top;
      const elVisible = 150;
      if (elTop < windowHeight - elVisible) {
        setTimeout(() => {
          el.classList.add('mostrar');
        }, index * 100);
      }
    });
  };
  window.addEventListener('scroll', animarElementos);
  animarElementos();

  // ------------ Animación de máquina de escribir para el saludo inicial ------------
  // Typewriter effect
  const typewriterText = "¡Hola! Soy Rick";
  const typewriterElement = document.getElementById('typewriter-text');
  if (typewriterElement) {
    let i = 0;
    function typeWriter() {
      if (i < typewriterText.length) {
        typewriterElement.textContent += typewriterText.charAt(i);
        i++;
        setTimeout(typeWriter, 70);
      }
    }
    typeWriter();
  }
});
