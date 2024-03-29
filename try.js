function showNotification(message) {
    // Check if the browser supports notifications
    if (!("Notification" in window)) {
        console.log("This browser does not support desktop notification");
        alert(message);
    } else if (Notification.permission === "granted") {
        // If permission is already granted, create the notification
        try {
            new Notification(message);
        } catch (err) {
            console.error("Error displaying notification:", err);
            alert(message); // Fallback to alert if notification creation fails
        }
    } else if (Notification.permission !== "denied") {
        // Otherwise, request permission from the user
        Notification.requestPermission().then(function (permission) {
            if (permission === "granted") {
                // If permission is granted, create the notification
                try {
                    new Notification(message);
                } catch (err) {
                    console.error("Error displaying notification:", err);
                    alert(message); // Fallback to alert if notification creation fails
                }
            }
        });
    }
}

// Function to extract the current user information
function getCurrentUser() {
    const firstName = localStorage.getItem('firstName');
    const lastName = localStorage.getItem('lastName'); 
    const watchHours = localStorage.getItem('totalWatchHours');
    const birthdayDay = localStorage.getItem('birthdayDay');
    const birthdayMonth = localStorage.getItem('birthdayMonth');
    const IdNumber = localStorage.getItem('IdNumber');
    const UniqueNumber = localStorage.getItem('UniqueNumber');
    const phoneNumber = localStorage.getItem('phoneNumber');

    if (firstName && lastName) {
        return {
            firstName: firstName,
            lastName: lastName,
            watchHours: watchHours || '0',
            birthdayDay: birthdayDay,
            birthdayMonth: birthdayMonth,
            IdNumber: IdNumber,
            UniqueNumber: UniqueNumber,
            phoneNumber: phoneNumber
        };
    } else {
        // Set default user and return it
        setDefaultUserIfNoUserLoggedIn();
        return {
            firstName: "Lorem",
            lastName: "Ipsum",
            watchHours: 0,
            birthdayDay: 28,
            birthdayMonth: 3,
            IdNumber: 0,
            UniqueNumber: 123456,
            phoneNumber: 0
        };
    }
}
function setDefaultUserIfNoUserLoggedIn() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) { // If no user is logged in, set the default user
        const defaultUser = {
            "firstName": "Lorem",
            "lastName": "Ipsum",
            "phoneNumber": "0000000000",
            "Password": "defaultpassword",
            "IdNnumber": "00000000",
            "UniqueNumber": "000000",
            "watchHours": "0"
        };
        localStorage.setItem('currentUser', JSON.stringify(defaultUser));
    }
}

// Function to check if a user is logged in during page load or reload
function checkUserOnLoad() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        // No user is logged in, set default user
        setDefaultUserIfNoUserLoggedIn();
    } else {
        // User is logged in
        showNotification(`Welcome, ${currentUser.firstName} ${currentUser.lastName}.`);
        alert(`Welcome, ${currentUser.firstName} ${currentUser.lastName}.`);
        // Check if it's the user's birthday
        const today = new Date();
        const userBirthday = new Date(today.getFullYear(), currentUser.birthdayMonth - 1, currentUser.birthdayDay);
        if (userBirthday.getDate() === today.getDate() && userBirthday.getMonth() === today.getMonth()) {
            showNotification(`Happy birthday, ${currentUser.firstName} ${currentUser.lastName}!`);
            alert(`Happy birthday, ${currentUser.firstName} ${currentUser.lastName}!`);
        }
        else {
            // User hasn't provided their birthday, display a generic message
            showNotification(`Enjoy your day, ${currentUser.firstName} ${currentUser.lastName}!`);
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
    showNotification(`Today is ${today}`);
}

detectTodayDate();

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
        showNotification("Happy Birthday!");
        alert("Happy Birthday!");
    } else {
        showNotification("Enjoy your day!");
        alert("Enjoy your day!");
    }
}

// Call the function to wish birthday
wishBirthday();

