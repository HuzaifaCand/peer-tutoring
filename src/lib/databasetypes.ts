export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5";
  };
  public: {
    Tables: {
      available_slots: {
        Row: {
          available: boolean | null;
          created_at: string | null;
          day: string;
          duration_minutes: number;
          hour: string;
          id: string;
          is_online: boolean | null;
          tutor_id: string | null;
        };
        Insert: {
          available?: boolean | null;
          created_at?: string | null;
          day: string;
          duration_minutes?: number;
          hour: string;
          id?: string;
          is_online?: boolean | null;
          tutor_id?: string | null;
        };
        Update: {
          available?: boolean | null;
          created_at?: string | null;
          day?: string;
          duration_minutes?: number;
          hour?: string;
          id?: string;
          is_online?: boolean | null;
          tutor_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "available_slots_tutor_id_fkey";
            columns: ["tutor_id"];
            isOneToOne: false;
            referencedRelation: "tutors";
            referencedColumns: ["id"];
          }
        ];
      };
      sessions: {
        Row: {
          academic_year: string;
          booked_at: string;
          cancel_reason: string | null;
          cancellation_source: string | null;
          cancelled_at: string | null;
          cancelled_by: string | null;
          completed_at: string | null;
          created_at: string;
          duration_minutes: number;
          id: string;
          is_online: boolean;
          rejection_reason: string | null;
          scheduled_for: string;
          short_reason: string | null;
          short_session: boolean | null;
          slot_id: string | null;
          start_time: string | null;
          status: string;
          student_id: string;
          subject: string;
          tutor_id: string;
          updated_at: string;
          verified: boolean | null;
          verified_by: string | null;
        };
        Insert: {
          academic_year: string;
          booked_at?: string;
          cancel_reason?: string | null;
          cancellation_source?: string | null;
          cancelled_at?: string | null;
          cancelled_by?: string | null;
          completed_at?: string | null;
          created_at?: string;
          duration_minutes?: number;
          id?: string;
          is_online?: boolean;
          rejection_reason?: string | null;
          scheduled_for: string;
          short_reason?: string | null;
          short_session?: boolean | null;
          slot_id?: string | null;
          start_time?: string | null;
          status: string;
          student_id: string;
          subject: string;
          tutor_id: string;
          updated_at?: string;
          verified?: boolean | null;
          verified_by?: string | null;
        };
        Update: {
          academic_year?: string;
          booked_at?: string;
          cancel_reason?: string | null;
          cancellation_source?: string | null;
          cancelled_at?: string | null;
          cancelled_by?: string | null;
          completed_at?: string | null;
          created_at?: string;
          duration_minutes?: number;
          id?: string;
          is_online?: boolean;
          rejection_reason?: string | null;
          scheduled_for?: string;
          short_reason?: string | null;
          short_session?: boolean | null;
          slot_id?: string | null;
          start_time?: string | null;
          status?: string;
          student_id?: string;
          subject?: string;
          tutor_id?: string;
          updated_at?: string;
          verified?: boolean | null;
          verified_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "sessions_cancelled_by_fkey";
            columns: ["cancelled_by"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "sessions_slot_id_fkey";
            columns: ["slot_id"];
            isOneToOne: false;
            referencedRelation: "available_slots";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "sessions_student_id_fkey";
            columns: ["student_id"];
            isOneToOne: false;
            referencedRelation: "students";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "sessions_tutor_id_fkey";
            columns: ["tutor_id"];
            isOneToOne: false;
            referencedRelation: "tutors";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "sessions_verified_by_fkey";
            columns: ["verified_by"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      students: {
        Row: {
          admin_seen: boolean;
          created_at: string;
          extra_info: string | null;
          grade: string;
          id: string;
          subjects: string[];
          updated_at: string;
        };
        Insert: {
          admin_seen?: boolean;
          created_at?: string;
          extra_info?: string | null;
          grade: string;
          id: string;
          subjects: string[];
          updated_at?: string;
        };
        Update: {
          admin_seen?: boolean;
          created_at?: string;
          extra_info?: string | null;
          grade?: string;
          id?: string;
          subjects?: string[];
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "students_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      tutors: {
        Row: {
          about: string | null;
          admin_seen: boolean;
          approved: boolean | null;
          created_at: string;
          credentials: string | null;
          grade: string;
          id: string;
          rejection_reason: string | null;
          subjects: string[];
          updated_at: string;
        };
        Insert: {
          about?: string | null;
          admin_seen?: boolean;
          approved?: boolean | null;
          created_at?: string;
          credentials?: string | null;
          grade: string;
          id: string;
          rejection_reason?: string | null;
          subjects: string[];
          updated_at?: string;
        };
        Update: {
          about?: string | null;
          admin_seen?: boolean;
          approved?: boolean | null;
          created_at?: string;
          credentials?: string | null;
          grade?: string;
          id?: string;
          rejection_reason?: string | null;
          subjects?: string[];
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "tutors_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      users: {
        Row: {
          created_at: string;
          email: string;
          full_name: string;
          id: string;
          role: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          email: string;
          full_name: string;
          id: string;
          role: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          email?: string;
          full_name?: string;
          id?: string;
          role?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      subject_health: {
        Row: {
          student_count: number | null;
          subject: string | null;
          tutor_count: number | null;
        };
        Relationships: [];
      };
      subject_popularity: {
        Row: {
          session_count: number | null;
          subject: string | null;
        };
        Relationships: [];
      };
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
      DefaultSchema["Views"])
  ? (DefaultSchema["Tables"] &
      DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
  ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
  ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
