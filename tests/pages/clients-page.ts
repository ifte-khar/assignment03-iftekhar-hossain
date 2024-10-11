import { expect, type Locator, type Page } from "@playwright/test";

export class ClientsPage {
    readonly page: Page;
    readonly pageHeading: Locator;
    readonly creatClientButton: Locator;
    readonly clientManuButtion: Locator;
    readonly editClientOption: Locator;
    readonly deleteClientOption: Locator;
    readonly backButton: Locator;
  
    constructor(page: Page) {
      this.page = page;
      this.pageHeading = page.getByText("Clients");
      this.creatClientButton = page.getByRole("link", { name: "Create Client" });
      this.clientManuButtion = page.getByRole("img");
      this.editClientOption = page.getByText("Edit");
      this.deleteClientOption = page.getByText("Delete");
      this.backButton = page.getByRole("link", { name: "Back" });
    }
  
    async gotoCreateClient() {
      await this.creatClientButton.click();
    }
  
    // Select exact client
    async gotoEditClient(index: number) {
      await this.clientManuButtion.nth(index).click(); 
      await this.editClientOption.click();
    }
    
    // Select exact client
    async deleteClient(index: number) {
      await this.clientManuButtion.nth(index).click(); 
      await this.deleteClientOption.click();
    }
  
    async goBack(){
      await this.backButton.click();
    }
  }