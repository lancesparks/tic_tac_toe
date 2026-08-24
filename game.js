const initGame = () => {
  const board = document.querySelector(".game_board_container");

  board.addEventListener("click", (e) => {
    const item = e.target.closest(".game_board_item");
    if (!item) {
      return;
    }

    const square = document.getElementById(item.id);

    if (square.querySelector(".x_mark_container") !== null) {
      return;
    }

    square.append(createOMark());
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
