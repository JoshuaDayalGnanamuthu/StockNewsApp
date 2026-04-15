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
    document.getElementById("newsHeader").innerHTML = "MARKET NEWS" + " ~ " + ticker;
    const container = document.getElementById("newsBody");
    const newsCount = document.getElementById("newsCount");
    newsCount.innerHTML = Object.keys(news).length + " " + "News Articles"
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
    loadAnalysis(ticker);
    loadStockInfo(ticker);
    const textbox = document.getElementById("searchInput");
    textbox.value = ticker;
}

async function doSearch() {
    const ticker = document.getElementById("searchInput").value;
    loadNews(ticker);
    loadAnalysis(ticker);
    loadStockInfo(ticker);
}

async function getStockQuotes(ticker="SPY") {
    const response = await fetch(`/quote/${ticker}`)
    return await response.json();

}

async function getCryptoQuotes(symbol="BTCUSDT") {
    const response = await fetch(`/crypto/${symbol}`)
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
}

async function loadCrypto(ticker="BTC") {
    const id = "idx-" + ticker;
    const data = await getCryptoQuotes();
    const index_card = document.getElementById(id);
    const index_price = index_card.getElementsByClassName("index-price")[0];
    const index_change = index_card.getElementsByClassName("index-change")[0];
    const change = data["c"][-1] - data["o"][-1];

    if (change > 0) {
        index_change.className = "index-change positive";
        symbol = "▲ +";
    } else if (change < 0) {
        index_change.className = "index-change negative";
        symbol = "▼ -";
    } else {
        index_change.className = "index-change neutral";
        symbol = "▶  ";
    }
    index_price.innerHTML = `$ ${data["c"][-1]}`;
    index_change.innerHTML = `${symbol}${change}`;
}

async function getAIanalysis(ticker="SPY") {
    const response = await fetch(`/analysis/${ticker}`)
    return await response.json();
}

async function loadAnalysis(ticker="SPY") {
    document.getElementById("aiTicker").innerText = ticker;
    const container = document.getElementById("aiBody");
    container.innerHTML = `
                        <div class="placeholder-state">
                            <div class="placeholder-icon">Loading AI Analysis....</div>
                            <p>AI generated market analysis and investment insights</p>
                        </div>`
    const data = await getAIanalysis(ticker);
    

    container.innerHTML = `
                <div style="padding: 8px 4px;"> Google Gemini ~ Flash
                    
                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
                        <span style="font-size: 18px; font-weight: 800; color: white; letter-spacing: 2px;">${ticker}</span>
                        <span style="
                            padding: 3px 10px;
                            border-radius: 20px;
                            font-size: 11px;
                            font-weight: 700;
                            letter-spacing: 1px;
                            text-transform: uppercase;
                            background: ${( data.sentiment.toLowerCase().includes('bull') || data.sentiment.toLowerCase().includes('positive') )? 'rgba(0,255,100,0.15)' : 
                                        (data.sentiment.toLowerCase().includes('bear') || data.sentiment.toLowerCase().includes('negative')) ? 'rgba(255,60,60,0.15)' : 
                                        'rgba(255,200,0,0.15)'};
                            color: ${(data.sentiment.toLowerCase().includes('bull') || data.sentiment.toLowerCase().includes('positive') ) ? '#00ff64' : 
                                    (data.sentiment.toLowerCase().includes('bear') || data.sentiment.toLowerCase().includes('negative')) ? '#ff4444' : 
                                    '#ffc800'};
                            border: 1px solid ${(data.sentiment.toLowerCase().includes('bull') || data.sentiment.toLowerCase().includes('positive') ) ? 'rgba(0,255,100,0.3)' : 
                                                (data.sentiment.toLowerCase().includes('bear') || data.sentiment.toLowerCase().includes('negative')) ? 'rgba(255,60,60,0.3)' : 
                                                'rgba(255,200,0,0.3)'};
                        ">${data.sentiment}</span>
                    </div>

                    <p style="color: rgba(255,255,255,0.85); font-size: 13px; line-height: 1.6; margin-bottom: 16px;">
                        ${data.summary}
                    </p>

                    <div style="border-top: 1px solid rgba(255,255,255,0.08); padding-top: 12px;">
                        <div style="font-size: 10px; letter-spacing: 2px; color: rgba(255,255,255,0.4); margin-bottom: 8px;">KEY METRICS</div>
                        ${data.key_metrics.map(metric => `
                            <div style="
                                display: flex;
                                align-items: flex-start;
                                gap: 8px;
                                padding: 5px 0;
                                border-bottom: 1px solid rgba(255,255,255,0.05);
                                font-size: 12px;
                                color: rgba(255,255,255,0.75);
                            ">
                                <span style="color: rgba(100,220,255,0.7); margin-top: 1px;">▸</span>
                                ${metric}
                            </div>
                        `).join("")}
                    </div>

                </div>
            `;
}

async function getCompanyInformation(ticker="SPY") {
    response = await fetch(`/company/${ticker}`);
    return await response.json();  
}

async function getFinancialInformation(ticker="SPY") {
    response = await fetch(`/financials/${ticker}`);
    return await response.json(); 
}

