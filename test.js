let user;

// Function to set default user details in localStorage
function setDefaultUser() {
    const defaultUser = {
        firstName: "Lorem",
        lastName: "Ipsum",
        watchHours: 0 // Adjust other properties as needed
    };

    localStorage.setItem('currentUser', JSON.stringify(defaultUser));
}

// Function to check if a user is logged in during page load or reload
function checkUserOnLoad() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        // No user is logged in, set default user
        setDefaultUser();
    } else {
        // User is logged in
        alert(`Welcome, ${currentUser.firstName} ${currentUser.lastName}.`);

        // Check if it's the user's birthday
        const today = new Date();
        const userBirthday = new Date(today.getFullYear(), currentUser.birthdayMonth - 1, currentUser.birthdayDay);
        if (userBirthday.getDate() === today.getDate() && userBirthday.getMonth() === today.getMonth()) {
            alert(`Happy birthday, ${currentUser.firstName} ${currentUser.lastName}!`);
        }
        else {
            // User hasn't provided their birthday, display a generic message
            alert(`Enjoy your day, ${currentUser.firstName} ${currentUser.lastName}!`);
        }
    }
}


function detectTodayDate() {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1; // Month is 0-indexed, so add 1
    console.log("Today's Day:", day);
    console.log("Today's Month:", month);
    alert(`Today is ${today}`);
}

// Function to retrieve the user's birthday day and month
function getBirthdayDate() {
    const currentUserData = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUserData && currentUserData.BirthdayDay && currentUserData.BirthdayMonth) {
        return {
            day: currentUserData.BirthdayDay,
            month: currentUserData.BirthdayMonth
        };
    }
    return null; // Return null if birthday data is not available
}

// Function to wish happy birthday if the current date matches the user's birthday
function wishBirthday() {
    const birthdayDate = getBirthdayDate();
    if (!birthdayDate) {
        console.log("Birthday information not found.");
        return;
    }

    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth() + 1; // Month is zero-based

    if (currentDay === birthdayDate.day && currentMonth === birthdayDate.month) {
        // User's birthday matches the current date
        alert("Happy Birthday!");
    } else {
        alert("Enjoy your day!");
    }
}

// Call the function to wish birthday
wishBirthday();

// Function to update user information in HTML elements
function updateUserInfo() {
    let firstName, lastName, watchHours;
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // Check if currentUser exists in localStorage
    if (currentUser) {
        firstName = currentUser.firstName;
        lastName = currentUser.lastName;
        watchHours = parseInt(currentUser.watchHours);
    } else {
        // If currentUser does not exist, use default user
        firstName = "Lorem";
        lastName = "Ipsum";
        watchHours = 0;
    }

    // Update HTML elements with user information
    const userNameElement = document.getElementById('userName');
    const watchHoursElement = document.querySelector('.my-watchhours');

    if (userNameElement && firstName && lastName) {
        userNameElement.textContent = firstName + ' ' + lastName;
    }

    if (watchHoursElement) {
        watchHoursElement.textContent = watchHours;
    }
}



function toggleVideoAlgo() {
    const videoAlgo = document.querySelector('.video-algo');
    if (videoAlgo.style.display === "none" || videoAlgo.style.display === "") {
        videoAlgo.style.display = "block";
        videoAlgo.style.transition = "100ms";
    } else {
        videoAlgo.style.display = "none";
    }
    // Add event listener to each .item element
    document.querySelectorAll('.video-algo .container .item').forEach(item => {
    item.addEventListener('click', function() {
        // Remove 'active' class from all items
        document.querySelectorAll('.video-algo .container .item').forEach(item => {
            item.classList.remove('active');
        });
        // Add 'active' class to clicked item
        this.classList.add('active');
    });
});

}

function toggleNewAds() {
    const newAds = document.querySelector(".new-ads");
    if (newAds.style.display === "none" || newAds.style.display === "") {
        newAds.style.display = "block";
        newAds.style.transition = "100ms";
    } else {
        newAds.style.display = "none";
    }
}

