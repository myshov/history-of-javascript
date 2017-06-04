/**
 * Emulate network connectivity
 */
function getDataDeferred(url) {
    var deferred = $.Deferred();
    var stubs = {
        '/search?name=iPhone': 123,
        '/shopOffers?id=123': ['AppleStore', 'DNS']
    };

    setTimeout(function () {
        deferred.resolve(stubs[url]);
    }, 1000);

    return deferred;
} 

/**
 * jQuery v1.5 way 
 */

searchModel('iPhone');

function searchModel(name) {
    var searchUrl = '/search?name=' + name;
    var whenModelIdFetched = getDataDeferred(searchUrl);

    whenModelIdFetched.done(function (modelId) {
        var offersUrl = '/shopOffers?id=' + modelId;
        var whenShopsDataFetched = getDataDeferred(offersUrl);
        
        whenShopsDataFetched.done(function (shops) {

            shops.forEach(function (shopName) {
                console.log(name + ' есть в магазине ' + shopName);
            });

        });
    });
}

/**
 * jQuery v1.6 way 
 */
var query = 'iPhone';
searchModelWithPipe(query);

function searchModelWithPipe(modelName) {
    getModelId(modelName)
        .pipe(getShops)
        .done(printShops);
}

function getModelId (modelName) {
    return getDataDeferred('/search?name=' + modelName);
}

function getShops(modelId) {
    return getDataDeferred('/shopOffers?id=' + modelId)
}

function printShops(shops) {
    shops.forEach(function (shopName) {
        console.log(query + ' есть в магазине ' + shopName);
    });
}

/**
 * jQuery v1.8 way
 */

/*
function searchModelWithPipe(modelName) {
    getModelId(modelName)
        .then(getShops)
        .then(printShops);
}
*/
