import { $ } from '@wdio/globals'
import WebsitePage from './website.page.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
const SORT_OPTIONS = {
    'Featured': '[data-sort="default"]',
    'Price: Low to High': '[data-sort="price-asc"]',
    'Price: High to Low': '[data-sort="price-desc"]',
    'Name: A → Z': '[data-sort="name-asc"]',
    'Name: Z → A': '[data-sort="name-desc"]',
    'On sale': '[data-sort="on-sale"]',
    'New arrivals': '[data-sort="new"]',
};

class CoverageTestPage extends WebsitePage {
  
get sortControl () { return $('#sort-btn'); }
get sortSelectedText () { return $('#sort-selected-text'); }  
get sortDropdown () { return $('#sort-dropdown'); }           
get sortOptions () { return $$('.sort-option'); }
get productCards () { return $$('.pcard'); }
get productNames () { return $$('.pcard .pcard-name'); }
get productPrices () { return $$('.pcard .pcard-price'); }
get pageBody () { return $('body'); }



async getSortLabel () {
    return (await this.sortSelectedText.getText()).trim();
}

async getOptionLabels () {
    const labels = [];
    for (const el of await this.sortOptions) {
        labels.push((await el.getText()).trim());
    }
    return labels;
}
    async openDept (dept = 5) {
    await browser.url(`https://rippsam.github.io/sportsEquip/index.html?dept=${dept}`);
    await this.sortControl.waitForDisplayed({ timeout: 10000 });
}

    async getNames () {
    const names = [];
    for (const el of await this.productNames) {
        names.push(await el.getText());
    }
    return names;
    }
    
async isMenuOpen () {
    return this.sortDropdown.isDisplayed();
}
    async getPrices () {
        const prices = [];
        for (const el of await this.productPrices) {
            const text = await el.getText();
            prices.push(parseFloat(text.replace(/[^0-9.]/g, '')));
        }
        return prices;
    }
 async openMenu () {
        await this.sortControl.click();
    }
 async selectSort (label) {
    await this.openMenu();
    await $(SORT_OPTIONS[label]).click();

    await browser.waitUntil(
        async () => (await this.getSortLabel()).includes(label),
        { timeout: 3000, timeoutMsg: `sort label never changed to ${label}` },
    );

   
    await browser.pause(500);
}
isSortedAsc (arr) { return arr.every((v, i) => i === 0 || arr[i - 1] <= v); }
isSortedDesc (arr) { return arr.every((v, i) => i === 0 || arr[i - 1] >= v); }
compareNames (a, b) { return a.toLowerCase().localeCompare(b.toLowerCase()); }
 async TC01_defaultIsFeatured () {
    await this.openDept();
    expect(await this.getSortLabel()).toContain('Featured');
}

async TC01_menuHasSevenOptionsInOrder () {
    await this.openDept();
    await this.openMenu();
    const labels = await this.getOptionLabels();
    expect(labels).toEqual(Object.keys(SORT_OPTIONS));
}
  async TC02_clickTwiceClosesMenu () {
        await this.openDept();
        const labelBefore = await this.getSortLabel();
        await this.openMenu();
        expect(await this.isMenuOpen()).toBe(true);
        await this.openMenu();
        expect(await this.isMenuOpen()).toBe(false);
        expect(await this.getSortLabel()).toBe(labelBefore);
    }
    async TC03_clickElsewhereClosesMenu () {
        await this.openDept();
        const labelBefore = await this.getSortLabel();
        await this.openMenu();
        await this.pageBody.click();
        expect(await this.isMenuOpen()).toBe(false);
        expect(await this.getSortLabel()).toBe(labelBefore);
    }
 
}

export default new CoverageTestPage();
