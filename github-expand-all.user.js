// ==UserScript==
// @name        github expand all
// @namespace   lesteve.github.io
// @include     https://github.com/*/pull/*
// @version     1
// @grant       none
// ==/UserScript==


// Register a shortcut to expands all outdated comments. This is useful to
// search text inside old comments thas have been folded because the code has
// been modified after the comment.
// TODO: this would be nice if this could expand:
// * big diffs
// * folded conversations (e.g. https://github.com/scikit-learn/scikit-learn/pull/9012#pullrequestreview-42934289
//   215 items not shown)
(function(){
    'use strict';

    var opened = false;

    document.addEventListener('keydown', function(e) {
        // console.log('Pressed: ' + e.keyCode);
        // console.log('shift: ' + e.shiftKey);
        // console.log('ctrl: ' + e.ctrlKey);
        // console.log('alt: ', e.altKey);
        // console.log('meta: ' + e.metaKey);
        if (e.keyCode == 80 && !e.shiftKey && e.ctrlKey && e.altKey && !e.metaKey) {
            // console.log('Pressed alt-ctrl-p')
            var outdated_diff_elements = document.getElementsByClassName("outdated-comment");
            // supporting old github PRs (before "Start Review" feature)
            var legacy_outdated_diff_elements = document.getElementsByClassName("outdated-diff-comment-container");
            // transform HTMLCollection objects into arrays and concatenate
            outdated_diff_elements = Array.concat(Array.from(outdated_diff_elements),
                                                  Array.from(legacy_outdated_diff_elements));
            console.log('outdated_diff_elements.length: ' + outdated_diff_elements.length);
            for (var i = 0; i < outdated_diff_elements.length; i++) {
                var element = outdated_diff_elements[i];
                if (!opened) {
                   element.classList.add('open');
               }
               else {
                   element.classList.remove('open');
               }
            }
            opened = !opened;
            // console.log('Opened: ' + opened);
        }
    }, false);
})();
