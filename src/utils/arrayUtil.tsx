type Item = {
  id: string;
};

export function findItemIndexById<TItem extends Item>(
  items: TItem[],
  id: string,
) {
  return items.findIndex((i) => i.id === id);
}
function removeItemAtIndex<TItem extends Item>(items: TItem[], index: number) {
  return [...items.slice(0, index), ...items.slice(index + 1)];
}
function insertItemAtIndex<TItem extends Item>(
  items: TItem[],
  index: number,
  item: TItem,
) {
  return [...items.slice(0, index), item, ...items.slice(index)];
}

export function moveItem<TItem extends Item>(
  items: TItem[],
  from: number,
  to: number,
) {
  const item = items[from];
  const newItems = removeItemAtIndex(items, from);
  return insertItemAtIndex(newItems, to, item);
}
