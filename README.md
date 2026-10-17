# Patoks Na Manok - Sales & Chicken Inventory System v1.3.0

### Patch Updates (v1.3.0 Requirements):
1. **Order**: Renamed supplier receive form to "Order" (Number of Chicken ordered from Supplier recorded by date).
2. **Removed Prepared/Marinated**: Eliminated raw vs. prepared staging and preparation form.
3. **Retained Sold**: Day-to-day sales directly deducts from general stock.
4. **Retained Disposed (Canteen Reused)**: Day-to-day disposal variable (allows 0 or more, used for Canteen Reused).
5. **Single General Remaining Stock**: Calculated automatically as `Total Stock = Orders - Sold - Disposed - Rejected/Spoiled`.
6. **Added Rejected / Spoiled**: Dedicated form/variable for bad stock/spoilage (deducts directly from general stock).
7. **Owner Ledger Specific Data Revision**: Owner can directly edit logged entry fields (Event Date, Quantity, Type, Notes) or reverse logs with audit trail.
