import React from "react";
import { ColumnContainer, ColumnTitle } from "./styles";
import { AddNewItem } from "./AddNewItem";
import { Card } from "./Card";
import { useAppState } from "./state/AppStateContext";

type ColumnProps = {
  text: string;
  id: string;
};

export const Column = ({ text, id }: ColumnProps) => {
  const { getTasksByListId } = useAppState();
  return (
    <ColumnContainer>
      <ColumnTitle>{text}</ColumnTitle>
      {getTasksByListId(id).map((task) => (
        <Card text={task.text} key={task.id} />
      ))}
      <AddNewItem
        $dark
        toggleButtonText="+ Add another task"
        onAdd={(text) => console.log("Added ", text, " to column ", text)}
      />
    </ColumnContainer>
  );
};
