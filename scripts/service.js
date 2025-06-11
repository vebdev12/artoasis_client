const register_request = async ({ name, login, password }) => {
  return await request("/users/register", "POST", { name, login, password });
};

const login_request = async ({ login, password }) => {
  return await request("/users/login", "POST", { login, password });
};

const current_request = async () => {
  return await request("/users/", "GET");
};

const getUserById_request = async (id) => {
  return await request(`/users/${id}`, "GET");
};

const getAllUsers_request = async (limit) => {
  return await request(`/users/all${limit ? `?limit=${limit}` : ""}`, "GET");
};

const getAllPosts_request = async (limit) => {
  return await request(`/posts/${limit ? `?limit=${limit}` : ""}`, "GET");
};

const getPostById_request = async (id) => {
  return await request(`/posts/${id}`, "GET");
};

const likePosts_request = async (id) => {
  return await request(`/posts/${id}/like`, "POST");
};

const unLikePosts_request = async (id) => {
  return await request(`/posts/${id}/unlike`, "POST");
};

const isLiked_request = async (id) => {
  return await request(`/posts/${id}/liked`, "GET");
};

const follow_request = async (userId) => {
  return await request(`/subs`, "POST", { userId });
};

const unfollow_request = async (userId) => {
  return await request(`/subs`, "DELETE", { userId });
};

const isFollowed_request = async (userId) => {
  return await request(`/subs/followed/${userId}`, "GET");
};

const save_request = async (postId) => {
  return await request(`/favorites`, "POST", { postId });
};

const unsave_request = async (postId) => {
  return await request(`/favorites`, "DELETE", { postId });
};

const isSaved_request = async (postId) => {
  return await request(`/favorites/isFavorite/${postId}`, "GET");
};

const add_comment_request = async ({ postId, text }) => {
  return await request(`/comments`, "POST", { postId, text });
};

const sendPassword_request = async (login) => {
  return await request(`/users/send-password`, "POST", { login });
};
