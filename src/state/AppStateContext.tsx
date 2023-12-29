import { createContext, Dispatch, FC, ReactNode, useContext } from "react";
import { AppState, appStateReducer, List, Task } from "./appStateReducer";
import { Action } from "./actions";
import { useImmerReducer } from "use-immer";
import { DragItem } from "../DragItem";

const appData: AppState = {
  draggedItem: null,
  lists: [
    {
      id: "0",
      text: "To Do",
      tasks: [{ id: "c0", text: "Generate app scaffold" }],
    },
    {
      id: "1",
      text: "In Progress",
      tasks: [
        { id: "c2", text: "Learn TypeScript" },
        { id: "c3", text: "Learn C#" },
      ],
    },
    {
      id: "2",
      text: "Done",
      tasks: [{ id: "c3", text: "Begin to use static typing" }],
    },
  ],
};

type AppStateContextValue = {
  lists: List[];
  findTasksByListId(id: string): Task[];
  draggedItem: DragItem | null;
  dispatch: Dispatch<Action>;
};

const AppStateContext = createContext<AppStateContextValue>(
  {} as AppStateContextValue,
);

type AppStateProviderProps = {
  children: ReactNode;
};

export const AppStateProvider: FC<AppStateProviderProps> = ({ children }) => {
  const [state, dispatch] = useImmerReducer(appStateReducer, appData);
  const { lists, draggedItem } = state;
  const findTasksByListId = (id: string) => {
    return lists.find((list) => list.id === id)?.tasks || [];
  };

  return (
    <AppStateContext.Provider
      value={{ lists, findTasksByListId, draggedItem, dispatch }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  return useContext(AppStateContext);
};
