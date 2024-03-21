// Function to generate a unique number
function generateUniqueNumber() {
    // Generate a timestamp-based unique number
    return Date.now().toString();
}
  
  // Function to validate phone number format
function validatePhoneNumber(phoneNumber) {
    // Check if the phoneNumber is numeric and has exactly 10 digits
    return /^\d{10}$/.test(phoneNumber);
}

function isValidUserId(userId) {
    // Check if the input consists of only digits and has a length of 8
    return /^\d{8}$/.test(userId);
}


function restrictToNumbers(inputFieldId) {
  const inputField = document.getElementById(inputFieldId);
  inputField.addEventListener('input', function(event) {
      const currentValue = event.target.value;
      const numericValue = currentValue.replace(/\D/g, '');
      event.target.value = numericValue;
  });
}

restrictToNumbers('idNumber');
restrictToNumbers('loginPhoneNumber');

restrictToNumbers('new-number');
restrictToNumbers('userId');

function capitalizeFirstLetter(input) {
    // Check if the input is not empty
    if (input.length > 0) {
        // Capitalize the first letter and concatenate it with the rest of the string
        return input.charAt(0).toUpperCase() + input.slice(1);
    } else {
        return input; // Return the input as is if it's empty
    }
}
  
function signUp() {
  const newFirstName = document.getElementById('newFirstName').value;
  const newSecondName = document.getElementById('newSecondName').value;
  const newPhoneNumber = document.getElementById('new-number').value;
  const newPassword = document.getElementById('password').value;
  const newRePassword = document.getElementById('repass').value;
  const userId = document.getElementById('userId').value; // Use lowercase variable name
  
  // Capitalize the first letter of the first name and second name
  const capitalizedFirstName = capitalizeFirstLetter(newFirstName);
  const capitalizedSecondName = capitalizeFirstLetter(newSecondName);
  
  // Validate phone number
  if (!validatePhoneNumber(newPhoneNumber)) {
      alert('Invalid phone number. Please enter a 10-digit numeric value.');
      return;
  }
  
  // Check if passwords match
  if (newPassword !== newRePassword) {
      alert('Passwords do not match. Please re-enter your password.');
      return;
  }

  // Check if the user ID is valid
  if (!isValidUserId(userId)) {
      alert('User ID must be 8 digits long and contain only numbers.');
      return;
  }

  // Read existing user data from JSON file
  fetch('userData.json')
      .then(response => response.json())
      .then(data => {
          // Check if the phone number already exists in userData.json
          const phoneNumberExists = data.some(user => user['Phone number'] === newPhoneNumber);
          if (phoneNumberExists) {
              alert('Phone number already exists. Please choose a different one.');
              return;
          }
          
          // Check if the ID number already exists in userData.json
          const idExists = data.some(user => user['ID number'] === userId);
          if (idExists) {
              alert('ID number already exists. Please choose a different one.');
              return;
          }
          
          // Generate unique number
          const uniqueNumber = generateUniqueNumber();
          
          // Construct newUser object
          const newUser = {
              "First Name": capitalizedFirstName,
              "Second Name": capitalizedSecondName,
              "Phone number": newPhoneNumber,
              "Password": newPassword,
              "ID number": userId,
              "User Unique Number": uniqueNumber,
              "User watch hours": 0 // Initialize watch hours
          };
          
          // Add new user to existing data
          data.push(newUser);
          
          // Write updated data back to JSON file
          fetch('userData.json', {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
          })
          .then(() => {
              alert('User signed up successfully.');
              clearInputFields();

              localStorage.setItem('currentUser', JSON.stringify(newUser));
               
              // Redirect to index.html after signup
              window.location.href = 'index.html';
          })
          .catch(error => {
              alert('Error signing up user: ' + error.message);
          });
      })
      .catch(error => {
          alert('Error reading user data: ' + error.message);
      });
}

// Function to capitalize the first letter of a string
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Function to validate phone number
function validatePhoneNumber(phoneNumber) {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phoneNumber);
}

// Function to validate user ID
function isValidUserId(userId) {
  const idRegex = /^\d{8}$/;
  return idRegex.test(userId);
}

// Function to generate a unique number
// Array to store used unique numbers
const usedUniqueNumbers = [];

// Function to generate a unique number
function generateUniqueNumber() {
    let uniqueNumber;
    do {
        // Generate a random number
        uniqueNumber = Math.floor(Math.random() * 1000000);
    } while (usedUniqueNumbers.includes(uniqueNumber)); // Keep generating until a unique number is found

    // Add the unique number to the list of used numbers
    usedUniqueNumbers.push(uniqueNumber);

    return uniqueNumber;
}


// Function to clear input fields after sign-up
function clearInputFields() {
  document.getElementById('newFirstName').value = '';
  document.getElementById('newSecondName').value = '';
  document.getElementById('userId').value = '';
  document.getElementById('new-number').value = '';
  document.getElementById('password').value = '';
  document.getElementById('repass').value = '';
}

  
  
// Function to handle user login and redirect to homepage
function login() {
  // Retrieve login credentials
  const phoneNumber = document.getElementById('loginPhoneNumber').value;
  const password = document.getElementById('loginPassword').value;
  const idNumber = document.getElementById('idNumber').value;

  // Read existing user data from JSON file
  fetch('userData.json')
      .then(response => response.json())
      .then(data => {
          // Check if user credentials match any existing user
          const user = data.find(user => user['Phone number'] === phoneNumber && user['Password'] === password && user['ID number'] === idNumber);

          if (user) {
              alert('Login successful. Welcome, ' + user['First Name']);
              clearInputFields();

              // Set a cookie to indicate the user is logged in
              document.cookie = 'loggedIn=true; path=/'; // Set the cookie to be valid for the entire domain

              // After successful login, store user data in localStorage
              // Assuming 'user' is an object containing user data
              localStorage.setItem('currentUser', JSON.stringify(user));

              
              displayUserWatchHours();
              
              // Redirect to homepage
              window.location.href = 'index.html';

          } else {
              alert('Login failed. Invalid username or phone number or password.');
              // Display error message or perform other actions if login fails
          }
      })
      .catch(error => {
          alert('Error reading user data:', error);
      });
}
