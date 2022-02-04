define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.changeMenuIcon = void 0;
    // Change sidebar button
    function changeMenuIcon(sidebar, collapseBtn) {
        if (sidebar.classList.contains("open")) {
            // change the icon from "menu" to "right-padded menu"
            collapseBtn.classList.replace("bx-menu", "bx-menu-alt-right");
        }
        else {
            collapseBtn.classList.replace("bx-menu-alt-right", "bx-menu");
        }
    }
    exports.changeMenuIcon = changeMenuIcon;
});
//# sourceMappingURL=ui.js.map