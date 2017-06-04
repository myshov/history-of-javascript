function getData(url, callback) {
    setTimeout(function () {
        var stubs = {
            '/search?name=iPhone': 123,
            '/shopOffers?id=123': ['AppleStore', 'DNS']
        };

        callback(stubs[url]);
    }, 1000);
} 

function searchModel(name) {
    var searchUrl = '/search?name=' + name;
    getData(searchUrl, function searchCb(modelId) {

        var offersUrl = '/shopOffers?id=' + modelId;
        getData(offersUrl, function offersCb(shops) {

            shops.forEach(function (shopName) {
                console.log(name + ' есть в магазине ' + shopName);
            });

        })
    });
}

searchModel('iPhone');
