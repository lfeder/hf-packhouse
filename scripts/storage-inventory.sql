-- Inventory behind storage.html. Run against aloha-prod (Supabase zdvpqygiqavwpxljpvqw).
-- Weekly burn, pallet size and last on-hand for the items that take pallet space.
with last as (
  select distinct on (invnt_item_id) invnt_item_id, onhand_date, onhand_uom, onhand_quantity
  from invnt_onhand where not is_deleted
  order by invnt_item_id, onhand_date desc, created_at desc
)
select c.category_name, i.id as item, i.farm_id, i.burn_uom, i.burn_per_week,
       i.onhand_uom, i.burn_per_onhand, i.order_uom, i.burn_per_order, i.order_per_pallet,
       l.onhand_date, l.onhand_quantity
from invnt_item i
join invnt_category c on c.id = i.invnt_category_id
left join last l on l.invnt_item_id = i.id
where i.is_active and not i.is_deleted and i.burn_per_week > 0
  and c.category_name in ('Fertilizers', 'Packing', 'Growing')
order by c.category_name, i.burn_per_week desc;
