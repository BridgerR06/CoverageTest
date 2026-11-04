import { $ } from '@wdio/globals'
import Page from './page.js';

class ProductsPage extends Page {

    addToCartButton = {
        backpack: '#add-to-cart-sauce-labs-backpack',
        bikeLight: '#add-to-cart-sauce-labs-bike-light',
        boltTShirt: '#add-to-cart-sauce-labs-bolt-t-shirt',
        fleeceJacket: '#add-to-cart-sauce-labs-fleece-jacket',
        onesie: '#add-to-cart-sauce-labs-onesie',
        redTShirt: '[id="add-to-cart-test.allthethings()-t-shirt-(red)"]'
    };

    get cartBadge () {
        return $('.shopping_cart_badge');
    }




async addToCart (item) {
    await $(this.addToCartButton[item]).click();
}








}
export default new ProductsPage();