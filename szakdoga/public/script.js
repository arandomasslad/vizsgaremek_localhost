let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}



document.querySelectorAll('.featured-image-1').forEach(image_1 => {
    image_1.addEventListener('click', () => {
        var src = image_1.getAttribute('src');
        document.querySelector('.big-image-1').src = src;
    });
});

document.querySelectorAll('.featured-image-2').forEach(image_2 => {
    image_2.addEventListener('click', () => {
        var src = image_2.getAttribute('src');
        document.querySelector('.big-image-2').src = src;
    });
});

document.querySelectorAll('.featured-image-3').forEach(image_3 => {
    image_3.addEventListener('click', () => {
        var src = image_3.getAttribute('src');
        document.querySelector('.big-image-3').src = src;
    });
});

function loading() {
    const isMalePage = window.location.pathname.includes('ferfi.html');
    let fetchCipokButton;

    if (isMalePage) {
        fetchCipok('male');
        fetchCipokButton = document.getElementById('fetch-cipok-male');
    } else {
        fetchCipok('female');
        fetchCipokButton = document.getElementById('fetch-cipok-female');
        const fetchCipokContainerButton = document.getElementById('fetch-cipok-female-container');
        if (fetchCipokContainerButton) {
            fetchCipokContainerButton.style.display = 'none';
        }
    }

    if (fetchCipokButton) {
        fetchCipokButton.style.display = 'none';
    }
    attachSearchEventListener();
}

async function fetchCipok(gender) {
    try {
        const response = await fetch(`/cipok/${gender}`);
        const cipok = await response.json();

        let cipokHTML = '<h1 class="mt-2 mb-2">Cipők</h1>';

        for (let cipo of cipok) {
            const base64Image = cipo.image ? arrayBufferToBase64(cipo.image.data) : '';
            const id = cipo.productid;

            let productUrl = '';

            // Generate URL based on gender
            if (gender === 'male') {
                switch (cipo.model.toLowerCase()) {
                    // Male shoe URL mappings
                    case 'air force 1':
                        productUrl = 'Airforce1_male.html';
                        break;
                    case 'blazers':
                        productUrl = 'Blazers_male.html';
                        break;
                    case 'air max 270':
                        productUrl = 'Airmax270_male.html';
                        break;
                    case 'air max 720':
                        productUrl = 'Airmax720_male.html';
                        break;
                    case 'air max 90':
                        productUrl = 'Airmax90_male.html';
                        break;
                    case 'air max 95':
                        productUrl = 'Airmax95_male.html';
                        break;
                    case 'forest hills':
                        productUrl = 'Foresthills_male.html';
                        break;
                    case 'galaxy 6':
                        productUrl = 'Galaxy6_male.html';
                        break;
                    case 'superstar':
                        productUrl = 'Superstar_male.html';
                        break;
                    case 'ultraboost':
                        productUrl = 'Ultraboost_male.html';
                        break;
                    case 'caven':
                        productUrl = 'Caven_male.html';
                        break;
                    case 'equate':
                        productUrl = 'Equate_male.html';
                        break;
                    case 'st runner':
                        productUrl = 'Strunner_male.html';
                        break;
                    case 'bb650rch':
                        productUrl = 'Bb650rch_male.html';
                        break;
                    case 'mr530ow':
                        productUrl = 'Mr530ow_male.html';
                        break;
                    case 'wrpd runner uwrpdkom':
                        productUrl = 'Wrpdrunneruwrpdkom_male.html';
                        break;
                    case 'cl nylon':
                        productUrl = 'Clnylon_male.html';
                        break;
                    case 'classic':
                        productUrl = 'Classic_male.html';
                        break;
                    case 'flexagon':
                        productUrl = 'Flexagon_male.html';
                        break;
                    case 'ozelia':
                        productUrl = 'Ozelia_male.html';
                        break;
                    case 'nm272rst':
                        productUrl = 'Nm272rst_male.html';
                        break;
                }
            } else if (gender === 'female') {
                switch (cipo.model.toLowerCase()) {
                    // Female shoe URL mappings
                    case 'air force 1':
                        productUrl = 'Airforce1_female.html';
                        break;
                    case 'jordan 1':
                        productUrl = 'Jordan1_female.html';
                        break;
                    case 'huarache':
                        productUrl = 'Huarache_female.html';
                        break;
                    case 'superstar':
                        productUrl = 'Superstar_female.html';
                        break;
                    case 'gazelle':
                        productUrl = 'Gazelle_female.html';
                        break;
                    case 'alphaboost':
                        productUrl = 'Alphaboost_female.html';
                        break;
                    case 'ultraboost':
                        productUrl = 'Ultraboost_female.html';
                        break;
                    case 'samba':
                        productUrl = 'Samba_female.html';
                        break;
                    case 'old skool':
                        productUrl = 'Oldskool_female.html';
                        break;
                    case 'sk8 hi':
                        productUrl = 'Sk8hi_female.html';
                        break;
                    case 'chuck taylor':
                        productUrl = 'Chucktaylor_female.html';
                        break;
                    case 'run star hike':
                        productUrl = 'Runstarhike_female.html';
                        break;
                }
            } else {
                productUrl = 'max90og.html'; // Default URL for other cases
            }

            //console.log('Product URL:', productUrl);

            const priceHTML = `<p class="card-text">Ár: ${cipo.price} USD</p>`;

            const buyNowButton = `
            <a href="${productUrl}" class="btn btn-primary">Tovább</a>
            `;

            cipokHTML += `
                <div class="col-sm-4 mt-2">
                    <div class="card bg-dark text-white m-2 h-100">
                        <div class="aspect-ratio aspect-ratio-16x9 card-header">
                            <img src="${base64Image ? 'data:image/png;base64,' + base64Image : ''}" alt="${cipo.brand}" class="aspect-ratio-item img img-fluid rounded mx-auto d-block" style="object-fit: contain; max-height: 200px;">
                        </div>
                        <div class="card-body">
                            <h3>${cipo.brand}</h3>
                            <h5>${cipo.model}</h5>
                            ${priceHTML}
                            ${buyNowButton}
                        </div>
                    </div>
                </div>
            `;

        }

        const cipoListContainer = document.getElementById('cipo-list');
        if (cipoListContainer) {
            cipoListContainer.innerHTML = cipokHTML;
        } else {
            console.error('Element with ID "cipo-list" not found in the DOM.');
        }
    } catch (error) {
        console.error('Error fetching cipok:', error);
    }
}

