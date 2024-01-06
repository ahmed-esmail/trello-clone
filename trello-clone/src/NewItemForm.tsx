import React, { useState } from "react";
import { NewItemButton, NewItemFormContainer, NewItemInput } from "./styles";
import { useFocus } from "./utils/useFocus";

type NewItemFormProps = {
  onAdd(text: string): void;
};

const MyComponent = ({ onAdd }: NewItemFormProps) => {
  const [inputText, setInputText] = useState("");
  const [disable, setDisable] = useState(true);
  const inputRef = useFocus();

  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onAdd(inputText);
    }
  };

  const handleOnChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    if (!text || /^\s*$/.test(text)) {
      setDisable(true);
      return;
    }
    setDisable(false);
    setInputText(text);
  };

  return (
    <NewItemFormContainer>
      <NewItemInput
        onKeyDown={handleEnterPress}
        ref={inputRef}
        placeholder={"Type here"}
        onChange={(e) => handleOnChangeEvent(e)}
      ></NewItemInput>
      <NewItemButton onClick={() => onAdd(inputText)} disabled={disable}>
        {" "}
        Create
      </NewItemButton>
    </NewItemFormContainer>
  );
};

export default MyComponent;
