import React from "react";
import "./App.css";
import { AppContainer } from "./styles";
import { Column } from "./Column";
import { AddNewItem } from "./AddNewItem";
import { useAppState } from "./state/AppStateContext";

export const App = () => {
  const { lists } = useAppState();

  return (
    <AppContainer>
      {lists.map((list) => (
        <Column text={list.text} key={list.id} id={list.id} />
      ))}
      <AddNewItem
        onAdd={(text) => console.log("Add new card ", text)}
        toggleButtonText={"+ Add another list"}
      />
    </AppContainer>
  );
};
