import { Action } from "./actions";
import { nanoid } from "nanoid";
import { findItemIndexById, moveItem } from "../utils/arrayUtil";
import { DragItem } from "../DragItem";

export type Task = {
  id: string;
  text: string;
};

export type List = {
  id: string;
  text: string;
  tasks: Task[];
};

export type AppState = {
  lists: List[];
  draggedItem: DragItem | null;
};

export const appStateReducer = (
  draft: AppState,
  action: Action,
): AppState | void => {
  switch (action.type) {
    case "ADD_LIST": {
      draft.lists.push({ id: nanoid(), text: action.payload, tasks: [] });
      break;
    }
    case "ADD_TASK": {
      let targetListIndex = findItemIndexById(
        draft.lists,
        action.payload.listId,
      );
      draft.lists[targetListIndex].tasks.push({
        id: nanoid(),
        text: action.payload.text,
      });
      break;
    }
    case "MOVE_LIST": {
      let dragIndex = findItemIndexById(draft.lists, action.payload.draggedId);
      let hoverIndex = findItemIndexById(draft.lists, action.payload.hoverId);
      draft.lists = moveItem(draft.lists, dragIndex, hoverIndex);
      break;
    }
    case "SET_DRAGGED_ITEM": {
      draft.draggedItem = action.payload;
      break;
    }
    default: {
      break;
    }
  }
};
