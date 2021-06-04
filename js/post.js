const postPage = document.querySelector(".single-post");

const pageHeading = document.querySelector(".site-title");

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

const pageUrl = "https://jkmzd.eu/blog-api/wp-json/wp/v2/posts/" + id + `?_embed`;



// API call for individual posts.

async function getPostInfo() {

    try {

    const response = await fetch(pageUrl);
    const postInfo = await response.json();
    
    createHtml(postInfo);

    }
    catch(error) {

        postPage.innerHTML = "An error has occurred.";

    }
}

getPostInfo();


// Create HTML for the Post Individual Page.


function createHtml(postInfo) {
    
    const postTitle = postInfo.title.rendered;
    const postDate = postInfo.date.split("T")[0];
    const postImage = postInfo._embedded["wp:featuredmedia"][0].media_details.sizes.large.source_url;
    const postImageAlt = postInfo._embedded["wp:featuredmedia"][0].alt_text;
    const postAuthor = postInfo._embedded["author"][0].name;
    const postContent = postInfo.content.rendered;
    document.title = postTitle;
    const siteHeader = document.querySelector(".site-title")

    try {

    siteHeader.innerHTML = ` <div class="post-title">${postTitle}</div>`;


    postPage.innerHTML = `  <div class="page-container">
                            <div class="image-text-container">
                            <img id="featured-image" src="${postImage}" alt="${postImageAlt}">
                            <div class="date-author-text"><span class="info" id="author">Article by: ${postAuthor}</span> <span class="info" id="date">Posted: ${postDate}</span></div>
                            </div>
                            <div class="post-content">
                             ${postContent}
                             </div>
                            </div>
                            <div id="modal-container" class="modal-cont">
                            <div class="modal-content">
                            <div class="close-modal" id="exit-modal"><i class="fas fa-times" id="exit-btn"></i></div>
                            <img id="toggled-modal" src="${postImage}" alt="${postImageAlt}">
                            </div>
                            </div>
                            <div class="back-btn-container">
                            <button class="go-back" id="go-back-btn">Go back</button>
                            </div`;

    }

    catch(error) {

        postPage.innerHTML = "An error has occurred."

    }
}

// Go back button & Modal Code

getPostInfo().then(() => {

    const goBack = document.querySelector("#go-back-btn");

    goBack.addEventListener("click", function() {
    
        window.history.back();

    })

    // Modal Listener

    const modalImg = document.getElementById("featured-image");
    const modalContainer = document.getElementById("modal-container");
    const exitModal = document.getElementById("exit-btn");

    // Clickevent on modal image.

    modalImg.addEventListener("click", () => {

    modalContainer.style.display = "flex";

})

    // Making sure the modal exits if clicking outside of it.

    window.onclick = (event) => {

        if (event.target == modalContainer) {

            modalContainer.style.display = "none";

    }
}

    // Exiting the modal by using the "X".

    exitModal.onclick = () => {

        modalContainer.style.display = "none";

}});


// Modal Listener

