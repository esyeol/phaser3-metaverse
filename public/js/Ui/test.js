export default function test(userName,id){

    const getList = document.querySelector('#n-user-list');
    const addUserTag = document.createElement('option');

    addUserTag.setAttribute('id',userName); 
    addUserTag.setAttribute('value',id);
    addUserTag.setAttribute('class',"text-slate-900");

    addUserTag.innerHTML=`${userName}`;
    
    // addUserTag.addEventListener('change',()=>{
        
    // });


    getList.appendChild(addUserTag);
}