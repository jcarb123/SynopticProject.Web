import { EventEmitter } from "events";
export const eventBus = new EventEmitter();

export let basketCount = 0;

export const incrementBasketCount = () => {
  basketCount++;
  eventBus.emit("update-basket", basketCount);
};

export const completeOrder = () => {
  basketCount = 0;
  eventBus.emit("update-basket", basketCount);
};
