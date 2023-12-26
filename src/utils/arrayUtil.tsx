type Item = {
  id: string;
};

export const findItemIndexById = <TItem extends Item>(
  items: TItem[],
  id: string,
) => {
  return items.findIndex((i) => i.id === id);
};
