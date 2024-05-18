document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('searchbtn');
    const clearBtn = document.getElementById('clearbtn');
    const searchInput = document.getElementById('searchinput');
    const resultDiv = document.getElementById('Result');
    const bookNowBtn = document.getElementById('bookNowBtn');
    const contactForm = document.getElementById('contactForm');

    searchBtn.addEventListener('click', handleSearch);
    clearBtn.addEventListener('click', clearSearch);
    bookNowBtn.addEventListener('click', bookNow);
    contactForm.addEventListener('submit', submitContactForm);

    function handleSearch() {
        const query = searchInput.value.trim().toLowerCase();
        resultDiv.innerHTML = '';

        if (query) {
            fetch('travel_destinations.json')
                .then(response => response.json())
                .then(data => {
                    const results = [];

                    data.countries.forEach(country => {
                        country.cities.forEach(city => {
                            if (city.name.toLowerCase().includes(query) ||
                                country.name.toLowerCase().includes(query)) {
                                results.push(city);
                            }
                        });
                    });

                    data.temples.forEach(temple => {
                        if (temple.name.toLowerCase().includes(query)) {
                            results.push(temple);
                        }
                    });

                    data.beaches.forEach(beach => {
                        if (beach.name.toLowerCase().includes(query)) {
                            results.push(beach);
                        }
                    });

                    if (results.length > 0) {
                        results.forEach(item => {
                            displayResult(item);
                        });
                    } else {
                        resultDiv.innerHTML = 'No results found.';
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    resultDiv.innerHTML = 'An error occurred while fetching data.';
                });
        } else {
            resultDiv.innerHTML = 'Please enter a destination or keyword to search.';
        }
    }

    function displayResult(item) {
        const resultContainer = document.createElement('div');
        resultContainer.classList.add('resultvalues');

        const title = document.createElement('p');
        title.classList.add('resulttitle');
        title.textContent = item.name;

        const img = document.createElement('img');
        img.classList.add('resultimg');
        img.src = item.imageUrl;
        img.alt = item.name;

        const description = document.createElement('p');
        description.classList.add('resultdescription');
        description.textContent = item.description;

        resultContainer.appendChild(title);
        resultContainer.appendChild(img);
        resultContainer.appendChild(description);

        resultDiv.appendChild(resultContainer);
    }

    function clearSearch() {
        searchInput.value = '';
        resultDiv.innerHTML = '';
    }

    function bookNow() {
        alert('Booking feature coming soon!');
    }

    function submitContactForm(event) {
        event.preventDefault();
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        if (name && email && message) {
            alert('Thank you for contacting us!');
            contactForm.reset();
        } else {
            alert('Please fill out all fields.');
        }
    }
});
