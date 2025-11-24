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
          available: boolean;
          created_at: string | null;
          day: string;
          duration_minutes: number;
          hour: number;
          id: string;
          tutor_id: string;
        };
        Insert: {
          available?: boolean;
          created_at?: string | null;
          day: string;
          duration_minutes?: number;
          hour: number;
          id?: string;
          tutor_id: string;
        };
        Update: {
          available?: boolean;
          created_at?: string | null;
          day?: string;
          duration_minutes?: number;
          hour?: number;
          id?: string;
          tutor_id?: string;
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
      edit_requests: {
        Row: {
          admin_id: string | null;
          approved: boolean | null;
          created_at: string;
          id: string;
          payload: Json;
          rejection_reason: string | null;
          type: string;
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          admin_id?: string | null;
          approved?: boolean | null;
          created_at?: string;
          id?: string;
          payload: Json;
          rejection_reason?: string | null;
          type: string;
          updated_at?: string | null;
          user_id: string;
        };
        Update: {
          admin_id?: string | null;
          approved?: boolean | null;
          created_at?: string;
          id?: string;
          payload?: Json;
          rejection_reason?: string | null;
          type?: string;
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "edit_requests_admin_id_fkey";
            columns: ["admin_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "edit_requests_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      notifications: {
        Row: {
          body: string | null;
          created_at: string;
          href: string | null;
          id: string;
          read: boolean | null;
          title: string;
          type: string | null;
          user_id: string;
        };
        Insert: {
          body?: string | null;
          created_at?: string;
          href?: string | null;
          id?: string;
          read?: boolean | null;
          title: string;
          type?: string | null;
          user_id: string;
        };
        Update: {
          body?: string | null;
          created_at?: string;
          href?: string | null;
          id?: string;
          read?: boolean | null;
          title?: string;
          type?: string | null;
          user_id?: string;
        };
        Relationships: [];
      };
      online_session_messages: {
        Row: {
          created_at: string;
          id: string;
          message: string;
          request_id: string;
          sender_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          message: string;
          request_id: string;
          sender_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          message?: string;
          request_id?: string;
          sender_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "online_session_messages_request_id_fkey";
            columns: ["request_id"];
            isOneToOne: false;
            referencedRelation: "online_session_requests";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "online_session_messages_sender_id_fkey";
            columns: ["sender_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      online_session_requests: {
        Row: {
          created_at: string;
          id: string;
          message: string | null;
          session_id: string | null;
          status: string;
          student_id: string;
          subject_id: string;
          suggested_date: string;
          suggested_time: string | null;
          tutor_id: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          message?: string | null;
          session_id?: string | null;
          status?: string;
          student_id: string;
          subject_id: string;
          suggested_date: string;
          suggested_time?: string | null;
          tutor_id: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          message?: string | null;
          session_id?: string | null;
          status?: string;
          student_id?: string;
          subject_id?: string;
          suggested_date?: string;
          suggested_time?: string | null;
          tutor_id?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "online_session_requests_session_id_fkey";
            columns: ["session_id"];
            isOneToOne: false;
            referencedRelation: "sessions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "online_session_requests_student_id_fkey";
            columns: ["student_id"];
            isOneToOne: false;
            referencedRelation: "students";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "online_session_requests_subject_id_fkey";
            columns: ["subject_id"];
            isOneToOne: false;
            referencedRelation: "subject_health";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "online_session_requests_subject_id_fkey";
            columns: ["subject_id"];
            isOneToOne: false;
            referencedRelation: "subject_popularity";
            referencedColumns: ["subject_id"];
          },
          {
            foreignKeyName: "online_session_requests_subject_id_fkey";
            columns: ["subject_id"];
            isOneToOne: false;
            referencedRelation: "subjects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "online_session_requests_tutor_id_fkey";
            columns: ["tutor_id"];
            isOneToOne: false;
            referencedRelation: "tutors";
            referencedColumns: ["id"];
          }
        ];
      };
      onsite_session_requests: {
        Row: {
          created_at: string;
          id: string;
          message: string | null;
          rejection_reason: string | null;
          scheduled_for: string;
          session_id: string | null;
          slot_id: string | null;
          status: string;
          student_id: string;
          subject_id: string;
          tutor_id: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          message?: string | null;
          rejection_reason?: string | null;
          scheduled_for: string;
          session_id?: string | null;
          slot_id?: string | null;
          status?: string;
          student_id: string;
          subject_id: string;
          tutor_id: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          message?: string | null;
          rejection_reason?: string | null;
          scheduled_for?: string;
          session_id?: string | null;
          slot_id?: string | null;
          status?: string;
          student_id?: string;
          subject_id?: string;
          tutor_id?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "onsite_session_requests_session_id_fkey";
            columns: ["session_id"];
            isOneToOne: false;
            referencedRelation: "sessions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "onsite_session_requests_slot_id_fkey";
            columns: ["slot_id"];
            isOneToOne: false;
            referencedRelation: "available_slots";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "onsite_session_requests_student_id_fkey";
            columns: ["student_id"];
            isOneToOne: false;
            referencedRelation: "students";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "onsite_session_requests_subject_id_fkey";
            columns: ["subject_id"];
            isOneToOne: false;
            referencedRelation: "subject_health";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "onsite_session_requests_subject_id_fkey";
            columns: ["subject_id"];
            isOneToOne: false;
            referencedRelation: "subject_popularity";
            referencedColumns: ["subject_id"];
          },
          {
            foreignKeyName: "onsite_session_requests_subject_id_fkey";
            columns: ["subject_id"];
            isOneToOne: false;
            referencedRelation: "subjects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "onsite_session_requests_tutor_id_fkey";
            columns: ["tutor_id"];
            isOneToOne: false;
            referencedRelation: "tutors";
            referencedColumns: ["id"];
          }
        ];
      };
      resources: {
        Row: {
          added_by: string;
          created_at: string;
          description: string | null;
          featured: boolean;
          id: string;
          link: string;
          subject: string;
          title: string;
          updated_at: string;
          verified: boolean;
          verified_by: string | null;
          view_count: number;
        };
        Insert: {
          added_by: string;
          created_at?: string;
          description?: string | null;
          featured?: boolean;
          id?: string;
          link: string;
          subject: string;
          title: string;
          updated_at?: string;
          verified?: boolean;
          verified_by?: string | null;
          view_count?: number;
        };
        Update: {
          added_by?: string;
          created_at?: string;
          description?: string | null;
          featured?: boolean;
          id?: string;
          link?: string;
          subject?: string;
          title?: string;
          updated_at?: string;
          verified?: boolean;
          verified_by?: string | null;
          view_count?: number;
        };
        Relationships: [
          {
            foreignKeyName: "resources_added_by_fkey";
            columns: ["added_by"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "resources_subject_fkey";
            columns: ["subject"];
            isOneToOne: false;
            referencedRelation: "subject_health";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "resources_subject_fkey";
            columns: ["subject"];
            isOneToOne: false;
            referencedRelation: "subject_popularity";
            referencedColumns: ["subject_id"];
          },
          {
            foreignKeyName: "resources_subject_fkey";
            columns: ["subject"];
            isOneToOne: false;
            referencedRelation: "subjects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "resources_verified_by_fkey";
            columns: ["verified_by"];
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
          duration_minutes: number;
          id: string;
          is_online: boolean;
          meeting_link: string | null;
          rejection_reason: string | null;
          scheduled_for: string;
          slot_id: string | null;
          start_time: string | null;
          status: string;
          student_id: string;
          subject_id: string;
          tutor_id: string;
          updated_at: string;
          verified: boolean | null;
          verified_by: string | null;
        };
        Insert: {
          academic_year?: string;
          booked_at?: string;
          cancel_reason?: string | null;
          cancellation_source?: string | null;
          cancelled_at?: string | null;
          cancelled_by?: string | null;
          completed_at?: string | null;
          duration_minutes?: number;
          id?: string;
          is_online?: boolean;
          meeting_link?: string | null;
          rejection_reason?: string | null;
          scheduled_for: string;
          slot_id?: string | null;
          start_time?: string | null;
          status: string;
          student_id: string;
          subject_id: string;
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
          duration_minutes?: number;
          id?: string;
          is_online?: boolean;
          meeting_link?: string | null;
          rejection_reason?: string | null;
          scheduled_for?: string;
          slot_id?: string | null;
          start_time?: string | null;
          status?: string;
          student_id?: string;
          subject_id?: string;
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
            foreignKeyName: "sessions_subject_id_fkey";
            columns: ["subject_id"];
            isOneToOne: false;
            referencedRelation: "subject_health";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "sessions_subject_id_fkey";
            columns: ["subject_id"];
            isOneToOne: false;
            referencedRelation: "subject_popularity";
            referencedColumns: ["subject_id"];
          },
          {
            foreignKeyName: "sessions_subject_id_fkey";
            columns: ["subject_id"];
            isOneToOne: false;
            referencedRelation: "subjects";
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
      student_subjects: {
        Row: {
          created_at: string;
          note: string | null;
          student_id: string;
          subject_id: string;
        };
        Insert: {
          created_at?: string;
          note?: string | null;
          student_id: string;
          subject_id: string;
        };
        Update: {
          created_at?: string;
          note?: string | null;
          student_id?: string;
          subject_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "student_subjects_student_id_fkey";
            columns: ["student_id"];
            isOneToOne: false;
            referencedRelation: "students";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "student_subjects_subject_id_fkey";
            columns: ["subject_id"];
            isOneToOne: false;
            referencedRelation: "subject_health";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "student_subjects_subject_id_fkey";
            columns: ["subject_id"];
            isOneToOne: false;
            referencedRelation: "subject_popularity";
            referencedColumns: ["subject_id"];
          },
          {
            foreignKeyName: "student_subjects_subject_id_fkey";
            columns: ["subject_id"];
            isOneToOne: false;
            referencedRelation: "subjects";
            referencedColumns: ["id"];
          }
        ];
      };
      students: {
        Row: {
          about: string | null;
          created_at: string;
          grade: string;
          id: string;
          updated_at: string;
        };
        Insert: {
          about?: string | null;
          created_at?: string;
          grade: string;
          id: string;
          updated_at?: string;
        };
        Update: {
          about?: string | null;
          created_at?: string;
          grade?: string;
          id?: string;
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
      subjects: {
        Row: {
          code: string;
          color: string;
          created_at: string;
          grade: string;
          id: string;
          label: string;
          name: string;
          slug: string;
        };
        Insert: {
          code: string;
          color?: string;
          created_at?: string;
          grade: string;
          id: string;
          label: string;
          name: string;
          slug: string;
        };
        Update: {
          code?: string;
          color?: string;
          created_at?: string;
          grade?: string;
          id?: string;
          label?: string;
          name?: string;
          slug?: string;
        };
        Relationships: [];
      };
      tutor_subjects: {
        Row: {
          created_at: string;
          credentials: string | null;
          subject_id: string;
          tutor_id: string;
        };
        Insert: {
          created_at?: string;
          credentials?: string | null;
          subject_id: string;
          tutor_id: string;
        };
        Update: {
          created_at?: string;
          credentials?: string | null;
          subject_id?: string;
          tutor_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "tutor_subjects_subject_id_fkey";
            columns: ["subject_id"];
            isOneToOne: false;
            referencedRelation: "subject_health";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "tutor_subjects_subject_id_fkey";
            columns: ["subject_id"];
            isOneToOne: false;
            referencedRelation: "subject_popularity";
            referencedColumns: ["subject_id"];
          },
          {
            foreignKeyName: "tutor_subjects_subject_id_fkey";
            columns: ["subject_id"];
            isOneToOne: false;
            referencedRelation: "subjects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "tutor_subjects_tutor_id_fkey";
            columns: ["tutor_id"];
            isOneToOne: false;
            referencedRelation: "tutors";
            referencedColumns: ["id"];
          }
        ];
      };
      tutors: {
        Row: {
          about: string | null;
          approved: boolean | null;
          available_online: boolean;
          created_at: string;
          grade: string;
          id: string;
          rejection_reason: string | null;
          updated_at: string;
        };
        Insert: {
          about?: string | null;
          approved?: boolean | null;
          available_online?: boolean;
          created_at?: string;
          grade: string;
          id: string;
          rejection_reason?: string | null;
          updated_at?: string;
        };
        Update: {
          about?: string | null;
          approved?: boolean | null;
          available_online?: boolean;
          created_at?: string;
          grade?: string;
          id?: string;
          rejection_reason?: string | null;
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
          role: string | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          email: string;
          full_name: string;
          id: string;
          role?: string | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          email?: string;
          full_name?: string;
          id?: string;
          role?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      subject_health: {
        Row: {
          code: string | null;
          id: string | null;
          student_count: number | null;
          subject_label: string | null;
          tutor_count: number | null;
        };
        Relationships: [];
      };
      subject_popularity: {
        Row: {
          session_count: number | null;
          subject: string | null;
          subject_id: string | null;
        };
        Relationships: [];
      };
    };
    Functions: {
      compute_slot_timestamp: {
        Args: { _day: string; _hour: number };
        Returns: string;
      };
      increment_resource_view_count: {
        Args: { resource_id: string };
        Returns: number;
      };
      next_slot_timestamp: {
        Args: { _day: string; _hour: number };
        Returns: string;
      };
      onboard_user: {
        Args: {
          _about: string;
          _available_online?: boolean;
          _grade: string;
          _role: string;
          _slots?: Json;
          _subjects: Json;
          _user_id: string;
        };
        Returns: Json;
      };
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
