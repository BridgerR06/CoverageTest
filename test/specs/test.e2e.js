import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import SecurePage from '../pageobjects/secure.page.js'

describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        for (const {username, password} of LoginPage.users) {
            await LoginPage.open()
            console.log('URL:', await browser.getUrl())

            await LoginPage.login(username, password)
            await expect($('.title')).toHaveText('Products')
        }
    })
})