let player1 = null;
let player2 = null;
let currentPlayer = null;

const initGame = () => {
  const board = document.querySelector(".game_board_container");
  const welcomeDialog = document.getElementById("welcomeDialog");

  welcomeDialog?.showModal();

  welcomeDialog?.addEventListener("close", (e) => {
    const p1Input = document.getElementById("playerOneInput").value.trim();
    const p2Input = document.getElementById("playerTwoInput").value.trim();

    player1 = p1Input || "Player 1";
    player2 = p2Input || "Player 2";
    currentPlayer = player1;
  });

  board.addEventListener("click", (e) => {
    const item = e.target.closest(".game_board_item");

    if (!item) {
      return;
    }

    const square = document.getElementById(item.id);

    if (
      square.querySelector(".x_mark_container") !== null ||
      square.querySelector(".o_mark") !== null
    ) {
      return;
    }

    console.log(currentPlayer);

    if (currentPlayer === player1) {
      square.append(createXMark());
      currentPlayer = player2;
    } else {
      square.append(createOMark());
      currentPlayer = player1;
    }
  });
};

const createXMark = () => {
  const container = Object.assign(document.createElement("div"), {
    className: "x_mark_container"
  });

  const leftCross = Object.assign(document.createElement("div"), {
    className: "x_mark left_cross"
  });

  const rightCross = Object.assign(document.createElement("div"), {
    className: "x_mark right_cross"
  });

  container.append(leftCross, rightCross);

  return container;
};

const createOMark = () => {
  const container = Object.assign(document.createElement("div"), {
    className: "o_mark"
  });

  return container;
};

if (typeof window !== "undefined" && typeof exports === "undefined") {
  initGame();
}

if (typeof exports !== "undefined") {
  Object.assign(exports, { createXMark, createOMark, initGame });
}
