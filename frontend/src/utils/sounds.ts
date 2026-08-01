import { Howl } from "howler";

export const spinSound = new Howl({
  src: ["/sounds/spin.mp3"],
  volume: 0.6,
});

export const tickSound = new Howl({
  src: ["/sounds/tick.mp3"],
  volume: 0.35,
});

export const winSound = new Howl({
  src: ["/sounds/win.mp3"],
  volume: 0.8,
});

export const loseSound = new Howl({
  src: ["/sounds/lose.mp3"],
  volume: 0.7,
});