// Function to update user information in HTML elements
function updateUserInfo() {
    let firstName, lastName, totalWatchHours;
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // Check if currentUser exists in localStorage
    if (currentUser) {
        firstName = currentUser.firstName;
        lastName = currentUser.lastName;
        totalWatchHours = parseInt(currentUser.totalWatchHours);
    } else {
        // If currentUser does not exist, use default user
        firstName = "Lorem";
        lastName = "Ipsum";
        totalWatchHours = 0;
    }

    // Update HTML elements with user information
    const userNameElement = document.getElementById('userName');
    const watchHoursElement = document.querySelector('.my-watchhours');
    const viewWatchHours = document.querySelector('.view-watchhours');

    userNameElement.textContent = firstName + " " + lastName;
    watchHoursElement.textContent = totalWatchHours
    viewWatchHours.textContent = totalWatchHours;
}

//Function to create videos template.
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
                videoElement.controls = false;
            }
        });
            
        videoElement.addEventListener('playing', function() {
            // Handle the waiting event, such as showing a loading indicator or message
            console.log('Thank you for playing...');
            //trackVideoWatchDuration(videoElement);
        });

        // Show loading overlay when video starts loading
        videoElement.addEventListener('loadstart', () => {
            //videoElement.classList.add('loading-overlay');
        });
        
        // Hide loading overlay when video has loaded
        videoElement.addEventListener('loadeddata', () => {
           // videoElement.classList.remove('loading-overlay');
        });
        
        // Show loading overlay if video encounters an error
        videoElement.addEventListener('error', () => {
           // videoElement.classList.add('loading-overlay');
        });

        const videoTitle = document.createElement('h2');
        videoTitle.textContent = videoData.title;

        const weblinkDiv = document.createElement('div');
        weblinkDiv.classList.add('weblinks');

        const weblinkTitle = document.createElement('h2');
        weblinkTitle.textContent = `Website link: ${videoData.website} `;

        const buttonsDiv = document.createElement('div');
        buttonsDiv.classList.add('buttons');
        let isPlaying = false;

        const playButton = document.createElement('button');
        playButton.classList.add('play-button');
        playButton.innerHTML = '<i class="fas fa-play"></i>';
        playButton.addEventListener('click', async function() {
            handleSingleVideoPlay(videoElement)
            await handleVideoInteraction(videoElement, videoData);         
            user = getCurrentUser();
            const videoId = videoData.videoId;
            const limit = 3;
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
                showNotification(`You have exceeded the play count limit for this video ${videoData.title}.`);
                alert(`You have exceeded the play count limit for this video ${videoData.title}.`);
                playButton.disabled = true; // Disable the play button to prevent further plays
                
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
            playButton.innerHTML = '<i class="fas fa-play"></i>';
            playButton.style.backgroundColor = "green";
            videoElement.pause();
            videoElement.currentTime = 0;
            videoDiv.style.backgroundColor = "#fff";
            viewCount++;
            showNotification(`Thankyou ${user['firstName']} for viewing ${videoData.title}`);
            alert(`Thankyou ${user['firstName']} for viewing ${videoData.title}`);
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

function handleSingleVideoPlay(videoElement) {
    const allVideos = document.querySelectorAll('.video-new video');
    
    // Pause all other videos
    allVideos.forEach(otherVideo => {
        if (otherVideo !== videoElement && !otherVideo.paused) {
            otherVideo.pause();
            const playButton = otherVideo.nextElementSibling.querySelector('.play-button');
            playButton.innerHTML = '<i class="fas fa-play"></i>'; // Change button icon to play
        }
    });

    // Play the target video
    videoElement.play();
    const playButton = videoElement.nextElementSibling.querySelector('.play-button');
    playButton.innerHTML = '<i class="fas fa-pause"></i>'; // Change button icon to pause
}


async function handleVideoInteraction(videoElement, videoData) {
    const user = getCurrentUser(); // Retrieve the current user

    if (user.firstName === "Lorem" && user.lastName === "Ipsum") {
        showNotification(`You are viewing as default user ${user.firstName} ${user.lastName}. Please login or sign up to personalize your experience.`);
        alert(`You are viewing as default user ${user.firstName} ${user.lastName}. Please login or sign up to personalize your experience.`);
        return;
    }

    if (!user) {
        videoElement.pause(); // Pause the video
        // User is not logged in, show dialog box for login/signup
        setDefaultUserIfNoUserLoggedIn();
        if (!isLoggedIn) {
            // Set default user and resume video playback
            setDefaultUserIfNoUserLoggedIn();
            videoElement.play(); // Resume video playback
            return; // If user cancels or closes the dialog, do not proceed
        }
    }

    // Check if the user's ID matches the video's ID
    if (user.id === videoData.id) {
        videoElement.play(); // Play the video
    } else {
        // Show notification indicating that the user is not authorized to view the video
        showNotification(`You are not authorized to view this video.`);
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


const playTracker = new PlayTracker();

// Load total watch hours and last update time from local storage
let totalWatchHours = parseFloat(localStorage.getItem('totalWatchHours')) || 0;
let lastUpdateTime = parseFloat(localStorage.getItem('lastUpdateTime')) || 0;

function trackVideoProgress(videoElement) {
    const myWatchView = document.querySelector('.my-watchhours');
    const myWatchViewTwo = document.querySelector('.view-watchhours');

    videoElement.addEventListener('timeupdate', function() {
        const currentTime = videoElement.currentTime;
        const deltaTime = currentTime - lastUpdateTime;

        if (!videoElement.paused && !videoElement.ended && deltaTime > 0) {
            totalWatchHours += deltaTime; // Increment total watch hours
            myWatchView.textContent = totalWatchHours.toFixed(2);
            myWatchViewTwo.textContent = totalWatchHours.toFixed(2);

            // Update total watch hours in local storage
            localStorage.setItem('totalWatchHours', totalWatchHours.toFixed(2));
            localStorage.setItem('lastUpdateTime', currentTime.toFixed(2)); // Update last update time

            lastUpdateTime = currentTime; // Update last update time
        }
    });
}



// If total watch hours and last update time are not found in local storage, set default values
if (!localStorage.getItem('totalWatchHours')) {
    localStorage.setItem('totalWatchHours', totalWatchHours.toFixed(2));
}

if (!localStorage.getItem('lastUpdateTime')) {
    localStorage.setItem('lastUpdateTime', lastUpdateTime.toFixed(2));
}

// Function to update user data for the currently logged-in user
function updateUserDetails(newData) {
    // Retrieve user ID from local storage or another source representing the currently logged-in user
    const userId = localStorage.getItem('currentUser');

    if (!userId) {
        console.error('User ID not found.');
        getCurrentUser();
        console.log(getCurrentUser());
        return;
    }

    // Read userData.json
    let userDatas = readJSONFromFile('userData.json');

    // If userData is null or undefined, return
    if (!userDatas) {
        console.log('Error: userData is null or undefined.');
        return;
    }

    // Find the user by ID
    let userIndex = userDatas.findIndex(user => user.IdNnumber === userId);

    // If user exists, update their details
    if (userIndex !== -1) {
        // Increment watch hours
        newData.watchHours = (userDatas[userIndex].watchHours || 0) + newData.watchHours;

        // Update other data if needed
        userDatas[userIndex] = { ...userDatas[userIndex], ...newData };

        // Write updated data back to userData.json
        writeJSONToFile('userData.json', userDatas);
        console.log(`User with ID ${userId} updated successfully.`);
    } else {
        // Handle case where user doesn't exist
        console.log(`User with ID ${userId} not found.`);
    }
}

// Function to track video watch duration and update user's watch hours
function trackVideoWatchDuration(videoElement) {
    // Variable to store the start time of the video
    let startTime = 0;

    // Listen for the timeupdate event to track the duration the video has been watched
    videoElement.addEventListener("timeupdate", function() {
        // If the video has started playing and startTime is not set
        if (videoElement.currentTime > 0 && startTime === 0) {
            // Set the startTime to the current time
            startTime = videoElement.currentTime;
        }

        // Calculate the duration the video has been watched in seconds
        const durationWatchedInSeconds = (videoElement.currentTime - startTime) * 3600;

        // Update the user's watch hours
        updateUserDetails({ watchHours: durationWatchedInSeconds });
    });
}


function togglePlayButton(button, isPlaying) {
    const icon = button.querySelector('i');
    if (isPlaying) {
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
        button.style.backgroundColor = "purple";
    } else {
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
        button.style.backgroundColor = "green";
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
    togglePlayButton(button, true);

    // Query for all video elements in the DOM
    const allVideo = document.querySelectorAll('.video-new');

    // Loop through each video element and add the .vidBorder class
    allVideo.forEach(video => {
        video.classList.add('vidBorder');
    });

    // Increment view count when the video ends
    video.addEventListener('ended', function() {
        incrementViewCount(video);
        togglePlayButton(button, false);
    });
}

function pauseVideo(video, button) {
    // Pause the associated video
    video.pause();
    togglePlayButton(button, false);
}

async function createVideosFromJSON(jsonFile) {
    try {
        const response = await fetch(jsonFile);
        const videosData = await response.json();
        createVideos(videosData);
    } catch (error) {
        console.log('Error fetching or parsing JSON:', error);
    }
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

// Load total watch hours and update HTML elements on page load
window.addEventListener('load', async function() { // Mark the function as async
    showLoadingOverlay(); // Show the loading overlay immediately

    const myWatchView = document.querySelector('.my-watchhours');
    const myWatchViewTwo = document.querySelector('.view-watchhours');

    myWatchView.textContent = totalWatchHours.toFixed(2);
    myWatchViewTwo.textContent = totalWatchHours.toFixed(2);

    // Generate random videos
    const response = await fetch('videos.json');
    const videosData = await response.json();
    const count = videosData.length;
    const randomVideos = await generateRandomVideos('videos.json', count);



    checkUserOnLoad();
    updateUserInfo();
        
    // Create videos from the generated random subset
    createVideos(randomVideos);
    
    setTimeout(() => {
        hideLoadingOverlay(); // Hide the loading overlay after 5000 milliseconds
    }, 5000);
});


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
                    updateUserInfo();
                    videosContainer.classList.add('VideoContainer-new');
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
                        updateUserInfo();
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


function loadVideos(category) {
    fetch('videos.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Filter videos based on the category
            const filteredVideos = data.filter(video => video.category === category);
            // Create videos based on the filtered data
            createVideos(filteredVideos); // Pass only the filtered videos data
        })
        .catch(error => {
            console.error('Error fetching videos:', error);
            console.log(error);
        });
}


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

function toggleElementVisibility(className) {
    const element = document.querySelector(className);
    if (element.style.display === "none" || element.style.display === "") {
        element.style.display = "block";
        element.style.transition = "100ms";
    } else {
        element.style.display = "none";
    }
}

function toggleActiveClass(className) {
    // Remove 'active' class from all items
    document.querySelectorAll(className).forEach(item => {
        item.classList.remove('active');
    });
    // Add 'active' class to clicked item
    this.classList.add('active');
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

// Add event listener to each .item element
document.querySelectorAll('.video-algo .container .item').forEach(item => {
    item.addEventListener('click', toggleActiveClass.bind(item, '.video-algo .container .item'));
});

// Toggle visibility for different elements
document.querySelector('.video-algo-toggle').addEventListener('click', function() {
    toggleElementVisibility('.video-algo');
});

document.querySelector('.new-ads-toggle').addEventListener('click', function() {
    toggleElementVisibility('.new-ads');
});

document.querySelector('.user-profile-toggle').addEventListener('click', function() {
    toggleElementVisibility('.profile-info');
});

document.querySelector('.ad-setting-toggle').addEventListener('click', function() {
    toggleElementVisibility('.ad-setting');
});
