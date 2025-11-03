import { ComputedActiveSession } from "../admin/sessions/active/getActiveSessions";
import { refetchFlagType } from "../table/types";

export type CardByType = {
  activeSession: ComputedActiveSession;
  // later: tutors: ComputedTutorRow, etc.
};

export interface CardGridProps<K extends keyof CardByType> {
  type: K;
  data: CardByType[K][];
  loading?: boolean;
  lastUpdated?: Date;
  layoutClassName?: string;
  emptyMessage?: string;
  handleCardClick: (item: CardByType[K]) => void;
  getKey?: (item: CardByType[K], index: number) => string | number;
  setRefetchFlag: refetchFlagType;
}
