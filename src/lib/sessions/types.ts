import { Dispatch, SetStateAction } from "react";

export interface SessionDataProps<T> {
  setSelectedSession: Dispatch<SetStateAction<T | null>>;
  setCount: Dispatch<SetStateAction<number>>;
}
