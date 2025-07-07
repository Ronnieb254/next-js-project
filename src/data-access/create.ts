const { Pool } = require("pg");

const pool = new Pool({
  connectionString:
    "postgres://default:f1ZCrle7utJi@ep-plain-fog-a4qeftue-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require",
  ssl: {
    rejectUnauthorized: false, // for Neon
  },
});

const createFunction = async () => {
  const sql = `
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
  `;

  try {
    await pool.query(sql);
    console.log("✅ Function created successfully!");
  } catch (err) {
    console.error("❌ Error creating function:", err);
  } finally {
    await pool.end(); // ✅ always close the pool
  }
};

createFunction();

