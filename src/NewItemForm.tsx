import React, { useState } from "react";
import { NewItemButton, NewItemFormContainer, NewItemInput } from "./styles";
import { useFocus } from "./utils/useFocus";

type NewItemFormProps = {
  onAdd(text: string): void;
};

const MyComponent = ({ onAdd }: NewItemFormProps) => {
  const [inputText, setInputText] = useState("");
  const inputRef = useFocus();

  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onAdd(inputText);
    }
  };

  return (
    <NewItemFormContainer>
      <NewItemInput
        onKeyDown={handleEnterPress}
        ref={inputRef}
        placeholder={"Type here"}
        onChange={(e) => setInputText(e.target.value)}
      ></NewItemInput>
      <NewItemButton onClick={() => onAdd(inputText)}> Create</NewItemButton>
    </NewItemFormContainer>
  );
};

export default MyComponent;
