import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async (req) => {
  if (req.method !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  const { key, value, isPublic } = JSON.parse(req.body);

  if (!key || !value) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'key and value are required' })
    };
  }

  try {
    // Tenta inserir, se existir, atualiza
    const { error: deleteError } = await supabase
      .from('storage_data')
      .delete()
      .eq('key', key);

    const { data, error } = await supabase
      .from('storage_data')
      .insert([
        {
          key,
          value,
          is_public: isPublic || false,
          created_at: new Date().toISOString()
        }
      ])
      .select();

    if (error) throw error;

    return {
      statusCode: 201,
      body: JSON.stringify({ success: true, data })
    };
  } catch (error) {
    console.error('storage-set error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
