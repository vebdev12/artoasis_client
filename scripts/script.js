const themeToggle = document.getElementById("theme-toggle");
const header = document.getElementById("main-header");
const searchInput = document.getElementById("search-input");
const artworkGrid = document.getElementById("artwork-grid");
const artistsGrid = document.getElementById("artists-grid");
const noResults = document.getElementById("no-results");
const resetFilters = document.getElementById("reset-filters");
const tabButtons = document.querySelectorAll(".tab-button");
const currentYearElement = document.getElementById("current-year");
const blogGrid = document.getElementById("blog-grid");
const blogModal = document.getElementById("blog-modal");
const modalClose = document.querySelector(".modal-close");

// Templates
const artworkCardTemplate = document.getElementById("artwork-card-template");
const artistCardTemplate = document.getElementById("artist-card-template");
const blogCardTemplate = document.getElementById("blog-card-template");

getAllPosts_request(5)
  .then((res) => {
    const artworks = res.map((art) => ({
      id: art.id,
      title: art.title,
      artist: art.User.name,
      artistId: art.User.id,
      imageSrc: setFile(art.media),
      likes: art.rating,
      comments: art.comments,
      tags: art.tags.map(({ tag }) => tag.name) || [],
      featured: false,
      artistAvatar: setFile(art.User.avatar),
    }));

    renderArtworks(artworks);
  })
  .catch((e) => {
    console.log(e);
  });

getAllUsers_request(6)
  .then((res) => {
    const artists = res.map((artist) => ({
      id: artist.id,
      name: artist.name,
      bio: artist.description,
      avatarSrc: setFile(artist.avatar),
      artworkCount: artist.posts.length,
      followers: artist.subscribedTo.length,
    }));

    renderArtists(artists);
  })
  .catch((e) => console.log(e));

const blogs = [
  {
    title: "Секреты вдохновения: прогулки на природе",
    imageSrc: "./images/nature/nature1.jpg",
    content:
      "Природа — это кладезь идей для творческих людей. Прогулки по лесным тропам, созерцание утренней росы или закатного неба могут разбудить вашу фантазию. Попробуйте взять с собой блокнот и записывать все, что вас трогает, чтобы потом воплотить это в своих работах...",
    comments: [
      { author: "LenaM", text: "Очень вдохновляющая статья!" },
      { author: "PavelR", text: "Попробовал, и правда работает." },
      { author: "KatyaV", text: "Спасибо за советы!" },
    ],
  },
  {
    title: "Цифровое искусство: от пикселей к шедеврам",
    imageSrc: "./images/artstation/fur9.jpg",
    content:
      "С 1990-х годов цифровое искусство совершило огромный скачок: от примитивных программ до мощных инструментов, таких как графические планшеты и нейросети. Сегодня художники могут создавать невероятные работы, не выходя из дома, а технологии продолжают открывать новые горизонты...",
    comments: [
      { author: "AlexT", text: "Интересно узнать про нейросети." },
      { author: "SofiaK", text: "Хотелось бы больше примеров программ." },
    ],
  },
  {
    title: "Цвета улиц: искусство в городской среде",
    imageSrc: "./images/artstation/street-art.jpg",
    content:
      "Городская жизнь полна вдохновения: граффити на стенах, отражения в лужах, яркие вывески. Уличное искусство становится все более популярным, объединяя художников и зрителей. Попробуйте взглянуть на привычные улицы новым взглядом и найти свою музу в городском шуме...",
    comments: [
      { author: "DimaS", text: "Классная идея, пойду искать граффити!" },
      { author: "OlgaP", text: "Люблю уличное искусство, спасибо за статью." },
      { author: "IvanG", text: "Добавьте больше фото, пожалуйста." },
      { author: "MashaL", text: "Очень интересно!" },
    ],
  },
  {
    title: "Традиции и современность: как искусство соединяет эпохи",
    imageSrc: "./images/artstation/culture.webp",
    content:
      "Искусство всегда было мостом между прошлым и настоящим. Современные художники используют традиционные техники, такие как акварель или резьба по дереву, добавляя в них элементы XXI века, например, цифровую обработку. Это создает уникальное сочетание, которое вдохновляет зрителей...",
    comments: [{ author: "NikitaB", text: "Интересный подход, спасибо." }],
  },
  {
    title: "Эмоции на холсте: как передать чувства через искусство",
    imageSrc: "./images/artstation/emotions.jpg",
    content:
      "Искусство — это язык эмоций. Художники используют цвета, формы и текстуры, чтобы выразить радость, грусть или тревогу. В этой статье мы поделимся советами, как научиться передавать свои чувства через творчество, будь то живопись, фотография или цифровые иллюстрации...",
    comments: [
      { author: "VeraN", text: "Очень полезные советы!" },
      { author: "AntonK", text: "Попробую использовать больше цветов." },
      { author: "TanyaM", text: "Спасибо, вдохновляет." },
      { author: "SergeyP", text: "Хочу больше примеров." },
      { author: "LizaD", text: "Отличная статья!" },
    ],
  },
  {
    title: "Глобальное искусство: влияние культурного обмена",
    imageSrc: "./images/artstation/global.jpg",
    content:
      "В современном мире границы между культурами стираются, и это отражается в искусстве. Художники из разных стран обмениваются идеями, создавая работы, которые объединяют традиции Востока и Запада, Севера и Юга. Узнайте, как культурный обмен формирует новые направления в творчестве...",
    comments: [
      { author: "ElenaZ", text: "Интересная тема, спасибо за статью." },
      { author: "MarkR", text: "Хочу узнать больше про восточные мотивы." },
    ],
  },
];

