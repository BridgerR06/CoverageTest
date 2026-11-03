import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import SecurePage from '../pageobjects/secure.page.js'

describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        for (let i = 0; i < LoginPage.users.length; i++) {
            const user = LoginPage.users[i]
            await LoginPage.open()
            console.log('URL:', await browser.getUrl())

            await LoginPage.login(user, LoginPage.uniPass)
            await expect($('.title')).toHaveText('Products')
        }
    })
})