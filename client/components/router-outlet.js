const routes = {
    '/': 'digit-waterfall',
    '/radio': 'digit-radio',
    '/comparisons': 'digit-comparisons',
};

const tags = tag => `<${tag}></${tag}>`;

export class RouterOutlet extends HTMLElement
{
    static get observedAttributes() {
        return ['route'];
    }

    constructor()
    {
        super();
        this.shadow_root = this.attachShadow({ mode: 'open' });
    }

    attributeChangedCallback(name, oldValue, newValue)
    {
        if ( ! routes[newValue]) newValue = '';

        this.shadow_root.innerHTML = tags(routes[newValue]);
    }
}
