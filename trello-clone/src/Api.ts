import { AppState } from "./state/appStateReducer";

export const save = async (payload: AppState) => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/save`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Error while saving the state");
  }
};

export const load = async () => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/load`);
  if (response.ok) {
    return (await response.json()) as Promise<AppState>;
  } else {
    throw new Error("Error while loading the state");
  }
};
