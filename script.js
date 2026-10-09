// Toggle Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links li a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Active Link Highlighting on Scroll
const sections = document.querySelectorAll('section');
const navLi = document.querySelectorAll('.nav-links li a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLi.forEach(li => {
        li.classList.remove('active');
        if (li.getAttribute('href').includes(current)) {
            li.classList.add('active');
        }
    });
});

// Sticky Header
const header = document.querySelector('header');
window.addEventListener('scroll', function() {
    header.classList.toggle('sticky', window.scrollY > 100);
});

// Skills button dropdowns
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedFilter = button.getAttribute('data-filter');

            filterButtons.forEach(filterButton => {
                filterButton.classList.toggle('active', filterButton === button);
            });

            projectCards.forEach(card => {
                const matchesFilter = selectedFilter === 'all' || card.getAttribute('data-category') === selectedFilter;
                card.hidden = !matchesFilter;
            });
        });
    });

    const skillButtons = document.querySelectorAll('.skill-btn');

    function closeAll() {
        skillButtons.forEach(btn => {
            const panel = document.getElementById(btn.getAttribute('aria-controls'));
            btn.setAttribute('aria-expanded', 'false');
            panel.classList.remove('open');
            panel.setAttribute('hidden', '');
        });
    }

    skillButtons.forEach(btn => {
        const panel = document.getElementById(btn.getAttribute('aria-controls'));

        btn.addEventListener('click', () => {
            const expanded = btn.getAttribute('aria-expanded') === 'true';
            if (expanded) {
                btn.setAttribute('aria-expanded', 'false');
                panel.classList.remove('open');
                panel.setAttribute('hidden', '');
            } else {
                closeAll();
                btn.setAttribute('aria-expanded', 'true');
                panel.classList.add('open');
                panel.removeAttribute('hidden');
            }
        });

        // keyboard support
        btn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                btn.click();
            }
        });
    });

    // Modal functionality
    const modalButtons = document.querySelectorAll('.btn-modal');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.modal-close');

    // Open modal
    modalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal
    function closeModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            closeModal(modal);
        });
    });

    // Close modal when clicking outside
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal(modal);
            }
        });
    });
});
