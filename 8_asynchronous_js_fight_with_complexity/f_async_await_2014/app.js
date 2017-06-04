/**
 * Emulate network connectivity
 */
function getDataPromise(url) {
    var stubs = {
        '/search?name=iPhone': 123,
        '/shopOffers?id=123': ['AppleStore', 'DNS']
    };

    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(stubs[url]);
        }, 1000);
    });
} 


async function searchModelWithAsyncAwait(modelName) {
    var modelId = await getModelId(modelName);
    var shops = await getShops(modelId);
    return shops;
}

searchModelWithAsyncAwait('iPhone').then(printShops);

function getModelId (modelName) {
    return getDataPromise('/search?name=' + modelName);
}

function getShops(modelId) {
    return getDataPromise('/shopOffers?id=' + modelId)
}

function printShops(shops) {
    shops.forEach(function (shopName) {
        console.log('Есть в магазине ' + shopName);
    });
}
