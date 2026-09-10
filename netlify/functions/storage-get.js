import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async (req) => {
  const { key, isPublic } = req.query;

  if (!key) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'key is required' })
    };
  }

  try {
    let query = supabase.from('storage_data').select('*').eq('key', key);

    if (typeof isPublic !== 'undefined') {
      query = query.eq('is_public', isPublic === 'true');
    }

    const { data, error } = await query.single();

    if (error) throw error;

    return {
      statusCode: 200,
      body: JSON.stringify({ value: data.value })
    };
  } catch (error) {
    console.error('storage-get error:', error);
    return {
      statusCode: 404,
      body: JSON.stringify({ error: 'Not found' })
    };
  }
};
