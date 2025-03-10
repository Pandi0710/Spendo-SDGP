/*
  # Initial Schema Setup for Finance Tracker

  1. New Tables
    - users
      - id (uuid, primary key)
      - email (text, unique)
      - name (text)
      - profile_image (text)
      - balance (numeric)
      - created_at (timestamp)
    
    - categories
      - id (uuid, primary key)
      - name (text)
      - icon (text)
      - color (text)
      - is_default (boolean)
      - user_id (uuid, foreign key)
      - created_at (timestamp)
    
    - transactions
      - id (uuid, primary key)
      - title (text)
      - amount (numeric)
      - type (text)
      - category_id (uuid, foreign key)
      - user_id (uuid, foreign key)
      - notes (text)
      - date (timestamp)
      - created_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create users table
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT auth.uid(),
  email text UNIQUE NOT NULL,
  name text,
  profile_image text DEFAULT 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
  balance numeric DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS for users
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policy for users to read/update their own data
CREATE POLICY "Users can read own data" ON users
  FOR SELECT TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE TO authenticated
  USING (auth.uid() = id);

-- Create categories table
CREATE TABLE categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  icon text NOT NULL,
  color text NOT NULL DEFAULT '#3B82F6',
  is_default boolean DEFAULT false,
  user_id uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS for categories
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Create policies for categories
CREATE POLICY "Users can read default categories" ON categories
  FOR SELECT TO authenticated
  USING (is_default = true OR user_id = auth.uid());

CREATE POLICY "Users can create own categories" ON categories
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own categories" ON categories
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid() AND NOT is_default);

CREATE POLICY "Users can delete own categories" ON categories
  FOR DELETE TO authenticated
  USING (user_id = auth.uid() AND NOT is_default);

-- Create transactions table
CREATE TABLE transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  amount numeric NOT NULL,
  type text NOT NULL CHECK (type IN ('income', 'expense')),
  category_id uuid REFERENCES categories(id),
  user_id uuid REFERENCES users(id),
  notes text,
  date timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS for transactions
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Create policies for transactions
CREATE POLICY "Users can read own transactions" ON transactions
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create own transactions" ON transactions
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own transactions" ON transactions
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete own transactions" ON transactions
  FOR DELETE TO authenticated
  USING (user_id = auth.uid());

-- Insert default categories
INSERT INTO categories (name, icon, color, is_default) VALUES
  ('Education', 'school-outline', '#60A5FA', true),
  ('Rentals', 'key-outline', '#34D399', true),
  ('Foods', 'restaurant-outline', '#F472B6', true),
  ('Transport', 'airplane-outline', '#A78BFA', true),
  ('Entertainment', 'film-outline', '#FBBF24', true),
  ('Shopping', 'cart-outline', '#EC4899', true),
  ('Health', 'medical-outline', '#10B981', true),
  ('Bills', 'receipt-outline', '#6366F1', true),
  ('Salary', 'cash-outline', '#10B981', true),
  ('Investments', 'trending-up-outline', '#8B5CF6', true);