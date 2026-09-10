import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async (req) => {
  const { prefix, isPublic } = req.query;

  try {
    let query = supabase.from('storage_data').select('key');

    if (prefix) {
      query = query.ilike('key', `${prefix}%`);
    }

    if (typeof isPublic !== 'undefined') {
      query = query.eq('is_public', isPublic === 'true');
    }

    const { data, error } = await query;

    if (error) throw error;

    return {
      statusCode: 200,
      body: JSON.stringify({
        keys: data.map(item => item.key)
      })
    };
  } catch (error) {
    console.error('storage-list error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
