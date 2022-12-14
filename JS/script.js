//Relog Analógico
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.9;
setInterval(drawClock, 1000);
function drawClock() {
  drawFace(ctx, radius);
  drawNumbers(ctx, radius);
  drawTime(ctx, radius);
}
function drawFace(ctx, radius) {
  var grad;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2 * Math.PI);
  ctx.fillStyle = "white";
  ctx.fill();
  grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
  grad.addColorStop(0, "#333");
  grad.addColorStop(0.5, "aqua");
  grad.addColorStop(1, "#333");
  ctx.strokeStyle = grad;
  ctx.lineWidth = radius * 0.1;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
  ctx.fillStyle = "#333";
  ctx.fill();
}
function drawNumbers(ctx, radius) {
  var ang;
  var num;
  ctx.font = radius * 0.15 + "px arial";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  for (num = 1; num < 13; num++) {
    ang = (num * Math.PI) / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius * 0.85);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius * 0.85);
    ctx.rotate(-ang);
  }
}
function drawTime(ctx, radius) {
  var now = new Date();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();
  //hour
  hour = hour % 12;
  hour =
    (hour * Math.PI) / 6 +
    (minute * Math.PI) / (6 * 60) +
    (second * Math.PI) / (360 * 60);
  drawHand(ctx, hour, radius * 0.5, radius * 0.07);
  //minute
  minute = (minute * Math.PI) / 30 + (second * Math.PI) / (30 * 60);
  drawHand(ctx, minute, radius * 0.8, radius * 0.07);
  // second
  second = (second * Math.PI) / 30;
  drawHand(ctx, second, radius * 0.9, radius * 0.02);
}
function drawHand(ctx, pos, length, width) {
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.moveTo(0, 0);
  ctx.rotate(pos);
  ctx.lineTo(0, -length);
  ctx.stroke();
  ctx.rotate(-pos);
}
//Fecha
function defTime(){
  document.getElementById("AM").checked = true;
  document.getElementById("shortDate").checked = true;
}
setInterval(showDate, 1000);

function showDate() {
  let tz= country;
  console.log(tz);
  //Date
  let showHour = document.getElementById("hour");
  let showDate = document.getElementById("date");
  let date = new Date();
  let DateSimp = date.toLocaleDateString("es-ES", { weekday:"short", year:"numeric", month:"short", day:"numeric", timeZone:tz});
  let LongDate = date.toLocaleDateString(undefined, { weekday:"long", year:"numeric", month:"long", day:"numeric", timeZone:tz});
  //Time
  let AM = date.toLocaleString(undefined, { hour: 'numeric', minute: 'numeric', second:'numeric', hour12: true, timeZone:tz });
  let hours24= ("0"+date.toLocaleTimeString("es-ES", {timeZone:tz})).slice(-8);
  
  //Know what radio is checked
  let DateCheck = document.querySelector('input[name="Dformat"]:checked').value;
  let timeCheck = document.querySelector('input[name="Dtime"]:checked').value;
  
  if(timeCheck == "AM"){
    showHour.innerHTML= ("0"+AM).slice(-14);
  }else{
    showHour.innerHTML= hours24;
  }
  if(DateCheck == "shortDate"){
  showDate.innerHTML = date.toLocaleDateString("es-ES", {year: "numeric",
  month: "2-digit",
  day: "2-digit",
  timeZone:tz});
  }else if(DateCheck == "LongDate"){
    showDate.innerHTML =LongDate.charAt(0).toUpperCase() + LongDate.slice(1);
  }else{
    showDate.innerHTML = DateSimp.charAt(0).toUpperCase() + DateSimp.slice(1);
  }  
  
}
const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
var country = timezone;
function setCountry(value){
  
  if(value != null){
    country = value;
  }
  return country;
}
