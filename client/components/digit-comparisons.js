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
        background-color: #ecebff;
    }

    #digits {
        width: 100rem;
        height: 20rem;
        display: flex;
    }

    #digits > div {
        width: 10rem;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: sans-serif;
        font-size: 10rem;
    }

    .gt { color: #090; }
    .lt { color: #900; }
    .eq { color: #dd0; }
</style>
<div class="wrapper">
    <div id="digits"></div>
</div>
`;

const compare = (a, b) => {
    if (a > b) return '<div class="gt">&gt;</div>';
    if (a < b) return '<div class="lt">&lt;</div>';

    return '<div class="eq">&equals;</div>';
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

        const digits = this.shadow_root.querySelector('#digits');

        const observer = desired => {
            digits.innerHTML = '';

            console.log(desired);

            for (let i = 0; i < 10; i++) {
                digits.innerHTML += compare(desired[i], desired[i + 1]);
            }
        };

        this.con_index = connect(observer);
    }

    disconnectedCallback()
    {
        disconnect(this.con_index);
    }
}
