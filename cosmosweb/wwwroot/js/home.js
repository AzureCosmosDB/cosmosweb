﻿//no longer used

$(function () {

    // Animation only happens on Bootstrap md/lg viewports
    if ($(window).width() < 992)
    {
        return;
    }

    $(".tagline").addClass("typing");

    setTimeout(function () {
        // array with texts to type in typewriter
        var dataText = ["web", "retail", "gaming", "serverless", "IoT", "all your"];

        var tagLine = $(".tagline");

        // type one text in the typwriter
        // keeps calling itself until the text is finished
        function typeWriter(text, i, fnCallback) {
            // check if text isn't finished yet
            if (i < text.length) {
                // add next character to h1
                tagLine.show().html(text.substring(0, i + 1));
                
                // wait for a while and call this function again for next character
                setTimeout(function () {
                    typeWriter(text, i + 1, fnCallback);
                }, 100);
            }
            // text finished, call callback if there is a callback function
            else if (typeof fnCallback === 'function') {
                // call callback after timeout
                setTimeout(fnCallback, 2000);
            }
        }

        function typeWriterDelete(i, fnCallback)
        {
            if (i > 0) {
                tagLine.html(tagLine.html().substring(0, i - 1));

                setTimeout(function () {
                    typeWriterDelete(i - 1, fnCallback);
                }, 100);
            }
            else if (typeof fnCallback === 'function') {
                setTimeout(fnCallback, 100);
            }
        }

        // start a typewriter animation for a text in the dataText array
        function StartTextAnimation(i) {
            typeWriterDelete(tagLine.html().length, function () {
                    typeWriter(dataText[i], 0, function () {
                        // after callback (and whole text has been animated), start next text
                        StartTextAnimation((i + 1) % dataText.length);
                    })
                });
        }
        // start the text animation
        StartTextAnimation(0);
    }, 3000);
});
