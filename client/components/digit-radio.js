import { connect, disconnect } from '../services/digit-service.js';

const template =
`
<style>
    .digit {
        color: #ccc;
        background-color: #eee;
    }

    .pos_0 {
        color: #090;
        font-weight: bold;
        background-color: #6f6;
    }

    .pos_1 { color: #191; background-color: #7f7; }
    .pos_2 { color: #292; background-color: #8f8; }
    .pos_3 { color: #393; background-color: #9f9; }
    .pos_4 { color: #494; background-color: #afa; }
    .pos_5 { color: #595; background-color: #bfb; }
    .pos_6 { color: #696; background-color: #cfc; }
    .pos_7 { color: #797; background-color: #dfd; }
    .pos_8 { color: #898; background-color: #efe; }
    .pos_9 { color: #999; background-color: #fff; }
</style>
<div id="wrapper">
    <div class="digit">0</div>
    <div class="digit">1</div>
    <div class="digit">2</div>
    <div class="digit">3</div>
    <div class="digit">4</div>
    <div class="digit">5</div>
    <div class="digit">6</div>
    <div class="digit">7</div>
    <div class="digit">8</div>
    <div class="digit">9</div>
</div>
`;

export class DigitRadio extends HTMLElement
{
    constructor()
    {
        super();
        this.shadow_root = this.attachShadow({ mode: 'open' });
    }

    connectedCallback()
    {
        this.shadow_root.innerHTML = template;

        const digits = this.shadow_root.querySelectorAll('.digit');

        const observer = desired => {
            desired = desired.slice(0, 10);
            digits.forEach(el => el.className = 'digit');

            const values = [];

            desired.forEach((value, index) => {
                if (values.includes(value)) return;
                values.push(value);

                digits[value].classList.add(`pos_${index}`);
            });
        };

        this.con_index = connect(observer);
    }

    disconnectedCallback()
    {
        disconnect(this.con_index);
    }
}
