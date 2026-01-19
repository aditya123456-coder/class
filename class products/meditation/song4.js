document.addEventListener('DOMContentLoaded', function () {
    const audio = document.getElementById('meditation-audio-4');
    const playBtn = document.getElementById('play-btn-4');
    const playIcon = playBtn.querySelector('i');
    const progressBar = document.getElementById('progress-bar-4');
    const progressContainer = document.getElementById('progress-container-4');
    const currentTimeEl = document.getElementById('current-time-4');
    const durationEl = document.getElementById('total-duration-4');
    let isPlaying = false;

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    function updateProgress() {
        if (audio.duration) {
            const percent = (audio.currentTime / audio.duration) * 100;
            progressBar.style.width = `${percent}%`;
            currentTimeEl.textContent = formatTime(audio.currentTime);
        }
    }

    audio.addEventListener('loadedmetadata', () => {
        durationEl.textContent = formatTime(audio.duration);
    });

    audio.addEventListener('timeupdate', updateProgress);

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

    progressContainer.addEventListener('click', (e) => {
        const width = progressContainer.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;
        audio.currentTime = (clickX / width) * duration;
    });

    audio.addEventListener('ended', () => {
        isPlaying = false;
        playIcon.classList.replace('fa-pause', 'fa-play');
        playBtn.style.background = 'rgba(168, 213, 238, 0.15)';
        progressBar.style.width = '0%';
        currentTimeEl.textContent = '0:00';
    });
});
