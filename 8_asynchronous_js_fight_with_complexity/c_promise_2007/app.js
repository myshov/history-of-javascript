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


var query = 'iPhone';
searchModelWithPromise(query);

function searchModelWithPromise(modelName) {
    getModelId(modelName)
        .then(getShops)
        .then(printShops);
}

function getModelId (modelName) {
    return getDataPromise('/search?name=' + modelName);
}

function getShops(modelId) {
    return getDataPromise('/shopOffers?id=' + modelId)
}

function printShops(shops) {
    shops.forEach(function (shopName) {
        console.log(query + ' есть в магазине ' + shopName);
    });
}
