// Function to handle user sign up
function signupUser(username, password, role) {
    // Dummy validation (for demonstration)
    if (username && password && role) {
        // Check if the username already exists in localStorage
        if (localStorage.getItem(username)) {
            alert('Username already exists. Please choose a different username.');
        } else {
            // Store new user data in localStorage
            localStorage.setItem(username, JSON.stringify({ password: password, role: role }));
            alert('Sign up successful! Please login with your new credentials.');
        }
    } else {
        alert('Please fill in all fields to sign up.');
    }
}

// Event listener for signup form submission
document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get input values
    var newUsername = document.getElementById('newUsername').value;
    var newPassword = document.getElementById('newPassword').value;
    var selectedRole = document.getElementById('userRole').value; // Get selected role from <select> element

    // Call signupUser function with input values
    signupUser(newUsername, newPassword, selectedRole);

    // Reset the form after signup
    document.getElementById('signupForm').reset();
});
