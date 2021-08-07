$(document).ready(() => {
	let sendbutton;
	let messages;
	let max;
	let inputArea;

	let adjustCaretPoint = () => {
		let height = $("#text").height();
		if (height > max) {
			$("#box").scrollTop(height);
		}
	}

	let addMessage = (message, isMe) => {
		let newDiv = document.createElement('div');
		if (isMe) {
			newDiv.setAttribute('id', 'you');
		}
		newDiv.innerHTML = message;
		messages.appendChild(newDiv);
		adjustCaretPoint();
	}

	let sendMessage = (msg, data) => {
		let jsonData = JSON.stringify({'message': data});  //Json 변환

		let xhr = new XMLHttpRequest();
		xhr.open('POST', msg);
		xhr.setRequestHeader('Content-type', "application/json");  // content-type을 설정하고 데이터 송신
		xhr.send(jsonData);

		xhr.addEventListener('load', function () {   // 데이터 수신에 대한 결과 출력
			let result = JSON.parse(xhr.responseText);
			addMessage(`
				<p class="botLabel">bot</p>
				<div class = 'botMessage'>  ${result.response} </div>`
				, false);
		});
	}


	max = $("#box").height();
	messages = document.getElementById('text')
	sendbutton = document.querySelector('#messageSend');
	inputArea = document.querySelector('input');
	$(inputArea).focus();

	sendbutton.addEventListener('click', function () {
		//버튼 id messageSend에 click 등록 및 그에 따른 반응 등록
		let inputData = inputArea.value;
		addMessage(`<div class = 'youMessage'>   ${inputArea.value} </div>`, true);
		inputArea.value = '';
		sendMessage('/simplechatBot', inputData);
	});

	$(document).keyup((event) => {
		if (event.keyCode === 13) {
			let inputArea = document.querySelector('input');
			$(inputArea).focus();
			$(sendbutton).click();
		}
	});
});