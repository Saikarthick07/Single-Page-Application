document.addEventListener('DOMContentLoaded', () => {
    // Navigation
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('#nav-menu');
    
    // Toggle menu with click or keyboard
    function toggleMenu() {
        const expanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !expanded);
        navMenu.hidden = !navMenu.hidden;
        
        // Focus first menu item when opening
        if (!expanded) {
            navMenu.querySelector('a').focus();
        }
    }

    navToggle.addEventListener('click', toggleMenu);
    
    // Add keyboard support for Enter/Space
    navToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMenu();
        }
    });

    // Section navigation with focus management
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('href');
            const section = document.querySelector(sectionId);
            section.focus();
            
            // Close mobile menu after selection
            if (window.innerWidth <= 768) {
                navToggle.setAttribute('aria-expanded', 'false');
                navMenu.hidden = true;
            }
            
            history.pushState({ section: sectionId }, '', sectionId);
        });

        // Keyboard navigation
        link.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                link.click();
            }
        });
    });

    // Trap focus in menu when open
    navMenu.addEventListener('keydown', (e) => {
        const links = Array.from(navMenu.querySelectorAll('a'));
        const firstLink = links[0];
        const lastLink = links[links.length - 1];
        
        if (e.key === 'Tab') {
            if (e.shiftKey && document.activeElement === firstLink) {
                e.preventDefault();
                lastLink.focus();
            } else if (!e.shiftKey && document.activeElement === lastLink) {
                e.preventDefault();
                firstLink.focus();
            }
        }
        
        // Close menu with Escape
        if (e.key === 'Escape' && !navMenu.hidden) {
            navToggle.setAttribute('aria-expanded', 'false');
            navMenu.hidden = true;
            navToggle.focus();
        }
    });

    // Browser back button handling
    window.addEventListener('popstate', (event) => {
        if (event.state && event.state.section) {
            document.querySelector(event.state.section).focus();
        }
    });

    // Modal
    const modal = document.querySelector('.modal');
    const modalTrigger = document.querySelector('.modal-trigger');
    const modalClose = document.querySelector('.modal-close');

    modalTrigger.addEventListener('click', () => {
        modal.hidden = false;
        modal.querySelector('.modal-content').focus();
    });

    modalClose.addEventListener('click', () => {
        modal.hidden = true;
        modalTrigger.focus();
    });

    // Form toggle
    const toggleForm = document.querySelector('.toggle-form');
    const form = document.querySelector('#event-form');
    
    toggleForm.addEventListener('click', () => {
        const expanded = toggleForm.getAttribute('aria-expanded') === 'true';
        toggleForm.setAttribute('aria-expanded', !expanded);
        form.classList.toggle('hidden');
    });

    // Switch
    const switchInput = document.querySelector('#updates');
    switchInput.addEventListener('change', () => {
        switchInput.setAttribute('aria-checked', switchInput.checked);
    });

    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const messageDiv = document.querySelector('#form-message');
        
        // Validation
        const name = document.querySelector('#name').value;
        const email = document.querySelector('#email').value;
        
        if (!name || !email) {
            messageDiv.textContent = 'Please fill all required fields';
            messageDiv.style.color = 'red';
            return;
        }

        if (!email.includes('@')) {
            messageDiv.textContent = 'Please enter a valid email';
            messageDiv.style.color = 'red';
            return;
        }

        // Success
        messageDiv.textContent = 'Thank you for registering!';
        messageDiv.style.color = 'green';
        form.reset();
    });
});
