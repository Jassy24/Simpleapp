document.addEventListener('DOMContentLoaded', () => {
  loadPosts();
});

let editingState = { isEditing: false, index: null };

function loadPosts() {
  const postsContainer = document.getElementById('posts');
  const posts = JSON.parse(localStorage.getItem('posts')) || [];
  postsContainer.innerHTML = '';

  posts.forEach((post, index) => {
    const postElement = document.createElement('div');
    postElement.innerHTML = `
      <p>${post.content}</p>
      <span class="options">
        <i onclick="editPost(${index})" class="fas fa-edit"></i>
        <i onclick="deletePost(${index})" class="fas fa-trash-alt"></i>
      </span>
    `;
    postsContainer.appendChild(postElement);
  });
}

let createOrUpdatePost = () => {
  const contentInput = document.getElementById('postContent');
  const postContent = contentInput.value.trim();
  const posts = JSON.parse(localStorage.getItem('posts')) || [];

  if (postContent) {
    if (editingState.isEditing) {
      posts[editingState.index].content = postContent;
      editingState = { isEditing: false, index: null };
    } else {
      posts.push({ content: postContent });
    }

    localStorage.setItem('posts', JSON.stringify(posts));
    loadPosts();
    contentInput.value = '';
  } else {
    alert("Post content cannot be empty");
  }
};

let editPost = (index) => {
  const posts = JSON.parse(localStorage.getItem('posts')) || [];
  if (index >= 0 && index < posts.length) {
    document.getElementById('postContent').value = posts[index].content;
    editingState = { isEditing: true, index };
  } else {
    console.error("Invalid post index", index);
  }
};

let deletePost = (index) => {
  const posts = JSON.parse(localStorage.getItem('posts')) || [];
  if (index >= 0 && index < posts.length) {
    posts.splice(index, 1);
    localStorage.setItem('posts', JSON.stringify(posts));
    loadPosts();

    if (editingState.isEditing && editingState.index === index) {
      editingState = { isEditing: false, index: null };
      document.getElementById('postContent').value = '';
    }
  } else {
    console.error("Invalid post index", index);
  }
};
