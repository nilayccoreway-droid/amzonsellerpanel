/*
  # Seller Dashboard Schema

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `name` (text)
      - `sku` (text, unique)
      - `price` (numeric)
      - `stock` (integer)
      - `status` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `orders`
      - `id` (uuid, primary key)
      - `order_number` (text, unique)
      - `customer_name` (text)
      - `customer_email` (text)
      - `total_amount` (numeric)
      - `status` (text) - pending, processing, completed, cancelled
      - `order_date` (timestamptz)
      - `created_at` (timestamptz)
    
    - `order_items`
      - `id` (uuid, primary key)
      - `order_id` (uuid, foreign key)
      - `product_id` (uuid, foreign key)
      - `quantity` (integer)
      - `price` (numeric)
      - `created_at` (timestamptz)
    
    - `transactions`
      - `id` (uuid, primary key)
      - `order_id` (uuid, foreign key)
      - `amount` (numeric)
      - `type` (text) - sale, refund, fee
      - `status` (text)
      - `transaction_date` (timestamptz)
      - `created_at` (timestamptz)
    
    - `activities`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `type` (text) - alert, notification, update
      - `is_read` (boolean)
      - `created_at` (timestamptz)
    
    - `returns`
      - `id` (uuid, primary key)
      - `order_id` (uuid, foreign key)
      - `reason` (text)
      - `status` (text)
      - `amount` (numeric)
      - `created_at` (timestamptz)
    
    - `shipments`
      - `id` (uuid, primary key)
      - `order_id` (uuid, foreign key)
      - `tracking_number` (text)
      - `carrier` (text)
      - `status` (text)
      - `shipped_date` (timestamptz)
      - `created_at` (timestamptz)
    
    - `reviews`
      - `id` (uuid, primary key)
      - `product_id` (uuid, foreign key)
      - `customer_name` (text)
      - `rating` (integer)
      - `comment` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated access
*/

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  sku text UNIQUE NOT NULL,
  price numeric NOT NULL DEFAULT 0,
  stock integer NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on products"
  ON products FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text UNIQUE NOT NULL,
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  total_amount numeric NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'pending',
  order_date timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on orders"
  ON orders FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity integer NOT NULL DEFAULT 1,
  price numeric NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on order_items"
  ON order_items FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE SET NULL,
  amount numeric NOT NULL DEFAULT 0,
  type text NOT NULL DEFAULT 'sale',
  status text NOT NULL DEFAULT 'completed',
  transaction_date timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on transactions"
  ON transactions FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Activities table
CREATE TABLE IF NOT EXISTS activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  type text NOT NULL DEFAULT 'notification',
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on activities"
  ON activities FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Returns table
CREATE TABLE IF NOT EXISTS returns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  reason text,
  status text NOT NULL DEFAULT 'pending',
  amount numeric NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE returns ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on returns"
  ON returns FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Shipments table
CREATE TABLE IF NOT EXISTS shipments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  tracking_number text,
  carrier text,
  status text NOT NULL DEFAULT 'pending',
  shipped_date timestamptz,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE shipments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on shipments"
  ON shipments FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  customer_name text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on reviews"
  ON reviews FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert sample data for products
INSERT INTO products (name, sku, price, stock, status) VALUES
  ('Premium Wireless Headphones', 'SKU-001', 199.99, 45, 'active'),
  ('Smart Watch Pro', 'SKU-002', 299.99, 23, 'active'),
  ('USB-C Charging Cable', 'SKU-003', 19.99, 150, 'active'),
  ('Laptop Stand Aluminum', 'SKU-004', 49.99, 67, 'active'),
  ('Mechanical Keyboard RGB', 'SKU-005', 129.99, 34, 'active')
ON CONFLICT (sku) DO NOTHING;

-- Insert sample orders
INSERT INTO orders (order_number, customer_name, customer_email, total_amount, status, order_date) VALUES
  ('ORD-2026-001', 'John Smith', 'john.smith@example.com', 419.98, 'completed', now() - interval '2 days'),
  ('ORD-2026-002', 'Sarah Johnson', 'sarah.j@example.com', 299.99, 'processing', now() - interval '1 day'),
  ('ORD-2026-003', 'Mike Brown', 'mike.b@example.com', 179.97, 'pending', now() - interval '5 hours'),
  ('ORD-2026-004', 'Emily Davis', 'emily.d@example.com', 69.98, 'completed', now() - interval '3 days'),
  ('ORD-2026-005', 'David Wilson', 'david.w@example.com', 329.98, 'processing', now() - interval '12 hours')
ON CONFLICT (order_number) DO NOTHING;

-- Insert sample activities
INSERT INTO activities (title, description, type, is_read) VALUES
  ('New Order Received', 'Order #ORD-2026-005 has been placed', 'notification', false),
  ('Low Stock Alert', 'Smart Watch Pro is running low on inventory (23 units left)', 'alert', false),
  ('System Update', 'Dashboard analytics have been updated with latest data', 'update', true),
  ('Payment Processed', 'Payment for Order #ORD-2026-004 has been confirmed', 'notification', true),
  ('Marketplace Update', 'New shipping options are now available in your region', 'update', false)
ON CONFLICT DO NOTHING;

-- Insert sample transactions
INSERT INTO transactions (order_id, amount, type, status, transaction_date)
SELECT id, total_amount, 'sale', 'completed', order_date
FROM orders
WHERE status = 'completed'
ON CONFLICT DO NOTHING;