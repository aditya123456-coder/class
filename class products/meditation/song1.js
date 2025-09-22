
        document.addEventListener('DOMContentLoaded', function () {
            const audio = document.getElementById('meditation-audio');
            const playBtn = document.querySelector('.play-btn');
            const playIcon = playBtn.querySelector('i');
            const progressBar = document.querySelector('.progress-bar');
            const progressContainer = document.querySelector('.progress-container');
            const currentTimeEl = document.getElementById('current-time');
            const durationEl = document.getElementById('total-duration');
            let isPlaying = false;

            // Format seconds as mm:ss
            function formatTime(seconds) {
                const minutes = Math.floor(seconds / 60);
                const secs = Math.floor(seconds % 60);
                return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
            }

            // Update progress bar and time
            function updateProgress() {
                if (audio.duration) {
                    const percent = (audio.currentTime / audio.duration) * 100;
                    progressBar.style.width = `${percent}%`;
                    currentTimeEl.textContent = formatTime(audio.currentTime);
                }
            }

            // Set duration when metadata is loaded
            audio.addEventListener('loadedmetadata', () => {
                durationEl.textContent = formatTime(audio.duration);
            });

            // Update progress during playback
            audio.addEventListener('timeupdate', updateProgress);

            // Play/Pause toggle
            playBtn.addEventListener('click', () => {
                if (audio.paused) {
                    audio.play();
                    isPlaying = true;
                    playIcon.classList.replace('fa-play', 'fa-pause');
                    playBtn.style.background = 'rgba(168, 213, 238, 0.25)';
                } else {
                    audio.pause();
                    isPlaying = false;
                    playIcon.classList.replace('fa-pause', 'fa-play');
                    playBtn.style.background = 'rgba(168, 213, 238, 0.15)';
                }
            });

            // Seek when clicking progress bar
            progressContainer.addEventListener('click', (e) => {
                const width = progressContainer.clientWidth;
                const clickX = e.offsetX;
                const duration = audio.duration;
                audio.currentTime = (clickX / width) * duration;
            });

            // Reset on end
            audio.addEventListener('ended', () => {
                isPlaying = false;
                playIcon.classList.replace('fa-pause', 'fa-play');
                playBtn.style.background = 'rgba(168, 213, 238, 0.15)';
                progressBar.style.width = '0%';
                currentTimeEl.textContent = '0:00';
            });
        });