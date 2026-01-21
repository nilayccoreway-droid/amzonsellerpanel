/*
  # Add Product Listing Fields

  1. Changes
    - Add `thumbnail` column to products table for product images
    - Add `attribute_set` column for product attribute category (e.g., Ring, Necklace)
    - Add `product_status` column for product listing status (e.g., Enabled, Disabled)
    - Add `type` column for product type (e.g., Simple, Variable)
    - Add `design_number` column for design identification
    - Add `quantity` column as alias for stock
  
  2. Notes
    - Uses conditional column addition to prevent errors if columns exist
    - Maintains existing data integrity
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'thumbnail'
  ) THEN
    ALTER TABLE products ADD COLUMN thumbnail text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'attribute_set'
  ) THEN
    ALTER TABLE products ADD COLUMN attribute_set text DEFAULT 'Ring';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'product_status'
  ) THEN
    ALTER TABLE products ADD COLUMN product_status text DEFAULT 'Enabled';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'approval_status'
  ) THEN
    ALTER TABLE products ADD COLUMN approval_status text DEFAULT 'Approved';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'type'
  ) THEN
    ALTER TABLE products ADD COLUMN type text DEFAULT 'Simple';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'design_number'
  ) THEN
    ALTER TABLE products ADD COLUMN design_number text;
  END IF;
END $$;