import { Schema, model } from 'mongoose';

const cryptoPriceSchema = new Schema({
    coinId: {
        type: String,
        required: true,
        enum: ['bitcoin', 'matic-network', 'ethereum']
    },
    priceUSD: {
        type: Number,
        required: true
    },
    marketCapUSD: {
        type: Number,
        required: true
    },
    change24h: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
},
    { timestamps: true });

cryptoPriceSchema.index({ coinId: 1, timestamp: -1 });

const CryptoPrice = model('CryptoPrice', cryptoPriceSchema);

export default CryptoPrice; 