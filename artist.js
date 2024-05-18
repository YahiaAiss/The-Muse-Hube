document.addEventListener('DOMContentLoaded', function() {
    // Load posts from local storage on page load
    loadPostsFromLocalStorage();

    const imageUpload = document.getElementById('imageUpload');
    const descriptionInput = document.getElementById('description');


    imageUpload.addEventListener('change', function() {
        if (descriptionInput.value.trim() === '') {
            alert('Please enter a description before uploading an image.');
            return; // Exit the function if description is empty
        }
    
        if (imageUpload.files && imageUpload.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                // Get image data and description
                const imageData = e.target.result;
                const description = descriptionInput.value;
    
                // Save the post to local storage
                savePostToLocalStorage(description, imageData);
    
                // Display the post
                displayPost(description, imageData);
    
                // Clear the input fields
                descriptionInput.value = '';
                imageUpload.value = '';
            }
            reader.readAsDataURL(imageUpload.files[0]);
        }
    });
});

function savePostToLocalStorage(description, imageData) {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.push({ description, imageData });
    localStorage.setItem('posts', JSON.stringify(posts));
}

function loadPostsFromLocalStorage() {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.forEach(post => {
        displayPost(post.description, post.imageData);
    });
}

function displayPost(description, imageData) {
    const postsContainer = document.getElementById('postsContainer');
    const postElement = document.createElement('div');
    postElement.className = 'container';  // Add class to the div

    postElement.innerHTML = `
    <img src="${imageData}" alt="User Art" style="max-width: 100%; height: auto;">
    <p>${description}</p>
        <button class="delete-button">
  <svg viewBox="0 0 448 512" class="svgIcon"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg>
</button>
    `;

    const deleteButton = postElement.querySelector('.delete-button');
    deleteButton.addEventListener('click', function() {
        // Remove the post element from the DOM
        postsContainer.removeChild(postElement);

        // Remove the post from local storage
        removePostFromLocalStorage(description, imageData);
    });

    postsContainer.appendChild(postElement);
}

function removePostFromLocalStorage(description, imageData) {
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts = posts.filter(post => post.description !== description || post.imageData !== imageData);
    localStorage.setItem('posts', JSON.stringify(posts));
}
