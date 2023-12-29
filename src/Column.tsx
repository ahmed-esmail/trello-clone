import React, { useRef } from "react";
import { ColumnContainer, ColumnTitle } from "./styles";
import { AddNewItem } from "./AddNewItem";
import { Card } from "./Card";
import { useAppState } from "./state/AppStateContext";
import { addTask, moveList } from "./state/actions";
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
  const ref = useRef<HTMLDivElement>(null);
  const { drag } = useItemDrag({ type: "Column", id: id, text: text });
  const [, drop] = useDrop({
    accept: "Column",
    hover: throttle(200, () => {
      if (!draggedItem) {
        return;
      }
      if (draggedItem.type === "Column") {
        if (draggedItem.id === id) {
          return;
        }
        dispatch(moveList(draggedItem.id, id));
      }
    }),
  });

  drag(drop(ref));
  return (
    <ColumnContainer
      $isPreview={isPreview}
      $isHidden={isHidden(draggedItem, "Column", id, isPreview)}
      ref={ref}
    >
      <ColumnTitle>{text}</ColumnTitle>
      {findTasksByListId(id).map((task) => (
        <Card text={task.text} key={task.id} />
      ))}
      <AddNewItem
        $dark
        toggleButtonText="+ Add another task"
        onAdd={(text) => dispatch(addTask(text, id))}
      />
    </ColumnContainer>
  );
};
