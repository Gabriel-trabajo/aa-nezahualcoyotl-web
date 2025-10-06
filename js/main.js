/**
 * MAIN.JS - GRUPOS 24 HORAS AA NEZAHUALCÓYOTL
 * Script principal con todas las funcionalidades del sitio web
 */

// ==================== ESPERAR A QUE EL DOM ESTÉ CARGADO ====================
document.addEventListener('DOMContentLoaded', function() {

    // Inicializar todas las funcionalidades
    initMobileMenu();
    initSmoothScroll();
    initContactForm();
    initScrollAnimations();

    console.log('✅ Sitio web AA Nezahualcóyotl cargado correctamente');
});


// ==================== MENÚ MÓVIL ====================

/**
 * Inicializa el menú hamburguesa para dispositivos móviles
 */
function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuToggle && mobileMenu) {
        // Toggle del menú al hacer clic en el botón hamburguesa
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');

            // Cambiar el ícono del botón (opcional - agregar animación)
            const isOpen = !mobileMenu.classList.contains('hidden');
            menuToggle.setAttribute('aria-expanded', isOpen);

            // Prevenir scroll cuando el menú está abierto
            if (isOpen) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Cerrar menú al hacer clic en un enlace
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                document.body.style.overflow = '';
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });

        // Cerrar menú al redimensionar a desktop
        window.addEventListener('resize', function() {
            if (window.innerWidth >= 768) { // md breakpoint de Tailwind
                mobileMenu.classList.add('hidden');
                document.body.style.overflow = '';
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
}


// ==================== SMOOTH SCROLL ====================

/**
 * Implementa scroll suave para enlaces internos
 */
function initSmoothScroll() {
    // Seleccionar todos los enlaces que comienzan con #
    const scrollLinks = document.querySelectorAll('a[href^="#"]');

    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Ignorar enlaces con solo "#"
            if (href === '#' || href === '#!') {
                return;
            }

            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                e.preventDefault();

                // Calcular la posición teniendo en cuenta el header sticky
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;

                // Scroll suave
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Actualizar URL sin hacer scroll
                history.pushState(null, null, href);
            }
        });
    });
}


// ==================== FORMULARIO DE CONTACTO ====================

/**
 * Maneja la validación y envío del formulario de contacto
 */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Obtener valores del formulario
            const formData = {
                nombre: document.getElementById('nombre').value.trim(),
                email: document.getElementById('email').value.trim(),
                telefono: document.getElementById('telefono').value.trim(),
                asunto: document.getElementById('asunto').value,
                mensaje: document.getElementById('mensaje').value.trim()
            };

            // Validación básica
            if (!validateContactForm(formData)) {
                return;
            }

            // Aquí normalmente enviarías los datos a un servidor
            // Por ahora, mostramos un mensaje de éxito simulado
            handleFormSubmit(formData);
        });
    }
}

/**
 * Valida los campos del formulario de contacto
 * @param {Object} formData - Datos del formulario
 * @returns {boolean} - True si es válido, false si no
 */
function validateContactForm(formData) {
    // Validar nombre
    if (formData.nombre.length < 2) {
        showFormMessage('Por favor, ingresa un nombre válido.', 'error');
        return false;
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showFormMessage('Por favor, ingresa un correo electrónico válido.', 'error');
        return false;
    }

    // Validar asunto
    if (!formData.asunto) {
        showFormMessage('Por favor, selecciona un asunto.', 'error');
        return false;
    }

    // Validar mensaje
    if (formData.mensaje.length < 10) {
        showFormMessage('Por favor, escribe un mensaje más detallado (mínimo 10 caracteres).', 'error');
        return false;
    }

    return true;
}

/**
 * Maneja el envío exitoso del formulario
 * @param {Object} formData - Datos del formulario
 */
