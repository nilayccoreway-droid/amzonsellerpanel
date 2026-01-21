/*
  # Add Additional Sample Data

  1. Additional Data
    - Add more orders to populate the dashboard
    - Add more activities and notifications
    - Add shipments and returns data
    - Add product reviews
    
  2. Purpose
    - Make the dashboard more visually populated
    - Provide realistic sample data for testing
*/

-- Insert additional orders
INSERT INTO orders (order_number, customer_name, customer_email, total_amount, status, order_date) VALUES
  ('ORD-2026-006', 'Alice Chen', 'alice.c@example.com', 499.97, 'completed', now() - interval '4 days'),
  ('ORD-2026-007', 'Robert Garcia', 'robert.g@example.com', 149.99, 'pending', now() - interval '2 hours'),
  ('ORD-2026-008', 'Jennifer Lee', 'jennifer.l@example.com', 259.98, 'processing', now() - interval '1 day'),
  ('ORD-2026-009', 'Michael Taylor', 'michael.t@example.com', 89.99, 'completed', now() - interval '6 days'),
  ('ORD-2026-010', 'Lisa Anderson', 'lisa.a@example.com', 379.97, 'processing', now() - interval '8 hours'),
  ('ORD-2026-011', 'James Martinez', 'james.m@example.com', 199.99, 'pending', now() - interval '3 hours'),
  ('ORD-2026-012', 'Maria Rodriguez', 'maria.r@example.com', 449.98, 'completed', now() - interval '5 days'),
  ('ORD-2026-013', 'Christopher White', 'chris.w@example.com', 129.99, 'processing', now() - interval '1 day'),
  ('ORD-2026-014', 'Amanda Thomas', 'amanda.t@example.com', 299.99, 'completed', now() - interval '7 days'),
  ('ORD-2026-015', 'Daniel Harris', 'daniel.h@example.com', 349.98, 'pending', now() - interval '6 hours')
ON CONFLICT (order_number) DO NOTHING;

-- Insert additional activities
INSERT INTO activities (title, description, type, is_read) VALUES
  ('Price Update', 'Prices have been updated for 3 products', 'update', false),
  ('New Review Received', 'A customer left a 5-star review for Premium Wireless Headphones', 'notification', false),
  ('Stock Replenished', 'USB-C Charging Cable stock has been restocked to 150 units', 'notification', true),
  ('Shipping Delay', 'Order #ORD-2026-008 may experience a slight shipping delay', 'alert', false),
  ('Sales Milestone', 'Congratulations! You have reached ¥50,000 in sales this month', 'notification', false),
  ('Product Query', '2 customers have inquired about Smart Watch Pro availability', 'notification', true),
  ('Return Request', 'Customer requested return for Order #ORD-2026-001', 'alert', false)
ON CONFLICT DO NOTHING;

-- Insert shipments for completed orders
INSERT INTO shipments (order_id, tracking_number, carrier, status, shipped_date)
SELECT id, 
       'TRK-' || substr(order_number, 10, 3) || '-2026', 
       CASE 
         WHEN random() < 0.5 THEN 'FedEx'
         ELSE 'UPS'
       END,
       CASE 
         WHEN random() < 0.3 THEN 'delivered'
         WHEN random() < 0.6 THEN 'in_transit'
         ELSE 'pending'
       END,
       order_date + interval '1 day'
FROM orders
WHERE status IN ('completed', 'processing')
ON CONFLICT DO NOTHING;

-- Insert some returns
INSERT INTO returns (order_id, reason, status, amount)
SELECT id, 
       'Product not as described',
       'pending',
       total_amount * 0.5
FROM orders
WHERE order_number = 'ORD-2026-001'
ON CONFLICT DO NOTHING;

-- Insert product reviews
INSERT INTO reviews (product_id, customer_name, rating, comment)
SELECT p.id, 'John Smith', 5, 'Excellent quality! Highly recommend this product.'
FROM products p
WHERE p.sku = 'SKU-001'
ON CONFLICT DO NOTHING;

INSERT INTO reviews (product_id, customer_name, rating, comment)
SELECT p.id, 'Sarah Johnson', 4, 'Good product but shipping took longer than expected.'
FROM products p
WHERE p.sku = 'SKU-002'
ON CONFLICT DO NOTHING;

INSERT INTO reviews (product_id, customer_name, rating, comment)
SELECT p.id, 'Mike Brown', 5, 'Perfect! Exactly what I needed.'
FROM products p
WHERE p.sku = 'SKU-004'
ON CONFLICT DO NOTHING;

INSERT INTO reviews (product_id, customer_name, rating, comment)
SELECT p.id, 'Emily Davis', 5, 'Great value for money. Works perfectly.'
FROM products p
WHERE p.sku = 'SKU-003'
ON CONFLICT DO NOTHING;

-- Insert transactions for new completed orders
INSERT INTO transactions (order_id, amount, type, status, transaction_date)
SELECT id, total_amount, 'sale', 'completed', order_date
FROM orders
WHERE status = 'completed' 
  AND id NOT IN (SELECT DISTINCT order_id FROM transactions WHERE order_id IS NOT NULL)
ON CONFLICT DO NOTHING;