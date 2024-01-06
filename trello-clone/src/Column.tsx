import React, { useRef } from "react";
import { ColumnContainer, ColumnTitle } from "./styles";
import { AddNewItem } from "./AddNewItem";
import { Card } from "./Card";
import { useAppState } from "./state/AppStateContext";
import { addTask, moveList, moveTask, setDraggedItem } from "./state/actions";
import { useItemDrag } from "./utils/useItemDrag";
import { useDrop } from "react-dnd";
import { throttle } from "throttle-debounce-ts";
import { isHidden } from "./utils/isHidden";

type ColumnProps = {
  text: string;
  id: string;
  isPreview?: boolean;
};

export const Column = ({ text, id, isPreview }: ColumnProps) => {
  const { findTasksByListId, dispatch, draggedItem } = useAppState();
  const tasks = findTasksByListId(id).filter(
    (item) => item !== undefined && item !== null,
  );
  const ref = useRef<HTMLDivElement>(null);
  const { drag } = useItemDrag({ type: "COLUMN", id: id, text: text });
  const [, drop] = useDrop({
    accept: ["COLUMN", "CARD"],
    hover: throttle(200, () => {
      if (!draggedItem) return;

      if (draggedItem.type === "COLUMN") {
        if (draggedItem.id !== id) {
          dispatch(moveList(draggedItem.id, id));
        }
      } else if (draggedItem.columnId !== id && tasks.length === 0) {
        dispatch(moveTask(draggedItem.id, null, draggedItem.columnId, id));
        dispatch(setDraggedItem({ ...draggedItem, columnId: id }));
      }
    }),
  });

  drag(drop(ref));

  return (
    <ColumnContainer
      $isPreview={isPreview}
      $isHidden={isHidden(draggedItem, "COLUMN", id, isPreview)}
      ref={ref}
    >
      <ColumnTitle>{text}</ColumnTitle>
      {tasks.map((task) => (
        <Card
          text={task.text}
          key={task.id}
          columnId={id}
          id={task.id}
          isPreview={isPreview}
        />
      ))}
      <AddNewItem
        $dark
        toggleButtonText="+ Add another task"
        onAdd={(text) => dispatch(addTask(text, id))}
      />
    </ColumnContainer>
  );
};
