import React from "react";
import { ColumnContainer, ColumnTitle } from "./styles";
import { AddNewItem } from "./AddNewItem";
import { Card } from "./Card";

type ColumnProps = {
  text: string;
};

export const Column = ({ text }: ColumnProps) => {
  return (
    <ColumnContainer>
      <ColumnTitle>{text}</ColumnTitle>
      <Card text={"Generate app scaffold"}></Card>
      <Card text={"Learn TypeScript"}></Card>
      <Card text={"Begin to use static typing"}></Card>
      <AddNewItem
        $dark
        toggleButtonText="+ Add another task"
        onAdd={(text) => console.log("Added ", text, " to column ", text)}
      />
    </ColumnContainer>
  );
};
