// Define the API URL
//let coinIds = [];
imagen = "img";
title = "title";
description = "desc";

const apiNewsUrl = 'https://min-api.cryptocompare.com/data/v2/news/?lang=ES';

// Make a GET request
fetch(apiNewsUrl)
.then(response => {
    if (!response.ok) {
    throw new Error('Network response was not ok');
    }
    return response.json();
})
.then(data => {
    
    
    for(index = 0; index < 4; index++){
       
        let tit = document.getElementById(title+(index+1));
        tit.innerHTML = data.Data[index].title;
        let desc = document.getElementById(description+(index+1));
        desc.innerHTML = data.Data[index].body;
    }
    
  

    
                
        
        
     
    //console.log(slider);
})
.catch(error => {
    console.error('Error:', error);
});


