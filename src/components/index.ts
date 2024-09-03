import * as PIXI from "pixi.js";
import { Live2DModel, MotionPreloadStrategy, MotionPriority } from "pixi-live2d-display";

declare global {
  interface Window {
    PIXI: typeof PIXI;
  }
}

window.PIXI = PIXI;

export async function init() {
  // 创建 PIXI 应用
  const app = new PIXI.Application({
    view: document.getElementById("canvas_view") as HTMLCanvasElement,
    backgroundColor: 0x000000,
    autoDensity: true,
    resizeTo: window,
    antialias: true,
  });

  // 引入模型
  const model = await Live2DModel.from('18mafuyu_unit/18mafuyu_unit.model3.json', {
    motionPreload: MotionPreloadStrategy.NONE,
  });

  // 设置动作
  model.motion('w-normalcool-tilthead0204', 0, MotionPriority.NORMAL);

  // 启用鼠标跟踪
  model.interactive = true;

  // 缩放模型并设置其位置
  function resizeModel() {
    const scale = Math.min(app.renderer.width / model.width, app.renderer.height / model.height) * 1.5;
    model.scale.set(scale, scale);
    model.position.set(app.renderer.width / 2, app.renderer.height / 2);
    model.anchor.set(0.5, 0.4);
  }

  // 初次加载时缩放和定位模型
  resizeModel();

  // 窗口大小调整时重新缩放模型
  window.addEventListener('resize', resizeModel);

  // 添加模型到舞台
  app.stage.addChild(model);
}
