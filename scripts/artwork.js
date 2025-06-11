const post_id = window.location.href.split("?").pop()?.split("=").pop();

window.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const themeToggle = document.getElementById("theme-toggle");
  const header = document.getElementById("main-header");
  const searchInput = document.getElementById("search-input");
  const artworkGrid = document.getElementById("artwork-grid");
  const noResults = document.getElementById("no-results");
  const tabButtons = document.querySelectorAll(".tab-button");
  const currentYearElement = document.getElementById("current-year");

  getPostById_request(post_id)
    .then((res) => {
      const artwork = {
        id: res.id,
        title: res.title,
        artist: res.User.name,
        artistId: res.User.id,
        imageSrc: setFile(res.media),
        likes: res.rating,
        comments: res.comments.reverse(),
        tags: res.tags || [],
        featured: false,
        artistAvatar: setFile(res.User.avatar),
      };

      renderArtworks([artwork], artworkGrid);
    })
    .catch((e) => {
      console.log(e);
    });

  // State
  let activeCategory = "all";
  let searchQuery = "";

  // Initialize

  currentYearElement.textContent = new Date().getFullYear();

  const savedTheme = localStorage.getItem("theme");
  if (
    savedTheme === "dark" ||
    (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  } else {
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }

  // Theme Toggle
  themeToggle.addEventListener("click", () => {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    themeToggle.innerHTML = isDark
      ? '<i class="fas fa-moon"></i>'
      : '<i class="fas fa-sun"></i>';
  });

  // Header Scroll Effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Search Functionality
  searchInput?.addEventListener("input", (e) => {
    searchQuery = e.target.value.toLowerCase();
    filterArtworks();
  });

  // Category Tabs
  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      activeCategory = button.dataset.category;
      filterArtworks();
    });
  });

  function renderArtworks(artworks, container) {
    container.innerHTML = "";

    artworks.forEach((artwork, index) => {
      const card = document
        .getElementById("artwork-card-template")
        .content.cloneNode(true);
      const artworkCard = card.querySelector(".artwork-card");

      // Set animation delay
      artworkCard.style.animationDelay = `${index * 0.1}s`;

      // Set image and links
      card.querySelector(".artwork-image").src = artwork.imageSrc;
      card.querySelector(".artwork-image").alt = artwork.title;

      const artworkLinks = card.querySelectorAll(".artwork-link");
      artworkLinks.forEach((link) => {
        link.href = `/profile/${artwork.artistId}`;
        link.textContent = artwork.title;
      });

      const artistLinks = card.querySelectorAll(".artist-link");
      artistLinks.forEach((link) => {
        link.href = `profile.html?id=${artwork.artistId}`;
        link.textContent = artwork.artist;
      });

      // Set avatar
      card.querySelector(".avatar-image").src = artwork.artistAvatar;
      card.querySelector(".avatar-image").alt = artwork.artist;

      // Set stats
      card.querySelector(".like-count").textContent = artwork.likes;
      card.querySelector(".comment-count").textContent =
        artwork.comments.length;

      // Add tags
      const tagsContainer = card.querySelector(".artwork-tags");
      artwork.tags.forEach((tag) => {
        const tagElement = document.createElement("span");
        tagElement.className = "artwork-tag";
        tagElement.textContent = tag;
        tagsContainer.appendChild(tagElement);
      });

      // Add event listeners
      const likeButton = card.querySelector(".like-button");

      isLiked_request(artwork.id)
        .then((res) => {
          if (res.isLiked) {
            likeButton.classList.add("active");
            isLiked = true;
          }

          onLikesInitialize(res.isLiked);
        })
        .catch((e) => {
          console.log(e);
        });

      const onLikesInitialize = (isLiked) => {
        likeButton.addEventListener("click", function () {
          this.classList.toggle("active");
          const likeCount = document.querySelector(".like-count");

          if (this.classList.contains("active")) {
            likeCount.textContent = parseInt(likeCount.textContent) + 1;
            this.innerHTML = '<i class="fas fa-heart"></i>';
          } else {
            likeCount.textContent = parseInt(likeCount.textContent) - 1;
            this.innerHTML = '<i class="far fa-heart"></i>';
          }

          if (isLiked) {
            unLikePosts_request(artwork.id)
              .then((res) => {
                console.log(res);
              })
              .catch((e) => {
                console.log(e);
              });
          }

          if (isLiked === false) {
            likePosts_request(artwork.id)
              .then((res) => {
                console.log(res);
              })
              .catch((e) => {
                console.log(e);
              });
          }
        });
      };

      const saveButton = card.querySelector(".save-button");

      isSaved_request(artwork.id)
        .then((res) => {
          if (res.isFavorite) {
            saveButton.classList.add("active");
          }

          onSavesInitialized(res.isFavorite);
        })
        .catch((e) => {});

      const onSavesInitialized = (isFavorite) => {
        saveButton.addEventListener("click", function () {
          this.classList.toggle("active");
          if (this.classList.contains("active")) {
            this.innerHTML = '<i class="fas fa-bookmark"></i>';
          } else {
            this.innerHTML = '<i class="far fa-bookmark"></i>';
          }

          if (isFavorite) {
            unsave_request(artwork.id)
              .then((res) => {
                console.log(res);
              })
              .catch((e) => {
                console.log(e);
              });
          } else {
            save_request(artwork.id)
              .then((res) => {
                console.log(res);
              })
              .catch((e) => {
                console.log(e);
              });
          }
        });
      };

      const shareButton = card.querySelector(".share-button");
      shareButton.addEventListener("click", function () {
        const url = `${window.location.origin}/artoasis_client/artwork.html?id=${artwork.id}`;

        navigator.clipboard.writeText(url).then(() => {
          alert("Link copied to clipboard!");
        });
      });

      const commentsButton = card.querySelector(".comment-button");
      const comments = card.querySelector(".artwork-comments");
      const comments_list = card.querySelector(".artwork-comments__list");
      const comments_input = card.querySelector(".artwork-comments__input");
      const comments_count = card.querySelector(".comment-count");

      const setComment = (author, text) => {
        comments_list.innerHTML += `
            <li class="artwork-comments__item" id="comments-item">
              <span class="artwork-comments__item-name" id="comments-name"
                >${author}:</span
              >
              <span class="artwork-comments__item-text" id="comments-text"
                >${text}
              </span>
            </li>`;
      };

      artwork.comments.forEach((comment) => {
        setComment(comment.User.name, comment.text);
      });

      commentsButton.addEventListener("click", () => {
        comments.classList.toggle("active");
      });

      comments_input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          add_comment_request({ postId: artwork.id, text: e.target.value })
            .then((res) => {
              setComment(
                JSON.parse(localStorage.getItem("ArtOasis-user")).name,
                res.text
              );
              comments_count.textContent =
                parseInt(comments_count.textContent) + 1;
            })
            .catch((e) => {
              console.log(e);
            });

          e.target.value = "";
        }
      });

      container.appendChild(card);
    });
  }
});
