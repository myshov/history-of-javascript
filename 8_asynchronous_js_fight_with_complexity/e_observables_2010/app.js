var Rx = require('rxjs');

/**
 * Emulate network connectivity
 */
function getDataObservable(url) {
    var stubs = {
        '/search?name=iPhone': 123,
        '/shopOffers?id=123': ['AppleStore', 'DNS']
    };

    return Rx.Observable.create(function (observer) {
        setTimeout(function () {
            observer.next(stubs[url]);
        }, 1000);
    });
} 


searchModelWithObservables('iPhone');

function searchModelWithObservables(modelName) {
    getModelId(modelName)
        .flatMap(getShops)
        .subscribe(printShops);
}

function getModelId (modelName) {
    return getDataObservable('/search?name=' + modelName);
}

function getShops(modelId) {
    return getDataObservable('/shopOffers?id=' + modelId)
}

function printShops(shops) {
    shops.forEach(function (shopName) {
        console.log('Есть в магазине ' + shopName);
    });
}
