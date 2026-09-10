// Storage API wrapper para usar com Netlify Functions
window.storage = {
  async list(prefix, isPublic) {
    try {
      const response = await fetch(`/api/storage-list?prefix=${prefix}&isPublic=${isPublic}`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('storage.list error:', error);
      return { keys: [] };
    }
  },

  async get(key, isPublic) {
    try {
      const response = await fetch(`/api/storage-get?key=${encodeURIComponent(key)}&isPublic=${isPublic}`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('storage.get error:', error);
      return null;
    }
  },

  async set(key, value, isPublic) {
    try {
      const response = await fetch('/api/storage-set', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, value, isPublic: isPublic || false })
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('storage.set error:', error);
      throw error;
    }
  }
};
