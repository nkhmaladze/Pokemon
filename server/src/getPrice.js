const axios = require("axios")

const APP_ID = process.env.APP_ID_EBAY

const url = "https://svcs.sandbox.ebay.com/services/search/FindingService/v1"

const params = {
    'OPERATION-NAME': 'findItemsByKeywords',
    'SERVICE-VERSION': '1.0.0',
    'SECURITY-APPNAME': APP_ID,
    'RESPONSE-DATA-FORMAT': 'JSON',
    'keywords': 'laptop', //name of product here
}

//console.log('Request URL:', url);
//console.log('Request Params:', params);

axios.get(url, { params })
    .then(response =>{
        const data = response.data
        const items = data.findItemsByKeywordsResponse[0].searchResult[0].item

        if (items && items.length >0){
            const item = items[0]
            const title = item.title[0]
            const price = item.sellingStatus[0].currentPrice[0].__value__
            const currency = item.sellingStatus[0].currentPrice[0]['@currencyId']
            console.log(`Title: ${title}`)
            console.log(`Price: ${price} ${currency}`)
        }else {
            console.log('No items found.')
        }
    })
    .catch(error => {
        console.error(`Request failed: ${error.message}`)
    })