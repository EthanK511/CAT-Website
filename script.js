// Timeline animation on scroll
document.addEventListener('DOMContentLoaded', function() {

    // --- Navbar scroll shadow ---
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            navbar.classList.toggle('scrolled', window.scrollY > 10);
        }, { passive: true });
    }

    // --- Logo cat wiggle on hover (replays animation) ---
    const logoImg = document.querySelector('.logo-img');
    if (logoImg) {
        logoImg.addEventListener('mouseenter', function() {
            this.style.animation = 'none';
            // Force reflow to restart animation
            void this.offsetWidth;
            this.style.animation = 'catWiggle 0.9s ease-in-out';
        });
    }

    // --- Typewriter effect for hero title ---
    const heroTitle = document.getElementById('heroTitle');
    if (heroTitle) {
        const fullText = heroTitle.textContent;
        heroTitle.textContent = '';
        const cursor = document.createElement('span');
        cursor.className = 'typewriter-cursor';
        heroTitle.appendChild(cursor);

        let i = 0;
        function typeNext() {
            if (i < fullText.length) {
                heroTitle.insertBefore(document.createTextNode(fullText[i]), cursor);
                i++;
                setTimeout(typeNext, 55);
            } else {
                // Remove cursor after typing finishes (with a short pause)
                setTimeout(() => cursor.remove(), 1200);
            }
        }
        setTimeout(typeNext, 300);
    }

    // --- Grant counter animation ---
    const grantCounter = document.getElementById('grantCounter');
    if (grantCounter) {
        let start = 0;
        const end = 10000;
        const duration = 1600;
        const step = end / (duration / 16);
        const timer = setInterval(function() {
            start = Math.min(start + step, end);
            grantCounter.textContent = '$' + Math.floor(start).toLocaleString() + ' Grant';
            if (start >= end) clearInterval(timer);
        }, 16);
    }

    // --- Mouse particle trail (subtle green dots) ---
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

    const particles = [];
    let lastMouse = { x: -999, y: -999 };

    window.addEventListener('mousemove', function(e) {
        if (Math.hypot(e.clientX - lastMouse.x, e.clientY - lastMouse.y) > 12) {
            lastMouse = { x: e.clientX, y: e.clientY };
            particles.push({
                x: e.clientX,
                y: e.clientY,
                r: Math.random() * 4 + 2,
                alpha: 0.7,
                dx: (Math.random() - 0.5) * 1.2,
                dy: -Math.random() * 1.5 - 0.5,
                color: Math.random() > 0.5 ? '45,106,79' : '82,183,136'
            });
        }
    }, { passive: true });

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.dx;
            p.y += p.dy;
            p.alpha -= 0.025;
            if (p.alpha <= 0) { particles.splice(i, 1); continue; }
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
            ctx.fill();
        }
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // --- Scroll-reveal for highlight cards ---
    // Cards use CSS animation directly (cardFadeIn keyframes with staggered delays)
    // so no JS observer is needed for them

    // --- Generic reveal for section headings ---
    const revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // Youth Education card modal
    const youthCard = document.getElementById('youthEducationCard');
    const modal = document.getElementById('youthEducationModal');
    const modalClose = document.getElementById('modalClose');

    if (youthCard && modal) {
        function openModal() {
            modal.classList.add('is-open');
            document.body.classList.add('modal-open');
            modalClose.focus();
        }

        function closeModal() {
            modal.classList.remove('is-open');
            document.body.classList.remove('modal-open');
            youthCard.focus();
        }

        youthCard.addEventListener('click', openModal);
        youthCard.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openModal();
            }
        });

        modalClose.addEventListener('click', closeModal);
        modal.addEventListener('click', function(e) {
            if (e.target === modal) closeModal();
        });
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
        });
    }

    // Animate timeline items on scroll
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        observer.observe(item);
    });

    // Form handling
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        const errorMessage = document.getElementById('errorMessage');
        const successMessage = document.getElementById('successMessage');

        // Handle form submission
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            errorMessage.style.display = 'none';
            successMessage.style.display = 'none';

            const fullName = document.getElementById('fullName').value.trim();
            const email = document.getElementById('email').value.trim();
            
            // Validation
            if (!fullName || !email) {
                showError('Please fill in all required fields.');
                return;
            }

            if (!validateEmail(email)) {
                showError('Please enter a valid email address.');
                return;
            }

            showSuccess('Registration successful! We look forward to seeing you on March 18th. Check your email for confirmation details.');
            signupForm.reset();
            // Send data to server
            fetch('/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: fullName,
                    email: email
                })
            })
            .then(response => response.text())
            .then(data => {
                showSuccess('Registration successful! We look forward to seeing you on March 18th. Check your email for confirmation details.');
                signupForm.reset();
            })
            .catch(error => {
                showError('Error submitting form. Please try again.');
                console.error('Error:', error);
            });
        });

        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }

        function showError(message) {
            errorMessage.textContent = message;
            errorMessage.style.display = 'block';
            errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        function showSuccess(message) {
            successMessage.textContent = message;
            successMessage.style.display = 'block';
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
});
