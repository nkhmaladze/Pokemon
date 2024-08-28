const axios = require("axios")
const EbayAuthToken = require('ebay-oauth-nodejs-client');
require('dotenv').config()

const ebayAuthToken = new EbayAuthToken({
    clientId: process.env.APP_ID_EBAY,
    clientSecret: process.env.EBAY_SECRET,
    redirectUri: process.env.REDIRECT_URI,
    env: 'PRODUCTION'
});

async function getOAuthToken() {
    try {
        const tokenResponse = await ebayAuthToken.getApplicationToken('PRODUCTION');
        console.log('OAuth Token:', tokenResponse);
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
        'paginationInput.entriesPerPage': '2'
    };

    try {
        const response = await axios.get(url, { params,headers: {
            //'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        } });
        console.log('Search Results:', JSON.stringify(response.data, null, 2));
    } catch (error) {
        console.error('Error searching eBay:', error);
    }
}
searchEbay('Pokemon 12/17')

// require('dotenv').config()
// const ebayToken = require("ebay-oauth-nodejs-client")

// const ebayOauth = new ebayToken({
//     clientId: "NikolozK-PokemonL-SBX-be0b1e5f0-f0ae47b3",
//     clientSecret: "SBX-e0b1e5f0f5fc-e5d9-4caf-a3f4-a8a5",
//     redirectUri: "https://auth.sandbox.ebay.com/oauth2/authorize?client_id=NikolozK-PokemonL-SBX-be0b1e5f0-f0ae47b3&response_type=code&redirect_uri=Nikoloz_Khmaldz-NikolozK-Pokemo-rzckdqm&scope=https://api.ebay.com/oauth/api_scope https://api.ebay.com/oauth/api_scope/buy.order.readonly https://api.ebay.com/oauth/api_scope/buy.guest.order https://api.ebay.com/oauth/api_scope/sell.marketing.readonly https://api.ebay.com/oauth/api_scope/sell.marketing https://api.ebay.com/oauth/api_scope/sell.inventory.readonly https://api.ebay.com/oauth/api_scope/sell.inventory https://api.ebay.com/oauth/api_scope/sell.account.readonly https://api.ebay.com/oauth/api_scope/sell.account https://api.ebay.com/oauth/api_scope/sell.fulfillment.readonly https://api.ebay.com/oauth/api_scope/sell.fulfillment https://api.ebay.com/oauth/api_scope/sell.analytics.readonly https://api.ebay.com/oauth/api_scope/sell.marketplace.insights.readonly https://api.ebay.com/oauth/api_scope/commerce.catalog.readonly https://api.ebay.com/oauth/api_scope/buy.shopping.cart https://api.ebay.com/oauth/api_scope/buy.offer.auction https://api.ebay.com/oauth/api_scope/commerce.identity.readonly https://api.ebay.com/oauth/api_scope/commerce.identity.email.readonly https://api.ebay.com/oauth/api_scope/commerce.identity.phone.readonly https://api.ebay.com/oauth/api_scope/commerce.identity.address.readonly https://api.ebay.com/oauth/api_scope/commerce.identity.name.readonly https://api.ebay.com/oauth/api_scope/commerce.identity.status.readonly https://api.ebay.com/oauth/api_scope/sell.finances https://api.ebay.com/oauth/api_scope/sell.payment.dispute https://api.ebay.com/oauth/api_scope/sell.item.draft https://api.ebay.com/oauth/api_scope/sell.item https://api.ebay.com/oauth/api_scope/sell.reputation https://api.ebay.com/oauth/api_scope/sell.reputation.readonly https://api.ebay.com/oauth/api_scope/commerce.notification.subscription https://api.ebay.com/oauth/api_scope/commerce.notification.subscription.readonly https://api.ebay.com/oauth/api_scope/sell.stores https://api.ebay.com/oauth/api_scope/sell.stores.readonly"
        
// })


// const APP_ID = process.env.APP_ID_EBAY

// async function getToken(){
//     try{
//         const tokenResponse = await ebayOauth.getApplicationToken("SANDBOX")
//         console.log(tokenResponse.access_token)
//         return tokenResponse.access_token

//     }catch(error){
//         console.log(error)
//     }
// }

// getToken()

// async function ebaySearch(keyword) {
//     const url = "https://api.ebay.com/buy/browse/v1/item_summary/search"
    
//     const params = {
//         'q' : keyword,
//         'limit' : '10'
//     }
//     // const params = {
//     // 'OPERATION-NAME': 'findItemsByKeywords',
//     // 'SERVICE-VERSION': '1.0.0',
//     // 'SECURITY-APPNAME': APP_ID,
//     // 'RESPONSE-DATA-FORMAT': 'JSON',
//     // 'keywords': keyword, //name of product here
//     // 'REST-PAYLOAD': true,
//     // 'paginationInput.entriesPerPage': '10'
//     // }
// try{
//     const response = await axios.get(url, {params, headers: {
//         'Authorization': process.env.EBAY_OAUTH
//     }})
//     const data = response.data
//     console.log(data)
// }catch(error){
//     console.log(error)
// }
// }

// ebaySearch('laptop')
//console.log('Request URL:', url);
//console.log('Request Params:', params);

// axios.get(url, { params })
//     .then(response =>{
//         const data = response.data
//         const items = data.findItemsByKeywordsResponse[0].searchResult[0].item

//         if (items && items.length >0){
//             const item = items[0]
//             const title = item.title[0]
//             const price = item.sellingStatus[0].currentPrice[0].__value__
//             const currency = item.sellingStatus[0].currentPrice[0]['@currencyId']
//             console.log(`Title: ${title}`)
//             console.log(`Price: ${price} ${currency}`)
//         }else {
//             console.log('No items found.')
//         }
//     })
//     .catch(error => {
//         console.error(`Request failed: ${error.message}`)
//     })