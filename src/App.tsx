import React from 'react';
import logo from './logo.svg';
import './App.css';
import {AppContainer} from "./styles";
import {Column} from "./Column";
import {AddNewItem} from "./AddNewItem";

export const App = () => {
    return (
        <AppContainer>
            <Column text="Todo:"></Column>
            <AddNewItem
                onAdd={() => console.log("Add new card")}
                toggleButtonText={"+ Add another list"}/>
        </AppContainer>
    )
}

