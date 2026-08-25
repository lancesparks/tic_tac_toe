let player1 = null;
let player2 = null;
let currentPlayer = null;
let currentScores = {
  player1: 0,
  player2: 0
};
const winConditions = {
  diagonalTopLeft: ["tl", "mm", "br"],
  diagonalTopRight: ["tr", "mm", "bl"],
  straightTop: ["tl", "tm", "tr"],
  straightMiddle: ["ml", "mm", "mr"],
  straightBottom: ["bl", "bm", "br"],
  TopLeft: ["tl", "ml", "bl"],
  topMiddle: ["tm", "mm", "bm"],
  TopRight: ["tr", "mr", "br"]
};

let moves = {
  X: [],
  O: []
};

let gameOver = false;

const winMap = new Map();

const initGame = () => {
  const board = document.querySelector(".game_board_container");
  const welcomeDialog = document.getElementById("welcomeDialog");
  const newGame = document.getElementById("newGame");

  welcomeDialog?.showModal();

  welcomeDialog?.addEventListener("close", (e) => {
    const p1Input = document.getElementById("playerOneInput").value.trim();
    const p2Input = document.getElementById("playerTwoInput").value.trim();

    player1 = p1Input || "Player 1";
    player2 = p2Input || "Player 2";
    currentPlayer = player1;
    addPlayers();
  });

  board.addEventListener("click", (e) => {
    if (gameOver) {
      return;
    }
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

    if (currentPlayer === player1) {
      square.append(createXMark());
      checkSquareSymbol(square);
      currentPlayer = player2;
    } else {
      square.append(createOMark());
      checkSquareSymbol(square);
      currentPlayer = player1;
    }
  });

  newGame.addEventListener("click", () => {
    handleNewGame();
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

const addPlayers = () => {
  const container = document.getElementById("scores");
  const p1 = document.getElementById("player1_name");
  const p2 = document.getElementById("player2_name");

  p1.prepend(player1);
  p2.prepend(player2);

  container.classList.remove("hide");
};

const checkSquareSymbol = (square) => {
  const squareID = square.id;
  let currentSymbol = "";

  if (square.querySelector(".x_mark_container")) {
    currentSymbol = "X";
  }

  if (square.querySelector(".o_mark")) {
    currentSymbol = "O";
  }

  moves = {
    ...moves,
    [currentSymbol]: [...moves[currentSymbol], squareID]
  };

  for (const [key, value] of Object.entries(winConditions)) {
    let xWin = checkWin(moves["X"], value);
    let oWin = checkWin(moves["O"], value);
    if (xWin || oWin) {
      handleWin();
      return;
    }
  }

  if (moves["X"].length + moves["O"].length === 9) {
    handleWin(true);
    return;
  }
};

const checkWin = (moves, winConditions) => {
  return winConditions.every((id) => moves.includes(id));
};

const handleWin = (isDraw = false) => {
  const button = document.getElementById("newGame");
  const scores = document.getElementById("scores_container");
  const winBanner = Object.assign(document.createElement("p"), {
    id: "winBanner"
  });

  scores.append(winBanner);
  button.classList.remove("hide");

  gameOver = true;

  if (!isDraw) {
    handleUpdateScore(currentPlayer);
    document.getElementById("winBanner").append(`${currentPlayer} wins!`);
  }

  if (isDraw) {
    document.getElementById("winBanner").append(`It is a draw!`);
  }
};

const handleUpdateScore = (currentPlayer) => {
  const player1Score = document.getElementById("player1_score");
  const player2Score = document.getElementById("player2_score");

  if (currentPlayer === player1) {
    currentScores.player1 += 1;
    player1Score.textContent = currentScores.player1;
  }

  if (currentPlayer === player2) {
    currentScores.player2 += 1;
    player2Score.textContent = currentScores.player2;
  }
};

const handleNewGame = () => {
  gameOver = false;

  document
    .querySelectorAll(".x_mark_container, .o_mark, #winBanner")
    .forEach((mark) => {
      mark.remove();
    });

  const button = document.getElementById("newGame");
  button.classList.add("hide");

  moves = {
    X: [],
    O: []
  };

  currentPlayer = player1;
};

if (typeof window !== "undefined" && typeof exports === "undefined") {
  initGame();
}

if (typeof exports !== "undefined") {
  Object.assign(exports, { createXMark, createOMark, initGame });
}
