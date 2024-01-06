import { DragItem } from "../DragItem";
import { useAppState } from "../state/AppStateContext";
import { useDrag } from "react-dnd";
import { setDraggedItem } from "../state/actions";
import { useEffect } from "react";
import { getEmptyImage } from "react-dnd-html5-backend";

export const useItemDrag = (item: DragItem) => {
  const { dispatch } = useAppState();
  const [, drag, preview] = useDrag({
    end: () => {
      dispatch(setDraggedItem(null));
    },
    item: () => {
      dispatch(setDraggedItem(item));
      return item;
    },
    type: item.type,
  });

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  return { drag };
};
