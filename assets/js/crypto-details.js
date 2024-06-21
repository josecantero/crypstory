
const apiNewsUrl = 'https://data-api.cryptocompare.com/asset/v1/data/by/symbol?asset_symbol=BTC';

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
    cryptoPrice.innerHTML = "$"+Number(data.Data.PRICE_USD).toFixed(2);
    pageTitle.innerHTML = data.Data.URI.toUpperCase();
    webSite.setAttribute("href", data.Data.WEBSITE_URL);
    whitepaper.setAttribute("href", data.Data.WHITE_PAPER_URL);
    blog.setAttribute("href", data.Data.BLOG_URL);
    let date = new Date(data.Data.LAUNCH_DATE * 1000).toLocaleDateString('en-US');
    launchDate.innerHTML = date;
    consensusMechanism.innerHTML = data.Data.CONSENSUS_MECHANISMS[0].NAME

})
.catch(error => {
    console.error('Error:', error);
});