function toggleUserProfile() {
    const userProfile = document.querySelector(".profile-info");
    if (userProfile.style.display === "none" || userProfile.style.display === "") {
        userProfile.style.display = "block";
        userProfile.style.transition = "100ms";
    } else {
        userProfile.style.display = "none";
    }
}

function toggleAdSetting() {
    const AdSetting = document.querySelector(".ad-setting");
    if (AdSetting.style.display === "none" || AdSetting.style.display === "") {
        AdSetting.style.display = "block";
        AdSetting.style.transition = "100ms";
    } else {
        AdSetting.style.display = "none";
    }
}

function toggleProfileVisibility() {
    const profileSection = document.getElementById('Profile');
    if (profileSection.style.display === 'block') {
        hideProfile();
    } else {
        userprofile();
    }
}


function hideProfile() {
    // Hide the profile section
    const profileSection = document.getElementById('Profile');
    profileSection.style.display = 'none';
}

function userprofile() {
    // Hide all sections except the profile section
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        if (section.id !== 'Profile') {
            section.style.display = 'none';
        }
    });

    // Display the profile section
    const profileSection = document.getElementById('Profile');
    profileSection.style.display = 'block';
}

// Call hideProfile() when navigating away from the profile section
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', hideProfile);
});


function toggleVideo(video, button) {
    const isPlaying = !video.paused;

    // Pause all other videos except the current one
    document.querySelectorAll('.video-new video').forEach(otherVideo => {
        if (otherVideo !== video && !otherVideo.paused) {
            pauseVideo(otherVideo, otherVideo.nextElementSibling.querySelector('.play-button'));
        }
    });

    // Toggle play/pause for the current video
    if (isPlaying) {
        pauseVideo(video, button);
        videoDiv.style.backgroundColor = "#fff";
        updatePlayButtonIcon(button, false);
    } else {
        playVideo(video, button);
        videoDiv.style.backgroundColor = "#002fff";
        updatePlayButtonIcon(button, true);
    }
}



function playVideo(video, button) {
    // Pause all other videos
    document.querySelectorAll('.video-new video').forEach(otherVideo => {
        if (otherVideo !== video && !otherVideo.paused) {
            pauseVideo(otherVideo, otherVideo.nextElementSibling.querySelector('.play-button'));
            
        }
    });

    // Play the associated video
    video.play();
    button.innerHTML = " <i class='fas fa-pause'></i> "; // Change button text to 'Pause'
    button.style.backgroundColor = "purple";

    // Query for all video elements in the DOM
    const allVideo = document.querySelectorAll('.video');

    // Loop through each video element and add the .vidBorder class
    allVideo.forEach(video => {
        video.classList.add('vidBorder');
    });

    // Increment view count when the video ends
    video.addEventListener('ended', function() {
        incrementViewCount(video);
        button.innerHTML = " <i class='fas fa-play'></i> "; // Change button text to 'Pause'
        button.style.backgroundColor = "green";
    });
}

function pauseVideo(video, button) {
    // Pause the associated video
    video.pause();
    button.innerHTML = " <i class='fas fa-play'></i> "; // Change button text to 'Play'
    button.style.backgroundColor = "green";
    
}

function incrementViewCount(video) {
    const videoId = video.id;
    
    // Fetch the user data
    fetch('userData.json')
        .then(response => response.json())
        .then(userData => {
            // Extract the current user information
            const currentUser = getCurrentUser(userData);
            const playCount = getPlayCount(currentUser, videoId);
            
            // Check if the play count is less than or equal to 3
            if (playCount <= 3) {
                // Increment the view count for the video
                const viewsSpan = video.closest('.video-new').querySelector('.views span');
                viewsSpan.textContent = parseInt(viewsSpan.textContent) + 1;
            }
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });
}

