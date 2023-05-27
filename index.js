document.addEventListener("DOMContentLoaded", fetchData);

let api = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";
let apiData = [];


// function for fetching api data
async function fetchData() {
    try {
        const response = await fetch(api);
        const data = await response.json();
        apiData = data;
        render(apiData);
    } catch (error) {
        alert(error);
        console.log(error);
    }
}

// function for Rendering Data
let render = (data) => {
    let container = document.getElementById("data-container");
    container.innerHTML = "";

    data.forEach((ele) => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td class="logo-name"><img src="${ele.image}" alt="image"> ${ele.name}</td>
            <td>${ele.symbol}</td>
            <td>$${ele.current_price}</td>
            <td>$${ele.total_volume}</td>
            <td id="${ele.symbol}-price">${ele.price_change_percentage_24h}%</td>
            <td>Mkt Cap: ${ele.market_cap}</td>`;

        if (ele.price_change_percentage_24h < 0) {
            row.querySelector(`#${ele.symbol}-price`).classList.add("red");
        } else {
            row.querySelector(`#${ele.symbol}-price`).classList.add("green");
        }

        container.appendChild(row);
    });
}

// function for searching data

let searchData = () => {
    let input = search_input.value;
    let search_output = apiData.filter((ele) => {
        return ele.name.toLowerCase().includes(input) || ele.name.toLowerCase().includes(input);;
    });
    render(search_output);
}

let search_input = document.getElementById("search");
search_input.addEventListener("input", searchData);

// function for sorting

function sortByMarketCap() {
    const sortedData = apiData.sort((a, b) => b.market_cap - a.market_cap);
    render(sortedData);
}

function sortByPercentage() {
    const sortedData = apiData.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
    render(sortedData);
}

document.getElementById("sort-mkt-cap").addEventListener("click", sortByMarketCap);
document.getElementById("sort-by-percentage").addEventListener("click", sortByPercentage);
