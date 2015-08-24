// ==UserScript==
// @name         Acquia shorts
// @namespace    http://your.homepage/
// @version      0.1
// @description  enter something useful
// @author       You
// @match        https://insight.acquia.com/cloud/workflow*
// @grant        none
// ==/UserScript==

(function($) {
    var head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    var style = document.createElement('style');
    style.type = 'text/css';

    function addStyle(css) {
        style.innerHTML += css + "\n";    
    }

    addStyle('.ah-task-table td.task-description .trim {width: 100%;}');
    addStyle('.table-wrapper tbody td {height: 21px;}');
    addStyle('.ah-workflow-item, .ah-workflow-drag-item { font-size: 13px; color: #333333; }');
    addStyle('div.ah-environment-header { text-shadow: 1px 1px 2px #333 !important; }');
    addStyle('.navigation-second-wrapper-inner { padding: 5px !important; }')
    addStyle('.navigation-third-wrapper .block-menu-block ul.menu li.active-trail a { border-color: #0f0 !important; }')
    addStyle('.ah-environment-row .ah-environment-wrapper { width: 185px !important; }')
    addStyle('.grid16-16 { width: auto !important; }');
    addStyle('.grid16-12 { width: auto !important; }');
    addStyle('.grid16-4 { width: auto !important; }');

    $('div.ah-environment-header').each(function(i, e) {
        switch ($(e).data('ac-stage')) {
            case 'dev':
            case 'dev2':
                $(e).css('background', '#607f3f url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAM0lEQVQIW2NkYGCQZGBgeM4AASC2MSOUAxdgYGA4CxMEqwAJgHSBBFEEQFpAgj4wFTBzAXIoCITU0yRYAAAAAElFTkSuQmCC) repeat');
                break;

            case 'Acceptance':
                $(e).css('background', '#7a783d url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAM0lEQVQIW2NkYGCQZGBgeM4AASC2MSOUAxdgYGA4CxMEqwAJgHSBBFEEQFpAgj4wFTBzAXIoCITU0yRYAAAAAElFTkSuQmCC) repeat');
                break;

            case 'test':
                $(e).css('background', '#8c672f url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAM0lEQVQIW2NkYGCQZGBgeM4AASC2MSOUAxdgYGA4CxMEqwAJgHSBBFEEQFpAgj4wFTBzAXIoCITU0yRYAAAAAElFTkSuQmCC) repeat');
                break;

            case 'prod':
                $(e).css('background', '#7c483e url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAM0lEQVQIW2NkYGCQZGBgeM4AASC2MSOUAxdgYGA4CxMEqwAJgHSBBFEEQFpAgj4wFTBzAXIoCITU0yRYAAAAAElFTkSuQmCC) repeat');
                addStyle('.ah-environment-header-prod { background-color: #7c483e !important; border-color: #331d19 !important; }');
                addStyle('.ah-environment-header-prod .btn-group { background-color: #656363 !important; border-color: #331d19 !important; }');
                break;

            default:
                $(e).css('background', '#888888 url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAM0lEQVQIW2NkYGCQZGBgeM4AASC2MSOUAxdgYGA4CxMEqwAJgHSBBFEEQFpAgj4wFTBzAXIoCITU0yRYAAAAAElFTkSuQmCC) repeat');
                break;
        }
    });

    var blocks = $('.ah-environment-row-inner');
    $(blocks[1]).children().appendTo($(blocks[0]));
    $(blocks[1]).remove();
    $(blocks[2]).children().appendTo($(blocks[0]));
    $(blocks[2]).remove();

    var envs = ['dev', 'dev2', 'Acceptance', 'test', 'prod', 'loadtest', 'rc', 'ra'].reverse();
    for (var i in envs) {
        $('.ah-environment-wrapper').each(function(k, e) {
            var hd = $(e).find('div.ah-environment-header')[0];
            if ($(hd).data('ac-stage') == envs[i]) {
                $(e).prependTo($(blocks[0]));
            }
        });
    }

    $('div[title="DB bravo"] span.label')
    .css('background', 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAABk0lEQVQ4y5WSMW8TURCEv31nS2C5sIJR6O7eHY0r8hMAUVAQF1DDL0DcX8h/gZYeSDgKaEAUpHKDC1MRbFwZQ5TcG4q7S2yBCB7pNft2ZnZHa5KEAGMz1BzzcSJX1wLgLuAF4Hqacm845EmeE13p9fasUfsPYwPm8zkf339ABtFWr7e39eyAy/cfoZ8/OP08+reAVTZBYjadViv0nx7w68Vz2oMdojjjZHRIK86wTpdyMq4IywWu0yWKMwDmD+9UKzeK7cHOmcvx25eUkzHlZExYLojijPbgBsCZYAMXQvgz4O/fcFe3ieIMzY7W/5aLdQHnqtxPRp9WuoTrXyPMjiinX9cz6HTPyYCTBMCluw84fvdqXb2/DQbllzGno0OAaqrlAjPDe4+liZfVIk0e54MIM6MxWa0753ic57Qk4VaaVpvNjBACzZqSCECaZewOd8nzHFOQsiTBOYckYu95XRQggf3ltJqSQIgWEqon8N6z/6Zo7C88ScNw1OQkTdkvCjaGJN2+eUsKqt6GMNWpNYlvit/7iunZKuSEJgAAAABJRU5ErkJggg==) no-repeat')
    .css('height', '20px')
    .text(' ');

    $('div[title="DB cnbc"] span.label')
    .css('background', 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACFUlEQVQ4jdWTzUtUYRTGf+97r19zZxhnxnEaEw0hmz5GpSgqKtEk6AOiojZFS/+A2lQgRUTQLhBsZUUfusgiiqR2bmqTRMYgkqgwjTA6OiJzZ5yRe9+3hRVky2jRgWfzcJ7ncB7OEVpr/qbkX6n/iYFSbmD20fOhqVt9n4tzmfaFTL7z8cPRxLvhiReuq4Lr+831xMLbkavJG/1nQLD6Lf1keHOXHE+k67Rmu7+66uve/Y1X/jDQWnvc5Jebam46rG0ZAgGAmyvUN20KMp5IIwTkV5xtvR9mB6PesszpHTXXpJS2CeCmEtcLd89dRjtYsU5lBCzcpTwVDRuYn7cBsDzlDGSd46+nZqUCDCGcU/HwJQmg0lO1aBcQqIkRWXMkBkBlY5TaiBeA2M563kwvy5/BZQpO6FeIZsvhQaP5wNLaVppgfRYMQWVDlEjEixCCmYAPpUGhOdrkz1xoCz8FMHq6d91WH0/eM6Mlj6xrR6VSyFyK1cg+Qic6MKoDZBYLPCtIENC922Ws6n7VncmBi1usjR6j52zuJSszFThZhDGBGe9ALZmURUN4Dx2j0ufh/XwR2xQcbBujL9tPsrQocqpEMp9ulSLU9QkNa3DAfkXFnmX8rWHKvD4sq5zmrQK74QG96SGK2kEBSkNnTXxMKKX82JPntWNbvx2EMBH+OACjCwmKbmmN/jHLZ3oKLcHYgPj/n+k7ns/QmG4v+IYAAAAASUVORK5CYII=) no-repeat')
    .css('height', '20px')
    .text(' ');

    $('div[title="DB eonline"] span.label')
    .css('background', 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAOhJREFUOI2lks1Kw0AUhb87P0l3asRt6YO4q+Aj+W6+R1YVxU0phJCm0tR0Eq4bBYVcMHp2w1y+OefOEVXlPwrWxd16rXVdc04JgLIsZRZgt93RtnvqpqE/9/MdeO9wztOdunug/QPA470H9BEm3QPgTHIIhBC5ubzWLARz0yYg5jlZFuj6d9I4zndQVRUhRo6nTlTVzGACNk8b8nxhvvwlsYokIlpcFayWS5pmz/Pry6QL0wHA4e2AeI84e8z8RlW9BS4+j2YPzAgxRh2G4TtwfoTfyIyQUnpAGRG2QGHNTUZQBbHb+0MfKXNYf9x88MwAAAAASUVORK5CYII=) no-repeat')
    .css('height', '20px')
    .text(' ');
    
    $('div[title="DB esquire"] span.label')
    .css('background', 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAchJREFUOI11UrGq4lAQPdeVvCKopBCjYKsiiBDSWwgWtv6BYGVrGXEbK7ENWFj4FxYWWwURcREx2FkIWggaLSIxIbPFI3lxowcG7mXuOXdmzgAABaNer9N0OiXLsoiIyHVdP4JwHIdUVR0jSFYUha7X68vDIPH5fNJ+vydN02g4HJIkST8CiqKEfgneN5sNdbtdKpfLwYq/BWq1Gl0uF/qExWJBxWKR/m8XwDgCANVqFYIgwAMR+WfTNDGZTKDrOt4hAgAcx4USnojruojH42/JAPALwG/btiFJEpLJJBhjYIwBABhj4DgO+XweqVQKsVgMlmXBMAwv/9cfYqFQoF6vR7PZjAzD+DiP+XxO2WzWn0HUK2W322EwGMBxHORyOSQSCb8Vr6LH44HT6QTXdV/bBUDtdptWqxXZtv3WRl3XqdVqhVwAABqNRh/9JyLSNI1kWX5rI/r9/kciEdF6vaZSqfSO/C1wPB5fyMG9N02TOp2OT2CMhRcpnU6/DCqI2+2G7XYb2o0gop7fHoJnURTRbDZxOBxwv98RiUTA8zwEQUClUoEoilFGROPwfv3gfD5DVVUsl0t8fX0hk8lAlmU0Go0oz/N//gHYBtHGABzvdQAAAABJRU5ErkJggg==) no-repeat')
    .css('height', '20px')
    .text(' ');
    
    $('div[title="DB oxygen"] span.label')
    .css('background', 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABOklEQVQ4jaWTvUoDQRCAvxOxEAux8Ak8CSIiqYLFkWdwG0d8hCApxScQKxErCyvJWXhtCrHyCSSFBEaClaSSVGIRPIvb07k1ASXTzezMN78b5XkeMYPMzRIMMB8asjhdAVrALlDzPi9AFzhzKgPrH9kWsjhtAjfA6pSEH0DLqVz9AmRxWgcegMU/VH7gVDpQncFlEDwEzoFToB8ALnyrBSCL0wZQNw6PwIZTaTuVI2ALuDXvy8CerWAnyHDsVEal4lTGwCHwaXwaFrAUAJ4DHacyBN6DKr4Bw8C/GQL8kG2iVwu4D8o7yeI0McFrwHXAvIPqGjv4wRjpU+x+k+rRPQHbTmVsjS2KTawbWy1sBRgB+36wP3fgVN6AhOJkp0kPSJxKrzREk36jv4vyLywAAw/uOhU7q8mA/8gXlx9iuolgywoAAAAASUVORK5CYII=) no-repeat')
    .css('height', '20px')
    .text(' ');
    
    $('div[title="DB sprout"] span.label')
    .css('background', 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABCUlEQVQ4jZWTMW7CQBBFHwSJBiGXKZ02lettLG7ADULKVBHS9rmAi1ClNSfAnCDexnUqWijpsBANUiKl8BqNV15h/8Yz65n/R/N3B9xBUsQB8AFEwFork8r/gw7N37YZoASetDJlXTNyGiJgbgtToVwjsHneSgBsgNDG7yL2YujkoSeW+JFJYwdJEe+7qAqimTvBqmMzVLtYuAQpcOhBcrgRWAf249Ek9FVPx48yzbUymXRhAwTX34tX7nw95jbcamU+oWmjV1lgpZXJ5IHcwSvVBSntd9lCELkHDRsfvnbTv7fnc50nRXyiun03EfctNFyQzRZyinoy/wRtSIp4DrxQvcTsXn1v/APQYEK1Z/c3vgAAAABJRU5ErkJggg==) no-repeat')
    .css('height', '20px')
    .text(' ');
    
    $('div[title="DB syfy"] span.label')
    .css('background', 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABeUlEQVQ4jc2TsUvDQBTGf9VOImSQCFlOBxUqKhh0EGq3glindBCsWxSx/gMpdHAI6OiiUtBJKjjYyYirIaNk6RCwUzqYoS6V0rUO1oMaF3HQN93d+77vfe/uXaLX6/X4RQz9hvxPBC6ObllRCqwoBexi5VuQXaxITEzg8rjGqDKCJlScqkujHg4AfC/AqbpoQkVPp2ICyc+Fvpois77NzfkDUdji1ClzkLPRJtQBwkHOZn0rA8D9tUuyfLbHSekKp+ryePeEJlTpwvcC9D4xaraImi0AFvtOfC9g6P7aZXN/jczGEp12V5I77e5AZdMyOHXKct95+8gnn+shvhfIhJ5O4XsBWbEb63dmfgKAy+OaPBt+8GqH4fMLmlAxrTw7pTxhI2JsXCFqvjK9MMnYuIKenmVueQpNqH13CTrtLomvo2wXKzhVVzoxLYOdUl62lRW78tUa9TA+SKZloAkV3wvQhEqukJG5UWUE0zLkXZmWEXfw0/j7v/AOHeyR0Q3pLY4AAAAASUVORK5CYII=) no-repeat')
    .css('height', '20px')
    .text(' ');
    
    $('div[title="DB telemundo"] span.label')
    .css('background', 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABpFBMVEUAAAD9HhX+DAn8AAD3r5/4dWD8LSz6sKRYAABAAABEAABIAABdAADWAAD7AADvAADTBASjBAhwAACvAACDBAjDAADnDBDbAAD7DAz3AADBBQXxICDBCgrqAADFDg4+AAD2AADbAAC5CAiXAAByAAD9AAD9AAD9JBb8JRH9JRH9Lhz+UED/aVH/XEX/VD7/PS/eFxTTAADdAADiAADrAADyAAD7AAD+X1H/Hhb/Cgf/BgT/CAX/Cwf+Cwe9EhKlAACqAAC0AADBAADRAADmBQT8Hhr+Bwb/AAD9AADuAACcCgt9AACBAACIAACSAACkAADsCAf8AAD2AADXAQKCBgdcAABfAABiAAFmAQKNBQX5AADmAAD0AADuAAG+AwVvCAhHAABKAABKAAFPAgKpBAT+AAD4AADqAADfAADoAgOqBgjFCQj3AADoAADOAwLwAADlAADVAAC/AADtAAD1AADSAADBBwXsAADxAADYAADcAACgCQfOAABnBQTuCgfgAAC8AAD6AABVAQK4BALQAADNAAByAAFAAAHAAACMAABeAAD///8sEnf7AAAAJ3RSTlMA769gYL+/z0BAQEBwcEBAQEBAQEBAQEBAQHCAgGCAz7+AgM9g34D6dwO9AAAAAWJLR0SL8m9H4AAAAAd0SU1FB98DFAkqLZICFZAAAADUSURBVBjTY1DX0NRiZGJmYGBh1dbR1dNnMDA0MjYxNWNjN7ewtLK2sWWws3dwdHJ2cXVzBwEPTwYvbx9fP/8A90AzkEBQMENIaFh4RKS7e1R0DFBBbBxDfEJiUnJKampaeoa7u1lmFgMHJxc3T3ZaYE6uMy8fv4AgAwgI5eWb5RQUCjPAgEhRsVlJRqkoXECsrDyqorJKHC4gUW0SlF5jJAkXkKqtM61vaOSDC0g3Nae3tLojBGTa2v07otxl4QJynV3yCu7uinABJWUVBgZmVTUQGwAKVzDtaTux8gAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNS0wMy0yMFQwOTo0Mjo0NSswMTowMBvtUQ4AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTUtMDMtMjBUMDk6NDI6NDUrMDE6MDBqsOmyAAAAAElFTkSuQmCC) no-repeat')
    .css('height', '20px')
    .text(' ');

    $('#block-acquia_network-feedback').remove();
    head.appendChild(style);
})(jQuery)
