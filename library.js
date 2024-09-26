
const apiKey = "AIzaSyAYlD0MXFtLsMonDeYVgiy8EJjZmpBDo9A"; // Replace with your actual Google Books API key
let startIndex = 0; // Initialize start index for pagination
let currentCategory = ''; // Store the current category for fetching more books



//****************** For Genres*******************
function toggleGenresDropdown() {
    const dropdown = document.getElementById('genresDropdown');
    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
}

function toggleDropdown(dropdownId) {
    const dropdowns = ['fictionGenres', 'nonFictionGenres', 'childrenGenres', 'otherGenres'];

    dropdowns.forEach(id => {
        const dropdown = document.getElementById(id);
        if (id === dropdownId) {
            dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
        } else {
            dropdown.style.display = 'none';
        }
    });
}



// Function to search books
function searchBooks() {
    const query = document.getElementById('searchInput').value;
    if (query) {
        startIndex = 0; // Reset start index for a new search
        fetchBooks(query, query + ' Books');
    }
}

// Event listener for the 'Enter' key
document.getElementById('searchInput').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        searchBooks();
    }
});

// Function to fetch books from Google Books API
function fetchBooks(category, displayCategory) {
    const genresDropdown = document.getElementById('genresDropdown');
    genresDropdown.style.display = 'none';
    const customRightDiv = document.querySelector('.custom-right-div');
    customRightDiv.style.backgroundImage = 'none'; // Remove background image when books are loaded
    const customRightHeading = document.getElementById('custom-right-heading');
    customRightHeading.textContent = `Loading books...`; // Optional loading text

    // Store current category for loading more books
    currentCategory = category;

    // Fetch books from the Google Books API
    const url = `https://www.googleapis.com/books/v1/volumes?q=${category}&key=${apiKey}&startIndex=${startIndex}&maxResults=12`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            updateBooks(data.items, displayCategory);
            toggleViewMoreButton(data.totalItems > startIndex + 9); // Show button if more books are available
        })
        .catch(error => console.error('Error fetching books:', error));

}

// Function to update books in the UI
function updateBooks(books, displayCategory) {
    const customRightHeading = document.getElementById('custom-right-heading');
    const customCardGrid = document.querySelector('.custom-card-grid');

    if (startIndex === 0) {
        // Clear previous book cards only if it's a new search
        customCardGrid.innerHTML = '';
    }

    // Update heading to show the clicked category name
    customRightHeading.textContent = `${displayCategory} Books`;

    // Loop through the books and create new book cards
    books.forEach(book => {
        const bookInfo = book.volumeInfo;

        // Create a new div element for the book card
        const cardDiv = document.createElement('div');
        cardDiv.className = 'custom-card';

        // Create an image element for the book cover
        const bookCover = document.createElement('img');
        bookCover.src = bookInfo.imageLinks ? bookInfo.imageLinks.thumbnail : 'https://via.placeholder.com/128x192?text=No+Image';
        bookCover.alt = bookInfo.title;

        // Create an h3 element for the book title
        const bookTitle = document.createElement('h3');
        bookTitle.textContent = bookInfo.title;

        // Create a p element for the author's name
        const bookAuthor = document.createElement('p');
        bookAuthor.textContent = bookInfo.authors ? `Author: ${bookInfo.authors.join(', ')}` : 'Author: Unknown';
        bookAuthor.style.fontStyle = 'italic'; // Optional: style to differentiate author name

        // Create a p element for the publication year
        const bookYear = document.createElement('p');
        bookYear.textContent = bookInfo.publishedDate ? `Published: ${bookInfo.publishedDate.split('-')[0]}` : 'Published: N/A';
        bookYear.style.fontSize = '14px'; // Optional: smaller font for less emphasis

        // Create a p element for the book description
        const bookDescription = document.createElement('p');
        bookDescription.textContent = bookInfo.description ? bookInfo.description.substring(0, 100) + '...' : 'No description available';

        // Create a button element
        const readMoreButton = document.createElement('button');
        readMoreButton.textContent = 'Read More';
        readMoreButton.onclick = () => window.open(bookInfo.infoLink, '_blank');

        // Append all elements to the card div
        cardDiv.appendChild(bookCover);
        cardDiv.appendChild(bookTitle);
        cardDiv.appendChild(bookAuthor);
        cardDiv.appendChild(bookYear);
        cardDiv.appendChild(bookDescription);
        cardDiv.appendChild(readMoreButton);

        // Append the card div to the card grid
        customCardGrid.appendChild(cardDiv);
    });
}

// Function to handle "View More" button click
function viewMoreBooks() {
    startIndex += 9; // Increment the start index to load more books
    fetchBooks(currentCategory, currentCategory + ' Books');
}

// Function to toggle "View More" button visibility
function toggleViewMoreButton(show) {
    const viewMoreButton = document.getElementById('viewMoreButton');
    viewMoreButton.style.display = show ? 'block' : 'none';
}

function toggleDropdown(id) {
    const dropdown = document.getElementById(id);
    const displayStyle = dropdown.style.display;

    // Hide all dropdowns first
    const allDropdowns = document.querySelectorAll('ul[id$="Genres"]');
    allDropdowns.forEach(dd => dd.style.display = 'none');

    // Toggle the selected dropdown
    dropdown.style.display = displayStyle === 'none' ? 'block' : 'none';
}

// Retrieve the logged-in username from localStorage
const loggedInUser = localStorage.getItem("loggedInUser");

// Display the username in the designated element
if (loggedInUser) {
    document.getElementById("username").textContent = loggedInUser;
} else {
    // Redirect to login page if no user is logged in
    window.location.href = "login.html";
}
document.addEventListener('click', function (event) {
    const genresDropdown = document.getElementById('genresDropdown');
    const genresButton = document.querySelector('.navbar-genres-button');

    // Check if the click was outside the dropdown and the button
    if (!genresDropdown.contains(event.target) && !genresButton.contains(event.target)) {
        genresDropdown.style.display = 'none';
    }
});

function toggleGenresDropdown() {
    const dropdown = document.getElementById('genresDropdown');
    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
}

