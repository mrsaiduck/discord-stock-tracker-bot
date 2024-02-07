const { Schema, model } = require('mongoose');

const watchlistSchema = new Schema({
    _id: Schema.Types.ObjectId,
    userId: String,
    userName: String,
    userWatchlistItems: [String],
});

module.exports = model('Watchlist', watchlistSchema, 'watchlists');
