export default function draw(){
    const writeBtn = document.querySelector('#write');
    const selectColor = document.querySelector('#select-color');
    const eraseBtn = document.querySelector('#erase');
    const destroyBtn = document.querySelector('#destroy');
    const lineWidth = document.querySelector('#line-width');
    const canvas = document.querySelector("#drawing-board");
    const ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 500;
 
    ctx.lineWidth=lineWidth.value;
    ctx.moveTo(0,0);

    const colors=[
     "#ff3838",
     "#ffb8b8",
     "#c56cf0",
     "#ff9f1a",
     "#fff200",
     "#32ff7e",
     "#7efff5",
    ]
    let isPainting = false;

    // mousemove evnet시, isPainting 값에 따라 그냥 마우스만 움직일지, 그림까지 그리며 움직일지 분기로 처리하는 함수.
    function onMove(event) {
      if (isPainting) {
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return;
      }

      ctx.beginPath(); // line 초기화
      ctx.moveTo(event.offsetX, event.offsetY);
    }

    //마우스를 클릭하면 isPainting 값이 true 로 바뀌며 onMove에서 그림을 그리는 기능을 수행.
    function startDrawing(event) {
      isPainting = true;
    }

    function cancelDrawing() {
      isPainting = false;
    }

    //line change 함수
    function selectLineWidth(event) {
        ctx.lineWidth = event.target.value;
    }
    
    // canvas 에서 색상을 선택하는 함수.
    function selectColorDraw(event){
        ctx.strokeStyle = event.target.value;
        ctx.fillStyle = event.target.value;
    }

    // canvas 지우는 함수.
    function destroyCanvas(){
        ctx.fillStyle = "white";
        ctx.fillRect(0,0,600,700);
    }

    // 지우개 생성.
    function onEraseClick(){
        ctx.strokeStyle="white";
        ctx.fillStyle="white";
    }
    
    // canvas draw 활성화 함수.
    function onWriteDrawing(){
        ctx.strokeStyle=selectColor.value;
    }

    //Listener
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mouseup", cancelDrawing);
    canvas.addEventListener("mouseleave",cancelDrawing);
    lineWidth.addEventListener("change",selectLineWidth);
    selectColor.addEventListener("change",selectColorDraw);
    destroyBtn.addEventListener("click",destroyCanvas);
    eraseBtn.addEventListener('click',onEraseClick);
    writeBtn.addEventListener('click',onWriteDrawing);
}