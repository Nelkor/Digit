import { Router } from './services/router-service.js';

import { DigitWaterfall } from './components/digit-waterfall.js';
import { DigitRadio } from './components/digit-radio.js';
import { DigitGraphics } from './components/digit-graphics.js';
import { DigitComparisons } from './components/digit-comparisons.js';
import { RouterOutlet } from './components/router-outlet.js';

customElements.define('digit-waterfall', DigitWaterfall);
customElements.define('digit-radio', DigitRadio);
customElements.define('digit-graphics', DigitGraphics);
customElements.define('digit-comparisons', DigitComparisons);
customElements.define('router-outlet', RouterOutlet);

const init = () => {
    const nav = document.querySelector('#nav');
    const outlet = document.querySelector('#router');
    const router = new Router(outlet, nav);

    router.follow(location.pathname);

    nav.addEventListener('click', e => {
        const target = e.target;
        const link = target.dataset.link;

        router.follow(link);
    });
};

document.addEventListener('DOMContentLoaded', init);
