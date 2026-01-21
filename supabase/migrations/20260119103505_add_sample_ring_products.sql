/*
  # Add Sample Ring Products

  1. Changes
    - Updates existing products with jewelry/ring data
    - Adds additional sample ring products with complete details
    - Includes design numbers, attribute sets, and product statuses
  
  2. Data
    - Creates variety of ring products with different prices
    - Sets appropriate statuses and types
    - Adds realistic SKUs and design numbers
*/

UPDATE products SET
  name = 'Blue Sapphire Platinum Wedding Ring In Cushion-Cut',
  attribute_set = 'Ring',
  product_status = 'Enabled',
  approval_status = 'Approved',
  type = 'Simple',
  design_number = '40173',
  price = 6600000,
  stock = 1
WHERE sku = 'SKU-001';

UPDATE products SET
  name = 'Blue Sapphire Blossom Ring With Diamond Detailing',
  attribute_set = 'Ring',
  product_status = 'Enabled',
  approval_status = 'Approved',
  type = 'Simple',
  design_number = '40231',
  price = 620000,
  stock = 1
WHERE sku = 'SKU-002';

UPDATE products SET
  name = 'Natural Blue Sapphire And Platinum Ring In Cushion Cut',
  attribute_set = 'Ring',
  product_status = 'Enabled',
  approval_status = 'Approved',
  type = 'Simple',
  design_number = '40060',
  price = 8520000,
  stock = 1
WHERE sku = 'SKU-003';

UPDATE products SET
  name = 'Natural Pear-Shaped Sapphire Ring With Crossover Band',
  attribute_set = 'Ring',
  product_status = 'Enabled',
  approval_status = 'Approved',
  type = 'Simple',
  design_number = '40109',
  price = 300000,
  stock = 1
WHERE sku = 'SKU-004';

UPDATE products SET
  name = 'Sri Lankan Blue Sapphire Platinum Ring In Oval Motif',
  attribute_set = 'Ring',
  product_status = 'Enabled',
  approval_status = 'Approved',
  type = 'Simple',
  design_number = '40103',
  price = 1100000,
  stock = 1
WHERE sku = 'SKU-005';

INSERT INTO products (name, sku, price, stock, attribute_set, product_status, approval_status, type, design_number) VALUES
  ('Oval-Cut Natural Blue Sapphire Ring With Platinum Band', 'ZJPS787B-011-9600B74', 1700000, 1, 'Ring', 'Enabled', 'Approved', 'Simple', '40111'),
  ('Heart-Shaped Blue Sapphire Ring with Infinity Band', 'ZJPS787B-011-4600893', 2540000, 1, 'Ring', 'Enabled', 'Approved', 'Simple', '40063'),
  ('Sapphire Oval-Cut Premium Platinum Ring In Blue Hue', 'ZJPS787B-011-9707291', 3000000, 1, 'Ring', 'Enabled', 'Approved', 'Simple', '40066'),
  ('Natural Blue Sapphire Engagement Ring In Cushion Design', 'ZJPS787B-011-5001461', 2250000, 1, 'Ring', 'Enabled', 'Approved', 'Simple', '40107'),
  ('Princess Diana Sapphire Ring With Diamonds In Blue', 'ZJPS787B-011-5405534', 3480000, 1, 'Ring', 'Enabled', 'Approved', 'Simple', '40065')
ON CONFLICT (sku) DO NOTHING;