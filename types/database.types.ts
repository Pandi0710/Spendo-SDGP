export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string | null
          profile_image: string | null
          balance: number
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          name?: string | null
          profile_image?: string | null
          balance?: number
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          profile_image?: string | null
          balance?: number
          created_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          icon: string
          color: string
          is_default: boolean
          user_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          icon: string
          color?: string
          is_default?: boolean
          user_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          icon?: string
          color?: string
          is_default?: boolean
          user_id?: string | null
          created_at?: string
        }
      }
      transactions: {
        Row: {
          id: string
          title: string
          amount: number
          type: 'income' | 'expense'
          category_id: string
          user_id: string
          notes: string | null
          date: string
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          amount: number
          type: 'income' | 'expense'
          category_id: string
          user_id: string
          notes?: string | null
          date?: string
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          amount?: number
          type?: 'income' | 'expense'
          category_id?: string
          user_id?: string
          notes?: string | null
          date?: string
          created_at?: string
        }
      }
    }
  }
}