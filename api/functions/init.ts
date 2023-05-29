import { Assets, BaseTexture, SCALE_MODES, settings } from "pixi.js";
import app from "pigeon-mode-game-library/api/app";
import sizeScreen from "pigeon-mode-game-library/api/functions/sizeScreen";
import state from "pigeon-mode-game-library/api/state";
import tick from "pigeon-mode-game-library/api/functions/tick";

const init = (): void => {

  console.log("PMGL game initialized.");

  const screen = document.getElementById("screen");

  settings.ROUND_PIXELS = true;
  BaseTexture.defaultOptions.scaleMode = SCALE_MODES.NEAREST;
  if (settings.RENDER_OPTIONS) {
    settings.RENDER_OPTIONS.hello = false;
  }

  addEventListener("resize", sizeScreen);
  app.renderer.view.addEventListener?.("contextmenu", (e: Event): void => {
    e.preventDefault();
  });
  screen?.addEventListener("mousedown", () => {
   if (!state.hasInteracted) {
    state.hasInteracted = true;
   }
  });

  screen?.appendChild(app.view as HTMLCanvasElement);

  sizeScreen();
  
  Assets.load("./fonts/RetroPixels.fnt").then((): void => {
    state.loadedAssets++;
  });

  app.ticker.add(tick);

};

export default init;
