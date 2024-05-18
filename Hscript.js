
loadPostsFromLocalStorage()

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
    `;
    postsContainer.appendChild(postElement);
}