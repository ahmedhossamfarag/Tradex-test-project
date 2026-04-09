// Automated script to seed all 12 strategies to database
// Run with: node seed-crypto-prices.js

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();


const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);


const seedPrices = (cryptoId) => {
    return Array(20).fill(null).map((_, index) => {
        return {
            "crypto_asset_id": cryptoId,
            "time": new Date(2026, 6, 4, index + 1, 30),
            "price": Math.random() * 10000,
        }
    })
}

async function seedCryptoPrice(cryptoPrice) {
    const { error } = await supabase.from('crypto_prices').insert(cryptoPrice);

    if (error) {
        return null;
    }

    return true;
}

async function seedCryptoPrices(cryptoId) {
    console.log(`📝 Seeding prices for crypto ${cryptoId}`);

    const prices = seedPrices(cryptoId);
    let successCount = 0;
    for (const price of prices) {
        const result = await seedCryptoPrice(price);
        if (result) successCount++;
    }

    console.log(`✅ Seeded ${successCount} prices for crypto ${cryptoId}`);
}

async function getCryptoAssets() {
    console.log('📡 Connecting to Supabase...');
    const { data, error } = await supabase.from('crypto_assets').select('id').limit(1000);

    if (error) {
        console.error('❌ Failed to connect to Supabase:', error.message);
        console.log('\n💡 Make sure you have:');
        console.log('   1. Created the crypto_assets table (run database-setup.sql)');
        console.log('   2. Set SUPABASE_URL and SUPABASE_ANON_KEY in .env');
        return null;
    }

    return data;
}

async function main() {
    console.log('🚀 Starting crypto prices seeding ...\n');
    console.log('==================');
    console.log(`📡 Connecting to: ${process.env.SUPABASE_URL}`);

    // Test connection
    const { error: testError } = await supabase.from('crypto_prices').select('id').limit(1);
    if (testError) {
        console.error('❌ Connection failed:', testError.message);
        console.log('\n💡 Make sure the crypto_prices table exists (run database-setup.sql first)');
        process.exit(1);
    }
    console.log('✅ Connected successfully!\n');

    // Clear existing data
    console.log('🗑️  Clearing existing crypto prices...');
    const { error: deleteError } = await supabase.from('crypto_prices').delete().neq('id', "00000000-0000-0000-0000-000000000000");
    if (deleteError) {
        console.error('❌ Failed to clear crypto prices:', deleteError.message);
        process.exit(1);
    }

    // Get crypto assets
    console.log('📝 Getting crypto assets...');
    const cryptoAssets = await getCryptoAssets();
    if (!cryptoAssets) {
        console.error('❌ Failed to get crypto assets');
        process.exit(1);
    }
    console.log(`✅ Got ${cryptoAssets.length} crypto assets`);

    // Seed crypto prices
    for (const cryptoAsset of cryptoAssets) {
        await seedCryptoPrices(cryptoAsset.id);
        await new Promise(resolve => setTimeout(resolve, 100)); // Small delay
    }

    console.log(`\n✨ Seeding complete!`);
    console.log(`\n🎉 All crypto prices are now in your Supabase database!`);
}

main();
