document.addEventListener('DOMContentLoaded', () => {
    // 1. Loading Screen
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => { loader.style.display = 'none'; }, 800);
        }
    }, 1200);

    // 2. Custom Cursor (Smoother interpolation)
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;
    });

    function animateCursor() {
        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;
        follower.style.left = `${followerX}px`;
        follower.style.top = `${followerY}px`;
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effect for interactive elements
    const hoverElements = document.querySelectorAll('a, button, .bento-card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            follower.style.width = '60px';
            follower.style.height = '60px';
            follower.style.background = 'rgba(0, 242, 254, 0.1)';
            follower.style.borderColor = 'rgba(0, 242, 254, 0.8)';
            cursor.style.transform = 'translate(-50%, -50%) scale(0.5)';
        });
        el.addEventListener('mouseleave', () => {
            follower.style.width = '40px';
            follower.style.height = '40px';
            follower.style.background = 'transparent';
            follower.style.borderColor = 'rgba(0, 242, 254, 0.5)';
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });

    // 3. Scroll Reveal & Staggered Animations
    const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // If the target is a container with stagger elements inside
                if (entry.target.id === 'services') {
                    const staggers = entry.target.querySelectorAll('.reveal-stagger');
                    staggers.forEach((el, index) => {
                        setTimeout(() => {
                            el.classList.add('active');
                        }, index * 150); // 150ms delay between each card
                    });
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => { observer.observe(el); });

    // 4. Parallax Background Blobs
    const blobs = document.querySelectorAll('.blob');
    document.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth / 2 - e.pageX) / 50;
        const y = (window.innerHeight / 2 - e.pageY) / 50;
        
        blobs[0].style.transform = `translate(${x}px, ${y}px)`;
        blobs[1].style.transform = `translate(${-x}px, ${-y}px)`;
    });
});