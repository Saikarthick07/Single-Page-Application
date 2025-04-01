document.addEventListener('DOMContentLoaded', () => {
    // Navigation
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('#nav-menu');
    
    function toggleMenu() {
        const expanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !expanded);
        navMenu.hidden = !navMenu.hidden;
        if (!expanded) navMenu.querySelector('a').focus();
    }

    navToggle.addEventListener('click', toggleMenu);
    navToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMenu();
        }
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('href');
            const section = document.querySelector(sectionId);
            section.focus();
            if (window.innerWidth <= 768) {
                navToggle.setAttribute('aria-expanded', 'false');
                navMenu.hidden = true;
            }
            history.pushState({ section: sectionId }, '', sectionId);
        });

        link.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                link.click();
            }
        });
    });

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
        
        if (e.key === 'Escape' && !navMenu.hidden) {
            navToggle.setAttribute('aria-expanded', 'false');
            navMenu.hidden = true;
            navToggle.focus();
        }
    });

    window.addEventListener('popstate', (event) => {
        if (event.state && event.state.section) {
            document.querySelector(event.state.section).focus();
        }
    });

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

    const toggleForm = document.querySelector('.toggle-form');
    const form = document.querySelector('#event-form');
    
    toggleForm.addEventListener('click', () => {
        const expanded = toggleForm.getAttribute('aria-expanded') === 'true';
        toggleForm.setAttribute('aria-expanded', !expanded);
        form.classList.toggle('hidden');
    });

    const switchInput = document.querySelector('#updates');
    switchInput.addEventListener('change', () => {
        switchInput.setAttribute('aria-checked', switchInput.checked);
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const messageDiv = document.querySelector('#form-message');
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

        messageDiv.textContent = 'Thank you for registering!';
        messageDiv.style.color = 'green';
        form.reset();
    });
});
