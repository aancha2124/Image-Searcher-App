
let accessKey =`Z6syCxjTQRF-tngvSJKmhW1OY2jbMmRlc7EoOlaZwNg`
let searchForm= document.querySelector("form");
let searchInput = document.querySelector(".form-control");
let imgContainer = document.querySelector(".img_container");
let btn = document.querySelector(".loadMore");
 
let page = 1
// function to fetch images using unsplash api
const fetchImages = async (query,pageNo) => {
      try {
        
      

    if(page==1){
  imgContainer.innerHTML ="";
    }
    
  let url =`https://api.unsplash.com/search/photos/?query=${query}&per_page=28&page=${pageNo}&client_id=${accessKey}`;

  const response = await fetch(url);
  const data1 =  await response.json();
  
  if(data1.results.length >0){
  data1.results.forEach(photo =>{
      // creating image div
       const imageElement = document.createElement('div');
        imageElement.classList.add('imageDiv');
       imageElement.innerHTML = `<img src="${photo.urls.regular}"/>`;
         // creating overlay
        const overlayElement = document.createElement('div');
        overlayElement.classList.add("overlay");

        // creating overlay text
        const overlayText = document.createElement('h3');
        overlayText.innerText = `${photo.alt_description}`;
        overlayElement.appendChild(overlayText);

        imageElement.appendChild(overlayElement);

        imgContainer.appendChild(imageElement);
  });
  if(data1.total_pages ==pageNo)
  {
    btn.style.display = "none";
  }
  else
  {
    btn.style.display = "block";
  }
  
}
else
{
   imgContainer.innerHTML="<h2> No Images to be found</h2>";
   btn.style.display = "none";
}
} catch (error) {
    imgContainer.innerHTML="<h2>failed to fetch images.please try again later </h2>"    ;
}

}

searchForm.addEventListener('submit',(e) => {
     e.preventDefault();
    let data = searchInput.value.trim();
    if(data != '')
    {
         page = 1;
       fetchImages(data,page);
    }
    else
    {
        imgContainer.innerHTML = "<h2>write something </h2>";
    }
}
);


btn.addEventListener('click',(e) => {
  fetchImages(searchInput.value.trim(), ++page);
}
);