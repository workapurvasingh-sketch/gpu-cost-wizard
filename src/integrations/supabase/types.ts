export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      cloud_instances: {
        Row: {
          cost_per_hour: number
          cpu: string
          created_at: string
          gpu_type: string | null
          gpus: number
          id: string
          name: string
          network: string | null
          provider_id: string
          ram: number
          storage: number
        }
        Insert: {
          cost_per_hour: number
          cpu: string
          created_at?: string
          gpu_type?: string | null
          gpus?: number
          id: string
          name: string
          network?: string | null
          provider_id: string
          ram: number
          storage: number
        }
        Update: {
          cost_per_hour?: number
          cpu?: string
          created_at?: string
          gpu_type?: string | null
          gpus?: number
          id?: string
          name?: string
          network?: string | null
          provider_id?: string
          ram?: number
          storage?: number
        }
        Relationships: [
          {
            foreignKeyName: "cloud_instances_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "cloud_providers"
            referencedColumns: ["id"]
          },
        ]
      }
      cloud_providers: {
        Row: {
          created_at: string
          id: string
          name: string
          regions: string[]
          website: string | null
        }
        Insert: {
          created_at?: string
          id: string
          name: string
          regions?: string[]
          website?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          regions?: string[]
          website?: string | null
        }
        Relationships: []
      }
      cpus: {
        Row: {
          base_clock: number
          boost: number
          cores: number
          created_at: string
          ecc_support: boolean
          id: string
          manufacturer: string
          name: string
          pcie_lanes: number
          retail_price: number | null
          socket: string
          tdp: number
          threads: number
        }
        Insert: {
          base_clock: number
          boost: number
          cores: number
          created_at?: string
          ecc_support?: boolean
          id: string
          manufacturer: string
          name: string
          pcie_lanes: number
          retail_price?: number | null
          socket: string
          tdp: number
          threads: number
        }
        Update: {
          base_clock?: number
          boost?: number
          cores?: number
          created_at?: string
          ecc_support?: boolean
          id?: string
          manufacturer?: string
          name?: string
          pcie_lanes?: number
          retail_price?: number | null
          socket?: string
          tdp?: number
          threads?: number
        }
        Relationships: []
      }
      deployment_frameworks: {
        Row: {
          created_at: string
          id: string
          memory_overhead: number
          name: string
          offloading_types: string[]
          supports_offloading: boolean
          throughput_multiplier: number
        }
        Insert: {
          created_at?: string
          id: string
          memory_overhead?: number
          name: string
          offloading_types?: string[]
          supports_offloading?: boolean
          throughput_multiplier?: number
        }
        Update: {
          created_at?: string
          id?: string
          memory_overhead?: number
          name?: string
          offloading_types?: string[]
          supports_offloading?: boolean
          throughput_multiplier?: number
        }
        Relationships: []
      }
      framework_quantization_support: {
        Row: {
          framework_id: string
          quantization_id: string
        }
        Insert: {
          framework_id: string
          quantization_id: string
        }
        Update: {
          framework_id?: string
          quantization_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "framework_quantization_support_framework_id_fkey"
            columns: ["framework_id"]
            isOneToOne: false
            referencedRelation: "deployment_frameworks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "framework_quantization_support_quantization_id_fkey"
            columns: ["quantization_id"]
            isOneToOne: false
            referencedRelation: "quantization_options"
            referencedColumns: ["id"]
          },
        ]
      }
      gpus: {
        Row: {
          bandwidth: number
          cloud_cost_per_hour: number | null
          compute_capability: string
          created_at: string
          generation: string
          id: string
          manufacturer: string
          memory: number
          name: string
          pcie_lanes: number
          power_consumption: number
          retail_price: number | null
        }
        Insert: {
          bandwidth: number
          cloud_cost_per_hour?: number | null
          compute_capability: string
          created_at?: string
          generation: string
          id: string
          manufacturer: string
          memory: number
          name: string
          pcie_lanes: number
          power_consumption: number
          retail_price?: number | null
        }
        Update: {
          bandwidth?: number
          cloud_cost_per_hour?: number | null
          compute_capability?: string
          created_at?: string
          generation?: string
          id?: string
          manufacturer?: string
          memory?: number
          name?: string
          pcie_lanes?: number
          power_consumption?: number
          retail_price?: number | null
        }
        Relationships: []
      }
      llm_database: {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      llm_models: {
        Row: {
          architecture: string
          capabilities: string[]
          context_window: number
          cost_per_mtoken: number
          created_at: string
          id: string
          is_open_source: boolean
          kv_cache_support: boolean
          memory_required: number
          model_type: string
          name: string
          parameters: string
          provider_id: string
          size_gb: number
          updated_at: string
        }
        Insert: {
          architecture: string
          capabilities?: string[]
          context_window: number
          cost_per_mtoken?: number
          created_at?: string
          id: string
          is_open_source?: boolean
          kv_cache_support?: boolean
          memory_required?: number
          model_type: string
          name: string
          parameters: string
          provider_id: string
          size_gb?: number
          updated_at?: string
        }
        Update: {
          architecture?: string
          capabilities?: string[]
          context_window?: number
          cost_per_mtoken?: number
          created_at?: string
          id?: string
          is_open_source?: boolean
          kv_cache_support?: boolean
          memory_required?: number
          model_type?: string
          name?: string
          parameters?: string
          provider_id?: string
          size_gb?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "llm_models_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "llm_providers"
            referencedColumns: ["id"]
          },
        ]
      }
      llm_providers: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          requires_api_key: boolean
          type: string
          updated_at: string
          website: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id: string
          name: string
          requires_api_key?: boolean
          type: string
          updated_at?: string
          website?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          requires_api_key?: boolean
          type?: string
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      model_quantization_support: {
        Row: {
          model_id: string
          quantization_id: string
        }
        Insert: {
          model_id: string
          quantization_id: string
        }
        Update: {
          model_id?: string
          quantization_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "model_quantization_support_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "llm_models"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "model_quantization_support_quantization_id_fkey"
            columns: ["quantization_id"]
            isOneToOne: false
            referencedRelation: "quantization_options"
            referencedColumns: ["id"]
          },
        ]
      }
      motherboard_cpu_compatibility: {
        Row: {
          cpu_id: string
          motherboard_id: string
        }
        Insert: {
          cpu_id: string
          motherboard_id: string
        }
        Update: {
          cpu_id?: string
          motherboard_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "motherboard_cpu_compatibility_cpu_id_fkey"
            columns: ["cpu_id"]
            isOneToOne: false
            referencedRelation: "cpus"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "motherboard_cpu_compatibility_motherboard_id_fkey"
            columns: ["motherboard_id"]
            isOneToOne: false
            referencedRelation: "motherboards"
            referencedColumns: ["id"]
          },
        ]
      }
      motherboard_gpu_compatibility: {
        Row: {
          gpu_id: string
          motherboard_id: string
        }
        Insert: {
          gpu_id: string
          motherboard_id: string
        }
        Update: {
          gpu_id?: string
          motherboard_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "motherboard_gpu_compatibility_gpu_id_fkey"
            columns: ["gpu_id"]
            isOneToOne: false
            referencedRelation: "gpus"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "motherboard_gpu_compatibility_motherboard_id_fkey"
            columns: ["motherboard_id"]
            isOneToOne: false
            referencedRelation: "motherboards"
            referencedColumns: ["id"]
          },
        ]
      }
      motherboards: {
        Row: {
          chipset: string
          created_at: string
          id: string
          max_ram: number
          name: string
          pci_slots: number
          ram_slots: number
          retail_price: number | null
          socket: string
        }
        Insert: {
          chipset: string
          created_at?: string
          id: string
          max_ram: number
          name: string
          pci_slots: number
          ram_slots: number
          retail_price?: number | null
          socket: string
        }
        Update: {
          chipset?: string
          created_at?: string
          id?: string
          max_ram?: number
          name?: string
          pci_slots?: number
          ram_slots?: number
          retail_price?: number | null
          socket?: string
        }
        Relationships: []
      }
      power_supplies: {
        Row: {
          created_at: string
          efficiency: string
          id: string
          modular: boolean
          name: string
          retail_price: number | null
          wattage: number
        }
        Insert: {
          created_at?: string
          efficiency: string
          id: string
          modular?: boolean
          name: string
          retail_price?: number | null
          wattage: number
        }
        Update: {
          created_at?: string
          efficiency?: string
          id?: string
          modular?: boolean
          name?: string
          retail_price?: number | null
          wattage?: number
        }
        Relationships: []
      }
      prebuilt_servers: {
        Row: {
          cpu: string
          created_at: string
          gpu: string
          gpu_count: number
          id: string
          name: string
          price: number
          provider: string
          ram: number
          specifications: string | null
          storage: number
        }
        Insert: {
          cpu: string
          created_at?: string
          gpu: string
          gpu_count: number
          id: string
          name: string
          price: number
          provider: string
          ram: number
          specifications?: string | null
          storage: number
        }
        Update: {
          cpu?: string
          created_at?: string
          gpu?: string
          gpu_count?: number
          id?: string
          name?: string
          price?: number
          provider?: string
          ram?: number
          specifications?: string | null
          storage?: number
        }
        Relationships: []
      }
      quantization_options: {
        Row: {
          bits_per_weight: number
          created_at: string
          id: string
          memory_reduction: number
          name: string
          performance_impact: number
        }
        Insert: {
          bits_per_weight: number
          created_at?: string
          id: string
          memory_reduction: number
          name: string
          performance_impact: number
        }
        Update: {
          bits_per_weight?: number
          created_at?: string
          id?: string
          memory_reduction?: number
          name?: string
          performance_impact?: number
        }
        Relationships: []
      }
      storage_options: {
        Row: {
          capacity: number
          created_at: string
          id: string
          interface: string
          iops: number
          price_per_tb: number
          read_speed: number
          type: string
          write_speed: number
        }
        Insert: {
          capacity: number
          created_at?: string
          id: string
          interface: string
          iops: number
          price_per_tb: number
          read_speed: number
          type: string
          write_speed: number
        }
        Update: {
          capacity?: number
          created_at?: string
          id?: string
          interface?: string
          iops?: number
          price_per_tb?: number
          read_speed?: number
          type?: string
          write_speed?: number
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
