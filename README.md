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

```

🧪 Part 2: Backend API (Next.js + PostgreSQL)
✅ Endpoint
sql
Copy
Edit
GET /api/date-diff?outer=[YYYY-MM-DD,YYYY-MM-DD)&inner=[YYYY-MM-DD,YYYY-MM-DD)
🏗️ Structure (Clean Architecture)
lib/data-access/db.ts → connects to PostgreSQL

lib/use-case/getDateDiff.ts → executes the SQL function

pages/api/date-diff.ts → API route

🔌 Tech:
PostgreSQL 13+

pg library

TypeScript + Next.js API Routes

🧪 Part 3: Frontend UI (Next.js App Directory)
A responsive form using React Hook Form and Tailwind CSS with:

📝 Date input for outer and inner ranges

📈 Visualization using Chart.js

🧼 Clean, modular component structure

💡 Features:
Typed with TypeScript

Form validation with react-hook-form

UI styled with Tailwind CSS

Optional timeline/chart visualization with react-chartjs-2

🖼️ Screenshot

🚀 Getting Started
1. Clone & Install
bash
Copy
Edit
git clone https://github.com/your-username/date-range-diff-tool.git
cd date-range-diff-tool
pnpm install
2. Setup .env.local
ini
Copy
Edit
DATABASE_URL=your_postgres_connection_string
3. Create PostgreSQL Function
bash
Copy
Edit
node scripts/createFunction.js
Or run manually via DB UI/SQL CLI.

4. Run App
bash
Copy
Edit
pnpm dev
Then visit: http://localhost:3000

🧼 Folder Structure
bash
Copy
Edit
/app
  /components         # UI Components
  /api                # API route
  /lib
    /data-access      # DB connection
    /use-case         # Business logic
  /scripts            # Setup helpers
📦 Tech Stack
PostgreSQL

Next.js 15 (App Router + Turbopack)

TypeScript

Tailwind CSS

React Hook Form

Chart.js (react-chartjs-2)

Clean Architecture principles

📜 License
MIT — free for personal & commercial use.

✨ Author
Veronicah Bironga

Built as part of a fullstack technical assessment.

yaml
Copy
Edit

---

Let me know if you'd like:
- Deployment instructions (e.g., Vercel)
- Docker setup
- Screenshots or a video walkthrough added to the README



