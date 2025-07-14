document.addEventListener('DOMContentLoaded', function () {
            const audio2 = document.getElementById('meditation-audio-2');
            const playBtn2 = document.getElementById('play-btn-2');
            const playIcon2 = playBtn2.querySelector('i');
            const progressBar2 = document.getElementById('progress-bar-2');
            const progressContainer2 = document.getElementById('progress-container-2');
            const currentTimeEl2 = document.getElementById('current-time-2');
            const durationEl2 = document.getElementById('total-duration-2');
            let isPlaying2 = false;

            function formatTime(seconds) {
                const minutes = Math.floor(seconds / 60);
                const secs = Math.floor(seconds % 60);
                return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
            }

            function updateProgress2() {
                if (audio2.duration) {
                    const percent = (audio2.currentTime / audio2.duration) * 100;
                    progressBar2.style.width = `${percent}%`;
                    currentTimeEl2.textContent = formatTime(audio2.currentTime);
                }
            }

            audio2.addEventListener('loadedmetadata', () => {
                durationEl2.textContent = formatTime(audio2.duration);
            });

            audio2.addEventListener('timeupdate', updateProgress2);

            playBtn2.addEventListener('click', () => {
                if (audio2.paused) {
                    audio2.play();
                    isPlaying2 = true;
                    playIcon2.classList.replace('fa-play', 'fa-pause');
                    playBtn2.style.background = 'rgba(168, 213, 238, 0.25)';
                } else {
                    audio2.pause();
                    isPlaying2 = false;
                    playIcon2.classList.replace('fa-pause', 'fa-play');
                    playBtn2.style.background = 'rgba(168, 213, 238, 0.15)';
                }
            });

            progressContainer2.addEventListener('click', (e) => {
                const width = progressContainer2.clientWidth;
                const clickX = e.offsetX;
                const duration = audio2.duration;
                audio2.currentTime = (clickX / width) * duration;
            });

            audio2.addEventListener('ended', () => {
                isPlaying2 = false;
                playIcon2.classList.replace('fa-pause', 'fa-play');
                playBtn2.style.background = 'rgba(168, 213, 238, 0.15)';
                progressBar2.style.width = '0%';
                currentTimeEl2.textContent = '0:00';
            });
        });