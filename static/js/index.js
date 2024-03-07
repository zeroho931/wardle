let attempts = 0;
let index = 0;

function appStart() {
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료되었습니다.";
    div.style =
      "display:flex; justify-content:center; align-item:center; position:absolute;top:40vh;left:45vw;background-color:white;";
    document.body.appendChild(div);
  };
  const nexLine = () => {
    if (attempts === 6) return GameEnd();
    attempts += 1;
    index = 0;
  };
  const GameEnd = () => {
    window.removeEventListener("keydown", handlekeydown);
    displayGameover();
  };

  const handleEnterkey = async () => {
    let 맞은_갯수 = 0;

    const 응답 = await fetch("/answer");
    const 정답_객체 = await 응답.json();
    const 정답 = 정답_객체.answer;

    let 키보드_로컬 = 0;

    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );
      const 입력한_글자 = block.innerText;
      const 정답_글자 = 정답[i];

      const 키보드_입력 = document.querySelector(
        `.keyboard[data-index='${입력한_글자}']`
      );
      const 키보드_정답 = document.querySelector(
        `.keyboard[data-index='${정답_글자}']`
      );

      if (입력한_글자 === 정답_글자) {
        맞은_갯수 += 1;
        block.style.background = "#6AAA64";
        if (키보드_입력 == 키보드_정답) {
          키보드_입력.style.background = "#6AAA64";
          키보드_로컬 += 1;
        }
      } else if (정답.includes(입력한_글자)) {
        block.style.background = "#C9B458";
        if (!키보드_로컬 == 1) {
          키보드_입력.style.background = "#C9B458";
        }
      } else {
        block.style.background = "#787C7E";
      }
      block.style.color = "white";
    }
    if (맞은_갯수 === 5) GameEnd();
    else nexLine();
  };
  const handleBackspace = () => {
    const preBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index - 1}']`
    );
    if (index !== 0) {
      index -= 1;
      preBlock.innerText = "";
    }
  };

  const handlekeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );

    if (event.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (event.key === "Enter") handleEnterkey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index += 1;
    }
  };

  window.addEventListener("keydown", handlekeydown);

  const clickevent = (event) => {
    const thisBlock_click = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );
    const clickBlock = document.querySelector(
      `.key[data-index='${event.target.innerText}']`
    );

    console.log(clickBlock, event.target.innerText);

    if (event.target.alt === "백") handleBackspace();
    else if (event.target.innerText == "ENTER") {
      console.log("dddd");
      if (index === 5) handleEnterkey();
      else return;
    } else {
      console.log("sss");
      thisBlock_click.innerText = event.target.innerText;
      index += 1;
    }
  };

  window.addEventListener("click", clickevent);
}

appStart();
