// ==UserScript==
// @name        open the demo iodide notebook build on CircleCI
// @namespace   rth.github.io
// @include     /https://github.com/iodide-project/pyodide/pull/[0-9]+[^/]*$/
// @grant       none
// ==/UserScript==

// Add a button to easily access HTML generated documentation on CircleCI
(function(){
    'use strict';

    // console.log('Running user script');

    window.addEventListener('load', () => {
        addButton('Try notebook on CircleCI for this PR', gotoCirclePage);
    });

    function addButton(text, onclick, cssObj) {
        let headerActionElement = document.getElementsByClassName('gh-header-actions')[0];
        // console.log('headerActionElement', headerActionElement);

        cssObj = cssObj || {};
        let button = document.createElement('button'), btnStyle = button.style;
        headerActionElement.appendChild(button);
        button.innerHTML = text;
        button.onclick = onclick;
        button.classList = "btn btn-sm";
        button.type = "button";
        Object.keys(cssObj).forEach(key => btnStyle[key] = cssObj[key]);
        return button;
    }

    function findElementsBySelectorAndText(selector, text) {
        var elements = document.querySelectorAll(selector);
        return Array.prototype.filter.call(elements, function(element){
            return RegExp(text).test(element.textContent);
        });
    }

    function gotoCirclePage() {
        var circleElement;
        var useCircleWorkflow;
        circleElement = findElementsBySelectorAndText('.branch-action .merge-status-item',
                                                      'ci/circle.+build')[0];
        // console.log('circleElement', circleElement);

        var match = /circleci.com\/.*?([0-9]+)\?/.exec(circleElement.innerHTML);
        // console.log('match', match);

        if (match) {
            var circleBuildNumber = match[1];
            var docURLPart;
            docURLPart = '-122663163-gh.circle-artifacts.com/0/home/circleci/repo/build';
            var docURL = 'https://' + circleBuildNumber + docURLPart + '/python_dev.html';
            // console.log('docURL', docURL);
            window.open(docURL);
        }
    }
}());
