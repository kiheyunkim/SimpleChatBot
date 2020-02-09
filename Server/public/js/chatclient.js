let sendbutton;
let messages;
let max;
let inputArea;

let AdjustCaretPoint =()=>{
      let height = $("#text").height();
      if(height > max) {
          $("#box").scrollTop(height);
      }
  }

let AddMessage = (message)=>{
  let newDiv = document.createElement('div');
  newDiv.innerHTML = message;
  messages.appendChild(newDiv);
  AdjustCaretPoint();
}

SendMessage = (msg, data) => {
  let jsonData = JSON.stringify({'message':data});  //Json 변환
  
  let xhr = new XMLHttpRequest();
  xhr.open('POST', msg);
  xhr.setRequestHeader('Content-type', "application/json");  // content-type을 설정하고 데이터 송신
  xhr.send(jsonData); 
  
  xhr.addEventListener('load', function(){   // 데이터 수신에 대한 결과 출력
    let result = JSON.parse(xhr.responseText);
    console.log(xhr);
    AddMessage(`<div class = 'botMessage'>  ${result['result']} </div>`);
  });
}

$(document).ready(()=>{
    max = $("#box").height();
    messages = document.getElementById('text')
    sendbutton = document.querySelector('#messageSend');
    inputArea = document.querySelector('input');
    $(inputArea).focus();

    sendbutton.addEventListener('click', function(){
        //버튼 id messageSend에 click 등록 및 그에 따른 반응 등록
        let inputdata =inputArea.value;
        AddMessage(`<div class = 'youMessage'>   ${inputArea.value} </div>`);
        inputArea.value='';
        SendMessage('/simplechatBot', inputdata);
      });

      $(document).keyup((event)=>{
        if(event.keyCode === '13'){
          let inputArea = document.querySelector('input');
          $(inputArea).focus();
          $(sendbutton).click();
        }
      });
});