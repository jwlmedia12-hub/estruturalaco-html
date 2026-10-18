/*
 * Portfólio em estilo single page:
 * - filtra as categorias sem recarregar a página
 * - cada categoria tem sua URL (portifolio.html#ginasios, #piscina...)
 * - botões voltar/avançar do navegador funcionam entre categorias
 */
(function () {
    var DEFAULT = 'todos';
    var buttons = document.querySelectorAll('.portfolio-filter [data-filter]');
    var blocks = document.querySelectorAll('.portfolio-category');
    if (!buttons.length || !blocks.length) return;

    var valid = [DEFAULT];
    blocks.forEach(function (b) { valid.push(b.getAttribute('data-category')); });

    function current() {
        var hash = window.location.hash.replace('#', '');
        return valid.indexOf(hash) !== -1 ? hash : DEFAULT;
    }

    function show(category, scroll) {
        buttons.forEach(function (btn) {
            var active = btn.getAttribute('data-filter') === category;
            btn.classList.toggle('active', active);
            btn.setAttribute('aria-selected', active ? 'true' : 'false');
        });

        blocks.forEach(function (block) {
            var visible = category === DEFAULT || block.getAttribute('data-category') === category;
            block.hidden = !visible;
            if (visible) {
                block.classList.remove('is-entering');
                void block.offsetWidth; // reinicia a animação
                block.classList.add('is-entering');
            }
        });

        if (scroll) {
            var nav = document.querySelector('.portfolio-filter');
            var top = nav.getBoundingClientRect().top + window.pageYOffset - 110;
            window.scrollTo({ top: top, behavior: 'smooth' });
        }
    }

    buttons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var category = btn.getAttribute('data-filter');
            if (category === current()) return;
            history.pushState(null, '', category === DEFAULT ? window.location.pathname : '#' + category);
            show(category, true);
        });
    });

    window.addEventListener('popstate', function () { show(current(), true); });

    // vindo de um link com categoria (ex.: index.html -> portifolio.html#escadas), rola até a galeria
    show(current(), current() !== DEFAULT);
})();
