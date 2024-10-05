window.onload = function() {
    // document.getElementById('btn').style.backgroundColor = 'blue';
}


// Fetch,load and show categories on html 

// load categories start

const loadCategories= () =>{
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res)=>res.json())
    .then((data)=>displayCategories(data.categories))
    .catch((error)=>console.log(error));

}

// load categories end
// load ategory videos start
function loadCategoryVideos(id){
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((response)=>response.json())
    .then((data)=>displayVideo(data.category))
    .catch((error)=>console.log(error))
}

// load ategory videos end

// fetch and display categories start

const displayCategories=(categories)=>{
    const categryContainer=document.getElementById("categories");
    categories.forEach((item)=>{
        // console.log(item.category)

        //  display category button
        const buttonContainer=document.createElement("button");
        buttonContainer.innerHTML=`
        <button onclick="loadCategoryVideos(${item.category_id})" class="btn">${item.category}</button>
        `
        categryContainer.appendChild(buttonContainer);
        
    })

}

loadCategories();
// fetch and display category end


// time calculation

function calculateTime(time){
     const hour=parseInt(time/3600);
     const hourRemainder=time%3600;
     const minute=parseInt(hourRemainder/60);
     return `${hour} hours ${minute} minutes ago`

}

// display all video

const loadVideo = () =>{
    fetch(" https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((response)=>response.json())
    .then((data)=>displayVideo(data.videos))
    .catch((error)=>console.log(error))

}

loadVideo();


const displayVideo= (videos) =>{

    const videoContainer=document.getElementById("displayVideo");
    videoContainer.innerHTML="";

    if(videos.length==0){
        videoContainer.classList.remove("grid");
        videoContainer.innerHTML=`
        <div class="min-h-[500px] screen flex flex-col gap-5 justify-center items-center">
        <img src="assets/icon.png">
        <p class="text-center text-xl font-bold">NO CONTENT HERE</p>
        <div>
        `;

    }else{
        videoContainer.classList.add("grid"); 
    }
    videos.forEach((video)=>{
        // console.log(video);
        const card=document.createElement("div");
        card.classList="card card-compact  shadow-xl";
        card.innerHTML= `
<figure class="h-[200px] relative">
    <img class="h-full w-full object-cover"
      src=${video.thumbnail}
      alt="Shoes" />
      ${
        video.others.posted_date?.length === 0?""
        :`<span class="absolute right-2 bottom-2 bg-black text-white rounded-xl p-2 text-xs">
        ${calculateTime(video.others.posted_date)}
       </span>
  
        `
      }
 </figure>

  <div class="px-0 py-2 flex gap-2">
  <div class="mr-2">
  <img class="h-10 w-10 rounded-full object-cover" src=${video.authors[0].profile_picture}>
  </div>
  <div>
  <h1 class="font-bold ">${video.title}</h1>
  <div class="flex items-center gap-1">
  <p class="text-gray-400">${video.authors[0].profile_name}</p>
  ${video.authors[0].verified ? `<img class="h-4 w-4" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png" />` : ''}
  </div> 
  </div> 
  </div>

 <div class="ml-14 pb-4 text-gray-400">
   <p>${video.others.views}  views</p>
  </div>
  
  `

  videoContainer.appendChild(card);


    })

}



// Button all redirect


const btnAll=document.getElementById("btnAll");

btnAll.addEventListener("click",function(){
    window.location.href = "index.html";

})

