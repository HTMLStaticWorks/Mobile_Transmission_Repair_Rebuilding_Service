// Dashboard Logic

document.addEventListener('DOMContentLoaded', () => {
    initDashboard();
});

function initDashboard() {
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const contentViews = document.querySelectorAll('.content-view');

    // Mobile Sidebar Toggle
    const hamburger = document.getElementById('dashboard-hamburger');
    const sidebar = document.querySelector('.dashboard-sidebar');
    const overlay = document.getElementById('dashboard-overlay');

    if (hamburger && sidebar && overlay) {
        hamburger.addEventListener('click', () => {
            sidebar.classList.add('active');
            overlay.classList.add('active');
        });

        overlay.addEventListener('click', () => {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        });
    }

    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            const target = link.getAttribute('data-view');
            
            // Close mobile sidebar if open
            if (sidebar && sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
                overlay.classList.remove('active');
            }

            // Update active link
            sidebarLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Update active view
            contentViews.forEach(view => {
                view.classList.remove('active');
                if (view.id === target) {
                    view.classList.add('active');
                }
            });

            // Update Page Heading
            const heading = document.getElementById('dashboard-heading');
            if (heading) {
                heading.innerText = link.innerText.trim();
            }
        });
    });
}

function approveWork(id) {
    alert('Work order ' + id + ' has been approved! Our team will proceed.');
    const btn = event.target;
    btn.innerText = 'Approved';
    btn.classList.replace('btn-primary', 'btn-success');
    btn.disabled = true;
}

function logout() {
    window.location.href = 'index.html';
}
