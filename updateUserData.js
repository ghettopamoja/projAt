// Function to retrieve user data from local storage and update userData.json on the server
function updateUserData() {
    // Retrieve user data from local storage
    const currentUserJSON = localStorage.getItem('currentUser');
    if (!currentUserJSON) {
        console.error('Current user data not found in local storage.');
        return;
    }

    try {
        // Parse current user data from JSON
        const currentUser = JSON.parse(currentUserJSON);

        // Prepare the data to be sent to the server
        const requestData = {
            firstName: currentUser["First Name"],
            lastName: currentUser["Last Name"],
            watchHours: currentUser["User watch hours"],
            birthdayDay: currentUser["BirthdayDay"], // Add birthday day
            birthdayMonth: currentUser["BirthdayMonth"], // Add birthday month
            IdNumber : currentUser['ID number'],
            UniqueNumber : currentUser['User Unique Number']
           
        };

        // Send an AJAX request to update the user data on the server
        fetch('/updateUserData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update user data on the server.');
            }
            console.log('User data updated successfully on the server.');
        })
        .catch(error => {
            console.error('Error updating user data:', error);
        });
    } catch (error) {
        console.error('Error updating user data:', error);
    }
}
