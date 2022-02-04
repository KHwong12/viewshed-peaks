
// Change sidebar button
export function changeMenuIcon (sidebar: HTMLSelectElement, collapseBtn: HTMLSelectElement) {
  if (sidebar.classList.contains("open")) {
    // change the icon from "menu" to "right-padded menu"
    collapseBtn.classList.replace("bx-menu", "bx-menu-alt-right");
  } else {
    collapseBtn.classList.replace("bx-menu-alt-right", "bx-menu");
  }
}
