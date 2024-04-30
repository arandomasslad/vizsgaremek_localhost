const express = require('express');
const app = express();
const mysql = require('mysql');
const path = require('path');
const multer = require('multer');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const saltRounds = 10;

/* meghatározzuk, hogy a multer hova és milyen néven mentese el a képet */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname);
    }
});
/* az upload egy middleware funtion lesz majd később a végpontnál, ami megmutatja, hova és milyen néven mentse el a képet */
const upload = multer({ storage: storage });

/* ez kell ahhoz, hogy a képeket meg tudjuk jeleníteni a frontend oldalon */
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const port = 3000;
const host = 'localhost';

app.use(express.static(path.join(__dirname, 'views')));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json({ limit: '50mb' }));

// json parse-hoz
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cookie parser
app.use(cookieParser());

// Adatbázis kapcsolódás
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'users'
});

// index.html route
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// home.html útvonala
app.get('/home.html', function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

// admin.html útvonala
app.get('/admin.html', function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'admin.html'));
});


// noi cipok utvonala
app.get('/Airforce1_female.html', function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'more_shoes', 'noi', 'Airforce1_female.html'));
});
app.get('/Jordan1_female.html', function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'more_shoes', 'noi', 'Jordan1_female.html'));
});
app.get('/Huarache_female.html', function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'more_shoes', 'noi', 'Huarache_female.html'));
});
app.get('/Superstar_female.html', function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'more_shoes', 'noi', 'Superstar_female.html'));
});
app.get('/Gazelle_female.html', function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'more_shoes', 'noi', 'Gazelle_female.html'));
});
app.get('/Alphaboost_female.html', function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'more_shoes', 'noi', 'Alphaboost_female.html'));
});
app.get('/Ultraboost_female.html', function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'more_shoes', 'noi', 'Ultraboost_female.html'));
});
app.get('/Samba_female.html', function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'more_shoes', 'noi', 'Samba_female.html'));
});
app.get('/Oldskool_female.html', function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'more_shoes', 'noi', 'Oldskool_female.html'));
});
app.get('/Sk8hi_female.html', function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'more_shoes', 'noi', 'Sk8hi_female.html'));
});
app.get('/Chucktaylor_female.html', function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'more_shoes', 'noi', 'Chucktaylor_female.html'));
});
app.get('/Runstarhike_female.html', function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'more_shoes', 'noi', 'Runstarhike_female.html'));
});

// ferfi cipok utvonala
app.get('/Airforce1_male.html', function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'more_shoes', 'ferfi', 'Airforce1_male.html'));
});
app.get('/Blazers_male.html', function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'more_shoes', 'ferfi', 'Blazers_male.html'));
});
app.get('/Airmax270_male.html', function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'more_shoes', 'ferfi', 'Airmax270_male.html'));
});
app.get('/Airmax720_male.html', function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'more_shoes', 'ferfi', 'Airmax720_male.html'));
});
app.get('/Airmax90_male.html', function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'more_shoes', 'ferfi', 'Airmax90_male.html'));
});
app.get('/Airmax95_male.html', function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'more_shoes', 'ferfi', 'Airmax95_male.html'));
});
app.get('/Foresthills_male.html', function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'more_shoes', 'ferfi', 'Foresthills_male.html'));
});
app.get('/Galaxy6_male.html', function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'more_shoes', 'ferfi', 'Galaxy6_male.html'));
});
app.get('/Superstar_male.html', function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'more_shoes', 'ferfi', 'Superstar_male.html'));
});
app.get('/Ultraboost_male.html', function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'more_shoes', 'ferfi', 'Ultraboost_male.html'));
});
app.get('/Caven_male.html', function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'more_shoes', 'ferfi', 'Caven_male.html'));
});
app.get('/Equate_male.html', function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'more_shoes', 'ferfi', 'Equate_male.html'));
});
app.get('/Strunner_male.html', function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'more_shoes', 'ferfi', 'Strunner_male.html'));
});
app.get('/Bb650rch_male.html', function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'more_shoes', 'ferfi', 'Bb650rch_male.html'));
});
app.get('/Mr530ow_male.html', function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'more_shoes', 'ferfi', 'Mr530ow_male.html'));
});
app.get('/Wrpdrunneruwrpdkom_male.html', function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'more_shoes', 'ferfi', 'Wrpdrunneruwrpdkom_male.html'));
});
app.get('/Clnylon_male.html', function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'more_shoes', 'ferfi', 'Clnylon_male.html'));
});
app.get('/Classic_male.html', function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'more_shoes', 'ferfi', 'Classic_male.html'));
});
app.get('/Flexagon_male.html', function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'more_shoes', 'ferfi', 'Flexagon_male.html'));
});
app.get('/Ozelia_male.html', function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'more_shoes', 'ferfi', 'Ozelia_male.html'));
});
app.get('/Nm272rst_male.html', function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'more_shoes', 'ferfi', 'Nm272rst_male.html'));
});


