
let params = new URLSearchParams(location.search);
var contract = params.get('coin');
const apiNewsUrl = 'https://data-api.cryptocompare.com/asset/v1/data/by/symbol?asset_symbol='+contract;

let cryptoName = document.getElementById("crypto-name");
let cryptoFullName = document.getElementById("crypto-full-name");
let cryptoLogo = document.getElementById("crypto-logo");
let cryptoPrice = document.getElementById("crypto-price");
let pageTitle = document.getElementsByTagName("title");
let webSite = document.getElementById("website");
let whitepaper = document.getElementById("white-paper");
let blog = document.getElementById("blog");
let launchDate = document.getElementById("launch-date");
let consensusMechanism = document.getElementById("consensus-mechanisms");


// Make a GET request
fetch(apiNewsUrl)
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
})
.then(data => {
    console.log(data);
    console.log(data.Data.URI.toUpperCase());
    
    cryptoLogo.setAttribute("src",data.Data.LOGO_URL);
    cryptoFullName.innerHTML = data.Data.NAME.charAt(0).toUpperCase() + data.Data.NAME.slice(1);
    cryptoName.innerHTML = data.Data.SYMBOL.toUpperCase();
    if(Number(data.Data.PRICE_USD) >= 1){
        cryptoPrice.innerHTML = "$"+Number(data.Data.PRICE_USD).toFixed(2);
    }else{
        cryptoPrice.innerHTML = "$"+Number(data.Data.PRICE_USD).toFixed(8);
    }
    
    pageTitle.innerHTML = data.Data.URI.toUpperCase();
    webSite.setAttribute("href", data.Data.WEBSITE_URL);
    whitepaper.setAttribute("href", data.Data.WHITE_PAPER_URL);
    blog.setAttribute("href", data.Data.BLOG_URL);
    let date = new Date(data.Data.LAUNCH_DATE * 1000).toLocaleDateString('en-US');
    launchDate.innerHTML = date;
    consensusMechanism.innerHTML = data.Data.CONSENSUS_MECHANISMS[0].NAME

    console.log(contract);

})
.catch(error => {
    console.error('Error:', error);
});
