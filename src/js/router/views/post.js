import { readPost } from "../../api/post/read";
import { onDeletePost } from "../../ui/post/delete";

// Retrieve the post ID from localStorage
const postId = JSON.parse(localStorage.getItem("postId"));

// Check if a post ID is found; if not, display an error message
if (postId) {
    loadPost(postId);  
} else {
    console.error("No postId found in localStorage");
    document.body.innerHTML = "<p>No post selected.</p>";
}

/**
 * Loads the post data from the API and displays it.
 * 
 * @param {string} postId - The ID of the post to be loaded.
 * @returns {Promise<void>} - A promise that resolves when the post is loaded.
 */
async function loadPost(postId) {
    try {
        // Fetch the post data from the API
        const post = await readPost(postId);
        if (post && post.data) { 
            displayPost(post.data);  // Display the post if found
        } else {
            document.body.innerHTML = "<p>Post not found.</p>";  // Error message if post not found
        }
    } catch (error) {
        console.error("Error loading post:", error);  // Log any errors
        document.body.innerHTML = "<p>Failed to load post.</p>";  // Display failure message
    }
}

// Get user information from localStorage to determine the logged-in user
const userInfo = JSON.parse(localStorage.getItem('userData'));
const loggedInUserName = userInfo?.name; 

/**
 * Displays the post on the page, including title, content, and author information.
 * 
 * @param {Object} post - The post object containing details to display.
 * @returns {void}
 */
function displayPost(post) {
    const postContainer = document.getElementById('postContainer');
    
    // Clear any existing content in postContainer
    postContainer.innerHTML = '';

    // Title
    const title = document.createElement('h1');
    title.textContent = post.title;
    title.className = "text-2xl font-bold text-gray-100 mb-4";

    // Author and Date Info
    const authorName = post.author?.name || 'Unknown Author';
    const postDate = new Date(post.created).toLocaleDateString();
    const metaInfo = document.createElement('div');
    metaInfo.textContent = `By ${authorName} on ${postDate}`;
    metaInfo.className = "text-sm text-gray-400 mb-4";

    // Content
    const content = document.createElement('p');
    content.textContent = post.body;
    content.className = "text-gray-200 leading-relaxed mb-4";

    // Add media if available
    if (post.media?.url) {
        const image = document.createElement('img');
        image.src = post.media.url;
        image.alt = post.media.alt || 'Post image';
        image.className = "w-full h-auto rounded-lg mb-4 shadow-md";
        postContainer.appendChild(image);
    }

    // Append title, meta info, and content to postContainer
    postContainer.append(title, metaInfo, content);

    // Add delete and edit buttons if the logged-in user is the author
    if (post.author?.name === loggedInUserName) {
        const buttonContainer = document.createElement('div');
        buttonContainer.className = "flex space-x-4 mt-6";

        const deleteButton = createDeleteButton(post.id);
        const editButton = createEditButton(post.id);
        buttonContainer.append(deleteButton, editButton);

        postContainer.appendChild(buttonContainer);
    }
}


/**
 * Creates a delete button for the post.
 * 
 * @param {string} postId - The ID of the post to be deleted.
 * @returns {HTMLButtonElement} - The delete button element.
 */
function createDeleteButton(postId) {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.dataset.postId = postId; 
    deleteButton.addEventListener('click', onDeletePost);  // Attach delete event
    return deleteButton;
}

/**
 * Creates an edit button for the post that navigates to the edit page.
 * 
 * @param {string} postId - The ID of the post to be edited.
 * @returns {HTMLButtonElement} - The edit button element.
 */
function createEditButton(postId) {
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', async () => {
        localStorage.setItem('postId', JSON.stringify(postId));  // Store postId for editing
        window.location.href = `/post/edit/?id=${postId}`;  // Redirect to edit page
    });
    return editButton;
}
