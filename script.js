const audioPlayer = document.getElementById("audioPlayer");
const progress = document.getElementById("progress");
const playPauseButton = document.getElementById("playPauseButton");
const ctrlIcon = document.getElementById("ctrlIcon");
const fileInput = document.getElementById("fileInput");
const songTitle = document.getElementById("songTitle");
const songArtist = document.getElementById("songArtist");
const playlistContainer = document.getElementById("playlistContainer");
const songList = document.getElementById("songList");
const fileNameDisplay = document.getElementById("fileName");
const acceptButton = document.getElementById("acceptButton");
const songImage = document.getElementById("songImage");

const playlist = [
    { title: "Despacito", artist: "Luis Fonsi Ft. Puerto Rican", url: "song.mp3" },
    { title: "Shape of You", artist: "Ed Sheeran", url: "shape_of_you.mp3" }
];
let currentSongIndex = 0;

function loadSong(index) {
    const song = playlist[index];
    songTitle.textContent = song.title;
    songArtist.textContent = song.artist;
    audioPlayer.src = song.url;
    audioPlayer.load();
    progress.value = 0;
}

function playPause() {
    if (audioPlayer.paused) {
        audioPlayer.play();
        ctrlIcon.classList.replace("fa-play", "fa-pause");
        document.querySelector('.music-player').classList.add('glow');
        document.querySelector('.song-img').classList.add('glow');
    } else {
        audioPlayer.pause();
        ctrlIcon.classList.replace("fa-pause", "fa-play");
        document.querySelector('.music-player').classList.remove('glow');
        document.querySelector('.song-img').classList.remove('glow');
    }
}

audioPlayer.onplay = () => {
    setInterval(() => (progress.value = audioPlayer.currentTime), 500);
};

progress.addEventListener("input", () => {
    audioPlayer.currentTime = progress.value;
});

fileInput.addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
        fileNameDisplay.textContent = `Selected File: ${file.name}`;
        songTitle.textContent = file.name;
        songArtist.textContent = "Local File";
        audioPlayer.src = URL.createObjectURL(file);
        songImage.src = "thumbnail.png";
    } else {
        songTitle.textContent = "No Song Selected";
        songImage.src = "thumbnail.png";
    }
});

acceptButton.addEventListener("click", () => {
    if (audioPlayer.src) {
        audioPlayer.play();
        ctrlIcon.classList.replace("fa-play", "fa-pause");
        document.querySelector('.music-player').classList.add('glow');
        document.querySelector('.song-img').classList.add('glow');
    }
});

document.getElementById("listButton").addEventListener("click", () => {
    playlistContainer.style.display = playlistContainer.style.display === "block" ? "none" : "block";
});

document.getElementById("backButton").addEventListener("click", () => {
    playlistContainer.style.display = "none";
});

playlist.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = `${song.title} - ${song.artist}`;
    li.addEventListener("click", () => {
        loadSong(index);
        playPause();
        playlistContainer.style.display = "none";
    });
    songList.appendChild(li);
});

playPauseButton.addEventListener("click", playPause);
document.getElementById("prevButton").addEventListener("click", () => {
    currentSongIndex = currentSongIndex > 0 ? currentSongIndex - 1 : playlist.length - 1;
    loadSong(currentSongIndex);
    playPause();
});

document.getElementById("nextButton").addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    loadSong(currentSongIndex);
    playPause();
});

audioPlayer.onloadedmetadata = () => {
    progress.max = audioPlayer.duration;
};

loadSong(currentSongIndex);
