const checkRole = (role) => {
    return (req, res, next) => {
        const userString = req.cookies.userData;
        //console.log(userString);

        if (!userString) {
            console.log('Hozzáfésés megtagadva, a felhasználó nem található!')
            return res.status(401).json('Hozzáférés megtagadva!');
        }

        const user = JSON.parse(userString);

        if (user.role !== role) {
            console.log(`Nincs jogosultságod a belépésre! Követelt szerepkör: ${role}, felhasználó szerepköre: ${user.role}`)
            return res.status(403).json('Nincs jogosultságod a belépésre!');
        }

        console.log('Jogosultság ellenőrzése sikeres!');
        next();
    }
}

module.exports = checkRole;