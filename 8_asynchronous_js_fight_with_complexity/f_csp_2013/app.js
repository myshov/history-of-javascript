const csp = require('js-csp');

function getData(url) {
    const ch = csp.chan();
    setTimeout(() => {
        const stubs = {
            '/search?name=iPhone': 123,
            '/shopOffers?id=123': ['AppleStore', 'DNS']
        };

        csp.putAsync(ch, stubs[url]);
    }, 1000);

    return ch;
}

let query = 'iPhone';

csp.go(function* () {
    const idChannel = getData(`/search?name=${query}`);
    const id = yield csp.take(idChannel);
    const shopsChannel = getData(`/shopOffers?id=${id}`);
    const shops = yield csp.take(shopsChannel);

    shops.forEach((shopName) => {
        console.log(query + ' есть в магазине ' + shopName);
    });
});
