import { useContext, createContext, FC, ReactNode } from "react";

type Task = {
  id: string;
  text: string;
};

type List = {
  id: string;
  text: string;
  tasks: Task[];
};

type AppState = {
  lists: List[];
};

const appData: AppState = {
  lists: [
    {
      id: "0",
      text: "To Do",
      tasks: [{ id: "c0", text: "Generate app scaffold" }],
    },
    {
      id: "1",
      text: "In Progress",
      tasks: [{ id: "c2", text: "Learn TypeScript" }],
    },
    {
      id: "2",
      text: "Done",
      tasks: [{ id: "c3", text: "Begin to use static typing" }],
    },
  ],
};

type AppStateContextProps = {
  state: List[];
  getTasksByListId(id: string): Task[];
};

const appStateContext = createContext<AppStateContextProps>(
  {} as AppStateContextProps,
);

type AppStateProviderProps = {
  children: ReactNode;
};

export const AppStateProvider: FC<AppStateProviderProps> = ({ children }) => {
  const { lists } = appData;

  const getTasksByListId = (id: string) => {
    return lists.find((list) => list.id === id)?.tasks || [];
  };

  return (
    <appStateContext.Provider value={{ state: lists, getTasksByListId }}>
      {children}
    </appStateContext.Provider>
  );
};

export const useAppState = () => {
  return useContext(appStateContext);
};
