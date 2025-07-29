document.addEventListener('DOMContentLoaded', function () {
    const audio3 = document.getElementById('meditation-audio-3');
    const playBtn3 = document.getElementById('play-btn-3');
    const playIcon3 = playBtn3.querySelector('i');
    const progressBar3 = document.getElementById('progress-bar-3');
    const progressContainer3 = document.getElementById('progress-container-3');
    const currentTimeEl3 = document.getElementById('current-time-3');
    const durationEl3 = document.getElementById('total-duration-3');
    let isPlaying3 = false;

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    function updateProgress3() {
        if (audio3.duration) {
            const percent = (audio3.currentTime / audio3.duration) * 100;
            progressBar3.style.width = `${percent}%`;
            currentTimeEl3.textContent = formatTime(audio3.currentTime);
        }
    }

    audio3.addEventListener('loadedmetadata', () => {
        durationEl3.textContent = formatTime(audio3.duration);
    });

    audio3.addEventListener('timeupdate', updateProgress3);

    playBtn3.addEventListener('click', () => {
        if (audio3.paused) {
            audio3.play();
            isPlaying3 = true;
            playIcon3.classList.replace('fa-play', 'fa-pause');
            playBtn3.style.background = 'rgba(168, 213, 238, 0.25)';
        } else {
            audio3.pause();
            isPlaying3 = false;
            playIcon3.classList.replace('fa-pause', 'fa-play');
            playBtn3.style.background = 'rgba(168, 213, 238, 0.15)';
        }
    });

    progressContainer3.addEventListener('click', (e) => {
        const width = progressContainer3.clientWidth;
        const clickX = e.offsetX;
        const duration = audio3.duration;
        audio3.currentTime = (clickX / width) * duration;
    });

    audio3.addEventListener('ended', () => {
        isPlaying3 = false;
        playIcon3.classList.replace('fa-pause', 'fa-play');
        playBtn3.style.background = 'rgba(168, 213, 238, 0.15)';
        progressBar3.style.width = '0%';
        currentTimeEl3.textContent = '0:00';
    });
});