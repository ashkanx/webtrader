/**
 * Created by arnab on 3/1/15
 */

define(["jquery", "jquery-ui", 'color-picker', 'common/loadCSS'], function($) {

    function closeDialog() {
        $(this).dialog("close");
        $(this).find("*").removeClass('ui-state-error');
    }

    function init( containerIDWithHash, _callback ) {

        $.get("charts/indicators/cdldojistar/cdldojistar.html" , function ( $html ) {

            $html = $($html);
            //$html.hide();
            $html.appendTo("body");
            //$html.find('select').selectmenu(); TODO for some reason, this does not work

            $html.dialog({
                autoOpen: false,
                resizable: false,
                width: 350,
                modal: true,
                my: 'center',
                at: 'center',
                of: window,
                buttons: [
                    {
                        text: "Ok",
                        click: function() {
                            //console.log('Ok button is clicked!');
                            require(["validation/validation"], function(validation) {

                                require(['charts/indicators/highcharts_custom/cdldojistar'], function ( cdldojistar ) {
                                    cdldojistar.init();
                                    //Add CDLDOJISTAR for the main series
                                    $($(".cdldojistar").data('refererChartID')).highcharts().series[0].addCDLDOJISTAR();
                                });

                                closeDialog.call($html);

                            });
                        }
                    },
                    {
                        text: "Cancel",
                        click: function() {
                            closeDialog.call(this);
                        }
                    }
                ]
            });

            if (typeof _callback == "function")
            {
                _callback( containerIDWithHash );
            }

        });

    }

    return {

        open : function ( containerIDWithHash ) {

            if ($(".cdldojistar").length == 0)
            {
                init( containerIDWithHash, this.open );
                return;
            }

            $(".cdldojistar").data('refererChartID', containerIDWithHash).dialog( "open" );

        }

    };

});
