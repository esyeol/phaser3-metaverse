      
      const menu = document.getElementById("menu");

      // 메뉴 클릭시 hidden 제거.
      const showMenu = (flag) => {
        menu.classList.toggle("hidden");
      };
    
    // set the default active slide to the first one
    let slideIndex = 1;
    showSlide(slideIndex);

    // change slide with the prev/next button
    function moveSlide(moveStep) {
        showSlide(slideIndex += moveStep);
    }

    // change slide with the dots
    function currentSlide(n) {
        showSlide(slideIndex = n);
    }

    function showSlide(n) {
        let i;
        // 추후 서버에서 가져온 캐릭터 수 만큼 dot + slides 동적 생성.
        const slides = document.getElementsByClassName("slide");
        const dots = document.getElementsByClassName('dot'); 
        
        if (n > slides.length) { slideIndex = 1 }
        if (n < 1) { slideIndex = slides.length }

        // hide all slides
        for (i = 0; i < slides.length; i++) {
            slides[i].classList.add('hidden');
        }

        // remove active status from all dots
        for (i = 0; i < dots.length; i++) {
            dots[i].classList.remove('bg-gray-600');
            dots[i].classList.add('bg-gray-300');
        }
        // show the active slide
        slides[slideIndex - 1].classList.remove('hidden');

        // highlight the active dot
        dots[slideIndex - 1].classList.remove('bg-gray-300');
        dots[slideIndex - 1].classList.add('bg-gray-600');
    }

    // avator 클릭시 -> border 테두리 속성 적용 + 캐릭터 중복 선택 방지 + 한 번 더 클릭시, 테두리 제거. 
    const selAvator = () =>{
        alert('click');
    }

  