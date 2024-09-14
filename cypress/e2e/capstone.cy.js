describe('Demo Web Shop Automation Testing', () => {  
    describe('Homepage Navigation', () => {
      it('Should load the homepage correctly', () => {
        let loadTime;
        const startTime = new Date().getTime();
        cy.visit('https://demowebshop.tricentis.com').then(() => {
          cy.window().then(() => {
            loadTime = new Date().getTime() - startTime;
            cy.log(`demo homepage load time: ${loadTime}ms`);
            expect(loadTime).to.be.lessThan(10000);
          });
        });
        cy.get('img[alt="Tricentis Demo Web Shop"]').should('be.visible');
        cy.url().should('eq', "https://demowebshop.tricentis.com/");
        cy.url().should('contain', 'demowebshop');
        cy.get(".ico-login").should('be.visible');
        cy.get('.header-menu').should('be.visible');
        cy.get('form > .button-1').should('be.visible');
        cy.get('#small-searchterms').should('be.visible');
      });
      it('Should display product categories', () => {
        cy.visit('https://demowebshop.tricentis.com');
        cy.get('.header-menu').should('be.visible');
        cy.get('.block-category-navigation > .listbox > .list > li').should('have.length', 7);
        cy.get("div[class='block block-category-navigation'] div[class='title']").should('be.visible');
        cy.get('.center-3').should("be.visible").scrollIntoView({ duration: 2000 });
        cy.get(':nth-child(7) > .product-item > .picture > a > img').scrollIntoView({ duration: 2000 });
      });
    });
    describe('Product Search', () => {  
      beforeEach(() => {
        cy.visit('https://demowebshop.tricentis.com/');
      });
      it('Should search for a product and display results', () => {
        cy.get('#small-searchterms').type('Digital SLR Camera 12.2 Mpixel{enter}');
        cy.get('.item-box').should('be.visible');
        cy.go('back');
        cy.get("#small-searchterms").type("Diamond Pave Earrings{enter}");
        cy.get('.item-box').should('be.visible');
      });
      it('Verify search results', () => {
        cy.get('#small-searchterms').type("Digital SLR Camera 12.2 Mpixel{enter}"); 
        cy.get('.item-box').click();
        cy.get('.picture').should('be.visible');
        cy.get('.overview').should('be.visible');
        cy.get('p').should('be.visible');
        cy.get('.price-value-18').should('be.visible'); 
      });
    });
    describe('Product Details', () => {  
      beforeEach(() => {
        cy.visit('https://demowebshop.tricentis.com/');
      });
      it("Verify product details and specifications", () => {
        cy.get('#small-searchterms').type("Smartphone{enter}");
        cy.get('.picture > a > img').click();
        cy.get("h1[itemprop='name']").should("contain", "Smartphone");
        cy.get(".price-value-43").should("contain", "100.00");
        cy.get('.full-description > :nth-child(3)').should("contain", "Battery life 8h in power use");
        cy.go(-2);
        cy.get('#small-searchterms').type('14.1-inch Laptop{enter}');
        cy.get("img[title='Show details for 14.1-inch Laptop']").click();
        cy.get("h1[itemprop='name']").should("contain", "14.1-inch Laptop");
        cy.get(".price-value-31").should("contain", "1590.00");
        cy.get("tbody tr:nth-child(1) td:nth-child(2)").should("contain", "14.1");
        cy.get(':nth-child(4) > .spec-value').should("contain", "250 GB");
      });
      it("Test the functionality of the 'Add to Cart' button", () => {
        cy.get("a[class='ico-cart'] span[class='cart-label']").should("be.visible");
        cy.get("a[class='ico-cart'] span[class='cart-label']").should("have.text", "Shopping cart");
        cy.get("a[class='ico-cart'] span[class='cart-label']").click();
        cy.get('h1').should('have.text', 'Shopping cart');
        cy.get('.order-summary-content').should('have.text', '\n    \n    \nYour Shopping Cart is empty!    \n');
        cy.go('back');
        cy.addProductToCart("Build your own cheap computer", '#add-to-cart-button-72');
        cy.get('#topcartlink > .ico-cart').click();
        cy.wait(3000);
        cy.get('.product-picture').should('be.visible');
        cy.wait(3000);
        cy.get('.remove-from-cart > input').click();
        cy.get('.update-cart-button').click();
      });
    });
    describe('Cart Management', () => {  
      beforeEach(() => {
        cy.visit('https://demowebshop.tricentis.com/');
      });/*
      it("Add items to the cart", () => {
        cy.addProductToCart("Blue and green Sneaker", '#add-to-cart-button-28');
        cy.navigateToCart();
        cy.get('tbody >[class="cart-item-row"]').should('be.visible');
      });
  
      it("Remove items from the cart", () => {
        //cy.addProductToCart("Smartphone", '#add-to-cart-button-43');
        cy.addProductToCart("Blue and green Sneaker", '#add-to-cart-button-28');
        //cy.addProductToCart("Black & White Diamond Heart", '#add-to-cart-button-14');
        //cy.addProductToCart("14.1-inch Laptop", '#add-to-cart-button-31');
        cy.navigateToCart();
        //cy.get(':nth-child(2) > .remove-from-cart > input').click();
        //cy.get(':nth-child(4) > .remove-from-cart > input').click();
        cy.get(':nth-child(1) > .remove-from-cart > input').click();
        //cy.get(':nth-child(3) > .remove-from-cart > input').click();
        cy.get("input[value='Update shopping cart']").click();
        cy.go('back');
        cy.get('h1').should('have.text', 'Shopping cart');
        cy.get('.order-summary-content').should('be.visible');
      });
  
      it('Verify cart total calculations', () => {
        cy.addProductToCart("Smartphone", '#add-to-cart-button-43');
        cy.navigateToCart();
        cy.get(':nth-child(1) > .unit-price').should('contain', '100.00');
        cy.get('.cart-total').should('contain', '100.00');
      });*/
    });
  
    describe('User Registration', () => {  
      beforeEach(() => {
        cy.visit('https://demowebshop.tricentis.com/');
      });
  
      /*it('Verify successful registration and email confirmation', () => {
        cy.get('.ico-register').click();
        cy.get('#gender-male').click();
        cy.get('#FirstName').type('venky');
        cy.get('#LastName').type('reddy');
        cy.get('#Email').type('wipro666666@gmail.com');
        cy.get('#Password').type('venky123');
        cy.get('#ConfirmPassword').type('venky123');
        cy.get('#register-button').click();
        cy.get('h1').should('be.visible');
        cy.get('.result').should('have.text', '\n            Your registration completed\n        ');
      });*/
  
      it('Test user registration with valid and invalid inputs', () => {
        cy.get('.ico-register').click();
        cy.get('#gender-male').click();
        cy.get('#FirstName').type('venky');
        cy.get('#LastName').type('reddy');
        cy.get('#Email').type('venky12#gmail.com');
        cy.get('#Password').type('Sai12345');
        cy.get('#ConfirmPassword').type('venky12345');
        cy.get('#register-button').click();
        cy.get('.field-validation-error > span').should('be.visible');
        
        cy.get('.ico-register').click();
        cy.get('#gender-male').click();
        cy.get('#FirstName').type('venky');
        cy.get('#LastName').type('reddy');
        cy.get('#Email').type('wipro32345@gmail.com');
        cy.get('#Password').type('venky123');
        cy.get('#ConfirmPassword').type('venky123');
        cy.get('#register-button').click();
        cy.get('h1').should('be.visible');
      });
    });
  
    describe('User Login/Logout', () => {  
      beforeEach(() => {
        cy.visit('https://demowebshop.tricentis.com/');
      });
  
      it('Login functionality with valid credentials', () => {
        cy.login('wipro32345@gmail.com', 'venky123');
        cy.get('.ico-logout').click();
      });
  
      it('Login functionality with invalid credentials', () => {
        cy.get('.ico-login').click();
        cy.get('#Email').type('wipro32345@gmail.com');
        cy.get('#Password').type('venky1234567');
        cy.get('form > .buttons > .button-1').click();
        cy.get('.validation-summary-errors').should('be.visible');
      });
  
      it('Test logout functionality', () => {
        cy.login('wipro32345@gmail.com', 'venky123');
        cy.wait(2000);
        cy.get('.ico-logout').click();
      });
    });
  
    describe('Checkout Process', () => {  
      beforeEach(() => {
        cy.visit('https://demowebshop.tricentis.com/');
      });
  
      /*it('Test the checkout process with valid payment information', () => {
        cy.login('wipro32345@gmail.com', 'venky123');
        cy.addProductToCart("Blue and green Sneaker", '#add-to-cart-button-28');
        cy.navigateToCart();
        cy.get('#termsofservice').click();
        cy.get('#checkout').click();
  
        cy.get('#billing-address-select').select('New Address');
        cy.get('#BillingNewAddress_Company').type('Wipro');
        cy.get('#BillingNewAddress_CountryId').select('India');
        cy.get('#BillingNewAddress_City').type('Nandyal');
        cy.get('#BillingNewAddress_Address1').type('6/24 Srinivasa center');
        cy.get('#BillingNewAddress_Address2').type('Srinivasa center, Nandyal');
        cy.get('#BillingNewAddress_ZipPostalCode').type('518543');
        cy.get('#BillingNewAddress_PhoneNumber').type('9876543234');
        cy.get('#BillingNewAddress_FaxNumber').type('9765432345');
        cy.get("input[onclick='Billing.save()']").click();
        cy.get('#billing-buttons-container > .button-1').click({ force: true });
  
        cy.get('#PickUpInStore').click();
        cy.get('#shipping-buttons-container > .button-1').click();
        cy.get('#paymentmethod_0').click();
        cy.get('input.button-1.payment-method-next-step-button').click();
        cy.get('input.button-1.payment-info-next-step-button').click();
        cy.get('input[value="Confirm"]').click();
  
        cy.get('strong').should('have.text', 'Your order has been successfully processed!');
        cy.get('input[value="Continue"]').click();
      });
  
      it('Verify order', () => {
        cy.login('wipro32345@gmail.com', 'venky123');
        cy.get('div[class="header-links"] a[class="account"]').click();
        cy.get('div[class="master-wrapper-main"] li:nth-child(3) a:nth-child(1)').click();
        cy.get('.center-2').should('be.visible');
        cy.get(':nth-child(1) > .buttons > .button-2').click();
        cy.get('.a-left').should('be.visible');
        cy.get('.order-number > strong').should('be.visible');
        cy.get('.order-details > :nth-child(1)').should('be.visible');
        cy.get('.payment-method').should('be.visible');
      });*/
    });
  });
  