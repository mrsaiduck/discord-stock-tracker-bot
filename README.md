# Stockify
### Stockify is a versatile Discord bot designed to enhance your stock market experience directly within your Discord server. With Stockify, you can access real-time stock market data, receive personalized alerts for specific stocks, and explore various technical indicators to make informed trading decisions.

## Key Features
Real-Time Data: Stay updated with the latest stock market trends and prices.
Personalized Alerts: Receive custom notifications for your favorite stocks to never miss a market move.
Technical Indicators: Explore a wide range of technical indicators to analyze stock performance and trends.
Watchlist Management: Easily manage your watchlist of stocks and stay informed about their fluctuations.
## Getting Started
**Installation:** Clone this repository to your local machine and install the required dependencies.

**Configuration:** Set up your Discord bot token and MongoDB token in the .env file.

**Run the Bot:** Launch the bot using node bot.js and invite it to your Discord server.

**Start Exploring:** Use various commands to access stock data, manage your watchlist, and explore technical indicators.

## Commands
### Stock Information
/stock-price [symbol]: Get the current price of a specific stock.
/price-intervals [symbol] [interval] [amount]: Retrieve price intervals for a stock over a specified time period.
/technical-indicator [symbol] [interval] [indicator] [amount] [time-period]: Explore technical indicators for a stock.
## Watchlist Management
/add-watchlist [symbol]: Add a stock to your watchlist.
/view-watchlist: View your current watchlist.
/remove-watchlist [symbol]: Remove a stock from your watchlist.
/clear-watchlist: Clear your entire watchlist.
## General Commands
/ping: Check the bot's latency.
/help: Display available commands and their usage.
## Credits
Stockify utilizes various open-source packages and APIs, including:

Stocks.js
live-stock-price
Discord.js
Mongoose
For more information on how to use Stockify, refer to the documentation and tutorials provided in the repository.

Experience the power of real-time stock market data integration with Stockify. Elevate your Discord server with advanced stock tracking capabilities today!