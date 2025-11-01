import { ComputedActiveSessionRow } from "../admin/sessions/active/getActiveSessions";
import { refetchFlagType } from "../table/types";

export type CardSection = "header" | "body" | "footer";

type cardGridTypes = "activeSessions";

export type CardByType = {
  activeSessions: ComputedActiveSessionRow;
};

export interface CardGridProps<T> {
  data: T[];
  fields: CardField<T>[];
  loading?: boolean;
  layoutClassName?: string;
  emptyMessage?: string;
  countWhenLoading?: number;
  getKey?: (item: T, index: number) => string | number;
  type: cardGridTypes;
  setRefetchFlag: refetchFlagType;
}

export interface CardField<T> {
  key: keyof T;
  label?: string;
  section?: CardSection;
  render?: (item: T) => React.ReactNode;
}

export interface CardProps<T> {
  data: T;
  fields: CardField<T>[];
}
