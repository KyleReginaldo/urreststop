export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      cart: {
        Row: {
          created_at: string
          id: number
          product: number | null
          users: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          product?: number | null
          users?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          product?: number | null
          users?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cart_product_fkey"
            columns: ["product"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cart_users_fkey"
            columns: ["users"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      category: {
        Row: {
          created_at: string
          id: number
          is_enabled: boolean | null
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          is_enabled?: boolean | null
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          is_enabled?: boolean | null
          name?: string | null
        }
        Relationships: []
      }
      flavor: {
        Row: {
          created_at: string
          flavor_name: string | null
          id: number
          is_enabled: boolean | null
        }
        Insert: {
          created_at?: string
          flavor_name?: string | null
          id?: number
          is_enabled?: boolean | null
        }
        Update: {
          created_at?: string
          flavor_name?: string | null
          id?: number
          is_enabled?: boolean | null
        }
        Relationships: []
      }
      product: {
        Row: {
          category: number | null
          created_at: string
          id: number
          image_link: string | null
          name: string | null
          price: number | null
          qty: number | null
          type: number
        }
        Insert: {
          category?: number | null
          created_at?: string
          id?: number
          image_link?: string | null
          name?: string | null
          price?: number | null
          qty?: number | null
          type: number
        }
        Update: {
          category?: number | null
          created_at?: string
          id?: number
          image_link?: string | null
          name?: string | null
          price?: number | null
          qty?: number | null
          type?: number
        }
        Relationships: [
          {
            foreignKeyName: "product_category_fkey"
            columns: ["category"]
            isOneToOne: false
            referencedRelation: "category"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_type_fkey"
            columns: ["type"]
            isOneToOne: false
            referencedRelation: "type"
            referencedColumns: ["id"]
          },
        ]
      }
      product_flavor: {
        Row: {
          created_at: string
          flavor: number | null
          id: number
          product: number | null
        }
        Insert: {
          created_at?: string
          flavor?: number | null
          id?: number
          product?: number | null
        }
        Update: {
          created_at?: string
          flavor?: number | null
          id?: number
          product?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "product_flavor_flavor_fkey"
            columns: ["flavor"]
            isOneToOne: false
            referencedRelation: "flavor"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_flavor_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_flavor_product_fkey"
            columns: ["product"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
        ]
      }
      type: {
        Row: {
          created_at: string
          id: number
          is_enabled: boolean | null
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          is_enabled?: boolean | null
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          is_enabled?: boolean | null
          name?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string
          email: string | null
          id: string
          image_link: string | null
          username: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id: string
          image_link?: string | null
          username?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          image_link?: string | null
          username?: string | null
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