// Function to extract the current user information
function getCurrentUser() {
    const firstName = localStorage.getItem('firstName');
    const lastName = localStorage.getItem('lastName'); // Corrected 'Second Name' to 'Last Name'
    const watchHours = localStorage.getItem('watchHours');

    if (firstName && lastName) {
        return {
            firstName: firstName,
            lastName: lastName,
            watchHours: watchHours || '0'
        };
    } else {
        // Set default user and return it
        setDefaultUserIfNoUserLoggedIn();
        return {
            firstName: "Lorem",
            lastName: "Ipsum",
            watchHours: 0
        };
    }
}


// Logging the result of getCurrentUser function
console.log(getCurrentUser());

function setDefaultUserIfNoUserLoggedIn() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) { // If no user is logged in, set the default user
        const defaultUser = {
            "First Name": "Lorem",
            "Last Name": "Ipsum",
            "Phone number": "0000000000",
            "Password": "defaultpassword",
            "ID number": "00000000",
            "User Unique Number": "000000",
            "User watch hours": "0"
        };
        localStorage.setItem('currentUser', JSON.stringify(defaultUser));
    }
}

 function redirect() {
    window.location.href = "log.html";
 }

function storeViewCount(videoId, viewCount) {
    // Construct a key for the view count of the video
    const key = `video_${videoId}_views`;
    
    // Store the view count in localStorage
    localStorage.setItem(key, viewCount);
    
}

function updatePlayButtonIcon(button, isPlaying) {
    const icon = button.querySelector('i');
    if (isPlaying) {
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
    } else {
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
    }
}
// Event listeners

document.addEventListener("DOMContentLoaded", function() {
    // Add event listeners for play buttons
    document.querySelectorAll('.play-button').forEach(playButton => {
        playButton.addEventListener('click', function() {
            const video = this.closest('.video').querySelector('video');
            toggleVideo(video, this);
        });
    });

    var loadingOverlay = document.getElementById("loading-overlay");
            loadingOverlay.style.display = "none";
});

function getVideoElementWithIdAttribute(videoId) {
    // Query all video elements with the 'data-video-id' attribute set
    const videoElements = document.querySelectorAll(`video[data-video-id="${videoId}"]`);
    
    // Check if any video element with the specified ID exists
    if (videoElements.length > 0) {
        // Return the first video element found with the specified ID
        return videoElements[0];
    } else {
        // If no matching video element found, return null
        return null;
    }
}

let isSeekAllowed = false;
let currentTimeBeforeSeek;

