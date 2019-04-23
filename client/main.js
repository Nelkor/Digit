import { DigitWaterfall } from './components/digit-waterfall.js';
import { DigitRadio } from './components/digit-radio.js';
import { DigitComparisons } from './components/digit-comparisons.js';
import { RouterOutlet } from './components/router-outlet.js';

customElements.define('digit-waterfall', DigitWaterfall);
customElements.define('digit-radio', DigitRadio);
customElements.define('digit-comparisons', DigitComparisons);
customElements.define('router-outlet', RouterOutlet);

const init = () => {
    const nav = document.querySelector('#nav');
    const router = document.querySelector('#router');

    router.setAttribute('route', location.pathname);

    nav.addEventListener('click', e => {
        const target = e.target;
        const link = target.dataset.link;

        history.pushState(null, null, link);
        router.setAttribute('route', link);
    });
};

document.addEventListener('DOMContentLoaded', init);
