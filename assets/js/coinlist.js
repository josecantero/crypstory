// Define the API URL
        let coinIds = [];
        let tcoins = document.getElementById('tcoins');

        //console.log(tcoins);
        const apiUrl = 'https://min-api.cryptocompare.com/data/top/totalvolfull?limit=100&tsym=USD';

        // Make a GET request
        fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            for(coinRank = 0; coinRank <= 99; coinRank++){
                //console.log(data.Data[coinRank].CoinInfo.FullName);
                let row = tcoins.lastElementChild.insertRow(coinRank);

                let cellNum = row.insertCell(0);
                let cellName = row.insertCell(1);
                let cellPrice = row.insertCell(2);

                //console.log(data.Data[coinRank].CoinInfo.FullName); 
                cellNum.innerHTML = coinRank + 1;
                
                let logo = "<a href=\"coindetails.html?coin="+data.Data[coinRank].CoinInfo.Name+"\">"+"<img class=\"materialboxed\" width=\"35\" src=\"https://www.cryptocompare.com/" + data.Data[coinRank].CoinInfo.ImageUrl + "\"/></a>";
                let name = "<b><span class=\"cgray\">"+data.Data[coinRank].CoinInfo.Name+"</span></b><br>";
                let fullName = "<span><b>"+data.Data[coinRank].CoinInfo.FullName+"</b></span>";
                
                cellName.innerHTML = "<div class=\"container\"><div class=\"row\"><div class=\"col\">" + logo + "</div><div class=\"col\">" + name +  fullName + "</div></div></div>";
                
                if(data.Data[coinRank].RAW){
                    if(Number(data.Data[coinRank].RAW.USD.PRICE)>=1){
                        cellPrice.innerHTML = "<span class=\"f-large\"><b>$ "+Number(data.Data[coinRank].RAW.USD.PRICE).toFixed(3)+"</b></span>";
                    }else{
                        cellPrice.innerHTML = "<span class=\"f-large\"><b>$ "+Number(data.Data[coinRank].RAW.USD.PRICE).toFixed(8)+"</b></span>";
                    }
                    
                }else{
                    cellPrice.innerHTML = "No data available";
                }
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
