// $( function() {

    var sidenav = new OwnSidenav();
    sidenav.checksWindowWidth();
    sidenav.listenToggleButton();
    sidenav.listenWindowWidth();

    function OwnSidenav()
    {
        /**
         * Self Class.
         *
         * @type object
         */
        var self = this;

        /**
         * Width of sidenav mini, calculated by:
         * own-sidenav{ padding } + own-sidenav-links a{ padding } + own-sidenav-links .material-icons{ width }
         *
         * @type string
         */
        var widthSidenavMini = '70px';

        /**
         * Duration of sidenav transitions in milliseconds.
         *
         * @type int
         */
        var transitionsDuration = 200;

        /**
         *
         *
         * @type object
         */
        var main = $( '.main' );

        /**
         * jQuery element of sidenav.
         *
         * @type object
         */
        var sidenav = $( '.own-sidenav' );

        /**
         * Sidenav width.
         *
         * @type int
         */
        var sidenavWidth = sidenav.outerWidth();

        /**
         * jQuery element of sidenav toggle button.
         *
         * @type object
         */
        var toggleButton = $( '#btn-toggle-own-sidenav' );

        /**
         * jQuery element of collapsible headers.
         *
         * @type object
         */
        var collapsibleHeaders = sidenav.find( '.collapsible-header' );

        /**
         * jQuery element of collapsible bodies.
         *
         * @type object
         */
        var collapsibleBodys = sidenav.find( '.collapsible-body' );

        /**
         * jQuery elements shown on sidenav mini.
         *
         * @type object
         */
        var shownItensSidenavMini = $( '.shown-own-sidenav-mini' );

        /**
         * jQuery elements hidden on sidenav mini.
         *
         * @type object
         */
        var hiddenItensSidenavMini = $( '.hidden-own-sidenav-mini' );

        /**
         * Sidenav state controller.
         *
         * @type bool
         */
        var sidenavIsOpen = true;

        /**
         * Checks window width.
         *
         * @return void
         */
        this.checksWindowWidth = function()
        {
            var initialWindowWidth = window.outerWidth;
            if ( initialWindowWidth > 992 ) {
                self.showSidenav();
                sidenavIsOpen = true;
            } else {
                self.hideSidenav( 0 );
                sidenavIsOpen = false;
            }
        };

        /**
         * Listen the sidenav toggle button.
         *
         * @return void
         */
        this.listenToggleButton = function()
        {
            toggleButton.on( 'click', function() {
                var currentWindowWidth = window.outerWidth;

                if ( currentWindowWidth > 992 ) {

                    if ( ! sidenav.hasClass( 'own-sidenav-mini' ) ) {
                        sidenav.addClass( 'own-sidenav-mini' );
                        self.addSidenavMiniStyle();

                    } else {
                        sidenav.removeClass( 'own-sidenav-mini' );
                        self.removeSidenavMiniStyle();
                    }

                } else {

                    if ( ! sidenavIsOpen ) {
                        sidenav.animate({ marginLeft: '0' }, transitionsDuration );
                        main.animate({ marginLeft: sidenavWidth + 'px' }, transitionsDuration );

                        sidenavIsOpen = true;
                    } else {
                        sidenav.animate({ marginLeft: '-' + sidenavWidth + 'px' }, transitionsDuration );
                        main.animate({ marginLeft: '0' }, transitionsDuration );

                        sidenavIsOpen = false;
                    }
                }
            });
        };

        /**
         * Add sidenav mini styles.
         *
         * @return void
         */
        this.addSidenavMiniStyle = function()
        {
            self.addCollapsiblesStyle();

            hiddenItensSidenavMini.fadeOut( transitionsDuration, function() {
                shownItensSidenavMini.fadeIn( transitionsDuration );
                sidenav.animate({ width: widthSidenavMini }, transitionsDuration );
                main.animate({ marginLeft: widthSidenavMini }, transitionsDuration );
            });
        };

        /**
         * Remove sidenav mini styles.
         *
         * @return void
         */
        this.removeSidenavMiniStyle = function()
        {
            self.removeCollapsiblesStyle();

            main.animate({ marginLeft: sidenavWidth + 'px' }, transitionsDuration );
            sidenav.animate({ width: sidenavWidth + 'px' }, transitionsDuration, function() {
                shownItensSidenavMini.hide( 0 );
                hiddenItensSidenavMini.fadeIn( transitionsDuration );
            });
        };

        /**
         * Add collapsibles styles.
         *
         * @return void
         */
        this.addCollapsiblesStyle = function()
        {
            collapsibleHeaders.parent().addClass( 'parent-collapsible-header' );

            // Close all collapsibles
            collapsibleHeaders.removeClass( 'active' );
            collapsibleBodys.hide( 0 );

            // Add listener for close sidenavMini collapsibles when click on his links
            collapsibleBodys.on( 'click', 'a', function( event ) {
                var parentOfCollapsible = $( this ).parent().parent().parent();

                parentOfCollapsible.removeClass( 'active' );
                parentOfCollapsible.find( '.collapsible-header' ).removeClass( 'active' );
                parentOfCollapsible.find( '.collapsible-body' ).hide( 0 );
            });
        };

        /**
         * Remove collapsibles styles.
         *
         * @return void
         */
        this.removeCollapsiblesStyle = function()
        {
            collapsibleHeaders.parent().removeClass( 'parent-collapsible-header' );
            collapsibleBodys.off( 'click', 'a' ); // Turn off listener sidenavMini collapsibles
        };

        /**
         * Listen the window width.
         *
         * @return void
         */
        this.listenWindowWidth = function()
        {
            $( window ).bind( 'resize', function() {

                if ( this.outerWidth > 992 && ! sidenav.hasClass( 'own-sidenav-mini' ) ) {
                    self.showSidenav();
                    sidenavIsOpen = true;
                }

                if ( this.outerWidth <= 992 ) {

                    if ( ! sidenav.hasClass( 'own-sidenav-mini' )  ) {
                        self.hideSidenav();
                        sidenavIsOpen = false;

                    } else {
                        sidenav.removeClass( 'own-sidenav-mini' );
                        self.removeSidenavMiniStyle();
                        self.showSidenav();
                        sidenavIsOpen = true;
                    }
                }
            });
        };

        /**
         * Hide sidenav.
         *
         * @param  int transition
         *
         * @return void
         */
        this.hideSidenav = function( transition )
        {
            sidenav.animate({ 'marginLeft': '-' + sidenavWidth + 'px' }, ( transition ? transition : transitionsDuration ) );
            main.animate({ marginLeft: '0' }, transitionsDuration ).css({ width: '100%' });
        };

        /**
         * Show sidenav.
         *
         * @return void
         */
        this.showSidenav = function()
        {
            main.animate({ marginLeft: sidenavWidth + 'px' }, transitionsDuration ).css({ width: 'auto' });
            sidenav.animate({ 'marginLeft': '0' }, transitionsDuration );
        };
    }
// });