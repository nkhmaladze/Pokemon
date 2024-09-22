const axios = require("axios")
const EbayAuthToken = require('ebay-oauth-nodejs-client');
require('dotenv').config()

const ebayAuthToken = new EbayAuthToken({
    clientId: process.env.APP_ID_EBAY,
    clientSecret: process.env.EBAY_SECRET,
    redirectUri: process.env.REDIRECT_URI,
    env: 'PRODUCTION'
});
//TODO: Fix Money( some thing show up in other currency)
//      Make the price be legit
//      Filter out sellers by reputation
//      Get statistically correct Price
//      Filter out Graded Card
  
async function getOAuthToken() {
    try {
        const tokenResponse = await ebayAuthToken.getApplicationToken('PRODUCTION');
        //console.log('OAuth Token:', tokenResponse);
        return tokenResponse;
    } catch (error) {
        console.error('Error obtaining OAuth token:', error);
    }
}

async function searchEbay(keyword) {
    const token = await getOAuthToken();
    
    if (!token) {
        console.error('Failed to obtain OAuth token');
        return;
    }

    const url = 'https://svcs.ebay.com/services/search/FindingService/v1';
    const params = {
        'OPERATION-NAME': 'findItemsByKeywords',
        'SERVICE-VERSION': '1.0.0',
        'SECURITY-APPNAME': process.env.APP_ID_EBAY,  // Replace with your actual eBay App ID
        'RESPONSE-DATA-FORMAT': 'JSON',
        'REST-PAYLOAD': true,
        'keywords': keyword,
        'paginationInput.entriesPerPage': '100',
        'sortOrder': 'PricePlusShippingLowest'	
    };

    try {
        const response = await axios.get(url, { params,headers: {
            //'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        } });

        const items = response.data.findItemsByKeywordsResponse[0].searchResult[0].item || [];

        const prices = items.map(item => {
            return {
                price: parseFloat( item.sellingStatus[0].currentPrice[0].__value__),
                itemId: item.itemId[0],
                title: item.title[0],
                itemUrl: item.viewItemURL[0],
                itemImageUrl: item.galleryURL[0]
            };
        });
        prices.sort((a, b) => a.price - b.price); //b-a for deschending
        
        //console.log('Search Results:', JSON.stringify(response.data, null, 2));
        console.log(prices)
        //console.log(prices.length)
        return prices;

    } catch (error) {
        console.error('Error searching eBay:', error);
        return [];
    }
}
//ascending, descending, middle get
module.exports = { searchEbay };