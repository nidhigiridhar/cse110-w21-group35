//Inital No Actvity Tests
describe('Fresh Entry, No Activity Tests', () => {
  beforeEach(() => {
    cy.visit('https://nidhigiridhar.github.io/cse110-w21-group35/source/productoro.html');
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
    cy.get('#resetButton').then(($el) => {
      expect($el).to.have.attr('disabled');
    })
  });

  it('Initial State', () => {
    cy.get('#state').should('have.text','Work State');
  });

  it('Initial Pomo Streak', () => {
    cy.get('#streak').should('have.text','0');
  });

  it('Initial Pomo Total', () => {
    cy.get('#total').should('have.text','0');
  });

  it('Help Not displayed', () => {
    cy.get('#help-modal').then(($el) => {
      expect($el).to.be.hidden
    });
  });

  it('Background Color: Blue', () => {
    cy.get('body').then(($el) => {
      expect($el).to.have.attr('state', 'pomo');
    });
  });
});




//Start Button Tests
describe('Start Button Tests', () => {
    beforeEach(() => {
      cy.visit('https://nidhigiridhar.github.io/cse110-w21-group35/source/productoro.html');
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
      cy.get('#state').should('have.text','Work State');
    });

    it('Start Button Clicked: Help Not displayed', () => {
      cy.get('#startButton').click();
      cy.get('#help-modal').then(($el) => {
        expect($el).to.be.hidden
      });
    });
  
    it('Start Button: Clickd Background Color Still Blue', () => {
      cy.get('#startButton').click();
      cy.get('body').then(($el) => {
        expect($el).to.have.attr('state', 'pomo');
      });
    });

});






describe('Reset Button Tests', () => {
  beforeEach(() => {
    cy.visit('https://nidhigiridhar.github.io/cse110-w21-group35/source/productoro.html');
  });

  it('Reset Button Clicked: Timer Resets', () => {
    cy.get('#startButton').click();
    //Cypress will wait a 10 seconds after the click
    cy.wait(10000);
    cy.get('#timer-display').should('have.text','24:50');
    cy.get('#resetButton').click();
    cy.get('#timer-display').should('have.text','25:00');
  });

  it('Reset Button Clicked: Check Reset Button Gets Disabled', () => {
    cy.get('#startButton').click();
    cy.get('#resetButton').click();
    cy.get('#resetButton').then(($el) => {
      expect($el).to.have.attr('disabled');
    })
  });

  it('Reset Button Clicked: Check Start Button Gets Enabled', () => {
    cy.get('#startButton').click();
    cy.get('#resetButton').click();
    cy.get('#startButton').then(($el) => {
      expect($el).to.not.have.attr('disabled');
    })
  });

  it('Reset Button Clicked: Check if Only Streak was Killed', () => {
    cy.get('#startButton').click();
    //Cypress will wait 5 seconds after the click
    cy.wait(5000)
    //Not sure if this is the right way to set the inner html
    cy.get('#streak').invoke('prop', 'innerHTML', '1');
    cy.get('#total').invoke('prop', 'innerHTML', '1');
    cy.get('#streak').should('have.text','1');
    cy.get('#total').should('have.text','1');
    cy.wait(5000);
    //reset broken this test will fail
    cy.get('#resetButton').click();
    cy.get('#streak').should('have.text','0');
  });

  it('Reset Button Clicked: Check State', () => {
    cy.get('#startButton').click();
    cy.get('#resetButton').click();
    cy.get('#state').should('have.text','Work State');
  });

  it('Help Not displayed', () => {
    cy.get('#help-modal').then(($el) => {
      expect($el).to.be.hidden
    });
  });

  it('Background Color: Blue', () => {
    cy.get('body').then(($el) => {
      expect($el).to.have.attr('state', 'pomo');
    });
  });
});





//Not Sure how to test TBH
describe('Help Button Tests', () => {
  beforeEach(() => {
    cy.visit('https://nidhigiridhar.github.io/cse110-w21-group35/source/productoro.html');
  });

  it('Help Butto Clicked: Instructions Appear', () => {
    cy.get('#helpButton').click();
    cy.get('#help-modal').then(($el) => {
      expect($el).to.be.not.hidden
    });
  });

  it('Help Butto Clicked: Timer Does not Start', () => {
    cy.get('#helpButton').click();
    cy.get('#help-modal').then(($el) => {
      expect($el).to.be.not.hidden
    });
    cy.get('#timer-display').should('have.text','25:00');
  });

  it('Help Butto Clicked: Counters Unaffected', () => {
  });

});

//Not Sure how to test TBH
describe('Dynamic Background Tests', () => {
  beforeEach(() => {
    cy.visit('https://nidhigiridhar.github.io/cse110-w21-group35/source/productoro.html');
  });

  it('Color Chnages: Short Break', () => {
  });

  it('Color Chnages: Long Break', () => {
  });

});






describe('Entire Pomo Test', () => {
  beforeEach(() => {
    cy.visit('https://nidhigiridhar.github.io/cse110-w21-group35/source/productoro.html');
  });

  //May or may not work ... ONLY TIME WILL TELL ... LITERALLY
  it('Start Button Clicked: Check Timer Display', () => {
    cy.get('#startButton').click();
    cy.get('#state').should('have.text','Work State');
    //Cypress will wait entire pomo
    cy.wait(25*60*1000);
    //check if timer is updated correctly
    cy.get('#timer-display').should('have.text','00:00');
    cy.get('#timer-display').should('have.text','05:00');
    //Check if the buttons flip press-ibility
    cy.get('#startButton').then(($el) => {
      expect($el).to.not.have.attr('disabled');
    })
    cy.get('#resetButton').then(($el) => {
      expect($el).to.have.attr('disabled');
    })
    //check state switches
    cy.get('#state').should('have.text','Short Break State');
    //check counters get updated
    cy.get('#streak').should('have.text','1');
    cy.get('#total').should('have.text','1');

    //start short break
    cy.get('#startButton').click();
    //check both buttons cannot be pressed during break
    cy.get('#startButton').then(($el) => {
      expect($el).to.have.attr('disabled');
    })
    cy.get('#resetButton').then(($el) => {
      expect($el).to.have.attr('disabled');
    })
    cy.wait(1000*60*5);
    cy.get('#state').should('have.text','Work State');
    //check if pressing reset after short break will correctly update counter, btns, time, etc.
    cy.wait(5000);
    cy.get('#startButton').click();
    cy.wait(5000);
    cy.get('#resetButton').click();
    cy.get('#state').should('have.text','Work State');
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

describe('Full Cycle Test', () => {
  beforeEach(() => {
    cy.visit('https://nidhigiridhar.github.io/cse110-w21-group35/source/productoro.html');
  });

  it('Testing Four Pomos Along with Short and Long Breaks', () => {
  });
});