async function loadStockInfo(ticker="SPY") {
    const container = document.getElementById("stockBody");
    container.innerHTML = `
                        <div class="placeholder-state">
                            <div class="placeholder-icon">Loading Stock Info....</div>
                            <p>earch for a stock to get price data, latest market news, and an AI generated analysis</p>
                        </div>`
    const quote = await getStockQuotes(ticker);
    const finance = await getFinancialInformation(ticker);
    const compinfo = await getCompanyInformation(ticker);
    document.getElementById("marketStatus").innerHTML = ticker;
    const priceChange = quote.dp > 0;
    const priceFlat = quote.dp === 0;
    const priceColor = priceFlat ? '#ffc800' : priceChange ? '#00ff64' : '#ff4444';
    const priceArrow = priceFlat ? '▶' : priceChange ? '▲' : '▼';
    const priceSign  = priceChange ? '+' : '';

    container.innerHTML = `
                            <div style="padding: 8px 4px;">
                                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
                                    <div>
                                        <div style="font-size: 22px; font-weight: 800; color: white; letter-spacing: 2px;">${ticker}</div>
                                        <div style="font-size: 11px; color: rgba(255,255,255,0.4); letter-spacing: 1px;">${compinfo.name || ""}</div>
                                    </div>
                                    <div style="text-align: right;">
                                        <div style="font-size: 22px; font-weight: 700; color: white;">$${quote.c}</div>
                                        <div style="
                                            font-size: 12px; font-weight: 600;
                                            color: ${priceColor};
                                        ">
                                            ${priceArrow} ${priceSign}${quote.d} (${quote.dp}%)
                                        </div>
                                    </div>
                                </div>
                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 16px;">
                                    ${[
                                        ["OPEN",    `$${quote.o}`],
                                        ["CLOSE",   `$${quote.pc}`],
                                        ["HIGH",    `$${quote.h}`],
                                        ["LOW",     `$${quote.l}`],
                                    ].map(([label, value]) => `
                                        <div class="stock-info" style="
                                            background: rgba(255,255,255,0.04);
                                            border: 1px solid rgba(255,255,255,0.07);
                                            border-radius: 8px;
                                            padding: 10px 12px;
                                        ">
                                            <div style="font-size: 9px; letter-spacing: 2px; color: rgba(255,255,255,0.35); margin-bottom: 4px;">${label}</div>
                                            <div style="font-size: 14px; font-weight: 600; color: white;">${value}</div>
                                        </div>
                                    `).join("")}
                                </div>
                                <div style="border-top: 1px solid rgba(255,255,255,0.08); padding-top: 12px;">
                                    <div style="font-size: 10px; letter-spacing: 2px; color: rgba(255,255,255,0.4); margin-bottom: 8px;">COMPANY INFO</div>
                                    ${[
                                        ["Industry",    compinfo.finnhubIndustry],
                                        ["Exchange",    compinfo.exchange],
                                        ["Market Cap",  compinfo.marketCapitalization ? `$${(compinfo.marketCapitalization / 1000).toFixed(1)}B` : "—"],
                                        ["Country",     compinfo.country],
                                    ].map(([label, value]) => `
                                        <div style="
                                            display: flex;
                                            justify-content: space-between;
                                            padding: 5px 0;
                                            border-bottom: 1px solid rgba(255,255,255,0.05);
                                            font-size: 12px;
                                        ">
                                            <span style="color: rgba(255,255,255,0.4);">${label}</span>
                                            <span style="color: rgba(255,255,255,0.85);">${value || "—"}</span>
                                        </div>
                                    `).join("")}
                                </div>
                                <div style="border-top: 1px solid rgba(255,255,255,0.08); padding-top: 12px; margin-top: 12px;">
                                    <div style="font-size: 10px; letter-spacing: 2px; color: rgba(255,255,255,0.4); margin-bottom: 8px;">FINANCIALS</div>
                                    ${[
                                        ["52W High",  `$${finance.metric?.["52WeekHigh"] || "—"}`],
                                        ["52W Low",   `$${finance.metric?.["52WeekLow"] || "—"}`],
                                        ["P/E Ratio", finance.metric?.peBasicExclExtraTTM?.toFixed(2) || "—"],
                                        ["EPS",       finance.metric?.epsTTM?.toFixed(2) || "—"],
                                        ["Beta",      finance.metric?.beta?.toFixed(2) || "—"],
                                    ].map(([label, value]) => `
                                        <div style="display: flex; justify-content: space-between; padding: 5px 0; border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 12px;">
                                            <span style="color: rgba(255,255,255,0.4);">${label}</span>
                                            <span style="color: rgba(255,255,255,0.85);">${value}</span>
                                        </div>
                                    `).join("")}
                                </div>
                            </div>
    `
}

window.onload = function () {
    loadNews("SPY");
    loadAnalysis("SPY");
    loadStockInfo("SPY");
    loadTickers("SPY");
    loadTickers("QQQ");
    loadTickers("DIA");
    loadTickers("TLT");
};

loadNews()
updateClock();
setInterval(updateClock, 1000);
setInterval(loadNews, 1000000);
setInterval(loadTickers, 100000, "SPY");
setInterval(loadTickers, 100000, "QQQ");
setInterval(loadTickers, 100000, "DIA");
setInterval(loadTickers, 100000,  "TLT");

