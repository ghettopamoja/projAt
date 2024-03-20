function createVideos(videosData) {
    const videosContainer = document.querySelector('.videos');

    videosData.forEach((video, index) => {
        const videoDiv = document.createElement('div');
        videoDiv.classList.add('video-new');

        const videoElement = document.createElement('video');
        videoElement.classList.add('myvideo');
        videoElement.src = video.url;
        videoElement.alt = `${video.title} ${index + 1}`;
        videoElement.setAttribute('id', `video-${index + 1}`); // Assign a unique ID

        const videoTitle = document.createElement('h2');
        videoTitle.textContent = video.title;

        const weblinkDiv = document.createElement('div');
        weblinkDiv.classList.add('weblinks');

        const weblinkTitle = document.createElement('h2');
        weblinkTitle.textContent = 'Website link : ';

        const websiteSpan = document.createElement('span');
        websiteSpan.classList.add('website');

        const buttonsDiv = document.createElement('div');
        buttonsDiv.classList.add('buttons');
        let isPlaying = false;
        // Add event listeners
        const playButton = document.createElement('button');
        playButton.classList.add('play-button');
        playButton.innerHTML = '<i class="fas fa-play"></i>';
        playButton.addEventListener('click', function () {
            trackVideoProgress(videoElement);
            if (!isPlaying) {
                playVideo(videoElement, playButton);
                videoDiv.style.backgroundColor = "#002fff";
                updatePlayButtonIcon(playButton, true);
                isPlaying = true;
            } else {
                pauseVideo(videoElement, playButton);
                videoDiv.style.backgroundColor = "#fff";
                updatePlayButtonIcon(playButton, false);
                isPlaying = false;
            }
        });

        buttonsDiv.appendChild(playButton);

        const volumeSlider = document.createElement('input');
        volumeSlider.setAttribute('type', 'range');
        volumeSlider.setAttribute('id', `volume-slider-${index + 1}`); // Assign a unique ID
        volumeSlider.setAttribute('min', '0');
        volumeSlider.setAttribute('max', '100');
        volumeSlider.setAttribute('step', '5');
        volumeSlider.setAttribute('value', '20'); // Initial volume
        volumeSlider.addEventListener('input', function () {
            videoElement.volume = volumeSlider.value;
        });
        // Set attributes for volume slider if needed

        const likeButton = document.createElement('button');
        likeButton.classList.add('like-button');
        likeButton.innerHTML = '<i class="fas fa-thumbs-up"></i>';
        // Add event listener for like button if needed

        const starButton = document.createElement('button');
        starButton.classList.add('star-button');
        starButton.innerHTML = '<i class="fas fa-star"></i>';
        // Add event listener for star button if needed

        const viewsDiv = document.createElement('div');
        viewsDiv.classList.add('views');
        viewsDiv.innerHTML = '<i class="fas fa-eye"></i> <span>0</span>';
        let viewCount = 0;
        videoElement.addEventListener("ended", function () {
            playButton.innerHTML = '<i class="fas fa-play"></i>';
            playButton.style.backgroundColor = "green";
            videoElement.pause();
            videoElement.currentTime = 0;
            videoDiv.style.backgroundColor = "#fff";
            viewCount++;
            incrementViewCount(this); // 'this' refers to the video element  
            // Store the updated view count
            storeViewCount(videoElement.id, viewCount);
        });

        // Append elements
        weblinkDiv.appendChild(weblinkTitle);
        weblinkDiv.appendChild(websiteSpan);

        buttonsDiv.appendChild(playButton);
        buttonsDiv.appendChild(volumeSlider);
        buttonsDiv.appendChild(likeButton);
        buttonsDiv.appendChild(starButton);
        buttonsDiv.appendChild(viewsDiv);

        likeButton.addEventListener('click', function () {
            toggleLike(likeButton);
        });

        starButton.addEventListener('click', function () {
            toggleStar(starButton);
        });

        videoDiv.appendChild(videoElement);
        videoDiv.appendChild(videoTitle);
        videoDiv.appendChild(weblinkDiv);
        videoDiv.appendChild(buttonsDiv);

        videosContainer.appendChild(videoDiv);
    });
}


window.onload = function() {
    showLoadingOverlay(); // Show the loading overlay immediately
    setTimeout(() => {
        fetch('videos.json') // Assuming the JSON file is named 'videos.json'
            .then(response => response.json())
            .then(videosData => {
                createVideos(videosData);
                setTimeout(() => {
                    hideLoadingOverlay(); // Hide the loading overlay after 8000 milliseconds
                }, 8000);
            })
            .catch(error => {
                console.error('Error fetching videos data:', error);
                hideLoadingOverlay(); // Hide the loading overlay in case of error
            });
    }, 3000);
};
