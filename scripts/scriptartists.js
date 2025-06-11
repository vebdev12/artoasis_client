// DOM Elements
const themeToggle = document.getElementById("theme-toggle");
const header = document.getElementById("main-header");
const searchInput = document.getElementById("search-input");
const artistsGrid = document.getElementById("artists-grid");
const currentYearElement = document.getElementById("current-year");

// Template
const artistCardTemplate = document.getElementById("artist-card-template");

window.addEventListener("DOMContentLoaded", () => {
  getAllUsers_request()
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
    .catch((e) => {
      console.log(e);
    });
});

// Sample Data
// const artists = [
//   {
//     name: "Алехандро Вега",
//     specialty: "Абстрактное искусство",
//     bio: "Современный художник, специализирующийся на темных и абстрактных композициях.",
//     avatarSrc: "./images/artstation/animecig.jpg",
//     artworkCount: 1,
//     followers: 1423,
//     profileSlug: "alex", // Добавляем slug для URL
//   },
//   {
//     name: "Изабель Лоран",
//     specialty: "Цифровое искусство",
//     bio: "Художник, создающий эмоциональные цифровые работы с акцентом на внутренние переживания.",
//     avatarSrc: "./images/artstation/cat3.jpg",
//     artworkCount: 1,
//     followers: 3789,
//     profileSlug: "isabelle",
//   },
//   {
//     name: "Кента Сато",
//     specialty: "Фотография",
//     bio: "Фотограф, запечатлевающий красоту закатов и природных пейзажей.",
//     avatarSrc: "./images/artstation/discolol.jpg",
//     artworkCount: 1,
//     followers: 5214,
//     profileSlug: "kenta",
//   },
//   // Добавим slug для остальных авторов
//   {
//     name: "София Бьянки",
//     specialty: "Цифровое искусство",
//     bio: "Создатель ярких неоновых цифровых работ, вдохновленных городской жизнью.",
//     avatarSrc: "./images/artstation/fur202.jpg",
//     artworkCount: 1,
//     followers: 1945,
//     profileSlug: "sofia",
//   },
//   {
//     name: "Омар Хаддад",
//     specialty: "Абстрактное искусство",
//     bio: "Художник, исследующий кристальные мотивы в абстрактных формах.",
//     avatarSrc: "./images/artstation/fur1.jpg",
//     artworkCount: 1,
//     followers: 6231,
//     profileSlug: "omar",
//   },
//   {
//     name: "Елена Кузнецова",
//     specialty: "Фотография",
//     bio: "Фотограф, специализирующийся на городских пейзажах и их умиротворяющей атмосфере.",
//     avatarSrc: "./images/artstation/fur10.jpg",
//     artworkCount: 1,
//     followers: 2987,
//     profileSlug: "elena",
//   },
//   {
//     name: "Лукас Феррейра",
//     specialty: "Природное искусство",
//     bio: "Художник, вдохновленный природой и создающий фантазийные пейзажи.",
//     avatarSrc: "./images/artstation/fur11.jpg",
//     artworkCount: 1,
//     followers: 4512,
//     profileSlug: "lucas",
//   },
//   {
//     name: "Мариам Аль-Саид",
//     specialty: "Цифровое искусство",
//     bio: "Создатель цифровых работ, исследующих космические темы и звездные пейзажи.",
//     avatarSrc: "./images/artstation/fur12.jpg",
//     artworkCount: 1,
//     followers: 7321,
//     profileSlug: "mariam",
//   },
//   {
//     name: "Хироши Танака",
//     specialty: "Абстрактное искусство",
//     bio: "Художник, чьи абстрактные работы передают глубокие эмоциональные состояния.",
//     avatarSrc: "./images/artstation/fur13.jpg",
//     artworkCount: 1,
//     followers: 1654,
//     profileSlug: "hiroshi",
//   },
//   {
//     name: "Анастасия Петрова",
//     specialty: "Природное искусство",
//     bio: "Создатель работ, вдохновленных пустынными пейзажами и их уникальной красотой.",
//     avatarSrc: "./images/artstation/fur2.jpg",
//     artworkCount: 1,
//     followers: 5876,
//     profileSlug: "anastasia",
//   },
//   {
//     name: "Диего Моралес",
//     specialty: "Цифровое искусство",
//     bio: "Художник, создающий цифровые работы с ледяными мотивами и холодными тонами.",
//     avatarSrc: "./images/artstation/fur3.jpg",
//     artworkCount: 1,
//     followers: 3124,
//     profileSlug: "diego",
//   },
//   {
//     name: "Фатима Захра",
//     specialty: "Фотография",
//     bio: "Фотограф, запечатлевающий ночные сцены с уникальной атмосферой.",
//     avatarSrc: "./images/artstation/fur4.jpg",
//     artworkCount: 1,
//     followers: 8923,
//     profileSlug: "fatima",
//   },
//   {
//     name: "Джованни Росси",
//     specialty: "Абстрактное искусство",
//     bio: "Художник, создающий красочные абстрактные композиции с радужными оттенками.",
//     avatarSrc: "./images/artstation/fur5.jpg",
//     artworkCount: 1,
//     followers: 2456,
//     profileSlug: "giovanni",
//   },
//   {
//     name: "Ясмин Халиль",
//     specialty: "Цифровое искусство",
//     bio: "Создатель цифровых работ, вдохновленных космосом и его бесконечными просторами.",
//     avatarSrc: "./images/artstation/fur6.jpg",
//     artworkCount: 1,
//     followers: 6745,
//     profileSlug: "yasmin",
//   },
//   {
//     name: "Карлос Мендоса",
//     specialty: "Природное искусство",
//     bio: "Художник, чьи работы отражают осенние пейзажи и их теплые оттенки.",
//     avatarSrc: "./images/artstation/fur7.jpg",
//     artworkCount: 1,
//     followers: 4132,
//     profileSlug: "carlos",
//   },
//   {
//     name: "Наталья Иванова",
//     specialty: "Цифровое искусство",
//     bio: "Создатель неоновых цифровых работ, вдохновленных электрической энергией.",
//     avatarSrc: "./images/artstation/fur8.jpg",
//     artworkCount: 1,
//     followers: 9876,
//     profileSlug: "natalia",
//   },
//   {
//     name: "Рюичи Ямада",
//     specialty: "Фотография",
//     bio: "Фотограф, запечатлевающий штормовые сцены с драматическим настроением.",
//     avatarSrc: "./images/artstation/fur9.jpg",
//     artworkCount: 1,
//     followers: 3567,
//     profileSlug: "ryuichi",
//   },
//   {
//     name: "Аиша Малик",
//     specialty: "Цифровое искусство",
//     bio: "Художник, создающий цифровые работы с космическими мотивами.",
//     avatarSrc: "./images/artstation/kiss.jpg",
//     artworkCount: 1,
//     followers: 5289,
//     profileSlug: "aisha",
//   },
//   {
//     name: "Пабло Гутьеррес",
//     specialty: "Природное искусство",
//     bio: "Создатель работ, вдохновленных лесными пейзажами и их изумрудными тонами.",
//     avatarSrc: "./images/artstation/jane1.jpeg",
//     artworkCount: 1,
//     followers: 1978,
//     profileSlug: "pablo",
//   },
//   {
//     name: "Зара Ахмед",
//     specialty: "Абстрактное искусство",
//     bio: "Художник, исследующий лунные мотивы в абстрактных формах.",
//     avatarSrc: "./images/artstation/jane2.jpeg",
//     artworkCount: 1,
//     followers: 6432,
//     profileSlug: "zara",
//   },
//   {
//     name: "Матео Лопес",
//     specialty: "Цифровое искусство",
//     bio: "Создатель цифровых работ с акцентом на красные оттенки и их интенсивность.",
//     avatarSrc: "./images/artstation/jane3.jpeg",
//     artworkCount: 1,
//     followers: 2891,
//     profileSlug: "mateo",
//   },
//   {
//     name: "Лейла Хоссейни",
//     specialty: "Фотография",
//     bio: "Фотограф, запечатлевающий сцены с синими оттенками и утренним светом.",
//     avatarSrc: "./images/artstation/jane5.jpeg",
//     artworkCount: 1,
//     followers: 7543,
//     profileSlug: "leila",
//   },
//   {
//     name: "Такеши Кимура",
//     specialty: "Абстрактное искусство",
//     bio: "Художник, создающий абстрактные работы в черных тонах с глубоким смыслом.",
//     avatarSrc: "./images/artstation/kiss.jpg",
//     artworkCount: 1,
//     followers: 4321,
//     profileSlug: "takeshi",
//   },
//   {
//     name: "Джулиана Сильва",
//     specialty: "Цифровое искусство",
//     bio: "Создатель цифровых работ, вдохновленных небом и его мягкими текстурами.",
//     avatarSrc: "./images/artstation/meowsk.jpg",
//     artworkCount: 1,
//     followers: 8765,
//     profileSlug: "juliana",
//   },
//   {
//     name: "Хамза Эль-Амин",
//     specialty: "Природное искусство",
//     bio: "Художник, чьи работы отражают янтарные пейзажи и их теплую атмосферу.",
//     avatarSrc: "./images/artstation/meowsk2.jpg",
//     artworkCount: 1,
//     followers: 3214,
//     profileSlug: "hamza",
//   },
//   {
//     name: "Екатерина Волкова",
//     specialty: "Фотография",
//     bio: "Фотограф, запечатлевающий тени и их танец в городских условиях.",
//     avatarSrc: "./images/artstation/omori.jpg",
//     artworkCount: 1,
//     followers: 5987,
//     profileSlug: "ekaterina",
//   },
//   {
//     name: "Хавьер Кастильо",
//     specialty: "Цифровое искусство",
//     bio: "Создатель цифровых работ, исследующих пустоту и ее визуальные интерпретации.",
//     avatarSrc: "./images/artstation/shark.jpg",
//     artworkCount: 1,
//     followers: 1678,
//     profileSlug: "javier",
//   },
//   {
//     name: "Сара Нильссон",
//     specialty: "Абстрактное искусство",
//     bio: "Художник, создающий абстрактные работы с морскими мотивами.",
//     avatarSrc: "./images/artstation/void.jpg",
//     artworkCount: 1,
//     followers: 9234,
//     profileSlug: "sara",
//   },
//   {
//     name: "Юссеф Нассар",
//     specialty: "Фотография",
//     bio: "Фотограф, запечатлевающий сумеречные сцены с мягким светом.",
//     avatarSrc: "./images/artstation/meowsk2.jpg",
//     artworkCount: 1,
//     followers: 2457,
//     profileSlug: "youssef",
//   },
// ];

