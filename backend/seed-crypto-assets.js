// Script to seed crypto assets into database
// Run with: node seed-crypto-assets.js

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();


const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

const cryptoAssets = [
    {
        "crypto": "BTC",
        "name": "Bitcoin",
        "traditional": "USD",
    },
    {
        "crypto": "ETH",
        "name": "Ethereum",
        "traditional": "USD",
    },
    {
        "crypto": "SOL",
        "name": "Solana",
        "traditional": "USD",
    },
    {
        "crypto": "BNB",
        "name": "Binance Coin",
        "traditional": "USD",
    },
    {
        "crypto": "ADA",
        "name": "Cardano",
        "traditional": "USD",
    },
    {
        "crypto": "DOGE",
        "name": "Dogecoin",
        "traditional": "USD",
    },
    {
        "crypto": "XRP",
        "name": "Ripple",
        "traditional": "USD",
    },
    {
        "crypto": "DOT",
        "name": "Polkadot",
        "traditional": "USD",
    },
    {
        "crypto": "LUNA",
        "name": "Terra",
        "traditional": "USD",
    },
    {
        "crypto": "UNI",
        "name": "Uniswap",
        "traditional": "USD",
    },
];

console.log('🚀 Crypto Asset Seeder');
console.log('==================');
console.log('This script will seed all crypto assets to your Supabase database.');
console.log('');

async function seedCryptoAsset(cryptoAsset) {
    const { error } = await supabase.from('crypto_assets').insert(cryptoAsset);

    if (error) {
        console.error(error.message || 'Failed to seed');
        return null;
    }

    console.log(`✅ Seeded: ${cryptoAsset.name}`);
    return true;
}

async function main() {
    console.log('🚀 Starting crypto assets seeding...\n');
    console.log('==================');
    console.log(`📡 Connecting to: ${process.env.SUPABASE_URL}`);

    // Test connection
    const { error: testError } = await supabase.from('crypto_assets').select('id').limit(1);
    if (testError) {
        console.error('❌ Connection failed:', testError.message);
        console.log('\n💡 Make sure the crypto_assets table exists (run database-setup.sql first)');
        process.exit(1);
    }
    console.log('✅ Connected successfully!\n');

    // Clear existing data
    console.log('🗑️  Clearing existing crypto assets ...');
    const { error: deleteError } = await supabase.from('crypto_assets').delete().neq('id', "00000000-0000-0000-0000-000000000000");
    if (deleteError) {
        console.error('❌ Failed to clear crypto assets:', deleteError.message);
        process.exit(1);
    }

    // Insert all crypto assets

    console.log(`📝 Seeding ${cryptoAssets.length} crypto assets ...\n`);

    let successCount = 0;
    for (const cryptoAsset of cryptoAssets) {
        const result = await seedCryptoAsset(cryptoAsset);
        if (result) successCount++;
        await new Promise(resolve => setTimeout(resolve, 100)); // Small delay
    }

    console.log(`\n✨ Seeding complete!`);
    console.log(`   Success: ${successCount}/${cryptoAssets.length}`);
    console.log(`\n🎉 All crypto assets are now in your Supabase database!`);
}

main();
