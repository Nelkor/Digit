import { connect, disconnect } from '../services/digit-service.js';

const template =
    `
<style>
    .digit {
    }

    .gt { color: #090; }
    .lt { color: #900; }
    .eq { color: #dd0; }
</style>
<div id="wrapper"></div>
`;

const compare = (a, b) => {
    if (a > b) return '<div class="gt">&gt;</div>';
    if (a < b) return '<div class="lt">&lt;</div>';

    return '<div class="eq">=</div>';
};

export class DigitComparisons extends HTMLElement
{
    constructor()
    {
        super();
        this.shadow_root = this.attachShadow({ mode: 'open' });
    }

    connectedCallback()
    {
        this.shadow_root.innerHTML = template;

        const wrapper = this.shadow_root.querySelector('#wrapper');

        const observer = desired => {
            wrapper.innerHTML = '';

            for (let i = 0; i < 10; i++) {
                wrapper.innerHTML += compare(desired[i], desired[i + 1]);
            }
        };

        this.con_index = connect(observer);
    }

    disconnectedCallback()
    {
        disconnect(this.con_index);
    }
}