// State
let searchQuery = "";

// Initialize
document.addEventListener("DOMContentLoaded", () => {
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

  // Check logged-in user and update header
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (loggedInUser) {
    const headerRight = document.querySelector(".header-right");
    headerRight.innerHTML = `
            <div class="search-container">
                <i class="fas fa-search search-icon"></i>
                <input id="search-input" type="text" class="search-input" placeholder="Поиск работ, художников...">
            </div>
            <button id="theme-toggle" class="theme-toggle">
                ${themeToggle.innerHTML}
            </button>
            <span>Привет, ${loggedInUser}!</span>
            <a href="profile.html?artist=${encodeURIComponent(
              loggedInUser
            )}" class="btn btn-outline">Профиль</a>
            <a href="#" class="btn btn-primary" id="logout-button">Выйти</a>
        `;

    // Re-attach theme toggle event listener
    const newThemeToggle = document.getElementById("theme-toggle");
    newThemeToggle.addEventListener("click", () => {
      const isDark = document.documentElement.classList.toggle("dark");
      localStorage.setItem("theme", isDark ? "dark" : "light");
      newThemeToggle.innerHTML = isDark
        ? '<i class="fas fa-moon"></i>'
        : '<i class="fas fa-sun"></i>';
    });
    // Add logout functionality
    document.getElementById("logout-button").addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("loggedInUser");
      window.location.reload();
    });
  }

  initScrollObservers();
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

// Filter Artists
function filterArtists() {
  const filteredArtists = artists.filter(
    (artist) =>
      searchQuery === "" ||
      artist.name.toLowerCase().includes(searchQuery) ||
      artist.specialty.toLowerCase().includes(searchQuery)
  );
  renderArtists(filteredArtists);
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
    card.querySelector(".artist-specialty").style.display = "none";
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

// Initialize Scroll Observers
function initScrollObservers() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );
  setTimeout(
    () =>
      document
        .querySelectorAll(".artist-card")
        .forEach((card) => observer.observe(card)),
    100
  );
}
