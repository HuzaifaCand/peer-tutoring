import { Dispatch, SetStateAction } from "react";

export interface SessionDataProps<T> {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setSelectedSession: Dispatch<SetStateAction<T | null>>;
  setCount: Dispatch<SetStateAction<number>>;
}
