document.addEventListener('DOMContentLoaded', () => {
  console.log("✅ script.js cargado correctamente");

  // ------------ Menú móvil ------------
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      menuToggle.querySelector('i').classList.toggle('fa-bars');
      menuToggle.querySelector('i').classList.toggle('fa-times');
    });
  }

  // Cerrar menú al hacer clic en un enlace
  const navLinks = document.querySelectorAll('.nav-menu a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      if (menuToggle.querySelector('i').classList.contains('fa-times')) {
        menuToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
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
      const nombre = document.getElementById('nombre').value.trim();
      const correo = document.getElementById('correo').value.trim();
      const asunto = document.getElementById('asunto')?.value.trim() || '';
      const mensaje = document.getElementById('mensaje').value.trim();

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
    // Eliminar alertas anteriores
    const alertaAnterior = document.querySelector('.alerta-mensaje');
    if (alertaAnterior) {
      alertaAnterior.remove();
    }

    // Crear nueva alerta
    const alerta = document.createElement('div');
    alerta.className = `alerta-mensaje alerta-${tipo}`;
    alerta.innerHTML = `
      <div class="alerta-contenido">
        <i class="${tipo === 'exito' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'}"></i>
        <span>${texto}</span>
      </div>
      <i class="fas fa-times alerta-cerrar"></i>
    `;

    // Insertar alerta antes del botón de enviar
    const seccionContacto = document.getElementById('contacto');
    seccionContacto.appendChild(alerta);

    // Animar entrada
    setTimeout(() => {
      alerta.classList.add('mostrar');
    }, 10);

    // Configurar botón de cerrar
    const btnCerrar = alerta.querySelector('.alerta-cerrar');
    btnCerrar.addEventListener('click', () => {
      alerta.classList.remove('mostrar');
      setTimeout(() => {
        alerta.remove();
      }, 300);
    });

    // Auto cerrar después de 5 segundos
    setTimeout(() => {
      if (alerta.parentNode) {
        alerta.classList.remove('mostrar');
        setTimeout(() => {
          alerta.remove();
        }, 300);
      }
    }, 5000);
  }

  // ------------ ScrollReveal para animaciones adicionales ------------
  // Implementación básica sin dependencia externa
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
  
  // ------------ Añadir estilos adicionales para elementos de alerta ------------
  const estilosAlerta = `
    .alerta-mensaje {
      position: fixed;
      bottom: 30px;
      right: 30px;
      padding: 15px 20px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      max-width: 400px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
      transform: translateX(100%);
      opacity: 0;
      transition: all 0.3s ease;
      z-index: 1000;
    }
    
    .alerta-mensaje.mostrar {
      transform: translateX(0);
      opacity: 1;
    }
    
    .alerta-exito {
      background-color: #d4edda;
      color: #155724;
      border-left: 5px solid #28a745;
    }
    
    .alerta-error {
      background-color: #f8d7da;
      color: #721c24;
      border-left: 5px solid #dc3545;
    }
    
    .alerta-contenido {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .alerta-cerrar {
      margin-left: 15px;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .alerta-cerrar:hover {
      color: #000;
    }
  `;
  
  // Insertar estilos en el documento
  const styleElement = document.createElement('style');
  styleElement.textContent = estilosAlerta;
  document.head.appendChild(styleElement);
});
