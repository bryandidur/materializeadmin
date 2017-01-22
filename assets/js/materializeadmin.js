(function( $ ) {

    var methods = {
        init: function( options )
        {
            options = $.extend({
                main: $( '.main' ),                          // jQuery element of main content.
                transitionsDuration: 200,                    // Duration of sidenav transitions in milliseconds.
                toggleButton: $( '#btn-toggle-own-sidenav' ) // jQuery element of sidenav toggle button.
            }, options );

            return $( this ).each( function() {
                var widthSidenavMini = '70px';                                  // Width of sidenav mini, calculated by: own-sidenav{ padding } + own-sidenav-links a{ padding } + own-sidenav-links .material-icons{ width }
                var sidenav = $( this );                                        // jQuery element of sidenav.
                var sidenavWidth = sidenav.outerWidth();                        // own sidenav width.
                var collapsibleHeaders = sidenav.find( '.collapsible-header' ); // jQuery element of collapsible headers.
                var collapsibleBodys = sidenav.find( '.collapsible-body' );     // jQuery element of collapsible bodies.
                var shownItensSidenavMini = $( '.shown-own-sidenav-mini' );     // jQuery elements shown on sidenav mini.
                var hiddenItensSidenavMini = $( '.hidden-own-sidenav-mini' );   // jQuery elements hidden on sidenav mini.
                var sidenavIsOpen = true;                                       // Sidenav state controller.

                /*
                 |
                 | Checks window width.
                 |
                 */
                if ( window.outerWidth > 992 ) {
                    showSidenav();
                    sidenavIsOpen = true;
                } else {
                    hideSidenav( 0 );
                    sidenavIsOpen = false;
                }

                /*
                 |
                 | Listen the window width.
                 |
                 */
                $( window ).bind( 'resize', function() {

                    if ( this.outerWidth > 992 && ! sidenav.hasClass( 'own-sidenav-mini' ) ) {
                        showSidenav();
                        sidenavIsOpen = true;
                    }

                    if ( this.outerWidth <= 992 ) {

                        if ( ! sidenav.hasClass( 'own-sidenav-mini' )  ) {
                            hideSidenav();
                            sidenavIsOpen = false;

                        } else {
                            sidenav.removeClass( 'own-sidenav-mini' );
                            removeSidenavMiniStyle();
                            showSidenav();
                            sidenavIsOpen = true;
                        }
                    }
                });

                /*
                 |
                 | Listen the sidenav toggle button.
                 |
                 */
                options.toggleButton.on( 'click', function() {
                    var currentWindowWidth = window.outerWidth;

                    if ( currentWindowWidth > 992 ) {

                        if ( ! sidenav.hasClass( 'own-sidenav-mini' ) ) {
                            sidenav.addClass( 'own-sidenav-mini' );
                            addSidenavMiniStyle();

                        } else {
                            sidenav.removeClass( 'own-sidenav-mini' );
                            removeSidenavMiniStyle();
                        }

                    } else {

                        if ( ! sidenavIsOpen ) {
                            sidenav.animate({ marginLeft: '0' }, options.transitionsDuration );
                            options.main.animate({ marginLeft: sidenavWidth + 'px' }, options.transitionsDuration );

                            sidenavIsOpen = true;
                        } else {
                            sidenav.animate({ marginLeft: '-' + sidenavWidth + 'px' }, options.transitionsDuration );
                            options.main.animate({ marginLeft: '0' }, options.transitionsDuration );

                            sidenavIsOpen = false;
                        }
                    }
                });

                /**
                 * Add sidenav mini styles.
                 *
                 * @return void
                 */
                function addSidenavMiniStyle()
                {
                    addCollapsiblesStyle();

                    hiddenItensSidenavMini.fadeOut( options.transitionsDuration, function() {
                        shownItensSidenavMini.fadeIn( options.transitionsDuration );
                        sidenav.animate({ width: widthSidenavMini }, options.transitionsDuration );
                        options.main.animate({ marginLeft: widthSidenavMini }, options.transitionsDuration );
                    });
                }

                /**
                 * Remove sidenav mini styles.
                 *
                 * @return void
                 */
                function removeSidenavMiniStyle()
                {
                    removeCollapsiblesStyle();

                    options.main.animate({ marginLeft: sidenavWidth + 'px' }, options.transitionsDuration );
                    sidenav.animate({ width: sidenavWidth + 'px' }, options.transitionsDuration, function() {
                        shownItensSidenavMini.hide( 0 );
                        hiddenItensSidenavMini.fadeIn( options.transitionsDuration );
                    });
                }

                /**
                 * Add collapsibles styles.
                 *
                 * @return void
                 */
                function addCollapsiblesStyle()
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
                }

                /**
                 * Remove collapsibles styles.
                 *
                 * @return void
                 */
                function removeCollapsiblesStyle()
                {
                    collapsibleHeaders.parent().removeClass( 'parent-collapsible-header' );
                    collapsibleBodys.off( 'click', 'a' ); // Turn off listener sidenavMini collapsibles
                }

                /**
                 * Show sidenav.
                 *
                 * @return void
                 */
                function showSidenav()
                {
                    options.main.animate({ marginLeft: sidenavWidth + 'px' }, options.transitionsDuration ).css({ width: 'auto' });
                    sidenav.animate({ marginLeft: '0' }, options.transitionsDuration );
                }

                /**
                 * Hide sidenav.
                 *
                 * @param  int transition
                 *
                 * @return void
                 */
                function hideSidenav( transition )
                {
                    sidenav.animate({ marginLeft: '-' + sidenavWidth + 'px' }, ( transition ? transition : options.transitionsDuration ) );
                    options.main.animate({ marginLeft: '0' }, options.transitionsDuration ).css({ width: '100%' });
                }
            });
        }
    };

    $.fn.ownSidenav = function( options )
    {
        if ( typeof options === 'object' || ! options ) {
            return methods.init.apply( this, arguments );
        }
    };

    $( document ).ready(function(){
        $( '.own-sidenav' ).ownSidenav();
    });
})( jQuery );
//# sourceMappingURL=materializeadmin.js.map