app.use(express.static(path.join(__dirname, 'public')));

app.use('/moreshoes/noi', express.static(path.join(__dirname, 'moreshoes', 'noi')));


// reg.html útvonala
app.get('/reg.html', function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'reg.html'));
});

// ferfi.html útvonala
app.get('/ferfi.html', function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'ferfi.html'));
});

// admin_ferfi.html útvonala
app.get('/admin_ferfi.html', function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'admin_ferfi.html'));
});

// noi.html útvonala
app.get('/noi.html', function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'noi.html'));
});

// admin_noi.html útvonala
app.get('/admin_noi.html', function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'admin_noi.html'));
});

// style.css útvonala
app.get('/style.css', function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'css', 'style.css'));
});

// reglog.css útvonala
app.get('/relog.css', function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'css', 'reglog.css'));
});

// bootstrap.min.css útvonala
app.get('/bootstrap.min.css', function (req, res) {
    res.sendFile(path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'css', 'bootstrap.min.css'));
});

// bootstrap.bundle.min.js útvonala
app.get('/bootstrap.bundle.min.js', function (req, res) {
    res.sendFile(path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'js', 'bootstrap.bundle.min.js'));
});

// script.js útvonala
app.get('/script.js', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'script.js'));
});

// login.js útvonala
app.get('/login.js', function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'js', 'login.js'));
});

// logout.js útvonala
app.get('/logout.js', function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'js', 'logout.js'));
});

// reg.js útvonala
app.get('/reg.js', function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'js', 'reg.js'));
});

// admin.js útvonala
app.get('/admin.js', function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'js', 'admin.js'));
});

// editUsers.js útvonala
app.get('/editUsers.js', function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'js', 'editUsers.js'));
});

app.get('/profile.js', function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'js', 'profile.js'));
});


// cipo felvétel script
app.get('/createShoes.js', function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'js', 'createShoes.js'));
});

// Felhasználó regisztrációja
app.post('/reg', function (req, res) {
    const { email, nickName, password } = req.body;

    connection.query('SELECT * FROM user WHERE email = ?', [email], (err, result) => {
        if (err) {
            console.error('Error during registration:', err);
            return res.status(500).json("Hiba a regisztráció során!");
        }

        try {
            if (result && result.length > 0) {
                return res.status(400).json('A felhasználónév már foglalt!');
            }

            bcrypt.hash(password, saltRounds, (err, hash) => {
                if (err) {
                    console.error('Error during password hashing:', err);
                    return res.status(500).json("Hiba a regisztráció során!");
                }

                connection.query('INSERT INTO user (userid, email, nick_name, password, role) VALUES (NULL, ?, ?, ?, 0)', [email, nickName, hash], (err, result) => {
                    if (err) {
                        console.error('Error during user insertion:', err);
                        return res.status(500).json("Hiba a regisztráció során!");
                    }

                    res.json("Sikeres regisztráció!");
                });
            });
        } catch (error) {
            console.error('Unexpected error during registration:', error);
            return res.status(500).json("Hiba a regisztráció során!");
        }
    });
});

// login route
app.post('/login', function (req, res) {
    const { email, password } = req.body;

    connection.query('SELECT * FROM user WHERE user.email = ?', [email], (err, result) => {
        if (err) {
            return res.status(500).json('Hiba történt a bejelentkezés során');
        }

        if (result.length === 0 || !bcrypt.compareSync(password, result[0].password)) {
            return res.status(401).json('Hibás jelszó vagy felhasználónév!');
        }

        const user = {
            email: result[0].email,
            nickName: result[0].nick_name,
            role: result[0].role
        }

        res.cookie('userData', JSON.stringify(user), { httpOnly: true, maxAge: 1000 * 60 * 60 * 12 });

        // Redirect based on user's role
        if (user.role === 1) {
            return res.json({ success: true, user, redirectUrl: '/admin.html' });
        } else {
            return res.json({ success: true, user, redirectUrl: '/home.html' });
        }
    });
});

// Cipok lekérdezése
app.get('/cipok/:gender', (req, res) => {
    const gender = req.params.gender.toLowerCase(); // Convert to lowercase for case-insensitive comparison
    connection.query('SELECT * FROM cipok WHERE gender = ?', [gender], (err, results) => {
        if (err) {
            console.error('Error fetching cipok:', err);
            return res.status(500).json('Internal Server Error');
        }
        res.json(results);
    });
});

// Cipok lekérdezése admin oldalon
app.get('/cipok/admin', (req, res) => {
    connection.query('SELECT * FROM cipok', (err, results) => {
        if (err) {
            console.error('Error fetching cipok for admin:', err);
            return res.status(500).json('Internal Server Error');
        }
        //console.log('Shoes data:', results);
        res.json(results);
    });
});


