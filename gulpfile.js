var elixir = require( 'laravel-elixir' );
elixir.config.assetsPath = 'build';

elixir( function( mix ) {

    /*
     |
     | Copies
     |
     */
    mix.copy( 'build/fonts', 'assets/fonts' );
    mix.copy( 'build/img', 'assets/img' );

    /*
     |
     | Sass
     |
     */
    mix.sass([
        // Materialize & Materialize Admin
        'all.scss'
    ], 'assets/css/materializeadmin.css' );

    /*
     |
     | Javascript
     |
     */
    mix.scripts([
        // Materialize Admin
        'materializeadmin/own-sidenav.js',
    ], 'assets/js/materializeadmin.js' );

    mix.scripts([
        // Materialize
        'materialize/initial.js',
        'materialize/jquery.easing.1.3.js',
        'materialize/animation.js',
        'materialize/velocity.min.js',
        'materialize/hammer.min.js',
        'materialize/jquery.hammer.js',
        'materialize/global.js',
        'materialize/collapsible.js',
        'materialize/dropdown.js',
        'materialize/modal.js',
        'materialize/materialbox.js',
        'materialize/parallax.js',
        'materialize/tabs.js',
        'materialize/tooltip.js',
        'materialize/waves.js',
        'materialize/toasts.js',
        // 'materialize/sideNav.js',
        'materialize/scrollspy.js',
        'materialize/forms.js',
        'materialize/slider.js',
        'materialize/cards.js',
        'materialize/chips.js',
        'materialize/pushpin.js',
        'materialize/buttons.js',
        'materialize/transitions.js',
        'materialize/scrollFire.js',
        'materialize/date_picker/picker.js',
        'materialize/date_picker/picker.date.js',
        'materialize/character_counter.js',
        'materialize/carousel.js',
    ], 'assets/js/materialize.js' );

    mix.scripts([
        // jQuery
        '../../node_modules/jquery/dist/jquery.min.js'
    ], 'assets/js/jquery.js' );
});