async function createVideos(videosData) {
    const videosContainer = document.querySelector('.videos');
    
    videosData.forEach(async (videoData, index) => {
        const videoDiv = document.createElement('div');
        videoDiv.classList.add('video-new');
        
        const videoElement = document.createElement('video');
        videoElement.classList.add('myvideo');
        videoElement.src = videoData.url;
        videoElement.alt = videoData.title;
        videoElement.setAttribute('id', `video-${videoData.videoId}`); // Assign a unique ID
        
        // Add event listener for double-click to enable fullscreen on touch devices
        videoElement.addEventListener('dblclick', function() {
            if (isTouchDevice()) {
                enableFullscreen(videoElement);
            }
        });
        
        videoElement.addEventListener('seeking', function() {
            if (!isSeekAllowed) {
                currentTimeBeforeSeek = videoElement.currentTime; // Store current time
                videoElement.pause(); // Pause the video
            }
        });
        
        videoElement.addEventListener('seeked', function() {
            if (!isSeekAllowed) {
                videoElement.currentTime = currentTimeBeforeSeek; // Set current time back to what it was before seeking
                videoElement.play(); // Resume playing the video
            }
        });
    
        videoElement.addEventListener('waiting', function() {
            // Handle the waiting event, such as showing a loading indicator or message
            showLoadingOverlay();
            console.log('Video is waiting for data to load...');
        });


        videoElement.addEventListener('playing', function() {
            // Handle the waiting event, such as showing a loading indicator or message
            hideLoadingOverlay();
            console.log('Video is waiting for data to load...');
        });
        
        const videoTitle = document.createElement('h2');
        videoTitle.textContent = videoData.title;

        const weblinkDiv = document.createElement('div');
        weblinkDiv.classList.add('weblinks');

        const weblinkTitle = document.createElement('h2');
        weblinkTitle.textContent = `Website link :${videoData.website} `;

        const buttonsDiv = document.createElement('div');
        buttonsDiv.classList.add('buttons');
        let isPlaying = false;
       
        const playButton = document.createElement('button');
        playButton.classList.add('play-button');
        playButton.innerHTML = '<i class="fas fa-play"></i>';
        playButton.addEventListener('click', async function() {
            await handleVideoInteraction(videoElement, this, videoData);         
            user = getUser();
            const videoId = videoData.videoId;
            const limit  = 3;
            if (!playTracker.hasPlayedMoreThanLimit(user, videoId, limit)) {
                // User is logged in or signed up, and play count limit is not exceeded
                trackVideoProgress(videoElement);
                if (!isPlaying) {
                    playVideo(videoElement, playButton);
                    videoDiv.style.backgroundColor = "#2ecc71";
                    updatePlayButtonIcon(playButton, true);
                    isPlaying = true;
                } else {
                    pauseVideo(videoElement, playButton);
                    videoDiv.style.backgroundColor = "#fff";
                    updatePlayButtonIcon(playButton, false);
                    isPlaying = false;
                }
                playTracker.incrementPlayCount(user, videoId); // Increment play count
            } else {
                // User has exceeded the play count limit for this video
                alert(`You have exceeded the play count limit for this video ${videoData.title}.`);
                playButton.disabled = true; // Disable the play button to prevent further plays
                playButton.style.backgroundColor = "red";
            }
        });


        buttonsDiv.appendChild(playButton);
        
        const volumeIcon = document.createElement('i');
        volumeIcon.classList.add('fas', 'fa-volume-up');
        volumeIcon.style.marginLeft = "10px";
        volumeIcon.style.color = "#fff";
        volumeIcon.style.backgroundColor = "#3498db";
        volumeIcon.style.fontSize = "2em";
        volumeIcon.style.borderRadius = "10px";
        volumeIcon.style.marginTop = "10px";

        const volumeSlider = document.createElement('input');
        volumeSlider.setAttribute('type', 'range');
        volumeSlider.setAttribute('id', `volume-slider-${index+1}`); // Assign a unique ID
        volumeSlider.setAttribute('min', '0');
        volumeSlider.setAttribute('max', '100');
        volumeSlider.setAttribute('step', '5');
        volumeSlider.setAttribute('value', '10'); // Initial volume
        volumeSlider.addEventListener('input', function() {
            videoElement.volume = volumeSlider.value;
        });

        const likeButton = document.createElement('button');
        likeButton.classList.add('like-button');
        likeButton.innerHTML = '<i class="fas fa-thumbs-up"></i>';

        const viewsDiv = document.createElement('div');
        viewsDiv.classList.add('views');
        viewsDiv.innerHTML = '<i class="fas fa-eye"></i> <span>0</span>';
        let viewCount = 0;
        videoElement.addEventListener("ended", function() {
            videoDiv.appendChild(vidImage);
            playButton.innerHTML = '<i class="fas fa-play"></i>';
            playButton.style.backgroundColor = "green";
           // videoElement.pause();
            videoElement.currentTime = 0;
            videoDiv.style.backgroundColor = "#fff";
            viewCount++;
            incrementViewCount(this); // 'this' refers to the video element  
            // Store the updated view count
            storeViewCount(videoElement.id, viewCount);
           
            
        });
        
        // Append elements
        weblinkDiv.appendChild(weblinkTitle);
        

        buttonsDiv.appendChild(playButton);
        buttonsDiv.appendChild(volumeIcon);
        buttonsDiv.appendChild(volumeSlider);
        buttonsDiv.appendChild(likeButton);
        buttonsDiv.appendChild(viewsDiv);    

        likeButton.addEventListener('click', function() {
            toggleLike(likeButton);
        });
        
        videoDiv.appendChild(videoElement);
        videoDiv.appendChild(videoTitle);
        videoDiv.appendChild(weblinkDiv);
        videoDiv.appendChild(buttonsDiv);

        videosContainer.appendChild(videoDiv);
    });
}

