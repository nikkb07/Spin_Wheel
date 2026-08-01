interface RewardItem {
  id: number;
  probability: number;
}

export function weightedRandom<T extends RewardItem>(
  items: T[]
): T {
  const totalWeight = items.reduce(
    (sum, item) => sum + item.probability,
    0
  );

  let random = Math.random() * totalWeight;

  for (const item of items) {
    random -= item.probability;

    if (random <= 0) {
      return item;
    }
  }

  return items[items.length - 1];
}