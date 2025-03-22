class GoogleAnalytics extends HTMLElement {
  connectedCallback() {
    const GA_ID = this.getAttribute("id") || 'G-K2NQX2ZNM2';

    // 动态加载 GA
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);

    // 初始化 GA
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }

    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", GA_ID);
  }
}

customElements.define("g-analytics", GoogleAnalytics);

class SiteMenu extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
  <ul id="nav">
    <li title="Stock Average Calculator">
      <a href="./index.html">
        <i class="fas fa-tachometer-alt"></i>Stock Average Calculator
      </a>
    </li>
    <!-- <li title="Stock Profit Calculator">
      <a href="./stock-profit-calculator.html">
        <i class="fas fa-chart-line"></i>Stock Profit/Loss Calculator
      </a>
    </li>
    <li title="SIP Calculator">
      <a href="./systematic-Investment-plan-calculator.html">
        <i class="fas fa-coins"></i>SIP Calculator
      </a>
    </li>
    <li title="Percentage Calculator">
      <a href="./percentage-calculator.html">
        <i class="fas fa-percentage"></i>Percentage Calculator
      </a>
    </li>
    <li title="EMI Calculator">
      <a href="./emi-calculator.html">
        <i class="fas fa-wallet"></i>EMI Calculator
      </a>
    </li>
    <li title="CAGR calculator">
      <a href="./compound-annual-growth-rate-calculator.html">
        <i class="fas fa-mountain"></i>CAGR calculator
      </a>
    </li>
    <li title="SWP Calculator">
      <a href="./systematic-withdrawal-plan-calculator.html">
        <i class="fas fa-hand-holding-water"></i>SWP Calculator
      </a>
    </li>
    <li title="Stock Split Calculator">
      <a href="./stock-split.html">
        <i class="fas fa-chart-pie"></i>Stock Split Calculator
      </a>
    </li>
    <li title="Rule of 72 Calculator">
      <a href="./rule-of-72-calculator.html">
        <i class="fas fa-angle-double-up"></i>Rule of 72 Calculator
      </a>
    </li>
    <li title="Dividend Details">
      <a href="./indian-stock-market-dividend-details.html">
          <i class="fas fa-cubes"></i>
          Dividend Details 2023 - 2025 <img src="./images/new-icon.gif" height="35" width="35" />
      </a>
    </li>
    <li title="Bonus Details">
      <a href="./indian-stock-market-bonus-and-buyback-details.html">
        <i class="fas fa-search-dollar"></i>
        Bonus & Buyback Details
      </a>
    </li>
    <li title="Face Value Split Details">
      <a href="./indian-stock-market-face-value-and-demerger.html">
        <i class="fas fa-cut"></i>
        Face value split & Demerger
      </a>
    </li>
    <li title="holiday Calender 2025">
      <a href="./indian-equity-market-holiday-calender-2025.html">
        <i class="far fa-calendar-alt"></i>
        Trading Holidays 2025 <img src="./images/new-icon.gif" height="35" width="35" />
      </a>
    </li> -->
    <li title="About Us">
      <a href="./about-us.html">
        <i class="fas fa-user-friends"></i>About Us
      </a>
    </li>
  </ul>
`;
  }
}

// 注册 Web Component
customElements.define("s-menu", SiteMenu);

class SiteFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="mb-2">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-4 text-center social-share-icons">
              <a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Faverage-calculator.github.io"
                class="btn btn-primary btn-sm"><i class="fab fa-facebook-f"></i></a>
              <a href="https://twitter.com/intent/tweet?url=https%3A%2F%2Faverage-calculator.github.io"
                class="btn btn-info btn-sm"><i class="fab fa-twitter"></i></a>
              <a href="whatsapp://send?text=https%3A%2F%2Faverage-calculator.github.io"
                class="btn btn-success btn-sm"><i class="fab fa-whatsapp"></i></a>
              <a href="https://www.instagram.com/?url=https%3A%2F%2Faverage-calculator.github.io"
                class="btn btn-danger btn-sm"><i class="fab fa-instagram"></i></a>
            </div>
          </div>
        </div>
      </footer>
    `;
  }
}

// 注册 Web Component
customElements.define("ft-share", SiteFooter);