async function handleVideoInteraction(videoElement,  videoData) {
    user = getCurrentUser(); // Retrieve the current user

    if (user.firstName === "Lorem" && user.lastName === "Ipsum") {
        alert(`You are viewing as default user ${user.firstName} ${user.lastName}. Please login or sign up to personalize your experience.`);
    }

    if (!user) {
        videoElement.pause(); // Pause the video
        // User is not logged in, show dialog box for login/signup
        const isLoggedIn = await showLoginSignupDialog();
        if (!isLoggedIn) {
            // Set default user and resume video playback
            setDefaultUserIfNoUserLoggedIn();
            videoElement.play(); // Resume video playback
            return; // If user cancels or closes the dialog, do not proceed
        }
    }

}


async function createVideosFromJSON(jsonFile) {
    try {
        const response = await fetch(jsonFile);
        const videosData = await response.json();
        createVideos(videosData);
    } catch (error) {
        alert('Error fetching or parsing JSON:', error);
    }
}


async function showLoginSignupDialog() {
    return new Promise((resolve) => {
        // Create dialog elements
        const dialogOverlay = document.createElement('div');
        dialogOverlay.classList.add('dialog-overlay');

        const dialogBox = document.createElement('div');
        dialogBox.classList.add('dialog-box');

        const message = document.createElement('p');
        message.textContent = 'Please log in or sign up to access this content.';

        const loginButton = document.createElement('button');
        loginButton.textContent = 'Log In';
        loginButton.addEventListener('click', () => {
            // Redirect to log.html on login button click
            window.location.href = 'log.html';
        });

        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Cancel';
        cancelButton.addEventListener('click', () => {
            // Resolve the promise with false if user cancels
            resolve(false);
            // Remove dialog elements
            dialogOverlay.remove();
        });

        // Append elements to dialog box
        dialogBox.appendChild(message);
        dialogBox.appendChild(loginButton);
        dialogBox.appendChild(cancelButton);

        // Append dialog box to body
        document.body.appendChild(dialogOverlay);
        document.body.appendChild(dialogBox);
    });
}



async function generateRandomVideos(jsonFile, count) {
    try {
        const response = await fetch(jsonFile);
        const videosData = await response.json();
        
        // Randomize the order of videosData array
        const shuffledVideos = videosData.sort(() => Math.random() - 0.5);
        
        // Take all videos from the shuffled list
        const randomVideos = shuffledVideos.slice(0, count);

        return randomVideos;
    } catch (error) {
        console.error('Error fetching or parsing JSON:', error);
        return [];
    }
}

window.onload = async function() {
    showLoadingOverlay(); // Show the loading overlay immediately
    checkUserOnLoad();
    updateUserInfo();
    // Generate random videos
    const response = await fetch('videos.json');
    const videosData = await response.json();
    const count = videosData.length;
    const randomVideos = await generateRandomVideos('videos.json', count);
    
    // Create videos from the generated random subset
    createVideos(randomVideos);
    
    setTimeout(() => {
        hideLoadingOverlay(); // Hide the loading overlay after 5000 milliseconds
    }, 5000);
}

// Function to fetch user data from JSON file
async function fetchUserData() {
    try {
        const response = await fetch('userData.json');
        const userData = await response.json();
        return userData;
    } catch (error) {
        console.error('Error fetching user data:', error);
        return [];
    }
}
class PlayTracker {
    constructor() {
        // Initialize play count map with data from local storage
        this.playCountMap = this.loadPlayCountDataFromLocalStorage();
    }

