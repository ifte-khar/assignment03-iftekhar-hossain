import { expect, type Locator, type Page } from "@playwright/test";
import { faker, Faker } from '@faker-js/faker';

export class CreateClientPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly nameTextField: Locator;
  readonly emailTextField:Locator;
  readonly telephoneTextField:Locator;
  readonly saveButtion: Locator;
  readonly backButtion: Locator;


  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.getByText('New Client');
    this.nameTextField = page.locator('div').filter({ hasText: /^Name$/ }).getByRole('textbox');
    this.emailTextField = page.locator('input[type="email"]');
    this.telephoneTextField = page.locator('div').filter({ hasText: /^Telephone$/ }).getByRole('textbox');
    this.saveButtion = page.getByText('Save');
    this.backButtion = page.getByRole('link', { name: 'Back' }) ;
    
  }

  async createClient(){
    
    const randomName = faker.person.fullName();
    const randomEmail = faker.internet.email();
    const randomTelephone = faker.phone.number();
    await this.nameTextField.fill(randomName);
    await this.emailTextField.fill(randomEmail);
    await this.telephoneTextField.fill(randomTelephone);
    await this.saveButtion.click();
  }

}