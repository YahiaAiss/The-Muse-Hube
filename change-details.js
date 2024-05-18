load();
document.addEventListener('DOMContentLoaded', function() {
    // Edit Profile Section
    const editProfileForm = document.getElementById('editProfileForm');
    const editProfileMessage = document.getElementById('editProfileMessage');
    const newUsernameInput = document.getElementById('newUsername');
    const newPasswordInput = document.getElementById('newPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');

    const savedUsername = sessionStorage.getItem('username');
    if (savedUsername) {
        newUsernameInput.value = savedUsername;
    }

    const savedPassword = sessionStorage.getItem('password');
    if (savedPassword) {
        newPasswordInput.value = savedPassword;
        confirmPasswordInput.value = savedPassword;
    }

    newUsernameInput.addEventListener('input', function(event) {
        editProfileMessage.textContent = '';
    });

    editProfileForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const newUsername = newUsernameInput.value.trim();
        const newPassword = newPasswordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();
        const currentUsername = sessionStorage.getItem('username');
        const users = localStorage.getItem(currentUsername);

        if (newUsername === '') {
            editProfileMessage.textContent = 'Username cannot be empty.';
            return;
        }

        if (newPassword !== confirmPassword) {
            editProfileMessage.textContent = 'Passwords do not match.';
            return;
        }

        if (currentUsername && users) {
            const userObject = JSON.parse(users);
            
            // Update password in local storage
            if (newPassword) {
                userObject.password = newPassword;
                sessionStorage.setItem('password', newPassword);
            }
            if (newUsername !== currentUsername) {
                sessionStorage.setItem('username', newUsername);
                localStorage.removeItem(currentUsername);
            }
            // Update username in local storage if it has changed
            localStorage.setItem(newUsername, JSON.stringify(userObject));
            ;
            editProfileMessage.textContent = 'Profile updated successfully!';
            load();
        } else {
            editProfileMessage.textContent = 'User not found.';
        }
    });


    }
);

function open(){
    window.location.href = 'index.html';
}

function load(){
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const role = document.getElementById('Role')
    const usrnm = sessionStorage.getItem('username');
    username.textContent = usrnm;
    const pw = sessionStorage.getItem('password');
    password.textContent = pw;
    const rl = sessionStorage.getItem('role');
    role.textContent = rl;
}

function goBack() {
    const storedRole = sessionStorage.getItem('role');
    if (storedRole === 'Artist') {
        window.location.href = 'artist.html';
    } else if (storedRole === 'User') {
        window.location.href = 'homepage.html';
    }
}
