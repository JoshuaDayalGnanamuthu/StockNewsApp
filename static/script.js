// https://www.npmjs.com/package/finnhub (finnhub documentation

function updateClock() {
    const systemTime = new Date().toLocaleTimeString();
    document.getElementById('clock').textContent = systemTime;
}

async function getCompanyNews(ticker = "AAPL") {
    const response = await fetch(`/news/${ticker}`);
    const data = await response.json();
    return data;
}

async function loadNews(ticker = "AAPL") {
    const news = await getCompanyNews(ticker);
    const container = document.getElementById("newsBody");
    container.innerHTML = "";

    news.forEach(article => {
        container.innerHTML += `
            <div class="news-item">
                <h3>${article.headline}</h3>
                <h4>Source: ${article.source}</h4>
                <a href="${article.url}" target="_blank">Read More</a>
                <p>${article.summary}</p>
            </div>
        `;
    });
}

async function searchStock(ticker) {
    loadNews(ticker);
    const textbox = document.getElementById("searchInput");
    textbox.value = ticker;
}

async function doSearch() {
    const ticker = document.getElementById("searchInput").value;
    loadNews(ticker);
}

async function getStockQuotes(ticker="SPY") {
    const response = await fetch(`/quote/${ticker}`)
    return await response.json();

}


async function loadTickers(ticker="SPY") {
    const id = "idx-" + ticker;
    const data = await getStockQuotes(ticker);
    const index_card = document.getElementById(id);
    const index_price = index_card.getElementsByClassName("index-price")[0];
    const index_change = index_card.getElementsByClassName("index-change")[0];

    if (data.dp > 0) {
        index_change.className = "index-change positive";
        symbol = "▲ +";
    } else if (data.dp < 0) {
        index_change.className = "index-change negative";
        symbol = "▼ -";
    } else {
        index_change.className = "index-change neutral";
        symbol = "▶  ";
    }
    index_price.innerHTML = `$ ${data.c}`;
    index_change.innerHTML = `${symbol}${data.d}`;
    // <div class="index-price">-</div>
    // <div class="index-change">Loading...</div>
}

window.onload = function () {
    loadNews("SPY");
    loadTickers("SPY");
    loadTickers("QQQ");
    loadTickers("DIA");
    loadTickers("BTC");
};



loadNews()
updateClock();
setInterval(updateClock, 1000);
setInterval(loadNews, 1000000);
setInterval(loadTickers, 100000, "SPY");
setInterval(loadTickers, 100000, "QQQ");
setInterval(loadTickers, 100000, "DIA");
setInterval(loadTickers, 100000, "BTC");

