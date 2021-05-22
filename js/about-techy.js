const aboutUrl = "https://jkmzd.eu/blog-api/wp-json/wp/v2/users/";

const aboutContainer = document.querySelector(".about-me-container");

async function getAuthor() {

    try {

    const response = await fetch(aboutUrl);

    const json = await response.json();


    console.log(json);


    aboutContainer.innerHTML = "";
    
        for (let i = 0; i < json.length; i++) {

            const techyName = json[i].name
            const techyDescript = json[i].description
            const techyImage = json[i].avatar_urls[24]
 
            aboutContainer.innerHTML += `
                                        <div class="techy-image-box"> 
                                        <img class="techy-image" src="${techyImage}">
                                        </div>
                                        <div class="techy-info-box">
                                        <h2 id="name">${techyName}</h2>
                                        <p class="description-tech">${techyDescript}.</p>
                                        <p>Thanks for watching my site.</p>
                                        </div>                                      
                                    `;
        }
    
        } catch (error) {

            console.log(error);

        }
}

getAuthor();
