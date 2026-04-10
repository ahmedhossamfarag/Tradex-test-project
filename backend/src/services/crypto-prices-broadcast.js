const cron = require('node-cron');
const { sendToAll, setOnClose } = require('../config/websocket');
const { getSupabaseCryptoPrices } = require('../controllers/cryptoPricesController');

async function getPayload() {
    const { cryptoPrices } = await getSupabaseCryptoPrices();
    return JSON.stringify({ cryptoPrices });
}

function initCryptoPricesBroadcastService() {
    const task = cron.schedule('*/3 * * * * *', async () => {
        console.log('Sending crypto prices...');
        const payload = await getPayload();
        if (payload) sendToAll(payload);
    }, {
        scheduled: true
    });

    task.start();

    setOnClose(function close() {
        console.log('Closing crypto prices broadcast service...');
        task.stop();
    });
}

module.exports = { initCryptoPricesBroadcastService };