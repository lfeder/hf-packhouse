-- Receipts behind the fert-building flow numbers (fert-room-flows.py). Run against aloha-prod
-- (Supabase zdvpqygiqavwpxljpvqw). One row per receiving date and item, in burn units.
select r.received_date d, coalesce(i.id, p.item_name) item,
       sum(r.received_quantity * coalesce(r.burn_per_received, 1)) q, max(p.invnt_vendor_id) vendor
from invnt_po_received r
join invnt_po p on p.id = r.invnt_po_id
left join invnt_item i on i.id = p.invnt_item_id
left join invnt_category c on c.id = coalesce(i.invnt_category_id, p.invnt_category_id)
where not r.is_deleted and not p.is_deleted
  and c.category_name in ('Fertilizers', 'Packing') and r.received_date >= '2025-09-01'
group by 1, 2 order by 1, 2;
