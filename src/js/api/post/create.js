import { API_SOCIAL_POSTS } from "../../api/constants";
import { headers } from "../../api/headers";
import { setLogoutListener } from "../../ui/global/logout";
/**
 * Sends a request to the API to create a new post with the provided data.
 *
 * The post data includes the title, body, tags, and optional media (URL and alt text). 
 * If the request is successful, the created post data is returned.
 * 
 * @param {Object} postData - The data for the new post.
 * @param {string} postData.title - The title of the post.
 * @param {string} postData.body - The body/content of the post.
 * @param {Array<string>} [postData.tags=[]] - An array of tags associated with the post.
 * @param {Object|null} [postData.media=null] - An optional media object containing URL and alt text.
 * @param {string} postData.media.url - The URL of the media (if any).
 * @param {string} postData.media.alt - The alt text for the media (if any).
 * @returns {Promise<Object>} - A promise that resolves to the newly created post data.
 * @throws {Error} - Throws an error if the request fails.
 */
setLogoutListener();
export async function createPost({ title, body, tags = [], media = null }) {
  try {
    const response = await fetch(API_SOCIAL_POSTS, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({
        title,
        body,
        tags,
        media: media ? { url: media.url, alt: media.alt } : null,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return data.data;
    } else {
      const errorData = await response.json();
      console.error("Failed to create post:", response.status, response.statusText, errorData);
      throw new Error(`Error ${response.status}: ${errorData.message}`);
    }
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
}