    // Method to load play count data from local storage
    loadPlayCountDataFromLocalStorage() {
        const playCountData = JSON.parse(localStorage.getItem('playCountData')) || {};
        const playCountMap = new Map();

        // Convert play count data to map format
        for (const key in playCountData) {
            playCountMap.set(key, playCountData[key]);
        }

        return playCountMap;
    }

    // Method to save play count data to local storage
    savePlayCountDataToLocalStorage() {
        // Convert play count map to object format
        const playCountData = {};
        for (const [key, value] of this.playCountMap) {
            playCountData[key] = value;
        }

        // Save play count data to local storage
        localStorage.setItem('playCountData', JSON.stringify(playCountData));
    }

    // Method to increment play count for a user and video combination
    incrementPlayCount(user, videoId) {
        const key = `${user}_${videoId}`;
        const playCount = this.playCountMap.get(key) || 0;
        this.playCountMap.set(key, playCount + 1);

        // Save updated play count data to local storage
        this.savePlayCountDataToLocalStorage();
    }

    // Method to check if the user has played the video more than a specified limit
    hasPlayedMoreThanLimit(user, videoId, limit) {
        const key = `${user}_${videoId}`;
        const playCount = this.playCountMap.get(key) || 0;
        return playCount > limit;
    }
}

// Create an instance of the PlayTracker class
const playTracker = new PlayTracker();




function toggleLike(button) {
    button.classList.toggle('clicked');
}

function toggleVolume() {
    var video = document.getElementById("myVideo");
    video.muted = !video.muted;
}

function setVolume(volume) {
    var video = document.getElementById("myVideo");
    video.volume = volume;
}


function fetchVideosXHR(callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'videos.json', true);
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            var data = JSON.parse(xhr.responseText);
            callback(null, data); // Pass the data to the callback function
        } else {
            var error = new Error('Request failed');
            callback(error, null); // Pass the error to the callback function
        }
    };
    xhr.onerror = function() {
        var error = new Error('Request failed');
        callback(error, null); // Pass the error to the callback function
    };
    xhr.send();
}






// Get all items with the class "item"
const items = document.querySelectorAll('.item');

// Loop through each item and add event listeners
items.forEach(function(item) {
    // Add event listener to the current item
    item.addEventListener('click', function() {
        // Remove all existing videos
        const videosContainer = document.querySelector('.videos');
        videosContainer.innerHTML = ''; // Clear the contents of the videos container
        // Check the text content of the clicked item to determine the action
        switch (item.textContent) {
            case 'Home':
                showLoadingOverlay(); // Show the loading overlay immediately
                setTimeout(() => {
                    createVideosFromJSON('videos.json');
                    setTimeout(() => {
                        hideLoadingOverlay(); // Hide the loading overlay after 2000 milliseconds
                    }, 3000);
                }, 2000);
                break;
                case 'Product Advertising':
                case 'Brand Advertising':
                case 'Corporate Advertising':
                case 'Public Service Advertising (PSA)':
                case 'Retail Advertising':
                case 'B2B Advertising':
                case 'Celebrity Endorsements':
                case 'Event Sponsorship':
                    showLoadingOverlay(); // Show the loading overlay immediately
                    setTimeout(() => {
                        const category = item.textContent;
                        loadVideos(category);
                      setTimeout(() => {
                        hideLoadingOverlay(); // Hide the loading overlay after 2000 milliseconds
                    }, 8000);
                }, 3000);
                    break;
             case 'Non-videos Advertising':
                    const numberOfNonVideoItems = 30; // Change this to the desired number of items
                    let nonVideoAdvertisingHTML = '';
                    for (let i = 0; i < numberOfNonVideoItems; i++) {
                        nonVideoAdvertisingHTML += createNonVideoItem(`${'_55771d54-8ab8-4093-ae89-e4a2add33e34'}.jpeg`, `Item ${i + 1}`, `www.example.com/item${i}`);
                    }
                    videosContainer.innerHTML = nonVideoAdvertisingHTML; // Append to videosContainer
                    break;
                    
                       
            default:
                // Handle any other cases or do nothing
                break;
        }

        // Display the videos section on the home page
        videosContainer.style.display = 'block';
    });
});