// State
let activeCategory = "all";
let searchQuery = "";

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  // Set current year in footer
  currentYearElement.textContent = new Date().getFullYear();

  // Check for saved theme preference
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

  renderBlogs(blogs);

  // Add animation classes to hero elements
  setTimeout(() => {
    document.querySelector(".hero-text").classList.add("animate");
    document.querySelector(".hero-image").classList.add("animate");
  }, 100);

  // Initialize observers for scroll animations
  initScrollObservers();

  // Add blog modal event listeners
  document.querySelectorAll(".blog-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const blog = link.closest(".blog-card").blogData;
      openBlogModal(blog);
    });
  });

  modalClose.addEventListener("click", closeBlogModal);
  blogModal.addEventListener("click", (e) => {
    if (e.target === blogModal) closeBlogModal();
  });

  // Comment submission
  document.querySelector(".comment-form .btn").addEventListener("click", () => {
    const textarea = document.querySelector(".form-textarea");
    const commentText = textarea.value.trim();
    if (commentText) {
      const currentBlog = blogModal.currentBlog;
      currentBlog.comments.push({ author: "You", text: commentText });
      renderComments(currentBlog.comments);
      textarea.value = "";
    }
  });
});

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
    activeCategory = button.dataCategory;
    filterArtworks();
  });
});

// Reset Filters
resetFilters.addEventListener("click", () => {
  searchQuery = "";
  activeCategory = "all";
  searchInput.value = "";
  tabButtons.forEach((btn) => {
    btn.classList.remove("active");
    if (btn.dataset.category === "all") {
      btn.classList.add("active");
    }
  });
  filterArtworks();
});

// Filter Artworks
function filterArtworks() {
  filteredArtworks = artworks.filter((artwork) => {
    const matchesSearch =
      searchQuery === "" ||
      artwork.title.toLowerCase().includes(searchQuery) ||
      artwork.artist.toLowerCase().includes(searchQuery) ||
      artwork.tags.some((tag) => tag.toLowerCase().includes(searchQuery));

    const matchesCategory =
      activeCategory === "all" ||
      artwork.tags.some(
        (tag) => tag.toLowerCase() === activeCategory.toLowerCase()
      );

    return matchesSearch && matchesCategory;
  });

  renderArtworks(filteredArtworks);
}

// Render Artworks
function renderArtworks(artworks) {
  artworkGrid.innerHTML = "";

  if (artworks.length === 0) {
    noResults.style.display = "block";
    return;
  }

  noResults.style.display = "none";

  artworks.forEach((artwork, index) => {
    const card = artworkCardTemplate.content.cloneNode(true);
    const artworkCard = card.querySelector(".artwork-card");

    if (artwork.featured) {
      artworkCard.classList.add("featured");
    }

    artworkCard.style.animationDelay = `${index * 0.1}s`;

    card.querySelector(".artwork-image").src = artwork.imageSrc;
    card.querySelector(".artwork-image").alt = artwork.title;

    const artworkLinks = card.querySelectorAll(".artwork-link");
    artworkLinks.forEach((link) => {
      link.href = `./artwork.html?id=${artwork.title
        .toLowerCase()
        .replace(/\s+/g, "-")}`;
      link.textContent = artwork.title;
    });

    const artistLinks = card.querySelectorAll(".artist-link");
    artistLinks.forEach((link) => {
      link.href = `profile.html?id=${artwork.artistId}`;
      link.textContent = artwork.artist;
    });

    card.querySelector(".avatar-image").src = artwork.artistAvatar;
    card.querySelector(".avatar-image").alt = artwork.artist;

    card.querySelector(".like-count").textContent = artwork.likes;
    card.querySelector(".comment-count").textContent = artwork.comments.length;

    const tagsContainer = card.querySelector(".artwork-tags");
    artwork.tags.forEach((tag) => {
      const tagElement = document.createElement("span");
      tagElement.className = "artwork-tag";
      tagElement.textContent = tag;
      tagsContainer.appendChild(tagElement);
    });

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
        const likeCount = this.parentNode.querySelector(".like-count");
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

    artworkGrid.appendChild(card);
  });
}

