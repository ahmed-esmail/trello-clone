import { DragItem } from "../DragItem";

export const isHidden = (
  dragItem: DragItem | null,
  type: string,
  id: string,
  isPreview?: boolean,
): boolean => {
  return Boolean(
    !isPreview && dragItem && dragItem.id === id && dragItem.type === type,
  );
};
