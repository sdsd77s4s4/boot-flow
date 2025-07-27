export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      cobrancas: {
        Row: {
          cliente: string
          created_at: string
          created_by: string | null
          descricao: string
          email: string
          forma_pagamento: string | null
          gateway: string | null
          id: number
          observacoes: string | null
          proxima_tentativa: string | null
          status: string | null
          tags: string[] | null
          tentativas: number | null
          tipo: string
          ultima_tentativa: string | null
          updated_at: string
          valor: number
          vencimento: string
        }
        Insert: {
          cliente: string
          created_at?: string
          created_by?: string | null
          descricao: string
          email: string
          forma_pagamento?: string | null
          gateway?: string | null
          id?: never
          observacoes?: string | null
          proxima_tentativa?: string | null
          status?: string | null
          tags?: string[] | null
          tentativas?: number | null
          tipo: string
          ultima_tentativa?: string | null
          updated_at?: string
          valor: number
          vencimento: string
        }
        Update: {
          cliente?: string
          created_at?: string
          created_by?: string | null
          descricao?: string
          email?: string
          forma_pagamento?: string | null
          gateway?: string | null
          id?: never
          observacoes?: string | null
          proxima_tentativa?: string | null
          status?: string | null
          tags?: string[] | null
          tentativas?: number | null
          tipo?: string
          ultima_tentativa?: string | null
          updated_at?: string
          valor?: number
          vencimento?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          role: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          role?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          role?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      resellers: {
        Row: {
          created_at: string
          created_by: string | null
          credits: number | null
          disable_login_days: number | null
          email: string
          force_password_change: string | null
          id: number
          master_reseller: string | null
          monthly_reseller: boolean | null
          observations: string | null
          permission: string | null
          personal_name: string | null
          servers: string | null
          status: string | null
          telegram: string | null
          updated_at: string
          username: string
          whatsapp: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          credits?: number | null
          disable_login_days?: number | null
          email: string
          force_password_change?: string | null
          id?: never
          master_reseller?: string | null
          monthly_reseller?: boolean | null
          observations?: string | null
          permission?: string | null
          personal_name?: string | null
          servers?: string | null
          status?: string | null
          telegram?: string | null
          updated_at?: string
          username: string
          whatsapp?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          credits?: number | null
          disable_login_days?: number | null
          email?: string
          force_password_change?: string | null
          id?: never
          master_reseller?: string | null
          monthly_reseller?: boolean | null
          observations?: string | null
          permission?: string | null
          personal_name?: string | null
          servers?: string | null
          status?: string | null
          telegram?: string | null
          updated_at?: string
          username?: string
          whatsapp?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          bouquets: string | null
          created_at: string
          created_by: string | null
          credits: number | null
          devices: number | null
          email: string
          expiration_date: string | null
          id: number
          m3u_url: string | null
          name: string
          notes: string | null
          observations: string | null
          phone: string | null
          plan: string | null
          real_name: string | null
          status: string | null
          telegram: string | null
          updated_at: string
          whatsapp: string | null
        }
        Insert: {
          bouquets?: string | null
          created_at?: string
          created_by?: string | null
          credits?: number | null
          devices?: number | null
          email: string
          expiration_date?: string | null
          id?: never
          m3u_url?: string | null
          name: string
          notes?: string | null
          observations?: string | null
          phone?: string | null
          plan?: string | null
          real_name?: string | null
          status?: string | null
          telegram?: string | null
          updated_at?: string
          whatsapp?: string | null
        }
        Update: {
          bouquets?: string | null
          created_at?: string
          created_by?: string | null
          credits?: number | null
          devices?: number | null
          email?: string
          expiration_date?: string | null
          id?: never
          m3u_url?: string | null
          name?: string
          notes?: string | null
          observations?: string | null
          phone?: string | null
          plan?: string | null
          real_name?: string | null
          status?: string | null
          telegram?: string | null
          updated_at?: string
          whatsapp?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
  public: {
    Enums: {},
  },
} as const
