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


window.onload = function () {
    loadNews("SPY");
};



loadNews()
updateClock();
setInterval(updateClock, 1000);
setInterval(loadNews, 1000000);

