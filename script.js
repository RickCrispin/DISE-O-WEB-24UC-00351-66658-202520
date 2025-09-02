document.addEventListener('DOMContentLoaded', () => {
  console.log("✅ script.js cargado correctamente");

  // ------------ Menú móvil con Bootstrap Collapse ------------
  const menuToggle = document.querySelector('.navbar-toggler');
  const navMenu = document.querySelector('#navbarNav');

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('show'); // Bootstrap utiliza la clase 'show' para el colapso
    });
  }

  // Cerrar menú al hacer clic en un enlace
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('show')) {
        navMenu.classList.remove('show');
      }
    });
  });

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
  const barrasProgreso = document.querySelectorAll('.barra-interior');

  const mostrarSeccionesVisibles = () => {
    const windowHeight = window.innerHeight;
    const triggerPoint = windowHeight * 0.8;

    secciones.forEach(sec => {
      const secTop = sec.getBoundingClientRect().top;
      if (secTop < triggerPoint) {
        sec.classList.add('mostrar');

        // Animar barras de progreso si están en la sección de habilidades
        if (sec.id === 'habilidades' && barrasProgreso.length > 0) {
          barrasProgreso.forEach(barra => {
            const anchoBarra = barra.getAttribute('data-width') + '%';
            barra.style.width = anchoBarra;
          });
        }
      }
    });
  };

  // Mostrar al cargar
  mostrarSeccionesVisibles();

  // Mostrar al hacer scroll
  window.addEventListener('scroll', mostrarSeccionesVisibles);

  // ------------ Validación del formulario ------------
  const formulario = document.getElementById('formulario-contacto');

  if (formulario) {
    formulario.addEventListener('submit', function (e) {
      e.preventDefault();

      // Obtener valores del formulario
      const nombre = document.getElementById('nombre')?.value.trim();
      const correo = document.getElementById('correo')?.value.trim();
      const mensaje = document.getElementById('mensaje')?.value.trim();

      // Validación básica
      if (!nombre || !correo || !mensaje) {
        mostrarMensaje('Por favor, complete todos los campos requeridos.', 'error');
        return;
      }

      // Validar formato de correo electrónico
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(correo)) {
        mostrarMensaje('Por favor, introduce un correo electrónico válido.', 'error');
        return;
      }

      // Simulación de envío (para fines de demostración)
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

  // Función para mostrar mensajes de alerta
  function mostrarMensaje(texto, tipo) {
    const alerta = document.createElement('div');
    alerta.className = `alert alert-${tipo === 'exito' ? 'success' : 'danger'} alert-dismissible fade show`;
    alerta.innerHTML = `
      <strong>${tipo === 'exito' ? '¡Éxito!' : 'Error'}</strong> ${texto}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    const seccionContacto = document.getElementById('contacto');
    seccionContacto.prepend(alerta);

    // Auto cerrar después de 5 segundos
    setTimeout(() => {
      alerta.classList.remove('show');
      alerta.addEventListener('transitionend', () => alerta.remove());
    }, 5000);
  }

  // ------------ ScrollReveal para animaciones adicionales ------------
  const elementosAnimados = document.querySelectorAll('.proyecto, .contacto-metodo, .categoria-habilidad');

  const animarElementos = () => {
    const windowHeight = window.innerHeight;

    elementosAnimados.forEach((el, index) => {
      const elTop = el.getBoundingClientRect().top;
      const elVisible = 150;

      if (elTop < windowHeight - elVisible) {
        setTimeout(() => {
          el.classList.add('mostrar');
        }, index * 100); // Agregar retraso escalonado
      }
    });
  };

  window.addEventListener('scroll', animarElementos);
  animarElementos(); // Iniciar animación al cargar

  // ------------ Smooth scroll para enlaces internos ------------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});