function createNonVideoItem(imageSrc, title, websiteLink) {
    return `
    <div class="video">
        <img src="${imageSrc}" alt="${title}" class="myimage">
        <h2>${title}</h2>
        <div class="weblinks">
            <h2>Website link : </h2><span class="website">${websiteLink}</span>
        </div>
        <div class="buttons">
            <button class="view-button" onclick="toggleView(this)"><i class="fas fa-eye"></i></button>
            <button onclick="toggleContact()"><i class="fas fa-phone"></i></button>
            <button onclick="toggleLike(this)" class="like-button"><i class="fas fa-thumbs-up"></i></button>
            <button onclick="toggleStar(this)" class="star-button"><i class="fas fa-star"></i></button>
            <div class="views"><i class="fas fa-eye"></i> <span>0</span></div>
        </div>
    </div>`;
}

// Function to show the loading overlay
function showLoadingOverlay() {
    var loadingOverlay = document.getElementById("loading-overlay");
    loadingOverlay.style.display = "flex"; // Show the overlay
}

// Function to hide the loading overlay
function hideLoadingOverlay() {
    var loadingOverlay = document.getElementById("loading-overlay");
    loadingOverlay.style.display = "none"; // Hide the overlay
}

window.addEventListener("offline", function(){
    const offlinePage = this.document.querySelector('.offline-page');
    offlinePage.display = "flex";
});

function openDialog(dialogId) {
    const dialog = document.getElementById(dialogId);
    if (!dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
    }
    dialog.showModal();
}
 // Function to close the dialog
 function closeDialog(dialogId) {
    const dialog = document.getElementById(dialogId);
    dialog.close();
}

// Function to save the edited name
function saveName() {
    const newName = document.getElementById('newNameInput').value;
    // Update the name wherever necessary
    const userName = document.getElementById('userName');
    userName.textContent = newName;

    const userNames = document.getElementById('FullNames');
    userNames.textContent = newName;

    const userVerify = document.getElementById('nameVerify');
    userVerify.textContent = newName;
    
    closeDialog('nameEditDialog');
}
function savePhone() {
    const newPhone = document.getElementById('newPhoneInput').value;
    // Update the phone number wherever necessary
    closeDialog('phoneEditDialog');
}

 // Function to open the view details dialog
 function openViewDetailsDialog() {
    openDialog('viewDetailsDialog');
    // Populate the view details dialog with the necessary information
}


window.addEventListener('online', function(event) {
    // Handle online event
    alert("You are online.");
    hideLoadingOverlay();
});

window.addEventListener('offline', function(event) {
    // Handle offline event
    showLoadingOverlay();
    alert("You are offline.");
});

function loadVideos(category) {
    fetch('videos.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Videos data:', data);
            // Filter videos based on the category
            const filteredVideos = data.filter(video => video.category === category);
            // Create videos based on the filtered data
            createVideos(filteredVideos); // Pass only the filtered videos data
        })
        .catch(error => {
            console.error('Error fetching videos:', error);
            alert(error);
        });
}



let totalWatchHours = 0;
let lastUpdateTime = 0; // Declare lastUpdateTime as a global variable

function trackVideoProgress(videoElement) {
    const myWatchView = document.querySelector('.my-watchhours');

    videoElement.addEventListener('timeupdate', function() {
        const currentTime = videoElement.currentTime;
        const deltaTime = currentTime - lastUpdateTime;

        if (!videoElement.paused && !videoElement.ended && deltaTime > 0) {
            totalWatchHours += deltaTime; // Increment watch hours by time elapsed
            myWatchView.textContent = totalWatchHours.toFixed(2);

            // Update watch hours in local storage
            localStorage.setItem('watchHours', totalWatchHours.toFixed(2));

            // Update watch hours in userData.json
            updateWatchHoursInUserData(totalWatchHours.toFixed(2));

            lastUpdateTime = currentTime; // Update last update time
        }
    });
}



