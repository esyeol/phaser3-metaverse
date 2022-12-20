

const postTest = document.querySelector('#postTest');
let obj = {
    key:"eyJhbGciOiJzaGEyNTYiLCJ0eXAiOiJKV1QifS57IlVzZXJfSUQiOiJNVEV3IiwiVV9OYW1lIjoiYUc5dVp6UT0iLCJVX0VtYWlsIjoiYUc5dVp6UkFibUYyWlhJdVkyOXQifS4yN2Y0Nzg5NjczYjFlNWRkYzZmNzRhZTI2NDRmNDQ4YmUzNzhkZmNjZmI0YzNmNTM3MzEyNTAzNTMzOTBkYjJi",
}

let test;
postTest.addEventListener('click',()=>{
    fetch("/",{
        method: "POST",
        headers : {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
    })
    .then((response)=>response.json())
    .then((data)=>{console.log(data.key);})
    .catch((error)=>{
        console.log(`전송 실패 : ${error}`);
    });
});

// console.log(`??::${test}`)