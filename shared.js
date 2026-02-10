/* ═══════════════════════════════════════════════════════════════
   Shared JavaScript — Towards Generative Image AI
   ═══════════════════════════════════════════════════════════════ */

(function () {
    'use strict';

    function init() {
        var article = document.querySelector('dt-article');
        if (!article) return;

        var headings = article.querySelectorAll('h2');

        // ── Auto-generate section IDs ──
        headings.forEach(function (h) {
            if (!h.id) {
                var text = h.textContent.trim()
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/^-|-$/g, '');
                h.id = text || 'section-' + Math.random().toString(36).substr(2, 6);
            }
        });

        // ── Reading Progress Bar ──
        var progressBar = document.createElement('div');
        progressBar.id = 'reading-progress';
        document.body.prepend(progressBar);

        // ── Back to Top Button ──
        var backBtn = document.createElement('button');
        backBtn.id = 'back-to-top';
        backBtn.innerHTML = '↑';
        backBtn.title = 'Back to top';
        backBtn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        document.body.appendChild(backBtn);

        var tocLinks = [];

        // ── Scroll handler (progress bar + back-to-top + TOC highlight) ──
        var ticking = false;
        window.addEventListener('scroll', function () {
            if (!ticking) {
                requestAnimationFrame(function () {
                    var scrollTop = window.scrollY;
                    var docHeight = document.documentElement.scrollHeight - window.innerHeight;

                    // Progress bar
                    progressBar.style.width = (docHeight > 0 ? (scrollTop / docHeight) * 100 : 0) + '%';

                    // Back to top
                    backBtn.classList.toggle('visible', scrollTop > 400);

                    ticking = false;
                });
                ticking = true;
            }
        });

        // ── Active nav link in header ──
        function highlightNav() {
            var currentPage = window.location.pathname.split('/').pop() || 'index.html';
            if (currentPage === '') currentPage = 'index.html';
            var navLinks = document.querySelectorAll('dt-header .nav a');
            if (navLinks.length === 0) {
                setTimeout(highlightNav, 200);
                return;
            }
            navLinks.forEach(function (link) {
                if (link.getAttribute('href') === currentPage) {
                    link.style.borderBottom = '2px solid white';
                    link.style.paddingBottom = '0';
                }
            });
        }
        setTimeout(highlightNav, 300);
    }

    // Run on DOMContentLoaded or immediately if already loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
