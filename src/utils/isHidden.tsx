import { DragItem } from "../DragItem";

export const isHidden = (
  dragItem: DragItem | null,
  type: string,
  id: string,
): boolean => {
  return Boolean(dragItem && dragItem.id === id && dragItem.type === type);
};
