/**
 * Renders a list of user posts into the specified container in the DOM.
 *
 * @param {Array<Object>} userPosts - An array of post objects to render.
 * @param {string} id - The ID of the DOM element where posts will be rendered.
 * @returns {void}
 */

export const renderPosts = (userPosts, id) => {
    const outerContainer = document.getElementById(id);

    userPosts.forEach((post) => {
        const container = document.createElement("div");
        container.className = "bg-gray-800 shadow-lg rounded-lg overflow-hidden border border-gray-700 p-4";

        const title = document.createElement("h2");
        title.innerText = post.title;
        title.className = "text-xl font-semibold text-gray-100";

        const content = document.createElement("p");
        content.innerText = post.body;
        content.className = "text-gray-400 mt-2";

        const imageDiv = document.createElement("div");
        imageDiv.className = "mt-4";

        const image = document.createElement("img");
        if (post.media) {
            image.src = post.media.url;
            image.alt = post.media.alt;
        }
        image.className = "w-full h-48 object-cover rounded-md";

        const viewPostBtn = document.createElement("button");
        viewPostBtn.innerText = "View Post";
        viewPostBtn.className = "bg-blue-600 text-white py-2 px-4 mt-4 rounded-md hover:bg-blue-700";
        viewPostBtn.addEventListener("click", async () => {
            window.location.href = "/post/";
            localStorage.setItem("postId", JSON.stringify(post.id));
        });

        container.appendChild(title);
        container.appendChild(content);
        container.appendChild(imageDiv);
        imageDiv.appendChild(image);
        container.appendChild(viewPostBtn);
        outerContainer.appendChild(container);
    });
};
