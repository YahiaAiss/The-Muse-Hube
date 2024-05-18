document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get input values
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Check if username and password are valid (dummy validation for demonstration)
    var userData = localStorage.getItem(username);
    const userObject = JSON.parse(userData);
    if (userData) {
        userData = JSON.parse(userData); // Parse JSON string back to object
        if (userData.password === password) {
            alert('Login successful! Redirecting...');

            // Save username and password to session storage
            sessionStorage.setItem('username', username);
            sessionStorage.setItem('password', password);
            sessionStorage.setItem('role', userObject.role);

            // Redirect based on user role
            if (userData.role === 'Artist') {
                window.location.href = 'artist.html'; // Redirect to artist page
            } else {
                window.location.href = 'homepage.html'; // Redirect to user page
            }
        } else {
            alert('Invalid password. Please try again.');
        }
    } else {
        alert('Invalid username. Please try again.');
    }
});
