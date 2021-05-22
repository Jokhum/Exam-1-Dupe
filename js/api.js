const url = "https://jkmzd.eu/blog-api/wp-json/wp/v2/";

const postContainer = document.querySelector(".post-container");
const buttonPrevious = document.querySelector("#prev-arrow-cont");
const buttonNext = document.querySelector("#next-arrow-cont");
const noResults = document.querySelector(".empty-results");
let offset = 0;

// Fixed results on screen at once by media width.

function validateWidth() {
    if (window.innerWidth <= 1024) {
        return 1;
    }

    if (window.innerWidth >= 1025) {
        return 5;
    }

}
validateWidth();

console.log(validateWidth);

// API call

async function getPosts(url) {


    try {

    let length = validateWidth();

    const response = await fetch(url + `posts?per_page=${length}&offset=${offset}&_embed`);

    const json = await response.json();

    console.log(json);

    // Button Visibility Criteria

    if (offset === 0) {

        buttonPrevious.style.display = "none";

    } else {

        buttonPrevious.style.display = "block";

    }

    if (json.length < 1 && window.innerWidth <= 1024) {

        buttonNext.style.display = "none";
        noResults.style.display = "block";

    }
    
    else if (json.length < 5 && window.innerWidth >= 1025) {

        buttonNext.style.display = "none";

    } else {
        
        noResults.style.display = "none";

        buttonNext.style.display = "block";

    }

    // Remove Loader etc.

    postContainer.innerHTML = "";

    // Add HTML to each post.

    for (let i = 0; i < json.length; i++) {
        
        postContainer.innerHTML += `
                                    <a href="post-page.html?id=${json[i].id}">
                                    <div class="post-card">
                                    <div class="card-image-container">
                                    <img src="${json[i]._embedded["wp:featuredmedia"][0].media_details.sizes.large.source_url}" alt="${json[i]._embedded["wp:featuredmedia"][0].alt_text}"/>   
                                    </div>
                                    <span class="card-publish-date">
                                    Posted: ${json[i].date.split("T")[0]}
                                    </span>                                                               
                                    <div class="post-card-title">
                                    <h2>${json[i].title.rendered}</h2>
                                    </div>
                                    <div class="card-content">
                                    ${json[i].content.rendered}
                                    </div>                                   
                                    <div class="bottom-gradient-card">
                                    </div>
                                    </div>
                                    </a>
                                    `;
    }

    } catch (error) {
        console.log(error);
    }
}



getPosts(url);

// Eventlisteners for my carousel arrows.

buttonPrevious.addEventListener("click", () => {

    if (windowSize.matches) {

        offset -= 1;

    } else {
        offset -=5;
    }

    getPosts(url);
});

buttonNext.addEventListener("click", () => {

    if (windowSize.matches) {

        offset += 1;

    } else {
        offset +=5;
    }

    getPosts(url);
});




