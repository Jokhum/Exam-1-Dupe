let perPage = 6;
let urlPosts = `https://jkmzd.eu/blog-api/wp-json/wp/v2/posts?page=1&per_page=${perPage}&_embed`;
const postsContainer = document.querySelector(".posts-container");
const moreButton = document.getElementById("see-more-button");
const searchBar = document.getElementById("searchBar");
let allPosts = [];

// Clear HTML 

const clearCards = () => {

    postsContainer.innerHTML = "";
    
    };

// API call for posts page

async function getPosts() {

    try {

    const response = await fetch(urlPosts);

    const posts = await response.json();

    return posts;

    } catch (error) {

        postsContainer.innerHTML += `<h2>An error has occured.</h2>`;
        return []

    }
};


// Create HTML for cards


const createCard = (posts) => {


    const htmlString = posts
        .map((post) => {

            return `
                <a href="post-page.html?id=${post.id}">
                <div class="post-card">
                <img src="${post._embedded["wp:featuredmedia"][0].media_details.sizes.large.source_url}" alt="${post._embedded["wp:featuredmedia"][0].alt_text}"/>
                <span class="card-publish-date">
                Posted: ${post.date.split("T")[0]}
                </span>                          
                <div class="post-card-title">
                <h2>${post.title.rendered}</h2>
                </div>
                <div class="card-content">
                ${post.content.rendered}
                </div>
                <div class="bottom-gradient-card">
                </div>
                </div>
                </a>
            `;
            })
            .join('');

        postsContainer.innerHTML = htmlString;

};

// Listener on More Posts button.

moreButton.addEventListener("click", () => {

    perPage += 6;
    urlPosts = `https://jkmzd.eu/blog-api/wp-json/wp/v2/posts?page=1&per_page=${perPage}&_embed`;

    init();

    if (perPage >= 12) {

        moreButton.innerHTML = "No more results.";

    }

});

// Runtime Method

async function init() {

    const allPosts = await getPosts();

// Search Bar

searchBar.addEventListener('keyup', (e) => {

    const searchString = e.target.value.toLowerCase();

    const filteredPosts = allPosts.filter((post) => {

        return (

            post.title.rendered.toLowerCase().includes(searchString) );

    });
 
    createCard(filteredPosts);

});


createCard(allPosts);

};

init();
