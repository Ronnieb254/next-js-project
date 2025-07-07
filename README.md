![image](https://github.com/user-attachments/assets/6ed0c541-2712-4c6d-ace3-bd561b67cef7)

# 📅 Date Range Difference Tool

A full-stack TypeScript project using PostgreSQL, Next.js, and React to compute and visualize the difference between two date ranges.

---

## 🧪 Part 1: PostgreSQL Function

**Function:** `extract_range(outer_range daterange, inner_range daterange)`

This function returns the part(s) of `outer_range` that do not overlap with `inner_range`.

### 📌 Logic:
- Returns:
  - Two fragments if `inner_range` is inside `outer_range`
  - One fragment if `inner_range` overlaps the start or end
  - Full `outer_range` if there's no overlap
  - `NULL` if `inner_range` fully covers `outer_range`

### ✅ Example:

```sql
SELECT * FROM extract_range(
  '[2018-01-01,2018-12-31]'::daterange,
  '[2018-03-01,2018-03-31]'::daterange
);
Returns:

[2018-01-01,2018-03-01)
(2018-03-31,2018-12-31]