function updateUserWatchHoursInUserData(watchHours) {
    // Retrieve the current user's ID number from local storage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || !currentUser['IdNumber']) {
        console.error('Current user or user ID not found in local storage');
        return;
    }
    const userId = currentUser['IdNumber'];

    // Fetch the userData.json from the server or local storage
    fetch('userData.json')
        .then(response => response.json())
        .then(userData => {
            // Find the user in the userData array
            user = userData.find(user => user['ID number'] === userId);

            // If the user exists, update their watch hours
            if (user) {
                user['User watch hours'] = watchHours;

                // Update userData.json file
                fetch('userData.json', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userData)
                })
                .then(() => alert('User watch hours updated in userData.json'))
                .catch(error => alert('Error updating user watch hours in userData.json:', error));
            } else {
                alert('User not found in userData.json');
            }
        })
        .catch(error => console.error('Error fetching userData.json:', error));
}


// Function to display the user's watch hours
function displayUserWatchHours() {
    const watchHoursElement = document.querySelector('.my-watchhours');

    // Retrieve the user's watch hours from localStorage or UserAnalytics.json
    let userWatchHours = 0; // Set default value
    // Retrieve watch hours from localStorage
    const storedWatchHours = localStorage.getItem('watchHours');
    if (storedWatchHours !== null) {
        userWatchHours = parseFloat(storedWatchHours);
    }
    // Alternatively, retrieve watch hours from UserAnalytics.json

    // Update the HTML element with the user's watch hours
    watchHoursElement.textContent = userWatchHours.toFixed(2); // Assuming the watch hours are stored as a floating-point number
}

// Alternatively, call the function when the page is loaded
window.addEventListener('DOMContentLoaded', function() {
    // Your page initialization logic here

    // Display the user's watch hours
    displayUserWatchHours();
    
});


document.addEventListener('DOMContentLoaded', () => {
    // Your code here
    window.onscroll = () => {
        const navbar = document.querySelector('nav');
        if (navbar && window.pageYOffset > 100) {
            navbar.style.position = 'fixed';
            navbar.style.top = '0';
            navbar.style.zIndex = '1000'; // Set a high z-index value to ensure it overlays the content
            //navbar.style.marginLeft = '60px';
        } else if (navbar) {
            navbar.style.position = 'static'; // Restore the default position when not scrolled
        }
    };
});


function showProfileDialog() {
    const profileDialog = document.getElementById('profile-dialog');
    profileDialog.showModal();
}

function showTermsAndConditionsDialog() {
    const termsAndConditionsDialog = document.getElementById('terms-and-conditions-dialog');
    termsAndConditionsDialog.showModal();
}


// Function to detect if the device has touch support
function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints;
}

// Function to enable fullscreen mode for videos
function enableFullscreen(videoElement) {
    if (videoElement.requestFullscreen) {
        videoElement.requestFullscreen();
    } else if (videoElement.mozRequestFullScreen) { /* Firefox */
        videoElement.mozRequestFullScreen();
    } else if (videoElement.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        videoElement.webkitRequestFullscreen();
    } else if (videoElement.msRequestFullscreen) { /* IE/Edge */
        videoElement.msRequestFullscreen();
    }
}


function updateNames() {
    const firstName = document.getElementById('firstName').value;
    const secondName = document.getElementById('secondName').value;
    document.getElementById('fnameVerify').textContent = firstName;
    document.getElementById('snameVerify').textContent = secondName;
    document.getElementById('nameEditDialog').close();
    return { firstName, secondName }; // Return an object with updated names
  }
  
  function updatePhoneNumber() {
    const phoneNumber = document.getElementById('phoneNumber').value;
    document.getElementById('phoneVerify').textContent = phoneNumber;
    document.getElementById('phoneEditDialog').close();
    return phoneNumber; // Return the updated phone number
  }
  



