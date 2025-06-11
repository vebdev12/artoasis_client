const express = require('express');
const odbc = require('odbc');
const app = express();
const port = 3000;

// Middleware для обработки JSON и CORS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Подключение к базе данных Access
const connectionString = 'Driver={Microsoft Access Driver (*.mdb, *.accdb)};DBQ=./database.accdb;';

async function connectToDatabase() {
    try {
        const connection = await odbc.connect(connectionString);
        return connection;
    } catch (err) {
        console.error('Ошибка подключения к базе данных:', err);
        throw err;
    }
}

// API для логина
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Логин и пароль обязательны' });
    }

    try {
        const connection = await connectToDatabase();
        const query = `SELECT * FROM Users WHERE username = ? AND password = ?`;
        const result = await connection.query(query, [username, password]);

        if (result.length > 0) {
            res.json({ success: true, message: 'Успешный вход', username });
        } else {
            res.status(401).json({ success: false, message: 'Неверный логин или пароль' });
        }

        await connection.close();
    } catch (err) {
        console.error('Ошибка при проверке пользователя:', err);
        res.status(500).json({ success: false, message: 'Ошибка сервера' });
    }
});

// API для регистрации
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Логин и пароль обязательны' });
    }

    try {
        const connection = await connectToDatabase();

        // Проверка, существует ли пользователь
        const checkQuery = `SELECT * FROM Users WHERE username = ?`;
        const checkResult = await connection.query(checkQuery, [username]);

        if (checkResult.length > 0) {
            await connection.close();
            return res.status(400).json({ success: false, message: 'Пользователь с таким логином уже существует' });
        }

        // Добавление нового пользователя
        const insertQuery = `INSERT INTO Users (username, password) VALUES (?, ?)`;
        await connection.query(insertQuery, [username, password]);

        await connection.close();
        res.json({ success: true, message: 'Регистрация успешна', username });
    } catch (err) {
        console.error('Ошибка при регистрации:', err);
        res.status(500).json({ success: false, message: 'Ошибка сервера' });
    }
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});