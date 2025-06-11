import os

# Данные авторов (взято из scriptartists.js)
authors = [
    {"name": "Алехандро Вега", "specialty": "Абстрактное искусство", "bio": "Современный художник, специализирующийся на темных и абстрактных композициях.", "avatarSrc": "animecig.jpg", "artworkCount": 1, "followers": 1423, "profileSlug": "alex"},
    {"name": "Изабель Лоран", "specialty": "Цифровое искусство", "bio": "Художник, создающий эмоциональные цифровые работы с акцентом на внутренние переживания.", "avatarSrc": "cat3.jpg", "artworkCount": 1, "followers": 3789, "profileSlug": "isabelle"},
    {"name": "Кента Сато", "specialty": "Фотография", "bio": "Фотограф, запечатлевающий красоту закатов и природных пейзажей.", "avatarSrc": "discolol.jpg", "artworkCount": 1, "followers": 5214, "profileSlug": "kenta"},
    {"name": "София Бьянки", "specialty": "Цифровое искусство", "bio": "Создатель ярких неоновых цифровых работ, вдохновленных городской жизнью.", "avatarSrc": "fur202.jpg", "artworkCount": 1, "followers": 1945, "profileSlug": "sofia"},
    {"name": "Омар Хаддад", "specialty": "Абстрактное искусство", "bio": "Художник, исследующий кристальные мотивы в абстрактных формах.", "avatarSrc": "fur1.jpg", "artworkCount": 1, "followers": 6231, "profileSlug": "omar"},
    {"name": "Елена Кузнецова", "specialty": "Фотография", "bio": "Фотограф, специализирующийся на городских пейзажах и их умиротворяющей атмосфере.", "avatarSrc": "fur10.jpg", "artworkCount": 1, "followers": 2987, "profileSlug": "elena"},
    {"name": "Лукас Феррейра", "specialty": "Природное искусство", "bio": "Художник, вдохновленный природой и создающий фантазийные пейзажи.", "avatarSrc": "fur11.jpg", "artworkCount": 1, "followers": 4512, "profileSlug": "lucas"},
    {"name": "Мариам Аль-Саид", "specialty": "Цифровое искусство", "bio": "Создатель цифровых работ, исследующих космические темы и звездные пейзажи.", "avatarSrc": "fur12.jpg", "artworkCount": 1, "followers": 7321, "profileSlug": "mariam"},
    {"name": "Хироши Танака", "specialty": "Абстрактное искусство", "bio": "Художник, чьи абстрактные работы передают глубокие эмоциональные состояния.", "avatarSrc": "fur13.jpg", "artworkCount": 1, "followers": 1654, "profileSlug": "hiroshi"},
    {"name": "Анастасия Петрова", "specialty": "Природное искусство", "bio": "Создатель работ, вдохновленных пустынными пейзажами и их уникальной красотой.", "avatarSrc": "fur2.jpg", "artworkCount": 1, "followers": 5876, "profileSlug": "anastasia"},
    {"name": "Диего Моралес", "specialty": "Цифровое искусство", "bio": "Художник, создающий цифровые работы с ледяными мотивами и холодными тонами.", "avatarSrc": "fur3.jpg", "artworkCount": 1, "followers": 3124, "profileSlug": "diego"},
    {"name": "Фатима Захра", "specialty": "Фотография", "bio": "Фотограф, запечатлевающий ночные сцены с уникальной атмосферой.", "avatarSrc": "fur4.jpg", "artworkCount": 1, "followers": 8923, "profileSlug": "fatima"},
    {"name": "Джованни Росси", "specialty": "Абстрактное искусство", "bio": "Художник, создающий красочные абстрактные композиции с радужными оттенками.", "avatarSrc": "fur5.jpg", "artworkCount": 1, "followers": 2456, "profileSlug": "giovanni"},
    {"name": "Ясмин Халиль", "specialty": "Цифровое искусство", "bio": "Создатель цифровых работ, вдохновленных космосом и его бесконечными просторами.", "avatarSrc": "fur6.jpg", "artworkCount": 1, "followers": 6745, "profileSlug": "yasmin"},
    {"name": "Карлос Мендоса", "specialty": "Природное искусство", "bio": "Художник, чьи работы отражают осенние пейзажи и их теплые оттенки.", "avatarSrc": "fur7.jpg", "artworkCount": 1, "followers": 4132, "profileSlug": "carlos"},
    {"name": "Наталья Иванова", "specialty": "Цифровое искусство", "bio": "Создатель неоновых цифровых работ, вдохновленных электрической энергией.", "avatarSrc": "fur8.jpg", "artworkCount": 1, "followers": 9876, "profileSlug": "natalia"},
    {"name": "Рюичи Ямада", "specialty": "Фотография", "bio": "Фотограф, запечатлевающий штормовые сцены с драматическим настроением.", "avatarSrc": "fur9.jpg", "artworkCount": 1, "followers": 3567, "profileSlug": "ryuichi"},
    {"name": "Аиша Малик", "specialty": "Цифровое искусство", "bio": "Художник, создающий цифровые работы с космическими мотивами.", "avatarSrc": "kiss.jpg", "artworkCount": 1, "followers": 5289, "profileSlug": "aisha"},
    {"name": "Пабло Гутьеррес", "specialty": "Природное искусство", "bio": "Создатель работ, вдохновленных лесными пейзажами и их изумрудными тонами.", "avatarSrc": "jane1.jpeg", "artworkCount": 1, "followers": 1978, "profileSlug": "pablo"},
    {"name": "Зара Ахмед", "specialty": "Абстрактное искусство", "bio": "Художник, исследующий лунные мотивы в абстрактных формах.", "avatarSrc": "jane2.jpeg", "artworkCount": 1, "followers": 6432, "profileSlug": "zara"},
    {"name": "Матео Лопес", "specialty": "Цифровое искусство", "bio": "Создатель цифровых работ с акцентом на красные оттенки и их интенсивность.", "avatarSrc": "jane3.jpeg", "artworkCount": 1, "followers": 2891, "profileSlug": "mateo"},
    {"name": "Лейла Хоссейни", "specialty": "Фотография", "bio": "Фотограф, запечатлевающий сцены с синими оттенками и утренним светом.", "avatarSrc": "jane5.jpeg", "artworkCount": 1, "followers": 7543, "profileSlug": "leila"},
    {"name": "Такеши Кимура", "specialty": "Абстрактное искусство", "bio": "Художник, создающий абстрактные работы в черных тонах с глубоким смыслом.", "avatarSrc": "kiss.jpg", "artworkCount": 1, "followers": 4321, "profileSlug": "takeshi"},
    {"name": "Джулиана Сильва", "specialty": "Цифровое искусство", "bio": "Создатель цифровых работ, вдохновленных небом и его мягкими текстурами.", "avatarSrc": "meowsk.jpg", "artworkCount": 1, "followers": 8765, "profileSlug": "juliana"},
    {"name": "Хамза Эль-Амин", "specialty": "Природное искусство", "bio": "Художник, чьи работы отражают янтарные пейзажи и их теплую атмосферу.", "avatarSrc": "meowsk2.jpg", "artworkCount": 1, "followers": 3214, "profileSlug": "hamza"},
    {"name": "Екатерина Волкова", "specialty": "Фотография", "bio": "Фотограф, запечатлевающий тени и их танец в городских условиях.", "avatarSrc": "omori.jpg", "artworkCount": 1, "followers": 5987, "profileSlug": "ekaterina"},
    {"name": "Хавьер Кастильо", "specialty": "Цифровое искусство", "bio": "Создатель цифровых работ, исследующих пустоту и ее визуальные интерпретации.", "avatarSrc": "shark.jpg", "artworkCount": 1, "followers": 1678, "profileSlug": "javier"},
    {"name": "Сара Нильссон", "specialty": "Абстрактное искусство", "bio": "Художник, создающий абстрактные работы с морскими мотивами.", "avatarSrc": "void.jpg", "artworkCount": 1, "followers": 9234, "profileSlug": "sara"},
    {"name": "Юссеф Нассар", "specialty": "Фотография", "bio": "Фотограф, запечатлевающий сумеречные сцены с мягким светом.", "avatarSrc": "meowsk2.jpg", "artworkCount": 1, "followers": 2457, "profileSlug": "youssef"}
]

# Функция для генерации файла
def generate_artist_profile(author):
    # Читаем шаблон
    with open("template.html", "r", encoding="utf-8") as template_file:
        template_content = template_file.read()

    # Подготовка данных для подстановки
    data = {
        "name": author["name"],
        "short_description": author["bio"],  # Краткое описание для hero-section
        "description": author["bio"],  # Подробное описание для секции "О художнике"
        "avatar": author["avatarSrc"],
        "banner": author["avatarSrc"].split(".")[0],  # Используем имя файла аватара как основу для баннера
        "artworkCount": author["artworkCount"],
        "followers": author["followers"]
    }

    # Замена плейсхолдеров
    content = template_content
    for key, value in data.items():
        content = content.replace(f"{{{key}}}", str(value))

    # Создание папки, если она не существует
    os.makedirs("artist", exist_ok=True)

    # Сохранение файла
    filename = f"artist/{author['profileSlug']}.html"
    with open(filename, "w", encoding="utf-8") as output_file:
        output_file.write(content)
    print(f"Сгенерирован файл: {filename}")

# Генерация файлов для всех авторов
for author in authors:
    generate_artist_profile(author)

print("Генерация завершена!")