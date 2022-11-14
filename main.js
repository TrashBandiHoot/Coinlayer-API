
// I wanted to do more but I ran out of emails for api keys

const access_key = 'ba1a729687c4f6f8821f7f7f2e6f139b';
const baseUrl = 'http://api.coinlayer.com/api/';
const listUrl = baseUrl + 'list';
const liveUrl = baseUrl + 'live';

console.log('starting')
fetchCoins().then(coinDataDisplay).catch(console.error)
console.log('finished')
coins = []


function Crypto(name, supply, rate, icon) 
{
    this.name = name;
    this.supply = supply;
    this.rate = rate;
    this.icon = icon;
}




async function fetchCoins() 
{
    // Fetch coin data (symbol,name,supply,img)
let fetchedCoinData = await fetch(`${listUrl}?access_key=${access_key}`);
let jsonCoinData = await fetchedCoinData.json();
let coinData = jsonCoinData.crypto;

// Fetch rate data
let fetchedRateData = await fetch(`${liveUrl}?access_key=${access_key}`);
let jsonRateData = await fetchedRateData.json();
let rateData = jsonRateData.rates;

return [coinData, rateData];
}

function coinDataDisplay(data) 
{
    let tableBody = document.querySelector('tbody');
    let coinData = data[0];
    let rateData = data[1];

    for (key in coinData) 
    {
        coins.push(new Crypto(coinData[key].name, coinData[key]['max_supply'], rateData[key], coinData[key]['icon_url']));
        console.log(rateData[key])
        console.log('coins')
    }

    coins.forEach(coin => 
    {
        let tr = document.createElement('tr');
        let {name, supply, rate, icon} = coin;
        let imgTD = document.createElement('td'); 
        let img = document.createElement('img');
        img.src = icon; 
        img.width = 32; 
        imgTD.appendChild(img); 
        tr.appendChild(imgTD); 

        let nameTD = document.createElement('td');
        nameTD.innerText = name;
        tr.appendChild(nameTD);

        let supplyTD = document.createElement('td');
        supplyTD.innerText = supply;
        tr.appendChild(supplyTD);

        let rateTD = document.createElement('td');
        rateTD.innerText = rate;
        tr.appendChild(rateTD);
        console.log('coins2')

        tableBody.appendChild(tr);
    })
}


function myFunction() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }