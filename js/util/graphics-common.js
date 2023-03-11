function drawBitmapCenteredWithRotation(useBitmap, atX, atY, withAng) {
  context.save();
  context.translate(atX, atY);
  context.rotate(withAng);
  context.drawImage(useBitmap, -useBitmap.width / 2, -useBitmap.height / 2);
  context.restore();
}

function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {  //draw rectangles
  context.fillStyle = fillColor;
  context.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

function colorCircle(centerX, centerY, radius, fillColor) {  //draw circles
  context.fillStyle = fillColor;
  context.beginPath();
  context.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
  context.fill();

  // idea:
  // context.drawImage(circlePic,centerX-radius,centerY-radius);
}

function resizeText(text, maxWidth = canvas.width, resizeFactor = 0.8) {
  let theFont = context.font.split("px");
  let fontsize = Number(theFont[0]);  

  if (context.measureText(text).width > maxWidth)
  {
      fontsize *= resizeFactor;
      context.font = fontsize + "px" + theFont[theFont.length - 1];
  }
}

function colorText(showWords, textX, textY, fillColor, font = "14px Arial Black", maxWidth = canvas.width, resizeFactor = 0.5) {
  context.textAlign = "left";
  context.fillStyle = fillColor;
  context.font = font;
  resizeText(showWords, maxWidth, resizeFactor);
  context.fillText(showWords, textX, textY);
}

function drawTextWithShadowCentered(text, x, y, color, font = "13px sans-serif", maxWidth = canvas.width, resizeFactor = 0.5) {
  context.textAlign = "center";
  context.font = font;
  context.shadowBlur = 8;
  context.shadowColor = "black";
  // if these are both 0, it's more like a "glow"
  context.shadowOffsetX = 0;
  context.shadowOffsetY = 0;
  context.fillStyle = color;
  resizeText(text, maxWidth, resizeFactor);
  context.fillText(text, x, y);
  context.shadowBlur = 0;
}

function drawTextWith1pxShadowCentered(text, x, y, color, font = "13px sans-serif", maxWidth = canvas.width, resizeFactor = 0.5) {
  context.textAlign = "center";
  context.font = font;
  context.fillStyle = "black";
  resizeText(text, maxWidth, resizeFactor);
  context.fillText(text, x+1, y+1);
  context.fillStyle = color;
  resizeText(text, maxWidth, resizeFactor);
  context.fillText(text, x, y);
}

function drawTextCentered(text, x, y, color, font = "13px sans-serif", maxWidth = canvas.width, resizeFactor = 0.5) {
  context.textAlign = "center";
  context.font = font;
  context.fillStyle = color;
  resizeText(text, maxWidth, resizeFactor);
  context.fillText(text, x, y);
}

function emptyRect(x, y, width, height, lineWidth, strokeColor) {
  context.lineWidth = lineWidth;
  context.strokeStyle = strokeColor;
  context.strokeRect(x, y, width, height);
  context.lineWidth = 0;
}

// arguments
// ctx : the context on which to draw the mirrored image
// image : the image to mirror
// x,y : the top left of the rendered image
// horizontal : boolean if true mirror along X
// vertical : boolean if true mirror along y
function mirrorImage(ctx, image, x = 0, y = 0, horizontal = false, vertical = false) {
  ctx.save();  // save the current canvas state
  ctx.setTransform(
      horizontal ? -1 : 1, 0, // set the direction of x axis
      0, vertical ? -1 : 1,   // set the direction of y axis
      x + horizontal ? image.width : 0, // set the x origin
      y + vertical ? image.height : 0   // set the y origin
  );
  ctx.drawImage(image, 0, 0);
  ctx.restore(); // restore the state as it was when this function was called
}

function rotateAndPaintImage(context, image, angleInRad, positionX, positionY, axisX, axisY) {
  context.translate(positionX, positionY);
  context.rotate(angleInRad);
  context.drawImage(image, -axisX, -axisY);
  context.rotate(-angleInRad);
  context.translate(-positionX, -positionY);
}