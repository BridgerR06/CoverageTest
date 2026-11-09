import { expect } from '@wdio/globals'
import CoverageTestPage from '../pageobjects/coveragetest.page.js'

describe('Sort Bar Coverage Test', () => {
    it('Sort Bar should work as intended', async () => {
        console.log('URL:', await browser.getUrl())
        await CoverageTestPage.open();
    });

    it('TC01 - default sort is Featured', async () => {
        await CoverageTestPage.TC01_defaultIsFeatured();
    });

    it('TC02 - menu has seven options in order', async () => {
        await CoverageTestPage.TC02_menuHasSevenOptionsInOrder();
    });

    it('TC03 - clicking the control twice closes the menu', async () => {
        await CoverageTestPage.TC03_clickTwiceClosesMenu();
    });

    it('TC04 - clicking elsewhere closes the menu', async () => {
        await CoverageTestPage.TC04_clickElsewhereClosesMenu();
    });
});