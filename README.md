# Patoks Na Manok - Sales & Chicken Inventory System

Updated **v1.2.1**:
- **Blank Screen Fix**: Added safety fallback in `app.init()` so view initialization (`view-setup` or `view-login`) always renders immediately, preventing blank body loading screens.
- **Clock Display Sync**: Fixed clock timer initialization after DOM content is ready.
- **Cashier Stepper Controls**: Large touch-friendly `[ - ]` and `[ + ]` quantity stepper buttons for mobile POS usability.
