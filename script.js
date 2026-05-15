document.addEventListener('DOMContentLoaded', () => {

    // 1. Envelope Animation (Video)
    const envelopeSection = document.getElementById('envelope-section');
    const mainContent = document.getElementById('main-content');
    const folioVideo = document.getElementById('folio-video');
    const lightRay = document.querySelector('.light-ray');
    const tapHint = document.querySelector('.tap-hint');
    envelopeSection.addEventListener('click', () => {
        if (tapHint) tapHint.style.display = 'none';

        // Hide static images and show video
        const staticBg = document.getElementById('folio-static-bg');
        const staticClosed = document.getElementById('folio-static-closed');

        if (staticBg) staticBg.style.display = 'none';
        if (staticClosed) staticClosed.style.display = 'none';
        folioVideo.style.display = 'block';

        folioVideo.play().catch(error => {
            console.error("Video play failed:", error);
            showMainContent();
        });

        folioVideo.onended = () => {
            // Trigger Cinematic Transition
            createSparkles();
            lightRay.style.opacity = '1';

            setTimeout(() => {
                showMainContent();
                // Slowly fade out the light ray after transition
                setTimeout(() => {
                    lightRay.style.opacity = '0';
                }, 500);
            }, 800);
        };
    });

    function createSparkles() {
        const container = document.getElementById('sparkles-container');
        for (let i = 0; i < 50; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            const size = Math.random() * 5 + 2;
            sparkle.style.width = `${size}px`;
            sparkle.style.height = `${size}px`;
            sparkle.style.left = `${Math.random() * 100}%`;
            sparkle.style.top = `${Math.random() * 100}%`;
            sparkle.style.animationDelay = `${Math.random() * 2}s`;
            container.appendChild(sparkle);
        }
    }

    function showMainContent() {
        envelopeSection.style.display = 'none';
        mainContent.style.display = 'block';
        window.scrollTo(0, 0);

        setTimeout(() => {
            mainContent.style.opacity = '1';
            initNatureAndReveal();
            setTimeout(initScratchPad, 100);
        }, 50);
    }

    function initNatureAndReveal() {
        const natureOverlay = document.getElementById('nature-overlay');

        // 1. Intersection Observer for Reveals
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    if (Math.random() > 0.6) spawnBird();
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.card-section').forEach(section => {
            observer.observe(section);
        });

        // 2. Global Sparkling
        initGlobalSparkles();

        // 3. Optimized Parallax Effect
        let isTicking = false;
        window.addEventListener('scroll', () => {
            if (!isTicking) {
                window.requestAnimationFrame(() => {
                    updateParallax();
                    isTicking = false;
                });
                isTicking = true;
            }
        });

        function updateParallax() {
            const viewportHeight = window.innerHeight;
            document.querySelectorAll('.card-section.revealed').forEach(section => {
                if (section.classList.contains('no-parallax')) {
                    return; // Skip sections marked no-parallax
                }
                const fg = section.querySelector('.fg-layer');
                if (fg) {
                    const rect = section.getBoundingClientRect();
                    if (rect.top < viewportHeight && rect.bottom > 0) {
                        const speed = 0.12;
                        const offset = rect.top * speed;
                        fg.style.transform = `translate3d(0, ${offset}px, 0)`;
                    }
                }
            });
        }

        function initGlobalSparkles() {
            const pageHeight = document.documentElement.scrollHeight;
            const sparkleCount = Math.floor(pageHeight / 8); // Very high density

            for (let i = 0; i < sparkleCount; i++) {
                const sparkle = document.createElement('div');
                sparkle.className = 'global-sparkle';
                // Vary sizes more for depth
                const size = Math.random() * 5 + 1.5;
                sparkle.style.width = `${size}px`;
                sparkle.style.height = `${size}px`;

                sparkle.style.top = `${Math.random() * pageHeight}px`;
                sparkle.style.left = `${Math.random() * 100}%`;

                // Random duration and delay
                const duration = Math.random() * 2 + 1;
                sparkle.style.setProperty('--duration', `${duration}s`);
                sparkle.style.animationDelay = `${Math.random() * 10}s`;

                natureOverlay.appendChild(sparkle);
            }
        }

        function spawnBird() {
            const bird = document.createElement('div');
            bird.className = 'bird-svg bird-flying';
            bird.innerHTML = `<svg viewBox="0 0 512 512"><path d="M512 113.1c0 14.3-11.6 25.9-25.9 25.9-4.8 0-9.2-1.3-13-3.6-11.3 26.6-37.5 45.3-68.2 45.3-40.8 0-73.9-33.1-73.9-73.9 0-3.3.2-6.6.6-9.8C296.8 123 266 160.8 256 204.8c-10-44-40.8-81.8-75.6-107.8.4 3.2.6 6.5.6 9.8 0 40.8-33.1 73.9-73.9 73.9-30.7 0-56.9-18.7-68.2-45.3-3.8 2.3-8.2 3.6-13 3.6-14.3 0-25.9-11.6-25.9-25.9s11.6-25.9 25.9-25.9c4.8 0 9.2 1.3 13 3.6 11.3-26.6 37.5-45.3 68.2-45.3 40.8 0 73.9 33.1 73.9 73.9 0 3.3-.2 6.6-.6 9.8 34.8 26 65.6 63.8 75.6 107.8 10-44 40.8-81.8 75.6-107.8-.4-3.2-.6-6.5-.6-9.8 0-40.8 33.1-73.9 73.9-73.9 30.7 0 56.9 18.7 68.2 45.3 3.8-2.3 8.2-3.6 13-3.6 14.3 0 25.9 11.6 25.9 25.9z"/></svg>`;

            bird.style.top = `${window.scrollY + (Math.random() * window.innerHeight)}px`;

            natureOverlay.appendChild(bird);
            setTimeout(() => bird.remove(), 8000); // Cleanup after animation
        }
    }

    // 2. Countdown Timer
    // Date: June 6th, 2026, 6:00pm
    const targetDate = new Date('June 6, 2026 18:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            document.getElementById('days').innerText = "00";
            document.getElementById('hours').innerText = "00";
            document.getElementById('mins').innerText = "00";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        document.getElementById('days').innerText = days.toString().padStart(2, '0');
        document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
        document.getElementById('mins').innerText = mins.toString().padStart(2, '0');
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();

    // 3. Golden Scratch Pad
    function initScratchPad() {
        const canvas = document.getElementById('scratch-pad');
        const ctx = canvas.getContext('2d');
        const container = document.getElementById('countdown-container');

        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;

        // Fill golden color
        ctx.fillStyle = '#D4AF37'; // Golden
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Add some noise or text over it
        ctx.fillStyle = 'rgba(255,255,255,0.8)';
        ctx.font = 'bold 20px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Scratch to Reveal', canvas.width / 2, canvas.height / 2);

        ctx.globalCompositeOperation = 'destination-out';

        let isDrawing = false;

        function getMousePos(evt) {
            const rect = canvas.getBoundingClientRect();
            // handle both mouse and touch
            const clientX = evt.touches ? evt.touches[0].clientX : evt.clientX;
            const clientY = evt.touches ? evt.touches[0].clientY : evt.clientY;
            return {
                x: clientX - rect.left,
                y: clientY - rect.top
            };
        }

        function scratch(e) {
            if (!isDrawing) return;
            // Prevent scrolling while scratching
            if (e.cancelable) e.preventDefault();
            const pos = getMousePos(e);
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, 25, 0, Math.PI * 2, false);
            ctx.fill();
        }

        canvas.addEventListener('mousedown', () => isDrawing = true);
        canvas.addEventListener('mouseup', () => isDrawing = false);
        canvas.addEventListener('mouseleave', () => isDrawing = false);
        canvas.addEventListener('mousemove', scratch);

        canvas.addEventListener('touchstart', (e) => {
            isDrawing = true;
            // prevent default to stop scrolling, but we need to check if we can
            if (e.cancelable) e.preventDefault();
            scratch(e);
        }, { passive: false });

        canvas.addEventListener('touchend', () => isDrawing = false);
        canvas.addEventListener('touchcancel', () => isDrawing = false);
        canvas.addEventListener('touchmove', scratch, { passive: false });
    }

    // 4. RSVP Form Submission (Professional AJAX)
    const rsvpForm = document.getElementById('rsvp-form');
    const rsvpStatus = document.getElementById('rsvp-status');

    if (rsvpForm) {
        rsvpForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const submitBtn = document.getElementById('submit-btn');
            const originalText = submitBtn.innerText;
            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;

            const formData = new FormData(this);
            const data = {};
            formData.forEach((value, key) => data[key] = value);

            fetch(this.action, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(result => {
                    if (result.success === true) {
                        rsvpStatus.innerHTML = "<p style='color: #4CAF50; font-weight: bold;'>✅ RSVP Sent Successfully! We can't wait to celebrate with you.</p>";
                        rsvpForm.reset();
                    } else {
                        rsvpStatus.innerHTML = "<p style='color: #f44336;'>⚠️ " + (result.message || "Submission failed. Please try again.") + "</p>";
                    }
                })
                .catch(error => {
                    console.error('RSVP Error:', error);
                    rsvpStatus.innerHTML = "<p style='color: #f44336;'>⚠️ Could not reach the server. Please check your connection and try again.</p>";
                })
                .finally(() => {
                    submitBtn.innerText = originalText;
                    submitBtn.disabled = false;
                });
        });
    }

    // 5. ImgBB Upload
    const photoUpload = document.getElementById('photo-upload');
    const uploadLabel = document.getElementById('upload-label');
    const uploadStatus = document.getElementById('upload-status');
    const imgbbKey = 'dfd8ff8773382cfc4f044982eab61a72';

    photoUpload.addEventListener('change', function () {
        if (!this.files || this.files.length === 0) return;

        const file = this.files[0];
        const formData = new FormData();
        formData.append('image', file);

        uploadLabel.innerText = 'Uploading...';
        uploadLabel.style.pointerEvents = 'none';
        uploadStatus.innerText = '';

        fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    uploadStatus.innerHTML = "<span style='color: green;'>Photo uploaded successfully! Thank you!</span>";
                    uploadLabel.innerText = 'Share another moment';
                } else {
                    uploadStatus.innerHTML = "<span style='color: red;'>Upload failed.</span>";
                    uploadLabel.innerText = 'Share your moments';
                }
            })
            .catch(error => {
                uploadStatus.innerHTML = "<span style='color: red;'>Upload error.</span>";
                uploadLabel.innerText = 'Share your moments';
            })
            .finally(() => {
                uploadLabel.style.pointerEvents = 'auto';
                // Clear input so same file can be selected again
                photoUpload.value = '';
            });
    });

});
