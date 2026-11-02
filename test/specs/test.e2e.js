import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import SecurePage from '../pageobjects/secure.page.js'

describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        await LoginPage.open()
        console.log('URL:', await browser.getUrl())

        await LoginPage.login('standard_user', 'secret_sauce')
    
    })
})

