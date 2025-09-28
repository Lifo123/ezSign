import { Controls } from "../stores/Visor.Store";

export function registerKeybinds() {

  
  document.addEventListener("keydown", (e: KeyboardEvent) => {
    
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      Controls.prev();
    }
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      Controls.next();
    }
  });

  return
}
