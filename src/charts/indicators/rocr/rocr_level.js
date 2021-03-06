/**
 * Created by arnab on 3/29/15.
 */

define(["jquery", "jquery-ui", 'color-picker'], function($) {

    var callBackAfterOKPressed = undefined;
    function closeDialog() {
        $(this).dialog("close");
        $(this).find("*").removeClass('ui-state-error');
    }

    function init( containerIDWithHash, _callback ) {

        var Level = function (level, stroke, strokeWidth, dashStyle) {
            this.level = level;
            this.stroke = stroke;
            this.strokeWidth = strokeWidth;
            this.dashStyle = dashStyle;
        };

        $.get("charts/indicators/rocr/rocr_level.html" , function ( $html ) {

            var defaultStrokeColor = '#cd0a0a';

            $html = $($html);
            //$html.hide();
            $html.appendTo("body");
            //$html.find('select').selectmenu(); TODO for some reason, this does not work
            $html.find("input[type='button']").button();

            $html.find("#rocr_level_stroke").colorpicker({
                part:	{
                    map:		{ size: 128 },
                    bar:		{ size: 128 }
                },
                select:			function(event, color) {
                    $("#rocr_level_stroke").css({
                        background: '#' + color.formatted
                    }).val('');
                    defaultStrokeColor = '#' + color.formatted;
                },
                ok:             			function(event, color) {
                    $("#rocr_level_stroke").css({
                        background: '#' + color.formatted
                    }).val('');
                    defaultStrokeColor = '#' + color.formatted;
                }
            });

            $html.dialog({
                autoOpen: false,
                resizable: false,
                width: 280,
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

                                if (!validation.validateNumericBetween($html.find(".rocr_level_input_width_for_level").val(),
                                        parseInt($html.find(".rocr_level_input_width_for_level").attr("min")),
                                        parseInt($html.find(".rocr_level_input_width_for_level").attr("max"))))
                                {
                                    require(["jquery", "jquery-growl"], function($) {
                                        $.growl.error({ message: "Only numbers between " + $html.find(".rocr_level_input_width_for_level").attr("min")
                                        + " to " + $html.find(".rocr_level_input_width_for_level").attr("max")
                                        + " is allowed for " + $html.find(".rocr_level_input_width_for_level").closest('tr').find('td:first').text() + "!" });
                                    });
                                    return;
                                }

                                if (callBackAfterOKPressed) {
                                    callBackAfterOKPressed([new Level(parseFloat($html.find(".rocr_level_input_width_for_level").val()),
                                        defaultStrokeColor, parseInt($html.find("#rocr_level_strokeWidth").val()),
                                        $html.find("#rocr_level_dashStyle").val())]);
                                }

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

            if ($.isFunction(_callback))
            {
                _callback( containerIDWithHash, callBackAfterOKPressed );
            }

        });

    }

    return {

        open : function ( containerIDWithHash, _callback ) {

            callBackAfterOKPressed = _callback;
            if ($(".rocr_level").length == 0)
            {
                init( containerIDWithHash, this.open );
                return;
            }

            $(".rocr_level").dialog( "open" );

        }

    };

});
