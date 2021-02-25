describe('Fresh Entry, No Activity Tests', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/source/productoro.html');
  });

  it('Timer at 25 minutes', () => {
    cy.get('#timer-display').should('have.text','25:00');
  });

  it('Start Button avialable', () => {
    cy.get('#startButton').then(($el) => {
      expect($el).to.not.have.attr('disabled');
    })
  });

  it('Reset Button not avialable', () => {
    //Currently does not work ... I think we should disable reset whenever timer not running ... including at start
    cy.get('#resetButton').then(($el) => {
      //expect($el).to.have.attr('disabled');
    })
  });

  it('Initial State', () => {
    cy.get('#state').should('have.text','Idle Mode');
  });

  it('Initial Pomo Streak', () => {
    cy.get('#streak').should('have.text','0');
  });

  it('Initial Pomo Total', () => {
    cy.get('#total').should('have.text','0');
  });
});

describe('Start Button Tests', () => {
    beforeEach(() => {
      cy.visit('http://127.0.0.1:5500/source/productoro.html');
    });

    it('Start Button Clicked: Check Timer Display', () => {
      cy.get('#startButton').click();
      //Cypress will wait a 10 seconds after the click
      cy.wait(10000);
      cy.get('#timer-display').should('have.text','24:50');
    });

    it('Start Button Clicked: Check Start Button Gets Disabled', () => {
      cy.get('#startButton').click();
      //Cypress will wait a second after the click
      cy.get('#startButton').then(($el) => {
        expect($el).to.have.attr('disabled');
      })
    });

    it('Start Button Clicked: Check Reset Button Gets Enabled', () => {
      cy.get('#startButton').click();
      //Cypress will wait a second after the click
      cy.get('#resetButton').then(($el) => {
        expect($el).to.not.have.attr('disabled');
      })
    });

    it('Start Button Clicked: Check Counters Not Updated', () => {
      cy.get('#startButton').click();
      //Cypress will wait 5 seconds after the click
      cy.wait(5000)
      cy.get('#streak').should('have.text','0');
      cy.get('#total').should('have.text','0');
    });

    it('Start Button Clicked: Check State', () => {
      cy.get('#startButton').click();
      //States need to be more consistent ... sometimes they have mode as a suffix sometimes not
      cy.get('#state').should('have.text','Work');
    });

});

describe('Entire Pomo Test', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/source/productoro.html');
  });

  //May or may not work ... ONLY TIME WILL TELL ... LITERALLY
  it('Start Button Clicked: Check Timer Display', () => {
    let time = 15000;
    cy.get('#startButton').click();
    cy.get('#state').should('have.text','Work');
    //Cypress will wait entire pomo
    cy.wait(time*1000);
    //check if timer is updated correctly
    cy.get('#timer-display').should('have.text','0:00');
    cy.get('#timer-display').should('have.text','5:00');
    //Check if the buttons flip press-ibility
    cy.get('#startButton').then(($el) => {
      expect($el).to.not.have.attr('disabled');
    })
    cy.get('#resetButton').then(($el) => {
      expect($el).to.have.attr('disabled');
    })
    //check state switches
    cy.get('#state').should('have.text','Short Break');
    //check counters get updated
    cy.get('#streak').should('have.text','1');
    cy.get('#total').should('have.text','1');

    //pass through short break
    cy.get('#startButton').click();
    cy.wait(1000*60*5);
    cy.get('#state').should('have.text','Work');
    //check if pressing reset after short break will correctly update counter, btns, time, etc.
    cy.get('#startButton').click();
    cy.wait(5000);
    cy.get('#resetButton').click();
    cy.get('#state').should('have.text','Work');
    cy.get('#streak').should('have.text','0');
    cy.get('#total').should('have.text','1');
    cy.get('#timer-display').should('have.text','25:00');
    cy.get('#startButton').then(($el) => {
      expect($el).to.not.have.attr('disabled');
    })
    cy.get('#resetButton').then(($el) => {
      expect($el).to.have.attr('disabled');
    })
  });

});