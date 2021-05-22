let perPage = 6;
let urlPosts = `https://jkmzd.eu/blog-api/wp-json/wp/v2/posts?page=1&per_page=${perPage}&_embed`;
const postsContainer = document.querySelector(".posts-container");
const moreButton = document.getElementById("see-more-button");
 
// API call for posts page

async function getPosts() {

    try {

    const response = await fetch(urlPosts);

    const json = await response.json();

    console.log(json);
    
    postsContainer.innerHTML = "";

    for (let i = 0; i < json.length; i++) {


        // Only 6 firsts posts goes into this container.

   
        postsContainer.innerHTML += `
                                    <a href="post-page.html?id=${json[i].id}">
                                    <div class="post-card">
                                    <img src="${json[i]._embedded["wp:featuredmedia"][0].media_details.sizes.large.source_url}" alt="${json[i]._embedded["wp:featuredmedia"][0].alt_text}"/>
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

// Listener on More Posts button.

moreButton.addEventListener("click", () => {

    perPage += 6;
    urlPosts = `https://jkmzd.eu/blog-api/wp-json/wp/v2/posts?page=1&per_page=${perPage}&_embed`;
    getPosts();

    if (perPage >= 12) {

        moreButton.style.display = "none";

    }

});

getPosts();