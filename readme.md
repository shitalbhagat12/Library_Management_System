## Library Management System: Refined Code & Improvements

This implementation aims for a more user-friendly and functional library experience. Here's a breakdown of the code and key improvements:

**index.html (Homepage):**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Free Online Library</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header class="header">
        <div class="navbar-left">
            <img src="logo.jpeg" alt="Logo" class="navbar-logo">
            <div class="logo">Free Online Library</div>
        </div>
        <div class="nav">
            <a href="Login.html"><button class="btn">Log In</button></a>
            <a href="Login.html"><button class="btn">Sign Up</button></a>
        </div>
    </header>

    <div class="container">
        <div class="slide">
            <div class="item" style="background-image: url(https://media-cache-ak0.pinimg.com/originals/9d/53/0f/9d530ff5ee3031af2d95b62e86f3fa61.jpg);">
                <div class="content">
                    <div class="name">Explore New Worlds</div>
                    <div class="des">Discover a universe of books at your fingertips, ready to be explored.</div>
                </div>
            </div>
            <div class="item" style="background-image: url(https://5.imimg.com/data5/SELLER/Default/2021/9/UM/SB/PD/133456484/sapiens-a-brief-history-of-humankind-paperback.jpg);">
                <div class="content">
                    <div class="name">Sapiens: A Brief History</div>
                    <div class="des">A captivating journey through human history and evolution.</div>
                </div>
            </div>
            </div>
        </div>
        <div class="button">
            <button class="prev"><i class="fa-solid fa-arrow-left"></i></button>
            <button class="next"><i class="fa-solid fa-arrow-right"></i></button>
        </div>
    </div>

    <footer>
        <div class="footerBottom">
            <p>Copyright &copy; 2024; Designed by <span class="designer">Team</span></p>
        </div>
    </footer>

    <script src="script.js"></script>
</body>
</html>
```

**Changes:**

- **Clearer Title:** Changed the title to "Free Online Library" for better context.
- **Concise Homepage:** Simplified the homepage to focus on attracting new users.
- **Footer Structure:**  Used `div.footerBottom` for better organization.
- **Removed Unnecessary CSS Links:** Removed the link to `library.css` as it's not used on the homepage.

**library.html (Main Library Page):**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Library Management</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="stylesheet" href="library.css">
</head>
<body id="body">
    <nav class="navbar">
        <div class="navbar-left">
            <img src="logo.jpeg" alt="Logo" class="navbar-logo">
            <span class="navbar-text">Library Management</span>
        </div>
        <div class="navbar-search">
            <input type="text" placeholder="Search books..." id="searchInput" class="navbar-search-input">
            <button onclick="searchBooks()" class="navbar-search-button"><i class="fas fa-search"></i></button>
        </div>
        <div class="navbar-genres">
            <button class="navbar-genres-button" onclick="toggleGenresDropdown()">Genres</button>
            <div id="genresDropdown" class="navbar-genres-dropdown" style="display: none;">
                <ul>
                    </ul>
            </div>
        </div>
    </nav>

    <div class="custom-container">
        <div class="custom-left-div">
            <div class="user-profile">
                <div class="user-profile-icon"><span>👤</span></div>
                <div id="username" class="user-profile-name">John Doe</div>
            </div>
            <h1>Browse Genres</h1>
            <ul id="genreList"> </ul>
        </div>
        <div class="custom-right-div" id="welcome-section">
            <h2 id="custom-right-heading">Welcome to Our Library</h2>
            <div id="custom-card-grid" class="custom-card-grid"> </div>
            <button id="viewMoreButton" class="view-more-button" onclick="viewMoreBooks()" style="display: none;">View
                More</button>
        </div>
    </div>

    <script src="library.js"></script> </body>
</html>
```

**Changes:**

- **Simplified Genre Navigation:** Moved genre list to the left sidebar for better visibility and user experience.
- **Dynamic Genre Loading:** Removed hardcoded genres and added `id="genreList"` to dynamically populate them.
- **Cleaner Initial Content:**  Removed repeated genre lists and displayed a generic welcome message. 

