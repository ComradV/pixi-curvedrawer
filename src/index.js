//  import './pixi/pixi.min.js'
// www
  const PIXI = require('../pixi/pixi.min.js');
  
  let renderer = new PIXI.autoDetectRenderer(500,500,{backgroundColor:0xdadada});
  let stage = new PIXI.Container();

  document.body.appendChild(renderer.view);
  console.log('!!!');

  stage.hitArea = new PIXI.Rectangle(0, 0, 500, 500);
  stage.interactive = true;
  stage.buttonMode = true;
  stage.on("mousedown", mouseClickHandler);

  animate();
  let points = [];
  let curve;
  
  let test1;
  

  function mouseClickHandler(e){
      addPointToCurve(e.data.global);
  }

  function addPointToCurve(point){
    if(points.length ==4){
      stage.children = [];
      points = [];
      return;
    }
    points.push({x:point.x, y:point.y});
    plotPoint(point);
    connectBez(points);
  }

  function plotPoint(point){
    let circle = new PIXI.Graphics();
    circle.lineStyle(2, 0xFFFFFF, 1);
    circle.drawCircle(point.x, point.y, 6);
    stage.addChild(circle);
  }
  
  function connectBez(points){
    if (points.length > 1){
      const pointsForCurve = points.slice(1);
      while (pointsForCurve.length < 3){
        pointsForCurve.push(pointsForCurve[pointsForCurve.length-1]);
      }
      if(curve) {
        stage.removeChild(curve);
      }
      curve = new PIXI.Graphics();
      curve.lineStyle(2, 0xFFFFFF, 1);
      curve.moveTo(points[0].x,points[0].y);
      curve.bezierCurveTo(pointsForCurve[0].x,pointsForCurve[0].y,pointsForCurve[1].x,pointsForCurve[1].y,pointsForCurve[2].x,pointsForCurve[2].y);
      stage.addChild(curve);
    }
    // points.forEach(point => {
    // })
  }

  function animate() {
      renderer.render(stage);
      requestAnimationFrame(animate);
  }