// Render Artists
function renderArtists(artists) {
  artistsGrid.innerHTML = "";

  artists.forEach((artist, index) => {
    const card = artistCardTemplate.content.cloneNode(true);
    const artistCard = card.querySelector(".artist-card");

    artistCard.style.opacity = 1;

    artistCard.style.animationDelay = `${index * 0.1}s`;

    card.querySelector(".avatar-image").src = artist.avatarSrc;
    card.querySelector(".avatar-image").alt = artist.name;

    const artistLink = card.querySelector(".artist-link");
    artistLink.href = `profile.html?id=${artist.id}`;
    artistLink.textContent = artist.name;

    if (artist.specialty) {
      card.querySelector(".artist-specialty").textContent = artist.specialty;
    } else {
      card.querySelector(".artist-specialty").style.display = "none";
    }
    card.querySelector(".artist-bio").textContent = artist.bio;

    card.querySelector(".artwork-count").textContent = artist.artworkCount;
    card.querySelector(".follower-count").textContent = artist.followers;

    card.querySelector(
      ".view-profile-button"
    ).href = `profile.html?id=${artist.id}`;

    const followButton = card.querySelector(".follow-button");

    followButton.textContent = "Follow";

    followButton.addEventListener("click", function () {
      this.classList.toggle("following");
      const followerCount =
        this.parentNode.parentNode.querySelector(".follower-count");

      if (this.classList.contains("following")) {
        this.textContent = "Following";
        followButton.className = "btn following btn-outline";
        followerCount.textContent =
          Number.parseInt(followerCount.textContent) + 1;
      } else {
        this.textContent = "Follow";
        followButton.className = "btn btn-primary";
        followerCount.textContent =
          Number.parseInt(followerCount.textContent) - 1;
      }
    });

    isFollowed_request(artist.id)
      .then((res) => {
        console.log(res);

        if (res.isFollowed) {
          followButton.className = "btn following btn-outline";
          followButton.innerHTML = "following";
        } else {
          followButton.className = "btn btn-primary";
          followButton.innerHTML = "follow";
        }
        isFollowedInitialized(res.isFollowed);
      })
      .catch((e) => {
        console.log(e);
      });

    const onFollow = () => {
      console.log(artist.id);

      follow_request(artist.id)
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
    };

    const onUnFollow = () => {
      unfollow_request(artist.id)
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
    };

    const isFollowedInitialized = (isFollowed) => {
      followButton.addEventListener("click", () => {
        if (isFollowed) {
          onUnFollow();
        } else {
          onFollow();
        }
      });
    };

    artistsGrid.appendChild(card);
  });
}

// Render Blogs
function renderBlogs(blogs) {
  blogGrid.innerHTML = "";

  blogs.forEach((blog, index) => {
    const card = blogCardTemplate.content.cloneNode(true);
    const blogCard = card.querySelector(".blog-card");

    blogCard.style.animationDelay = `${index * 0.1}s`;
    blogCard.blogData = blog; // Attach blog data to card for modal

    card.querySelector(".blog-title").textContent = blog.title;
    card.querySelector(".blog-preview").textContent =
      blog.content.substring(0, 100) + "...";
    card.querySelector(".blog-link").addEventListener("click", (e) => {
      e.preventDefault();
      openBlogModal(blog);
    });

    blogGrid.appendChild(card);
  });
}

// Open Blog Modal
function openBlogModal(blog) {
  blogModal.currentBlog = blog;
  blogModal.querySelector(".modal-title").textContent = blog.title;
  blogModal.querySelector(".modal-image-content").src = blog.imageSrc;
  blogModal.querySelector(".modal-content-text").textContent = blog.content;
  renderComments(blog.comments);
  blogModal.classList.add("active");
}

// Close Blog Modal
function closeBlogModal() {
  blogModal.classList.remove("active");
}

// Render Comments
function renderComments(comments) {
  const commentsList = blogModal.querySelector(".comments-list");
  commentsList.innerHTML = "";
  comments.forEach((comment) => {
    const commentDiv = document.createElement("div");
    commentDiv.className = "comment";
    commentDiv.innerHTML = `<span class="comment-author">${comment.author}</span><span class="comment-text">${comment.text}</span>`;
    commentsList.appendChild(commentDiv);
  });
}

// Initialize Scroll Observers
function initScrollObservers() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const artworkObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
        artworkObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const artistObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
        artistObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const blogObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
        blogObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  setTimeout(() => {
    document.querySelectorAll(".artwork-card").forEach((card) => {
      artworkObserver.observe(card);
    });
    document.querySelectorAll(".artist-card").forEach((card) => {
      artistObserver.observe(card);
    });
    document.querySelectorAll(".blog-card").forEach((card) => {
      blogObserver.observe(card);
    });
  }, 100);
}
