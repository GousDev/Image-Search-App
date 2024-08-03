const accesskey="ImcKgAZp4NtN3jvyeJbmfIyy_li7vk34-tHFXsBTz0k";

const srch_input=document.getElementById("search-input");
const searchEl=document.querySelector("form");
const searchResults=document.querySelector(".s-results");
const showMore=document.getElementById("show-more");

let inputdata="";
let page=1;

 async function searchimage(){
    inputdata=srch_input.value;

    const url=`https://api.unsplash.com/search/photos?page=${page}&query=${inputdata}&client_id=${accesskey}`;

    if(page === 1){
        searchResults.innerHTML="";
    }
    const response=await fetch(url);
    const data=await response.json();
    const results=data.results;
    console.log(data);

    results.map((result)=>{
        const imageDiv=document.createElement('div');
        imageDiv.classList.add("s-result");

        const image=document.createElement('img');
        image.src=result.urls.small;
        image.alt=result.alt_description;
        image.style.height="250px";

        const imagelink=document.createElement('a');
        imagelink.href=result.links.html;
        imagelink.target="_blank";
        imagelink.textContent=result.alt_description;

        imageDiv.appendChild(image);
        imageDiv.appendChild(imagelink);
        searchResults.appendChild(imageDiv);
    });

    page++;
    if(page > 1){
        showMore.style.display="block";
    }
}

searchEl.addEventListener("submit",(e)=>{
    e.preventDefault();
    page=1;
    searchimage();
});

showMore.addEventListener("click",(e)=>{
    e.preventDefault();
    searchimage();
});