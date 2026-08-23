const board = document.querySelector(".game_board_container");

board.addEventListener("click", (e) => {
  const item = e.target.closest(".game_board_item");
  if (!item) {
  }
});
