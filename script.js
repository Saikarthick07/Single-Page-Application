document.addEventListener('DOMContentLoaded', () => {
    // Navigation
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    navToggle.addEventListener('click', () => {
        const expanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !expanded);
        navMenu.classList.toggle('show');
    });

    // Section navigation with focus management
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('href');
            const section = document.querySelector(sectionId);
            section.focus();
            
            // Update history
            history.pushState({ section: sectionId }, '', sectionId);
        });
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
