const express = require('express');
const mongoose = require('mongoose');
const cron = require('node-cron');
const cors = require('cors');
const { default: axios } = require('axios');
const app = express();
const PORT = 5000;

app.use(cors())

mongoose.connect('mongodb+srv://sagar:sagar@cluster0.evxmkzg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>{
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((err)=>{
    console.log(err)
});

const DataSchema = new mongoose.Schema({
    symbol: String,
    price: Number,
    timestamp: { type: Date, default: Date.now }
});

const Data = mongoose.model('Data', DataSchema);

const fetchCryptoData = async () => {
    const symbols = ['BTC', 'ETH', "ENA","BNB","DOGE"];
    // ETHena

    symbols.forEach(async (symbol) => {
        try {
            const response = await axios.post('https://api.livecoinwatch.com/coins/single', {
                currency: "USD",
                code:symbol,
                meta:true,
              }, {
                headers: {
                  "content-type": "application/json",
                  "x-api-key": "af522b41-46c3-469f-b8ad-512abd518cea", // Replace with your API key
                },
              });

            const price = response.data.rate;
            const data = new Data({ symbol, price });
            await data.save().catch((err)=>{
                console.log(err)
            });
        } catch (error) {
            
        }
    });
};

cron.schedule('*/5 * * * * *', fetchCryptoData);

app.get('/data/:symbol', async (req, res) => {
    const { symbol } = req.params;
    const data = await Data.find({ symbol }).sort({ timestamp: -1 }).limit(20);
    res.json(data);
});


