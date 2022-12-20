const menu = document.getElementById("menu");
const enterBtn = document.getElementById('enter-metaverse');
const enterClass = document.getElementById('enter-classroom');
const enter2Class = document.getElementById('enter-2-classroom');

// set the default active slide to the first one
let slideIndex = 1;
showSlide(slideIndex);

let imgPath=""; // 이미지 경로를 저장하기 위한 전역 스코프.

// change slide with the prev/next button
function moveSlide(moveStep) {
  showSlide((slideIndex += moveStep));
}

// change slide with the dots
function currentSlide(n) {
  showSlide((slideIndex = n));
}

function showSlide(n) {
  let i;
  // 추후 서버에서 가져온 캐릭터 수 만큼 dot + slides 동적 생성.
  const slides = document.getElementsByClassName("slide");
  const dots = document.getElementsByClassName("dot");

  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }

  // hide all slides
  for (i = 0; i < slides.length; i++) {
    slides[i].classList.add("hidden");
  }

  // remove active status from all dots
  for (i = 0; i < dots.length; i++) {
    dots[i].classList.remove("bg-gray-600");
    dots[i].classList.add("bg-gray-300");
  }
  // show the active slide
  slides[slideIndex - 1].classList.remove("hidden");

  // highlight the active dot
  dots[slideIndex - 1].classList.remove("bg-gray-300");
  dots[slideIndex - 1].classList.add("bg-gray-600");
}

/**
 * 유저가 캐릭터를 선택했을 때, 테두리 추가 & 이미지 경로를 리턴하는 메서드.
 * @param getId -> 유저가 onclick시 this.id를 통해 받아온 element의 id 값.
 */
const selAvator = (getId) => {
  console.log(getId);

  let imgUrl = document.getElementById(getId); // 이미지 경로를 받아옴.
  console.log(imgUrl.src); // 이미지 경로를 받아옴.
  
  addBorder(imgUrl.parentElement.getAttribute('id'));
  
  imgPath  = imgUrl.src; // 전역스코프에 유저가 클릭한 이미지 path 할당.
};

// 캐릭터 선택시 border 테두리 생성 메서드 선택한 요소만 ui상 추가해야하며,나머지는 지워야함.
const addBorder = (borderId) =>{
    // DOM에서 div_i 이름을 가진 애들을 조회하고, 초기화 시켜줌. -> 더 좋은 방식 없나 고민해보기. 추후 API 서버와 연동 후 로직 수정해야함.
    for(let i =1;i<=4;i++){
        const define = document.getElementById(`div_${i}`);
        console.log(define);
        define.classList.remove('border-4');
        define.classList.remove('border-indigo-600');
    }

    const changeBorder = document.getElementById(borderId);
    changeBorder.classList.add('border-4','border-indigo-600'); // 다중 classNameSpace 추가시, 에러남 반드시 각 클래스 네임별로 나눠서 추가해야함.
}

const showMenu = () => {
  menu.classList.remove("hidden");
};

const hideMenu = () => {
    closeModal();
    console.log(`url-> ${imgPath}`);
    document.getElementById('selAvator').src=imgPath;
    enterBtn.classList.remove('hidden');
    enterBtn.classList.add('inline-block');
    enterClass.classList.remove('hidden');
    enterClass.classList.add('inline-block');
    enter2Class.classList.remove('hidden');
    enter2Class.classList.add('inline-block');
};

// x 버튼 클릭시 modal 닫는 메서드.
const closeModal =() => {
  menu.classList.add("hidden");
}

/**
 * 메타버스 입장하기 btn 클릭시 square로 입장하는 메서드.
 * backpress 눌렀을 때, index.html 스택에서 삭제여부는 고려. 
*/
enterBtn.addEventListener('click',()=>{
  location.href="/square?key=HS";
});

/**
 * 메타버스 입장하기 btn 클릭시 square로 입장하는 메서드.
 * backpress 눌렀을 때, index.html 스택에서 삭제여부는 고려. 
*/
enterClass.addEventListener('click',()=>{
  location.href="/square?key=STUDY&id=bbbb";
});

enter2Class.addEventListener('click',()=>{
  location.href="/square?key=STUDY&id=aaaa";
})