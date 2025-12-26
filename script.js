  // --- 1. LÓGICA DE AUDIO ---
        const music = document.getElementById("bgmusic");
        const playButton = document.getElementById('playButton');

        function toggleAudio() {
            if (music.paused) {
                music.play().then(() => {
                    playButton.textContent = 'Detener Música';
                }).catch(error => {
                    console.log("Esperando interacción del usuario...", error);
                });
            } else {
                music.pause();
                playButton.textContent = 'Reproducir Música Navideña';
            }
        }

        // Activamos con interacciones iniciales
        function activarSonido() {
            toggleAudio();
            // Quitamos listeners después de la primera reproducción
            document.removeEventListener('click', activarSonido);
            document.removeEventListener('mousemove', activarSonido);
            document.removeEventListener('touchstart', activarSonido);
            document.removeEventListener('keydown', activarSonido);
        }

        document.addEventListener('click', activarSonido);
        document.addEventListener('mousemove', activarSonido);
        document.addEventListener('touchstart', activarSonido);
        document.addEventListener('keydown', activarSonido);

        // Botón toggle
        playButton.addEventListener('click', toggleAudio);

        // --- 2. INICIO VISUAL ---
        window.onload = function() {
            scaleTree();            
            startInfiniteConfetti();
        };

        // --- 3. AUTO-ESCALADO ---
        function scaleTree() {
            const tree = document.getElementById('tree');
            const title = document.querySelector('.main-title');
            const sub = document.querySelector('.sub-title');
            const signature = document.querySelector('.signature');
            const button = document.getElementById('playButton');
            
            const availableHeight = window.innerHeight - title.offsetHeight - sub.offsetHeight - button.offsetHeight - signature.offsetHeight - 20;
            let treeBaseHeight = window.innerWidth < 600 ? 600 : 850; // Base menor en móvil para escala mayor
            
            let scaleFactor = availableHeight / treeBaseHeight;
            if (scaleFactor > 1.2) scaleFactor = 1.2;
            if (scaleFactor < 0.5) scaleFactor = 0.5; // Mínimo ajustado
            
            tree.style.transform = `scale(${scaleFactor})`;
        }
        window.addEventListener('resize', scaleTree);
        
        // --- 4. NIEVE ---
        const snowCanvas = document.getElementById('snow-canvas');
        const snowCtx = snowCanvas.getContext('2d');
        function resizeSnow() {
            snowCanvas.width = window.innerWidth;
            snowCanvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeSnow);
        resizeSnow();

        const flakes = Array.from({length: 150}, () => ({
            x: Math.random() * snowCanvas.width,
            y: Math.random() * snowCanvas.height,
            r: Math.random() * 2 + 1, s: Math.random() * 1 + 0.5 
        }));

        function drawSnow() {
            snowCtx.clearRect(0, 0, snowCanvas.width, snowCanvas.height);
            snowCtx.fillStyle = "rgba(255, 255, 255, 0.7)";
            flakes.forEach(f => {
                f.y += f.s;
                if(f.y > snowCanvas.height) f.y = 0;
                snowCtx.beginPath();
                snowCtx.arc(f.x, f.y, f.r, 0, Math.PI*2);
                snowCtx.fill();
            });
            requestAnimationFrame(drawSnow);
        }
        drawSnow();

        // --- 5. CONFETI MEJORADO ---
        function fireConfettiBurst() {
            const duration = 2000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 80, zIndex: 999, particleCount: 60 }; // Más partículas para mayor visibilidad
            const interval = setInterval(function() {
                const timeLeft = animationEnd - Date.now();
                if (timeLeft <= 0) { clearInterval(interval); return; }
                const particleCount = 60 * (timeLeft / duration); // Más partículas

                // 4 explosiones en posiciones aleatorias diferentes
                confetti(Object.assign({}, defaults, { particleCount, origin: { x: Math.random() * 0.4, y: Math.random() * 0.4 }, gravity: 0.8, scalar: 1.5 }));
                confetti(Object.assign({}, defaults, { particleCount, origin: { x: Math.random() * 0.4 + 0.6, y: Math.random() * 0.4 }, gravity: 0.8, scalar: 1.5 }));
                confetti(Object.assign({}, defaults, { particleCount, origin: { x: Math.random() * 0.4, y: Math.random() * 0.4 + 0.6 }, gravity: 0.8, scalar: 1.5 }));
                confetti(Object.assign({}, defaults, { particleCount, origin: { x: Math.random() * 0.4 + 0.6, y: Math.random() * 0.4 + 0.6 }, gravity: 0.8, scalar: 1.5 }));
            }, 200); // Intervalo más corto para más intensidad
        }
        function startInfiniteConfetti() {
            fireConfettiBurst(); 
            setInterval(fireConfettiBurst, 3000); // Repetir cada 3 segundos para más frecuencia
        }