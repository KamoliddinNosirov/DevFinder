const body = document.querySelector(".body")
const loader = document.querySelector(".loader")
const moon = document.querySelector("#moon")
const sun = document.querySelector("#sun")


var dark = localStorage.getItem("dark")

if (dark == "true") {
    body.classList.add("active")
} else {
    body.classList.remove("active")
}

const mode = () => {
    if (dark == "true") {
        body.classList.remove("active");
        localStorage.setItem("dark", "false");
        dark = "false";
    } else {
        body.classList.add("active");
        localStorage.setItem("dark", "true");
        dark = "true";
    }
}

moon.addEventListener("click", mode)
sun.addEventListener("click", mode)

// Links HTML

const btn = document.querySelector("#searchbtn")
const input = document.querySelector("#inputid")
const block = document.querySelector("#blockid")
const form = document.querySelector("form")


var apiLink = `https://api.github.com/users/octocat`

const  getData = async (apiLink) => {
    loader.classList.add("active")
    const req = await fetch(apiLink)
    const data = await req.json()
    writeData(data);
    loader.classList.remove("active")
}

form.addEventListener("submit", (e) => {
    e.preventDefault()
    apiLink = `https://api.github.com/users/${input.value}`
     getData(apiLink)
     input.value = ""
})

getData(apiLink)

const writeData = (data) => {
        if(data.message == "Not Found"){
            block.innerHTML = `<h1 style="text-align: center;">Bunday foydalanuvchi mavjud emas!</h1>`
        }else{
            block.innerHTML = `
        <div class="cards">
                    <img src="${data.avatar_url}" alt="">
                    <div class="info">
                        <h2>${data.name}</h2>
                        <a href="">@${data.login}</a>
                        <p>${data.bio}</p>
                    </div>
                    <p class="ptag">${data.created_at.slice(0, 10)}</p>
                    <p id="modalptag">${data.bio}</p>
                </div>
                <div class="boxs">
                    <div class="box">
                        <p>Repos</p>
                        <span>${data.public_repos}</span>
                    </div>
                    <div class="box">
                        <p>Followers</p>
                        <span>${data.followers}</span>
                    </div>
                    <div class="box">
                        <p>Following</p>
                        <span>${data.following}</span>
                    </div>
                </div>
                <div class="links">
                    <ul>
                        <li><a href=""><i class="fa-solid fa-location-dot"></i>${data.location.slice(0, 28)}</a></li>
                        <li><a id="atag" href=""><i class="fa-solid fa-link"></i>${data.blog.slice(0, 22)}</a></li>
                    </ul>
                    <ul>
                        <li><a href=""><i class="fa-brands fa-twitter"></i>${data.twitter_username}</a></li>
                        <li><a id="atag" href=""><i class="fa-solid fa-city"></i>${data.company.slice(0, 18)}...</a></li>
                    </ul>
                </div>
        `
        }
}
