// Shared Components & Logic

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initRTL();
    renderHeader();
    renderFooter();
    initMobileMenu();
    initScrollTop();
    setActiveLink();
});

function initTheme() {
    const theme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeIcon(theme);
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeIcon(next);
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('.theme-toggle i');
    if (icon) {
        icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
}

function initRTL() {
    const isRTL = localStorage.getItem('rtl') === 'true';
    document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
    updateRTLIcon(isRTL);
}

function toggleRTL() {
    const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
    const next = isRTL ? 'ltr' : 'rtl';
    document.documentElement.setAttribute('dir', next);
    localStorage.setItem('rtl', !isRTL);
    updateRTLIcon(!isRTL);
}

function updateRTLIcon(isRTL) {
    const icons = document.querySelectorAll('.toggle-btn[title="Toggle RTL"] i');
    icons.forEach(icon => {
        icon.className = 'fas fa-right-left';
    });
}

function renderHeader() {
    const header = document.getElementById('main-header');
    if (!header) return;

    const path = window.location.pathname;
    const isAuthPage = path.endsWith('login.html') || path.endsWith('signup.html');
    if (isAuthPage) {
        header.style.display = 'none';
        return;
    }

    header.innerHTML = `
        <div class="container nav-container">
            <a href="index.html" class="logo" style="display: flex; align-items: center; gap: 0.75rem;">
                <img src="assets/mechanical_logo.png" alt="Logo" style="height: 40px;">
                <span style="font-size: 1.5rem; font-weight: 800; color: var(--primary-color); letter-spacing: -1px;">ShiftFix</span>
            </a>
            <ul class="nav-links">
                <li><a href="index.html">Home 1</a></li>
                <li><a href="premium.html">Home 2</a></li>
                <li><a href="about.html">About</a></li>
                <li><a href="services.html">Services</a></li>
                <li><a href="blog.html">Blog</a></li>
                <li><a href="contact.html">Contact</a></li>
                <li><a href="dashboard.html">Dashboard</a></li>
            </ul>
            <div class="nav-actions">
                <button onclick="toggleTheme()" class="toggle-btn theme-toggle" title="Toggle Theme"><i class="fas fa-moon"></i></button>
                <button onclick="toggleRTL()" class="toggle-btn" title="Toggle RTL"><i class="fas fa-right-left"></i></button>
                <a href="signup.html" class="btn btn-primary d-none-mobile">Sign Up</a>
                <div class="hamburger" id="hamburger">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
        <div class="mobile-menu" id="mobile-menu">
            <ul>
                <li><a href="index.html">Home 1</a></li>
                <li><a href="premium.html">Home 2</a></li>
                <li><a href="about.html">About</a></li>
                <li><a href="services.html">Services</a></li>
                <li><a href="blog.html">Blog</a></li>
                <li><a href="contact.html">Contact</a></li>
                <li><a href="dashboard.html">Dashboard</a></li>
                <li style="display: flex; gap: 1rem; width: 100%; padding-top: 1rem;">
                    <a href="signup.html" class="btn btn-primary" style="flex: 1;">Sign Up</a>
                </li>
            </ul>
        </div>
    `;
}

function renderFooter() {
    const footer = document.getElementById('main-footer');
    if (!footer) return;

    // No footer on auth pages
    const isAuthPage = window.location.pathname.includes('login.html') || window.location.pathname.includes('signup.html');
    if (isAuthPage) {
        footer.style.display = 'none';
        return;
    }

    footer.innerHTML = `
        <div class="container">
            <div class="footer-grid">
                <div class="footer-col">
                    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
                        <img src="assets/mechanical_logo.png" alt="Logo" style="height: 30px;">
                        <span style="font-size: 1.25rem; font-weight: 800; color: var(--primary-color);">ShiftFix</span>
                    </div>
                    <p>Expert transmission repair & rebuilding services. Trust-focused and professional care for your vehicle.</p>
                </div>
                <div class="footer-col">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="about.html">About Us</a></li>
                        <li><a href="services.html">Services</a></li>
                        <li><a href="blog.html">Blog</a></li>
                        <li><a href="dashboard.html">Dashboard</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>Contact Info</h4>
                    <ul>
                        <li><i class="fas fa-map-marker-alt"></i> 123 Gear St, Auto City</li>
                        <li><i class="fas fa-phone"></i> (555) 123-4567</li>
                        <li><i class="fas fa-envelope"></i> service@transmissionpro.com</li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>Follow Us</h4>
                    <div class="social-icons">
                        <a href="#"><i class="fab fa-facebook"></i></a>
                        <a href="#"><i class="fab fa-x-twitter"></i></a>
                        <a href="#"><i class="fab fa-instagram"></i></a>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2026 ShiftFix. All Rights Reserved.</p>
            </div>
        </div>
        <div class="scroll-top" id="scroll-top">
            <i class="fas fa-chevron-up"></i>
        </div>
    `;
}

function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    if (!hamburger || !mobileMenu) return;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });
}

function initScrollTop() {
    const btn = document.getElementById('scroll-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            btn.classList.add('show');
        } else {
            btn.classList.remove('show');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function setActiveLink() {
    const links = document.querySelectorAll('.nav-links a, .mobile-menu a');
    const current = window.location.pathname.split('/').pop() || 'index.html';
    
    links.forEach(link => {
        if (link.getAttribute('href') === current) {
            link.classList.add('active');
        }
    });
}
