import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { AppState, appStateReducer, List, Task } from "./appStateReducer";
import { Action } from "./actions";
import { useImmerReducer } from "use-immer";
import { DragItem } from "../DragItem";
import { save } from "../Api";
import { withInitialState } from "../withInitialState";

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
  initialState: AppState;
};

export const AppStateProvider = withInitialState<AppStateProviderProps>(
  ({ children, initialState }) => {
    const [state, dispatch] = useImmerReducer(appStateReducer, initialState);

    useEffect(() => {
      save(state);
    }, [state]);

    const { draggedItem, lists } = state;
    return (
      <AppStateContext.Provider
        value={{
          draggedItem,
          lists,
          findTasksByListId(id: string): Task[] {
            return lists.find((list) => list.id === id)?.tasks || [];
          },
          dispatch,
        }}
      >
        {children}
      </AppStateContext.Provider>
    );
  },
);

export const useAppState = () => {
  return useContext(AppStateContext);
};