// logout route
app.post('/logout', function (req, res) {
    res.clearCookie('userDatat');
    res.json({ success: true });
});

// keresés
app.get('/search', (req, res) => {
    const query = req.query.query;

    // Modify your SQL query to search for brands or models that match the query
    connection.query('SELECT * FROM cipok WHERE brand LIKE ? OR model LIKE ?', [`%${query}%`, `%${query}%`], (err, results) => {
        if (err) {
            console.error('Error during search:', err);
            return res.status(500).json('Internal Server Error');
        }
        res.json(results);
    });
});

// cipő felvétele
app.post('/insert-shoe', (req, res) => {
    const { model, brand, price, stock, gender, image } = req.body;
    const imageBuffer = Buffer.from(image, 'base64');
    //console.log(imageBuffer);

    connection.query('INSERT INTO cipok (gender, model, brand, price, image, stock) VALUES (?, ?, ?, ?, ?, ?)', [gender, model, brand, price, imageBuffer, stock], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json({ success: true });
        }
    });
});

// cipő törlése
app.delete('/shoes/:id', (req, res) => {
    const id = req.params.id;

    connection.query('DELETE FROM cipok WHERE productid = ?', [id], (err, result) => {
        res.json({ success: true });
    })
});

// cipő szerkesztése
app.put('/shoes/:id', (req, res) => {
    const id = req.params.id;
    const { model, brand, gender, image } = req.body;
    const price = parseInt(req.body.price);
    const stock = parseInt(req.body.stock);

    const imageBuffer = Buffer.from(image, 'base64');

    connection.query('UPDATE cipok SET gender = ?, brand = ?, model = ?, price = ?, image = ?, stock = ? WHERE productid = ?;', [gender, model, brand, price, imageBuffer, stock, id], (err, result) => {
        console.log(result);
        res.json({ success: true });
    });

});

// egy cipő lekérdezése
app.get('/shoes/:id', (req, res) => {
    const id = req.params.id;

    connection.query('SELECT * FROM cipok WHERE productid = ?', [id], (err, result) => {
        res.json(result);
    });
});

// Admin Oldal userek
app.get('/users', (req, res) => {
    connection.query('SELECT userid, email, nick_name, role FROM user', (err, users) => {
        if (err) {
            console.error('Error executing query', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(users);
    });
});

// az összes felhasználó adatainak lekérdezése
app.get('/getUsers', (req, res) => {
    connection.query('SELECT user, email, nick_name, role FROM user', (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json(result);
    });
});

// keresés a felhasználók adatai között
app.post('/searchingUser', (req, res) => {
    const { searching, searchingType } = req.body;

    const query = `SELECT userid, email, nick_name, role FROM user WHERE ${searchingType} LIKE ?`;
    connection.query(query, [`%${searching}%`], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json(result);
    });
});

// szerepkör módosítása
app.put('/editRole/:id', (req, res) => {
    const id = req.params.id;
    const editRole = req.body.editRole;
    console.log(id, editRole);
    connection.query('UPDATE user SET role = ? WHERE userid = ?;', [editRole, id], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json({ success: true });
    });
});

// felhasználó törlése
app.delete('/deleteUser/:id', (req, res) => {
    const id = req.params.id;

    connection.query('DELETE FROM user WHERE userid = ?', [id], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json({ success: true });
    });
});



// a nick_name módosítása
app.put('/editNick_name/:email', (req, res) => {
    const email = req.params.email;
    const nick_name = req.body.nick_name;

    connection.query('UPDATE user SET nick_name = ? WHERE email = ?;', [nick_name, email], (err, result) => {
        res.json("Sikeres módosítás!");
    });

});
// a jelszó módosítása
app.put('/editPassword/:email', (req, res) => {
    const email = req.params.email;
    const password = req.body.password;

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) throw err;

        connection.query('UPDATE user SET password = ? WHERE email = ?;', [hash, email], (err, result) => {
            res.json("Sikeres módosítás!");
        });
    });
});

// egy felhasználó adatainak lekérdezése
app.get('/getUser/:emailFromCookie', (req, res) => {
    const email = req.params.emailFromCookie;
    console.log(email);
    connection.query('SELECT userid, email, nick_name, role FROM user WHERE email=?', [email], (err, result) => {
        if (err) {
            console.log(err);
        }
        console.log(result);
        res.json(result);
    });
});


// a felhasználó cookie ellenőrzése
app.get('/getUserEmail', (req, res) => {
    const userString = req.cookies.userData;

    if (!userString) {
        return res.status(401).json("Hozzáférés megtagadva!");
    }

    const user = JSON.parse(userString);
    const userEmail = user.email;
    console.log(userEmail);
    res.json({ userEmail });
})


app.listen(port, host, () => {
    console.log(`IP: http://${host}:${port}`);
});