import { ComputedActiveSession } from "../../lib/sessions/active/getActiveSessions";
import { refetchFlagType } from "../table/types";
import { ComputedResourceType } from "../users/resources/getResources";
import { CompletedSessionsType } from "../users/sessions/completed/getCompletedSessions";

export type cardTypes = "activeSession" | "resource" | "compSessions";

export type CardByType = {
  activeSession: ComputedActiveSession;
  resource: ComputedResourceType;
  compSessions: CompletedSessionsType;
};

export interface CardGridProps<K extends keyof CardByType> {
  type: K;
  data: CardByType[K][];
  loading?: boolean;
  lastUpdated?: Date;
  layoutClassName: string;
  emptyMessage?: string;
  handleCardClick?: (item: CardByType[K]) => void;
  getKey?: (item: CardByType[K], index: number) => string | number;
  setRefetchFlag?: refetchFlagType;
  role?: "tutor" | "student";
}
