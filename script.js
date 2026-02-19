// Tab switching functionality
function switchTab(tabName) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });

    // Remove active class from all nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    // Show selected tab content
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }

    // Add active class to clicked nav link
    const selectedNavLink = document.querySelector(`[data-tab="${tabName}"]`);
    if (selectedNavLink) {
        selectedNavLink.classList.add('active');
    }

    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Add event listeners to nav links
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const tabName = e.target.getAttribute('data-tab');
            switchTab(tabName);
        });
    });

    // Handle hash navigation (for direct links)
    if (window.location.hash) {
        const tabName = window.location.hash.substring(1);
        switchTab(tabName);
    }

    // Image modal (mobile): tap schematic to preview, tap preview to close
    const heroImg = document.querySelector('.hero-img-preview');
    const logoModal = document.getElementById('logo-modal');
    const logoModalImg = document.getElementById('logo-modal-img');
    let _prevActive = null;

    function openLogoModal(src, alt) {
        if (!logoModal || !logoModalImg) return;
        _prevActive = document.activeElement;
        logoModalImg.src = src;
        logoModalImg.alt = alt || '';
        logoModal.classList.add('open');
        logoModal.setAttribute('aria-hidden', 'false');
        logoModal.focus();
        document.body.style.overflow = 'hidden';
    }

    function closeLogoModal() {
        if (!logoModal || !logoModalImg) return;
        logoModal.classList.remove('open');
        logoModal.setAttribute('aria-hidden', 'true');
        logoModalImg.src = '';
        document.body.style.overflow = '';
        if (_prevActive) _prevActive.focus();
        _prevActive = null;
    }

    if (heroImg) {
        heroImg.addEventListener('click', (e) => {
            if (window.matchMedia('(max-width: 768px)').matches) {
                openLogoModal(heroImg.src, heroImg.alt || 'Hero image');
            }
        });
        heroImg.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                if (window.matchMedia('(max-width: 768px)').matches) {
                    openLogoModal(heroImg.src, heroImg.alt || 'Hero image');
                }
            }
        });
    }

    if (logoModal) {
        logoModal.addEventListener('click', closeLogoModal);
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLogoModal();
        }
    });
});

// Export for inline onclick handlers
window.switchTab = switchTab;
