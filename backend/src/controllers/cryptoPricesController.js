const { supabase } = require('../config/supabase');

const getSupabaseCryptoPrices = async () => {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  const { data: cryptoPrices, error } = await supabase
    .from('crypto_assets')
    .select('name, crypto, traditional, crypto_prices(time, price)')
    .gt('crypto_prices.time', date.toISOString())
    .order('time', { referencedTable: 'crypto_prices', ascending: true });

  return { cryptoPrices, error };
};

const getAllCryptoPrices = async (req, res) => {
  try {
    const { cryptoPrices, error } = await getSupabaseCryptoPrices();
    if (error) throw error;

    res.json({ cryptoPrices });
  } catch (error) {
    console.error('Get crypto prices error:', error);
    res.status(500).json({ error: 'Failed to get crypto prices' });
  }
};

module.exports = {
  getSupabaseCryptoPrices,
  getAllCryptoPrices,
};