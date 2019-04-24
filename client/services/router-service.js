const routes = {
    '/': {
        tag: 'digit-waterfall',
        title: 'Водопад',
    },
    '/radio': {
        tag: 'digit-radio',
        title: 'Радио',
    },
    '/graphics': {
        tag: 'digit-graphics',
        title: 'Инфографика',
    },
    '/comparisons': {
        tag: 'digit-comparisons',
        title: 'Сравнения',
    },
};

export class Router
{
    constructor(outlet, nav)
    {
        this.outlet = outlet;
        this.nav = nav;
        this.links = nav.querySelectorAll('.link');
    }

    follow(link)
    {
        if ( ! routes[link]) link = '/';

        this.links.forEach(el => el.className = 'link');
        this.outlet.setAttribute('route', routes[link].tag);

        this.nav.querySelector(`[data-link="${link}"]`)
            .classList.add('active');

        // Пока второй аргумент pushState не поддерживается бразуерами
        document.title = routes[link].title;

        history.pushState(null, null, link);
    }
}
