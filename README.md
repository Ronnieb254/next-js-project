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
CREATE OR REPLACE FUNCTION extract_range(
  outer_range daterange,
  inner_range daterange
)
RETURNS TABLE(range daterange)
LANGUAGE plpgsql
AS $$
BEGIN
  IF NOT outer_range && inner_range THEN
    RETURN QUERY SELECT outer_range;
  ELSIF inner_range @> lower(outer_range) AND inner_range @> upper(outer_range) THEN
    RETURN;
  ELSIF lower(inner_range) <= lower(outer_range) AND upper(inner_range) < upper(outer_range) THEN
    RETURN QUERY SELECT daterange(upper(inner_range), upper(outer_range), '[)');
  ELSIF lower(inner_range) > lower(outer_range) AND upper(inner_range) >= upper(outer_range) THEN
    RETURN QUERY SELECT daterange(lower(outer_range), lower(inner_range), '[)');
  ELSIF lower(inner_range) > lower(outer_range) AND upper(inner_range) < upper(outer_range) THEN
    RETURN QUERY
      SELECT daterange(lower(outer_range), lower(inner_range), '[)')
      UNION ALL
      SELECT daterange(upper(inner_range), upper(outer_range), '[)');
  END IF;
END;
$$;



SELECT * FROM extract_range(
  '[2018-01-01,2018-12-31]'::daterange,
  '[2018-03-01,2018-03-31]'::daterange
);
Returns:

[2018-01-01,2018-03-01)
(2018-03-31,2018-12-31]

```


## 🧪 Part 2: Backend API (Next.js + PostgreSQL)

✅ Endpoint
```sql
GET /api/date-diff?outer=[YYYY-MM-DD,YYYY-MM-DD)&inner=[YYYY-MM-DD,YYYY-MM-DD)
```

### **🏗️ Structure (Clean Architecture)**

lib/data-access/db.ts → connects to PostgreSQL

lib/use-case/getDateDiff.ts → executes the SQL function

pages/api/date-diff.ts → API route

### **🔌 Tech:**
PostgreSQL 13+

pg library

TypeScript + Next.js API Routes

## 🧪 Part 3: Frontend UI (Next.js App Directory)
A responsive form using React Hook Form and Tailwind CSS with:

📝 Date input for outer and inner ranges

📈 Visualization using Chart.js

🧼 Clean, modular component structure

### 💡 Features:
Typed with TypeScript

Form validation with react-hook-form

UI styled with Tailwind CSS

Optional timeline/chart visualization with react-chartjs-2


## **🚀 Getting Started**
**1. Clone & Install**
```bash
git clone https://github.com/your-username/date-range-diff-tool.git
cd date-range-diff-tool
pnpm install
```

**2. Setup .env.local**
```ini
DATABASE_URL=your_postgres_connection_string

```

**3. Create PostgreSQL Function**
```bash
node create.ts
```
Or run manually via DB UI/SQL CLI.

**4. Run App**
````bash
npm run dev
````
Then visit: http://localhost:3000

## **🧼 Folder Structure**
```bash

/app
  /components         # UI Components
  /api                # API route
  /lib
    /data-access      # DB connection
    /use-case         # Business logic
  /scripts            # Setup helpers

```
## **📦 Tech Stack**
PostgreSQL

Next.js 15 (App Router + Turbopack)

TypeScript

Tailwind CSS

React Hook Form

Chart.js (react-chartjs-2)

Clean Architecture principles

## **📜 License**

MIT — free for personal & commercial use.

## **✨ Author**

Veronicah Bironga

### **Built as part of a fullstack technical assessment.**

---

Let me know if you'd like:
- Deployment instructions (e.g., Vercel)
- Docker setup
- Screenshots or a video walkthrough added to the README