function handleFormSubmit(formData) {
    // Mostrar mensaje de éxito
    showFormMessage(
        '¡Gracias por tu mensaje! Nos pondremos en contacto contigo lo antes posible. ' +
        'Si necesitas ayuda urgente, llámanos al teléfono 24/7.',
        'success'
    );

    // Limpiar formulario
    document.getElementById('contact-form').reset();

    // Log para desarrollo (remover en producción)
    console.log('📧 Formulario enviado:', formData);

    // Scroll suave hacia el mensaje
    const messageElement = document.getElementById('form-message');
    if (messageElement) {
        messageElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

/**
 * Muestra un mensaje de estado del formulario
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - Tipo de mensaje: 'success' o 'error'
 */
function showFormMessage(message, type) {
    const messageContainer = document.getElementById('form-message');

    if (messageContainer) {
        // Determinar clases según el tipo
        let classes = 'p-4 rounded-lg mb-4 ';
        if (type === 'success') {
            classes += 'bg-green-100 border-l-4 border-green-500 text-green-700';
        } else if (type === 'error') {
            classes += 'bg-red-100 border-l-4 border-red-500 text-red-700';
        } else {
            classes += 'bg-blue-100 border-l-4 border-blue-500 text-blue-700';
        }

        // Mostrar mensaje
        messageContainer.className = classes;
        messageContainer.innerHTML = `
            <div class="flex items-start">
                <div class="flex-shrink-0">
                    ${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}
                </div>
                <div class="ml-3">
                    <p class="text-sm font-medium">${message}</p>
                </div>
            </div>
        `;
        messageContainer.classList.remove('hidden');

        // Auto-ocultar después de 8 segundos
        setTimeout(() => {
            messageContainer.classList.add('hidden');
        }, 8000);
    }
}


// ==================== ANIMACIONES AL HACER SCROLL ====================

/**
 * Añade animaciones a elementos cuando aparecen en el viewport
 */
function initScrollAnimations() {
    // Verificar si el navegador soporta IntersectionObserver
    if ('IntersectionObserver' in window) {
        // Elementos a animar
        const animatedElements = document.querySelectorAll('.card-hover, .bg-white');

        // Opciones del observer
        const observerOptions = {
            threshold: 0.1, // 10% del elemento visible
            rootMargin: '0px 0px -50px 0px' // Trigger un poco antes de que sea visible
        };

        // Crear el observer
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Añadir clase de animación cuando el elemento es visible
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(20px)';

                    // Animar con un pequeño delay
                    setTimeout(() => {
                        entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 100);

                    // Dejar de observar el elemento después de animarlo
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observar cada elemento
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
}


// ==================== NAVEGACIÓN ACTIVA ====================

/**
 * Actualiza el enlace activo en la navegación según la sección visible
 * (Opcional - comentado por ahora, puede activarse si se desea)
 */
/*
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}
*/


// ==================== UTILIDADES ====================

/**
 * Detecta si el usuario está en un dispositivo móvil
 * @returns {boolean}
 */
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * Debounce function para optimizar eventos que se disparan frecuentemente
 * @param {Function} func - Función a ejecutar
 * @param {number} wait - Tiempo de espera en ms
 * @returns {Function}
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}


// ==================== EVENTOS GLOBALES ====================

// Scroll to top button (opcional - puede implementarse en el futuro)
/*
window.addEventListener('scroll', debounce(function() {
    const scrollTopBtn = document.getElementById('scroll-top-btn');
    if (scrollTopBtn) {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.remove('hidden');
        } else {
            scrollTopBtn.classList.add('hidden');
        }
    }
}, 100));
*/


// ==================== VALIDACIÓN DE TELÉFONO (EXTRA) ====================

/**
 * Formatea el número de teléfono mientras el usuario escribe
 */
const phoneInput = document.getElementById('telefono');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, ''); // Remover no-dígitos

        // Formato: (55) 1234-5678
        if (value.length >= 2) {
            value = '(' + value.substring(0, 2) + ') ' + value.substring(2);
        }
        if (value.length >= 9) {
            value = value.substring(0, 9) + '-' + value.substring(9, 13);
        }

        e.target.value = value;
    });
}


// ==================== PERFORMANCE OPTIMIZATIONS ====================

/**
 * Lazy loading para imágenes (si se agregan en el futuro)
 */
if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
}


// ==================== MENSAJES DE CONSOLA ====================

// Mensaje de bienvenida en consola para desarrolladores
console.log('%c🙏 Grupos 24 Horas AA Nezahualcóyotl', 'color: #3b82f6; font-size: 20px; font-weight: bold;');
console.log('%c✨ Sitio web desarrollado con dedicación para servir a la comunidad', 'color: #1e3a8a; font-size: 14px;');
console.log('%c📞 Si necesitas ayuda, estamos disponibles 24/7', 'color: #059669; font-size: 12px;');


// ==================== SERVICE WORKER (FUTURO - PWA) ====================

/**
 * Registro de Service Worker para funcionalidad offline (comentado por ahora)
 */
/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('✅ Service Worker registrado:', registration);
            })
            .catch(error => {
                console.log('❌ Error al registrar Service Worker:', error);
            });
    });
}
*/
