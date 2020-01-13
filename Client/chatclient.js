window.onload = ()=>{
    document.querySelector('#messageSend').addEventListener('click', function(){
        //버튼 id messageSend에 click 등록 및 그에 따른 반응 등록
        var inputArea = document.querySelector('input');
        var inputdata =inputArea.value;
        inputArea.value='';

        sendMessage('http://localhost:8080/simplechatBot', inputdata)
      });
}

function sendMessage(url, data){ 
  var data = {'message':data};  //포멧 message: 메세지
  data = JSON.stringify(data);  //Json 변환

  var xhr = new XMLHttpRequest();
  xhr.open('POST', url);
  xhr.setRequestHeader('Content-type', "application/json");  // content-type을 설정하고 데이터 송신
  xhr.send(data); 
  
  xhr.addEventListener('load', function(){   // 데이터 수신에 대한 결과 출력
    var result = JSON.parse(xhr.responseText);
    console.log(result);
    document.querySelector('#result').value = result['result'];
  });
}