**library.js (JavaScript for Library Page):**

```javascript
const apiKey = "YOUR_GOOGLE_BOOKS_API_KEY"; 
let startIndex = 0;
let currentCategory = '';

// Function to toggle the genres dropdown
function toggleGenresDropdown() {
    const dropdown = document.getElementById('genresDropdown');
    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
}

// Function to fetch and display genres
function fetchGenres() {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=subject&key=${apiKey}&maxResults=10`)
        .then(response => response.json())
        .then(data => {
            const genres = new Set(); // Using a Set to avoid duplicate genres
            data.items.forEach(item => {
                if (item.volumeInfo.categories) {
                    item.volumeInfo.categories.forEach(category => genres.add(category));
                }
            });
            displayGenres([...genres]); // Convert Set back to array for display
        })
        .catch(error => console.error('Error fetching genres:', error));
}

// Function to display genres in the sidebar
function displayGenres(genres) {
    const genreList = document.getElementById('genreList');
    genres.forEach(genre => {
        const li = document.createElement('li');
        li.textContent = genre;
        li.onclick = () => fetchBooks(genre, genre); // Fetch books on genre click
        genreList.appendChild(li);
    });
}

// Function to search for books
function searchBooks() {
    const query = document.getElementById('searchInput').value;
    if (query) {
        startIndex = 0;
        fetchBooks(query, query + ' Books');
    }
}

// Event listener for the 'Enter' key in the search bar
document.getElementById('searchInput').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        searchBooks();
    }
});

// Function to fetch books from the Google Books API
function fetchBooks(category, displayCategory) {
    // ... (rest of your fetchBooks function remains the same)
}

// Function to update books in the UI
function updateBooks(books, displayCategory) {
    // ... (rest of your updateBooks function remains the same)
}

// Function to handle "View More" button click
function viewMoreBooks() {
    // ... (rest of your viewMoreBooks function remains the same)
}

// Function to toggle "View More" button visibility
function toggleViewMoreButton(show) {
    // ... (rest of your toggleViewMoreButton function remains the same)
}

// Retrieve the logged-in username from localStorage
const loggedInUser = localStorage.getItem("loggedInUser");

// Display the username in the designated element
if (loggedInUser) {
    document.getElementById("username").textContent = loggedInUser;
} else {
    // Redirect to the login page if no user is logged in
    window.location.href = "login.html";
}

// Fetch and display genres on page load
fetchGenres();
```

**Changes:**

- **Genre Fetching:** Added `fetchGenres` to retrieve genre data dynamically from Google Books API.
- **Genre Display:** Created `displayGenres` to populate the sidebar with fetched genres.
- **Click Handlers:** Added `onclick` handlers to genres to trigger `fetchBooks`.
- **Simplified Code:** Removed redundant `toggleDropdown` function.

**Login.html:**

- No changes needed in this file.

**login.css:**

- No changes needed in this file.

**style.css:**

- No changes needed in this file.

**app.js:**

- No changes needed in this file.

**Key Improvements:**

- **Dynamic Genre Loading:** Makes the library more flexible and up-to-date with actual book categories.
- **Improved User Interface:** Offers a more intuitive browsing experience with genres readily accessible.
- **Cleaner Code:** Enhances readability and maintainability.
- **Google Books Integration:**  Allows users to directly access and potentially save books on Google Books. 

**Next Steps:**

1. **Implement Google Books "Add to Library" Functionality:**  Allow users to seamlessly add books to their Google Books libraries.
2. **Enhance Search:** Add filters for author, publication year, etc., for a more refined search experience.
3. **User Profiles:** Develop user profile pages to track reading history, favorites, and potentially recommendations.

Please replace `"YOUR_GOOGLE_BOOKS_API_KEY"` in `library.js` with your actual Google Books API key. 
