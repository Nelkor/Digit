import { connect, disconnect } from '../services/digit-service.js';

const template =
`
<style>
    canvas {
        width: 100%;
        height: 100%;
        background-color: #fbb;
    }
</style>
<canvas width="1110" height="1000"></canvas>
`;

const side = 100;
const gap = 10;

export class DigitGraphics extends HTMLElement
{
    constructor()
    {
        super();
        this.shadow_root = this.attachShadow({ mode: 'open' });
    }

    connectedCallback()
    {
        this.shadow_root.innerHTML = template;

        const canvas = this.shadow_root.querySelector('canvas');
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = '#804139';

        const observer = desired => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < 10; i++) {
                const left = i * side + (i + 1) * gap;
                const digit = desired[i];

                for (let j = 0; j < digit; j++) {
                    const bottom = canvas.height - (j * side) - (j + 1) * gap;
                    const top = bottom - side;

                    ctx.fillRect(left, top, side, side);
                }
            }
        };

        this.con_index = connect(observer);
    }

    disconnectedCallback()
    {
        disconnect(this.con_index);
    }
}
