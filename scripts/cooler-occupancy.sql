-- Cucumber cases in the cooler, day by day, for storage.html's cold storage need. Run against aloha-prod.
-- An order's cases are in the cooler from their pack date (sales_po_fulfillment) to the order's invoice date, when
-- they leave by container, truck or pickup. "peak" is a day's worst moment: everything packed that day and
-- everything leaving it, both counted. "eod" is the end of the day, after the day's orders have gone.
-- 2025 on only: before 2025 the pack records don't reconcile with invoices (2023 2.8x, 2024 1.26x; 2025-26 99%).
-- Rows packed after their invoice date, or more than 7 days before it, are entry errors and left out.
with f as (
  select f.pack_date p, po.invoice_date i, f.fulfilled_quantity q
  from sales_po_fulfillment f join sales_po po on po.id = f.sales_po_id
  where not f.is_deleted and not po.is_deleted and f.farm_id = 'Cuke' and f.pack_date is not null
    and po.invoice_date >= f.pack_date and po.invoice_date - f.pack_date <= 7 and po.invoice_date >= '2025-01-01'),
d as (select generate_series('2025-01-06'::date, current_date - 1, '1 day')::date d),
s as (select d.d, extract(year from d.d) y,
        (select coalesce(sum(q), 0) from f where p <= d.d and i >= d.d) peak,
        (select coalesce(sum(q), 0) from f where p <= d.d and i >  d.d) eod
      from d)
select y yr, count(*) days,
  round(avg(peak)) avg_peak,
  round((percentile_cont(0.9)  within group (order by peak))::numeric) p90_peak,
  round((percentile_cont(0.99) within group (order by peak))::numeric) p99_peak,
  max(peak) max_peak, max(eod) max_eod,
  (array_agg(d order by peak desc))[1] max_day
from s group by y order by y;
