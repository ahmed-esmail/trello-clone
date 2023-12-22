import React, { useState } from "react";
import { NewItemButton, NewItemFormContainer, NewItemInput } from "./styles";

type NewItemFormProps = {
  onAdd(text: string): void;
};

const MyComponent = ({ onAdd }: NewItemFormProps) => {
  const [inputText, setInputText] = useState("");
  return (
    <NewItemFormContainer>
      <NewItemInput
        onChange={(e) => setInputText(e.target.value)}
      ></NewItemInput>
      <NewItemButton onClick={() => onAdd(inputText)}> Create</NewItemButton>
    </NewItemFormContainer>
  );
};

export default MyComponent;
