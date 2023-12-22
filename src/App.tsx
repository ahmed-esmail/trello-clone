import React from "react";
import "./App.css";
import { AppContainer } from "./styles";
import { Column } from "./Column";
import { AddNewItem } from "./AddNewItem";

export const App = () => {
  return (
    <AppContainer>
      <Column text="Todo:"></Column>
      <AddNewItem
        onAdd={(text) => console.log("Add new card ", text)}
        toggleButtonText={"+ Add another list"}
      />
    </AppContainer>
  );
};
