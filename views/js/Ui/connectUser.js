/** 메타버스 내에 유저가 소켓 접속시, side-menu에 접속중인 유저 정보를 표시해주는 함수. */
export default function createUser(userName) {
    // userList 조회. 
    const userList = document.querySelector('#user-list');
    const addUserTag = document.createElement('li');
    
    // 추가된 TAG의 속성값 생성.
    addUserTag.setAttribute('class',"flex py-6");
    addUserTag.setAttribute('id',userName); 
    addUserTag.innerHTML=`${userName}`;
    // const test = addUserTag.createElement('div');
    // test.setAttribute('class','h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border border-gray-200');
    // test.innerHTML = "추가 TEST";

    userList.appendChild(addUserTag);

}