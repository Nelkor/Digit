import { connect, disconnect } from '../services/digit-service.js';

const template =
`
<style>
    .digit {
    }
</style>
<div id="wrapper"></div>
`;

export class DigitWaterfall extends HTMLElement
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
            desired = desired.slice(0, 10);
            wrapper.innerHTML = '';

            desired.forEach(digit => {
                wrapper.innerHTML += `<div class="digit">${digit}</div>`;
            });
        };

        this.con_index = connect(observer);
    }

    disconnectedCallback()
    {
        disconnect(this.con_index);
    }
}