function redirectTo(url) {
    window.location.href = url;
}

// Function to convert ArrayBuffer to base64
function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}

function attachSearchEventListener() {
    const searchInput = document.getElementById('search-input');

    if (searchInput) {
        // keresés
        document.getElementById('search-form').addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent form submission

            const searchInputValue = searchInput.value;

            // Make an AJAX request to your server with the search input
            fetch(`/search?query=${searchInputValue}`)
                .then(response => response.json())
                .then(data => {
                    // Handle the search results (data) as needed
                    console.log(data);
                    // Update your UI with the search results
                    displaySearchResults(data);
                })
                .catch(error => {
                    console.error('Error during search:', error);
                });
        });
    } else {
        console.error('Element with ID "search-input" not found in the DOM.');
    }
}
// ferfi/noi kulonbseg
function generateProductUrl(product) {
    const gender = product.gender.toLowerCase();
    const model = product.model.toLowerCase().replace(/\s/g, '');

    let productUrl;

    if (gender === 'male') {
        productUrl = `${model}_male.html`;
    } else if (gender === 'female') {
        productUrl = `${model}_female.html`;
    } else {
        productUrl = `default_product_url.html`; // Default URL for other cases
    }

    // Make sure to capitalize the first letter of the model
    productUrl = productUrl.charAt(0).toUpperCase() + productUrl.slice(1);

    console.log(`Generated URL for ${product.model} (${gender}): ${productUrl}`);

    return productUrl;
}


function displaySearchResults(results) {
    const cipoListContainer = document.getElementById('cipo-list');
    if (!cipoListContainer) {
        console.error('Element with ID "cipo-list" not found in the DOM.');
        return;
    }

    let cipokHTML = '<h1 class="mt-2 mb-2">Keresési eredmények</h1>';

    const genderFilter = getGenderFilter(); // Function to determine the current gender (e.g., female or male)

    console.log(`Gender Filter: ${genderFilter}`);

    results.forEach(result => {

        const resultGender = result.gender.toLowerCase();
        console.log(`Result Gender: ${resultGender}`); // Log the gender of each result

        if (result.gender.toLowerCase() === genderFilter) {
            const base64Image = result.image ? arrayBufferToBase64(result.image.data) : '';
            const productUrl = generateProductUrl(result);

            console.log(`Product URL for ${result.model} (${resultGender}): ${productUrl}`); // Log the generated product URL

            const buyNowButton = `
                <a href="${productUrl}" class="btn btn-primary">Tovább</a>
            `;

            cipokHTML += `
                <div class="col-sm-4 mt-2">
                    <div class="card bg-dark text-white m-2 h-100">
                        <div class="aspect-ratio aspect-ratio-16x9 card-header">
                            <img src="${base64Image ? 'data:image/png;base64,' + base64Image : ''}" alt="${result.brand}" class="aspect-ratio-item img img-fluid rounded mx-auto d-block" style="object-fit: contain; max-height: 200px;">
                        </div>
                        <div class="card-body">
                            <h3>${result.brand}</h3>
                            <h5>${result.model}</h5>
                            ${buyNowButton}
                        </div>
                    </div>
                </div>
            `;
        }
    });

    cipoListContainer.innerHTML = cipokHTML;
}

