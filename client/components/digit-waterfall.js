import { connect, disconnect } from '../services/digit-service.js';

const template =
`
<style>
    .wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #fdf6e0;
    }

    #digits {
        width: 100rem;
        height: 20rem;
        display: flex;
    }

    .digit {
        width: 10rem;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: sans-serif;
        font-size: 10rem;
        color: #444;
    }
</style>
<div class="wrapper">
    <div id="digits"></div>
</div>
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

        const digits = this.shadow_root.querySelector('#digits');

        const observer = desired => {
            desired = desired.slice(0, 10);
            digits.innerHTML = '';

            desired.forEach(digit => {
                digits.innerHTML += `<div class="digit">${digit}</div>`;
            });
        };

        this.con_index = connect(observer);
    }

    disconnectedCallback()
    {
        disconnect(this.con_index);
    }
}
