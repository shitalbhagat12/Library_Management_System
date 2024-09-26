
// Selecting necessary DOM elements
const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
const sign_in_btn2 = document.querySelector("#sign-in-btn2");
const sign_up_btn2 = document.querySelector("#sign-up-btn2");


// Event listeners for switching between sign-in and sign-up modes
sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
});

sign_up_btn2.addEventListener("click", () => {
    container.classList.add("sign-up-mode2");
});

sign_in_btn2.addEventListener("click", () => {
    container.classList.remove("sign-up-mode2");
});

// Event listener for signup form submission
document.querySelector(".sign-up-form").addEventListener("submit", function(e) {
    e.preventDefault(); // Prevent form from submitting

    // Select the input fields
    const usernameInput = document.querySelector(".sign-up-form .input-field:nth-of-type(1) .text");
    const emailInput = document.querySelector(".sign-up-form .input-field:nth-of-type(2) .text");
    const passwordInput = document.querySelector(".sign-up-form .input-field:nth-of-type(3) .password");

    // Check if elements are found
    if (!usernameInput || !emailInput || !passwordInput) {
        console.error("One or more input fields are missing");
        return;
    }

    const username = usernameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;

    // Regular expression for password validation
    const passwordPattern = /^(?=.*[0-9].*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/;

    // Retrieve existing users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if the username or email already exists
    const userExists = users.some(user => user.username === username || user.email === email);

    if (userExists) {
        alert("Username or email already exists. Please use a different one.");
        return;
    }


    // Check if the password meets the criteria
    if (!passwordPattern.test(password)) {
        alert("Password must be at least 6 characters long, contain at least 2 digits, and 1 special character.");
        return;
    }

    // Create user object
    const user = {
        username: username,
        email: email,
        password: password
    };

    // Add new user to the list of users
    users.push(user);

    // Store the updated user list in localStorage
    localStorage.setItem("users", JSON.stringify(users));

    // Clear form fields
    usernameInput.value = '';
    emailInput.value = '';
    passwordInput.value = '';

    // Show success message
    alert("Sign up successful! Next time you will go for Sign in");
	if (user) {
                // Store the logged-in username in localStorage
                localStorage.setItem("loggedInUser", username);
                // Clear form fields
                usernameInput.value = '';
                passwordInput.value = '';

                // Redirect to library.html
                window.location.href = "library.html";
            }
    // Optionally, switch to sign-in mode
    container.classList.remove("sign-up-mode");
});

// Event listener for sign-in form submission
document.querySelector(".sign-in-form").addEventListener("submit", function(e) {
    e.preventDefault(); // Prevent form from submitting

    // Select the input fields
    const usernameInput = document.querySelector(".sign-in-form .input-field:nth-of-type(1) .text");
    const passwordInput = document.querySelector(".sign-in-form .input-field:nth-of-type(2) .password");

    // Check if elements are found
    if (!usernameInput || !passwordInput) {
        console.error("One or more input fields are missing");
        return;
    }

    const username = usernameInput.value;
    const password = passwordInput.value;

    // Retrieve users data from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if user exists and credentials match
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
                // Store the logged-in username in localStorage
                localStorage.setItem("loggedInUser", username);
        
                alert("Sign in successful!");
        
                // Clear form fields
                usernameInput.value = '';
                passwordInput.value = '';
        
                // Redirect to library.html
                window.location.href = "library.html";
            } else {
                alert("Invalid username or password. Please try again.");
            }
});