function getGenderFilter() {
    // Ha a url 'noi.html'-t tartalmaz akkor visszatéer 'female'- értékkel, ha 'ferfi.html'-t tartalmaz akkor visszatéer 'male'- értékkel 

    const pathName = window.location.pathname;
    const isMalePage = pathName.includes('ferfi.html');
    const isFemalePage = pathName.includes('noi.html');

    if (isMalePage) {
        console.log('Detected Gender: male');
        return 'male';
    } else if (isFemalePage) {
        console.log('Detected Gender: female');
        return 'female';
    } else {
        console.log('Detected Gender: unknown');
        return 'unknown';
    }
}

// cipő törlése
async function deleteShoes(id, gender) {
    const confirmed = confirm("Biztosan törölni szeretnéd?");

    if (!confirmed) {
        return;
    }

    const res = await fetch(`/shoes/${id}`, {
        method: "DELETE"
    });

    const data = await res.json();

    if (data.success) {
        alert("Sikeres törlés!");
    } else {
        alert("Hiba a törlés során!");
    }
}

// új cipő felvétele
async function createShoes() {
    const model = document.getElementById('model').value;
    const brand = document.getElementById('brand').value;
    const price = document.getElementById('price').value;
    const stock = document.getElementById('stock').value;
    const gender = document.getElementById('gender').value;
    const image = document.getElementById('image').files[0];

    // const formData = new FormData();
    // formData.append('model', model);
    // formData.append('brand', brand);
    // formData.append('image', image);

    const res = await fetch('/insert-shoe', {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ model, brand, price, stock, gender })
    });

    const data = await res.json();

    if (data.success) {
        alert('sikeres felvétel!');
    }
}

// új cipő felvétele
async function createShoes() {
    const model = document.getElementById('model').value;
    const brand = document.getElementById('brand').value;
    const price = document.getElementById('price').value;
    const stock = document.getElementById('stock').value;
    const gender = document.getElementById('gender').value;
    const image = document.getElementById('image').files[0];

    const reader = new FileReader();
    reader.readAsDataURL(image);

    reader.onloadend = async function () {
        const imageData = reader.result.split(',')[1]; // Get the base64 data after comma
        const data = {
            model,
            brand,
            price,
            stock,
            gender,
            image: imageData
        };

        const res = await fetch('/insert-shoe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const responseData = await res.json();

        if (responseData.success) {
            alert('Sikeres felvétel!');
        } else {
            alert('Hiba a felvétel során!');
        }
    };
}

// cipő szerkesztésének modal ablakának megjelenítése
async function modifyCipo(id) {
    const res = await fetch(`/shoes/${id}`);
    const data = await res.json();

    document.getElementById('editModel').value = data[0].model;
    document.getElementById('editBrand').value = data[0].brand;
    document.getElementById('editPrice').value = data[0].price;
    document.getElementById('editStock').value = data[0].stock;
    document.getElementById('editGender').value = data[0].gender;


    const modal = new bootstrap.Modal(document.getElementById('myModal'));
    const productID = document.getElementById('myModal');
    productID.setAttribute('data-productID', id);
    modal.show();
}

// cipő adatainak frissítése
async function updateShoesData() {
    const modalElements = document.getElementById('myModal');
    const id = modalElements.getAttribute('data-productID');
    const modal = bootstrap.Modal.getInstance(modalElements);

    const model = document.getElementById('editModel').value;
    const brand = document.getElementById('editBrand').value;
    const price = document.getElementById('editPrice').value;
    const stock = document.getElementById('editStock').value;
    const gender = document.getElementById('editGender').value;
    const image = document.getElementById('editImage').files[0];

    const reader = new FileReader();
    reader.readAsDataURL(image);

    reader.onloadend = async function () {
        const imageData = reader.result.split(',')[1]; // Get the base64 data after comma
        const data = {
            model,
            brand,
            price,
            stock,
            gender,
            image: imageData
        };

        const res = await fetch(`/shoes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const responseData = await res.json();

        if (responseData.success) {
            alert('Sikeres felvétel!');
            modal.hide();
        } else {
            alert('Hiba a felvétel során!');
        }
    };
}

// felhasználó törlése
async function deleteUser(userID) {
    const confirmed = confirm("Biztosan törölni szeretnéd?");

    if (!confirmed) {
        return;
    }

    const res = await fetch(`/deleteUser/${userID}`, {
        method: "DELETE",
        headers: {
            "content-type": "application/json"
        }
    });

    const data = await res.json();

    if (data.success) {
        alert('Sikeres törlés!');
        getUsers();
    } else {
        alert('Valami hiba történt!');
    }
}