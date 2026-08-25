export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      albums: {
        Row: {
          cover_media_id: string | null
          created_at: string
          description: Json | null
          id: string
          slug: string
          sort_order: number
          taken_on: string | null
          title: Json
          updated_at: string
        }
        Insert: {
          cover_media_id?: string | null
          created_at?: string
          description?: Json | null
          id?: string
          slug: string
          sort_order?: number
          taken_on?: string | null
          title: Json
          updated_at?: string
        }
        Update: {
          cover_media_id?: string | null
          created_at?: string
          description?: Json | null
          id?: string
          slug?: string
          sort_order?: number
          taken_on?: string | null
          title?: Json
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "albums_cover_fk"
            columns: ["cover_media_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["id"]
          },
        ]
      }
      athletes: {
        Row: {
          active: boolean
          bio: Json | null
          category: string | null
          consent_on_file: boolean
          created_at: string
          first_name: string
          gender: Database["public"]["Enums"]["gender"] | null
          id: string
          last_name: string
          photo: string | null
          updated_at: string
        }
        Insert: {
          active?: boolean
          bio?: Json | null
          category?: string | null
          consent_on_file?: boolean
          created_at?: string
          first_name: string
          gender?: Database["public"]["Enums"]["gender"] | null
          id?: string
          last_name: string
          photo?: string | null
          updated_at?: string
        }
        Update: {
          active?: boolean
          bio?: Json | null
          category?: string | null
          consent_on_file?: boolean
          created_at?: string
          first_name?: string
          gender?: Database["public"]["Enums"]["gender"] | null
          id?: string
          last_name?: string
          photo?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      audit_log: {
        Row: {
          action: string
          created_at: string
          diff: Json | null
          id: string
          record_id: string | null
          table_name: string
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          diff?: Json | null
          id?: string
          record_id?: string | null
          table_name: string
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          diff?: Json | null
          id?: string
          record_id?: string | null
          table_name?: string
          user_id?: string | null
        }
        Relationships: []
      }
      best_performances: {
        Row: {
          achieved_in: string | null
          category: string
          created_at: string
          discipline_key: string
          discipline_raw: string
          gender: Database["public"]["Enums"]["gender"]
          holders: Json
          id: string
          is_espoirs_best: boolean
          is_national_record: boolean
          performance_numeric: number | null
          performance_raw: string
          surface: Database["public"]["Enums"]["record_surface"]
          updated_at: string
          year: number
        }
        Insert: {
          achieved_in?: string | null
          category: string
          created_at?: string
          discipline_key: string
          discipline_raw?: string
          gender: Database["public"]["Enums"]["gender"]
          holders?: Json
          id?: string
          is_espoirs_best?: boolean
          is_national_record?: boolean
          performance_numeric?: number | null
          performance_raw: string
          surface?: Database["public"]["Enums"]["record_surface"]
          updated_at?: string
          year: number
        }
        Update: {
          achieved_in?: string | null
          category?: string
          created_at?: string
          discipline_key?: string
          discipline_raw?: string
          gender?: Database["public"]["Enums"]["gender"]
          holders?: Json
          id?: string
          is_espoirs_best?: boolean
          is_national_record?: boolean
          performance_numeric?: number | null
          performance_raw?: string
          surface?: Database["public"]["Enums"]["record_surface"]
          updated_at?: string
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "best_performances_discipline_key_fkey"
            columns: ["discipline_key"]
            isOneToOne: false
            referencedRelation: "disciplines"
            referencedColumns: ["key"]
          },
        ]
      }
      coaches: {
        Row: {
          bio: Json | null
          brevet: string | null
          consent_on_file: boolean
          first_name: string
          id: string
          last_name: string
          photo: string | null
          section: Database["public"]["Enums"]["coach_section"]
          sort_order: number
        }
        Insert: {
          bio?: Json | null
          brevet?: string | null
          consent_on_file?: boolean
          first_name: string
          id?: string
          last_name: string
          photo?: string | null
          section: Database["public"]["Enums"]["coach_section"]
          sort_order?: number
        }
        Update: {
          bio?: Json | null
          brevet?: string | null
          consent_on_file?: boolean
          first_name?: string
          id?: string
          last_name?: string
          photo?: string | null
          section?: Database["public"]["Enums"]["coach_section"]
          sort_order?: number
        }
        Relationships: []
      }
      committee: {
        Row: {
          bio: Json | null
          consent_on_file: boolean
          id: string
          name: string
          photo: string | null
          role_key: string
          sort_order: number
        }
        Insert: {
          bio?: Json | null
          consent_on_file?: boolean
          id?: string
          name: string
          photo?: string | null
          role_key: string
          sort_order?: number
        }
        Update: {
          bio?: Json | null
          consent_on_file?: boolean
          id?: string
          name?: string
          photo?: string | null
          role_key?: string
          sort_order?: number
        }
        Relationships: []
      }
      disciplines: {
        Row: {
          key: string
          kind: Database["public"]["Enums"]["discipline_kind"]
          name: string
          sort_order: number
        }
        Insert: {
          key: string
          kind: Database["public"]["Enums"]["discipline_kind"]
          name: string
          sort_order: number
        }
        Update: {
          key?: string
          kind?: Database["public"]["Enums"]["discipline_kind"]
          name?: string
          sort_order?: number
        }
        Relationships: []
      }
      events: {
        Row: {
          author_id: string | null
          body: Json | null
          category: string | null
          cover_image: string | null
          created_at: string
          ends_at: string | null
          external_url: string | null
          id: string
          is_club_race: boolean
          location: string | null
          slug: string
          starts_at: string
          title: Json
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          body?: Json | null
          category?: string | null
          cover_image?: string | null
          created_at?: string
          ends_at?: string | null
          external_url?: string | null
          id?: string
          is_club_race?: boolean
          location?: string | null
          slug: string
          starts_at: string
          title: Json
          updated_at?: string
        }
        Update: {
          author_id?: string | null
          body?: Json | null
          category?: string | null
          cover_image?: string | null
          created_at?: string
          ends_at?: string | null
          external_url?: string | null
          id?: string
          is_club_race?: boolean
          location?: string | null
          slug?: string
          starts_at?: string
          title?: Json
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      media: {
        Row: {
          album_id: string | null
          alt: Json | null
          consent_on_file: boolean
          created_at: string
          height: number | null
          id: string
          path: string
          sort_order: number
          uploaded_by: string | null
          width: number | null
        }
        Insert: {
          album_id?: string | null
          alt?: Json | null
          consent_on_file?: boolean
          created_at?: string
          height?: number | null
          id?: string
          path: string
          sort_order?: number
          uploaded_by?: string | null
          width?: number | null
        }
        Update: {
          album_id?: string | null
          alt?: Json | null
          consent_on_file?: boolean
          created_at?: string
          height?: number | null
          id?: string
          path?: string
          sort_order?: number
          uploaded_by?: string | null
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "media_album_id_fkey"
            columns: ["album_id"]
            isOneToOne: false
            referencedRelation: "albums"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "media_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      news: {
        Row: {
          author_id: string | null
          body: Json
          cover_image: string | null
          created_at: string
          excerpt: Json | null
          id: string
          published_at: string | null
          slug: string
          status: Database["public"]["Enums"]["publish_status"]
          title: Json
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          body: Json
          cover_image?: string | null
          created_at?: string
          excerpt?: Json | null
          id?: string
          published_at?: string | null
          slug: string
          status?: Database["public"]["Enums"]["publish_status"]
          title: Json
          updated_at?: string
        }
        Update: {
          author_id?: string | null
          body?: Json
          cover_image?: string | null
          created_at?: string
          excerpt?: Json | null
          id?: string
          published_at?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["publish_status"]
          title?: Json
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "news_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      pages: {
        Row: {
          body: Json
          id: string
          slug: string
          title: Json
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          body: Json
          id?: string
          slug: string
          title: Json
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          body?: Json
          id?: string
          slug?: string
          title?: Json
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pages_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          id: string
          name: string
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          role?: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          role?: Database["public"]["Enums"]["user_role"]
          user_id?: string
        }
        Relationships: []
      }
      record_history: {
        Row: {
          category: string | null
          discipline_key: string
          gender: Database["public"]["Enums"]["gender"] | null
          holders: Json
          id: string
          performance_numeric: number
          performance_raw: string
          superseded_at: string
          superseded_by_record_id: string | null
          surface: Database["public"]["Enums"]["record_surface"]
          year: number
        }
        Insert: {
          category?: string | null
          discipline_key: string
          gender?: Database["public"]["Enums"]["gender"] | null
          holders?: Json
          id?: string
          performance_numeric: number
          performance_raw: string
          superseded_at?: string
          superseded_by_record_id?: string | null
          surface: Database["public"]["Enums"]["record_surface"]
          year: number
        }
        Update: {
          category?: string | null
          discipline_key?: string
          gender?: Database["public"]["Enums"]["gender"] | null
          holders?: Json
          id?: string
          performance_numeric?: number
          performance_raw?: string
          superseded_at?: string
          superseded_by_record_id?: string | null
          surface?: Database["public"]["Enums"]["record_surface"]
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "record_history_discipline_key_fkey"
            columns: ["discipline_key"]
            isOneToOne: false
            referencedRelation: "disciplines"
            referencedColumns: ["key"]
          },
          {
            foreignKeyName: "record_history_superseded_by_record_id_fkey"
            columns: ["superseded_by_record_id"]
            isOneToOne: false
            referencedRelation: "records"
            referencedColumns: ["id"]
          },
        ]
      }
      record_holders: {
        Row: {
          first_name: string | null
          id: string
          last_name: string
          position: number
          record_id: string
        }
        Insert: {
          first_name?: string | null
          id?: string
          last_name: string
          position?: number
          record_id: string
        }
        Update: {
          first_name?: string | null
          id?: string
          last_name?: string
          position?: number
          record_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "record_holders_record_id_fkey"
            columns: ["record_id"]
            isOneToOne: false
            referencedRelation: "records"
            referencedColumns: ["id"]
          },
        ]
      }
      records: {
        Row: {
          category: string
          category_raw: string
          created_at: string
          date: string | null
          discipline_key: string
          gender: Database["public"]["Enums"]["gender"] | null
          id: string
          is_current: boolean
          is_espoirs_best: boolean
          is_national_record: boolean
          nation: string | null
          performance_numeric: number
          performance_raw: string
          show_on_home: boolean
          surface: Database["public"]["Enums"]["record_surface"]
          updated_at: string
          year: number
          year_raw: string
        }
        Insert: {
          category?: string
          category_raw?: string
          created_at?: string
          date?: string | null
          discipline_key: string
          gender?: Database["public"]["Enums"]["gender"] | null
          id?: string
          is_current?: boolean
          is_espoirs_best?: boolean
          is_national_record?: boolean
          nation?: string | null
          performance_numeric: number
          performance_raw: string
          show_on_home?: boolean
          surface: Database["public"]["Enums"]["record_surface"]
          updated_at?: string
          year: number
          year_raw?: string
        }
        Update: {
          category?: string
          category_raw?: string
          created_at?: string
          date?: string | null
          discipline_key?: string
          gender?: Database["public"]["Enums"]["gender"] | null
          id?: string
          is_current?: boolean
          is_espoirs_best?: boolean
          is_national_record?: boolean
          nation?: string | null
          performance_numeric?: number
          performance_raw?: string
          show_on_home?: boolean
          surface?: Database["public"]["Enums"]["record_surface"]
          updated_at?: string
          year?: number
          year_raw?: string
        }
        Relationships: [
          {
            foreignKeyName: "records_discipline_key_fkey"
            columns: ["discipline_key"]
            isOneToOne: false
            referencedRelation: "disciplines"
            referencedColumns: ["key"]
          },
        ]
      }
      settings: {
        Row: {
          key: string
          updated_at: string
          updated_by: string | null
          value: Json
        }
        Insert: {
          key: string
          updated_at?: string
          updated_by?: string | null
          value: Json
        }
        Update: {
          key?: string
          updated_at?: string
          updated_by?: string | null
          value?: Json
        }
        Relationships: [
          {
            foreignKeyName: "settings_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      sponsors: {
        Row: {
          active_from: string | null
          active_until: string | null
          created_at: string
          id: string
          jersey_position: Json | null
          logo_url: string | null
          name: string
          sort_order: number
          tier: Database["public"]["Enums"]["sponsor_tier"]
          updated_at: string
          website_url: string | null
        }
        Insert: {
          active_from?: string | null
          active_until?: string | null
          created_at?: string
          id?: string
          jersey_position?: Json | null
          logo_url?: string | null
          name: string
          sort_order?: number
          tier?: Database["public"]["Enums"]["sponsor_tier"]
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          active_from?: string | null
          active_until?: string | null
          created_at?: string
          id?: string
          jersey_position?: Json | null
          logo_url?: string | null
          name?: string
          sort_order?: number
          tier?: Database["public"]["Enums"]["sponsor_tier"]
          updated_at?: string
          website_url?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      active_sponsors: {
        Row: {
          active_from: string | null
          active_until: string | null
          created_at: string | null
          id: string | null
          jersey_position: Json | null
          logo_url: string | null
          name: string | null
          sort_order: number | null
          tier: Database["public"]["Enums"]["sponsor_tier"] | null
          updated_at: string | null
          website_url: string | null
        }
        Insert: {
          active_from?: string | null
          active_until?: string | null
          created_at?: string | null
          id?: string | null
          jersey_position?: Json | null
          logo_url?: string | null
          name?: string | null
          sort_order?: number | null
          tier?: Database["public"]["Enums"]["sponsor_tier"] | null
          updated_at?: string | null
          website_url?: string | null
        }
        Update: {
          active_from?: string | null
          active_until?: string | null
          created_at?: string | null
          id?: string | null
          jersey_position?: Json | null
          logo_url?: string | null
          name?: string | null
          sort_order?: number | null
          tier?: Database["public"]["Enums"]["sponsor_tier"] | null
          updated_at?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      current_profile_id: { Args: never; Returns: string }
      current_role: {
        Args: never
        Returns: Database["public"]["Enums"]["user_role"]
      }
      is_admin: { Args: never; Returns: boolean }
      is_better: {
        Args: {
          candidate: number
          incumbent: number
          kind: Database["public"]["Enums"]["discipline_kind"]
        }
        Returns: boolean
      }
      is_editor: { Args: never; Returns: boolean }
      is_localized: { Args: { value: Json }; Returns: boolean }
      is_staff: { Args: never; Returns: boolean }
      submit_record: {
        Args: {
          p_category: string
          p_date?: string
          p_discipline_key: string
          p_gender: Database["public"]["Enums"]["gender"]
          p_holders: Json
          p_is_espoirs_best?: boolean
          p_is_national_record?: boolean
          p_performance_numeric: number
          p_performance_raw: string
          p_show_on_home?: boolean
          p_surface: Database["public"]["Enums"]["record_surface"]
          p_year: number
        }
        Returns: Json
      }
    }
    Enums: {
      coach_section: "athletics" | "triathlon"
      discipline_kind: "time" | "distance" | "points"
      gender: "f" | "m"
      publish_status: "draft" | "published"
      record_surface: "piste" | "indoor" | "route" | "stade"
      sponsor_tier: "haaptsponsor" | "partner" | "supporter"
      user_role: "admin" | "editor" | "author"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      coach_section: ["athletics", "triathlon"],
      discipline_kind: ["time", "distance", "points"],
      gender: ["f", "m"],
      publish_status: ["draft", "published"],
      record_surface: ["piste", "indoor", "route", "stade"],
      sponsor_tier: ["haaptsponsor", "partner", "supporter"],
      user_role: ["admin", "editor", "author"],
    },
  },
} as const

