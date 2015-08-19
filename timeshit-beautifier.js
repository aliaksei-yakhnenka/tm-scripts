// ==UserScript==
// @name         Timeshit beautifier
// @namespace    http://your.homepage/
// @version      0.1
// @description  Timeshit beautifier
// @author       You
// @match        https://rally1.rallydev.com/*
// @grant        none
// ==/UserScript==
;
(function($) {
    if (!window.location.href.match(/slm\/analytics\/timeTrack/)) {
        return;
    }

    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                if (mutation.target.className === 'x-grid3-body') {
                    $('#ttFrame', top.document).attr('height', $(top.window).height());
                    var title = '',
                        colors = ['#efedda','#e2f2da','#daeaf2'],
                        //colors = ['#dddddd', '#eeeeee', '#ffffff'],
                        color;
                    $('.x-grid3-col-2').each(function(index) {
                        var _title = $(this).text();
                        if (title != _title) {
                            title = _title;
                            color = colors.shift();
                            colors.push(color);
                        }
                        $(this).closest('div.x-grid3-row').css('background', color);
                    });
                    $('.x-grid3-col-4').each(function(index) {
                        if ('Completed' == $(this).text()) {
                            // $(this).closest('div.x-grid3-row').children().css('color', '#ff0000 !important');
                            //$(this).closest('div.x-grid3-row').find('div').css('color', '#b3b3b3');
                            //$(this).closest('div.x-grid3-row').find('tr').css('background', '#f5f5f5');
                            $(this).closest('div.x-grid3-row').remove();
                        }
                    });
                    $('td.x-grid3-col').css('border', '1px solid #c6c6c6');
                    $('td.x-grid3-col').css('border-width', '0 1px 0 0');

                    //observer.disconnect();
                }
            }
        });
    });
    observer.observe(document, { attributes: true, childList: true, characterData: true, subtree: true });
})(jQuery);
