import { DragItem } from "../DragItem";
import { useAppState } from "../state/AppStateContext";
import { useDrag } from "react-dnd";
import { setDraggedItem } from "../state/actions";

export const useItemDrag = (item: DragItem) => {
  const { dispatch } = useAppState();
  const [, drag] = useDrag({
    end: () => {
      dispatch(setDraggedItem(null));
    },
    item: () => {
      dispatch(setDraggedItem(item));
      return item;
    },
    type: item.type,
  });

  return { drag };
};
