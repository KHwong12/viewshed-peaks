define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.setBookmarkView = exports.bookmarks = void 0;
    exports.bookmarks = {
        VICTORIA_HARBOUR: {
            position: {
                x: 114.20,
                y: 22.223,
                z: 5000,
                spatialReference: 4326
            },
            heading: 345,
            tilt: 60
        },
        VICTORIA_PEAK: {
            position: {
                x: 114.138,
                y: 22.26,
                z: 1500,
                spatialReference: 4326
            },
            heading: 20,
            tilt: 70
        },
        KOWLOON_PEAKS: {
            position: {
                x: 114.253,
                y: 22.356,
                z: 3000,
                spatialReference: 4326
            },
            heading: 260,
            tilt: 60
        },
        TAI_MO_SHAN: {
            position: {
                x: 114.09,
                y: 22.44,
                z: 3000,
                spatialReference: 4326
            },
            heading: 140,
            tilt: 75
        },
        SHARP_PEAK: {
            position: {
                x: 114.429,
                y: 22.44,
                z: 3000,
                spatialReference: 4326
            },
            heading: 250,
            tilt: 60
        }
    };
    function setBookmarkView(view, key) {
        var bookmarkElement = document.getElementById(key);
        console.log(bookmarkElement);
        bookmarkElement.addEventListener("click", function () {
            var camera = exports.bookmarks[key];
            view.goTo(camera, {
                duration: 2000
            });
        });
    }
    exports.setBookmarkView = setBookmarkView;
});
//# sourceMappingURL=bookmarks.js.map