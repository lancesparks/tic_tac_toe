// game.test.js
/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach } from "vitest";
import { initGame, createXMark } from "./game.js";

describe("Tic-Tac-Toe Board Interactions", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="game_board_container">
        <div class="game_board_item" id="tl"></div>
        <div class="game_board_item" id="tm"></div>
      </div>
    `;

    initGame();
  });

  it("should append an O mark when an empty square is clicked", () => {
    const tlSquare = document.getElementById("tl");

    tlSquare.click();

    const oMark = tlSquare.querySelector(".o_mark");
    expect(oMark).not.toBeNull();
  });

  it.skip("should append an X mark when an empty square is clicked", () => {
    const tlSquare = document.getElementById("tl");

    tlSquare.click();

    const oMark = tlSquare.querySelector(".o_mark");
    expect(oMark).not.toBeNull();
  });

  it("should not append an O mark if the square already contains an X mark", () => {
    const tlSquare = document.getElementById("tl");
    tlSquare.append(createXMark());

    expect(tlSquare.querySelector(".x_mark_container")).not.toBeNull();

    tlSquare.click();
    const oMark = tlSquare.querySelector(".o_mark");
    expect(oMark).toBeNull();
  });

  it("should ignore clicks inside the container but outside an item square", () => {
    const boardContainer = document.querySelector(".game_board_container");

    boardContainer.click();

    const anyOMark = document.querySelector(".o_mark");
    expect(anyOMark).toBeNull();
  });
});
