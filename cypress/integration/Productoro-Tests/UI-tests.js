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

    it('Start Button Clicked: Check Timer Display 24:50', () => {
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

    it('Start Button Clicked: Check Help Not displayed', () => {
      cy.get('#startButton').click();
      cy.get('#help-modal').then(($el) => {
        expect($el).to.be.hidden
      });
    });
  
    it('Start Button Clickd: Check Background Color Unaffected', () => {
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
    });
  });

  it('Reset Button Clicked: Check Only Streak was Killed', () => {
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

  it('Reset Button Clicked: Help Not displayed', () => {
    cy.get('#help-modal').then(($el) => {
      expect($el).to.be.hidden
    });
  });

  it('Reset Button Clicked: Check Background Color Unaffected', () => {
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

  it('Help Button Clicked: Instructions Appear', () => {
    cy.get('#helpButton').click();
    cy.get('#help-modal').then(($el) => {
      expect($el).to.be.not.hidden
    });
  });

  it('Help Button Clicked: Timer Does not Start', () => {
    cy.get('#helpButton').click();
    cy.get('#help-modal').then(($el) => {
      expect($el).to.be.not.hidden
    });
    cy.get('#timer-display').should('have.text','25:00');
  });

  it('Help Button Clicked: Start Button Unaffected', () => {
    cy.get('#helpButton').click();
    cy.get('#help-modal').then(($el) => {
      expect($el).to.be.not.hidden
    });
    cy.get('#startButton').then(($el) => {
      expect($el).to.not.have.attr('disabled');
    });
  });

  it('Help Button Clicked: Reset Button Unaffected', () => {
    cy.get('#helpButton').click();
    cy.get('#help-modal').then(($el) => {
      expect($el).to.be.not.hidden
    });
    cy.get('#resetButton').then(($el) => {
      expect($el).to.have.attr('disabled');
    });
  });

  it('Help Button Clicked: Background Color Unaffected', () => {
    cy.get('#helpButton').click();
    cy.get('#help-modal').then(($el) => {
      expect($el).to.be.not.hidden
    });
    cy.get('body').then(($el) => {
      expect($el).to.have.attr('state', 'pomo');
    });
  });

  it('Help Button Clicked: Current State Unaffected', () => {
    cy.get('#helpButton').click();
    cy.get('#help-modal').then(($el) => {
      expect($el).to.be.not.hidden
    });
    cy.get('#state').should('have.text','Work State');
  });

  it('Help Button Clicked: Counters Unaffected', () => {
    cy.get('#helpButton').click();
    cy.get('#help-modal').then(($el) => {
      expect($el).to.be.not.hidden
    });
    cy.get('#streak').should('have.text','0');
    cy.get('#total').should('have.text','0');
  });
});

//Not Sure how to test TBH
describe('Dynamic Background Tests', () => {
  beforeEach(() => {
    cy.visit('https://nidhigiridhar.github.io/cse110-w21-group35/source/productoro.html');
  });

  it('Color Changes: Short Break', () => {
  });

  it('Color Changes: Long Break', () => {
  });

  it('Color Changes: Long Break', () => {
  }); 

});






describe('Full Test', () => {
  beforeEach(() => {
    cy.visit('https://nidhigiridhar.github.io/cse110-w21-group35/source/productoro.html');
  });

  it('Entire Pomo Test', () => {
    //Start Pomo
    cy.get('#startButton').click();
    //Check current state is correct
    cy.get('#state').should('have.text','Work State');
    //Checks that the start button gets disabled
    cy.get('#startButton').then(($el) => {
      expect($el).to.have.attr('disabled');
    });
    //Checks that the restart button gets enabled
    cy.get('#resetButton').then(($el) => {
      expect($el).to.not.have.attr('disabled');
    });
    //Check current counters are correct
    cy.get('#streak').should('have.text','0');
    cy.get('#total').should('have.text','0');
    //Check help cannot be seen
    cy.get('#help-modal').then(($el) => {
      expect($el).to.be.hidden;
    });
    //Check background color is blue
    cy.get('body').then(($el) => {
      expect($el).to.have.attr('state', 'pomo');
    });



    //Cypress will wait entire pomo
    cy.wait(25*60*1000);
    //Check that the background changes to orange
    cy.get('body').then(($el) => {
      expect($el).to.have.attr('state', 'short');
    });
    //check if timer is updated correctly
    cy.get('#timer-display').should('have.text','5:00');
    //Check if the buttons flip press-ibility
    cy.get('#startButton').then(($el) => {
      expect($el).to.not.have.attr('disabled');
    });
    cy.get('#resetButton').then(($el) => {
      expect($el).to.have.attr('disabled');
    });
    //check state switches
    cy.get('#state').should('have.text','Short Break State');
    //check counters get updated
    cy.get('#streak').should('have.text','1');
    cy.get('#total').should('have.text','1');
    //Check help cannot be seen
    cy.get('#help-modal').then(($el) => {
      expect($el).to.be.hidden;
    });
    
    //Before switching to break
    cy.wait(5*1000);

    //Start short break
    cy.get('#startButton').click();
    //Check background color is still orange
    cy.get('body').then(($el) => {
      expect($el).to.have.attr('state', 'short');
    });
    //Check that the buttons cannot be pressed
    cy.get('#startButton').then(($el) => {
      expect($el).to.have.attr('disabled');
    });
    cy.get('#resetButton').then(($el) => {
      expect($el).to.have.attr('disabled');
    });
    //check state switches
    cy.get('#state').should('have.text','Short Break State');
    //check counters get updated
    cy.get('#streak').should('have.text','1');
    cy.get('#total').should('have.text','1');
    //Check help cannot be seen
    cy.get('#help-modal').then(($el) => {
      expect($el).to.be.hidden;
    });

    //Progress through break
    cy.wait(1000*60*5);

    //Break Finished, Check if the state is back to work
    cy.get('#state').should('have.text','Work State');
    //Check the timer is back at 25 minutes
    cy.get('#timer-display').should('have.text','25:00');
    //Check that only start can be pressed
    cy.get('#startButton').then(($el) => {
      expect($el).to.not.have.attr('disabled');
    });
    cy.get('#resetButton').then(($el) => {
      expect($el).to.have.attr('disabled');
    });
    //Check that the Background color is blue again
    cy.get('body').then(($el) => {
      expect($el).to.have.attr('state', 'pomo');
    });
    //Check that help is hidden
    cy.get('#help-modal').then(($el) => {
      expect($el).to.be.hidden;
    });
    //Check Counters are correct
    cy.get('#streak').should('have.text','1');
    cy.get('#total').should('have.text','1');
    

    //Start next Pomo
    cy.get('#startButton').click();
    cy.wait(5000);

    //Check the timer is back at 24:55 minutes
    cy.get('#timer-display').should('have.text','24:55');
    //Check if the state is still at work
    cy.get('#state').should('have.text','Work State');
    //Check that only reset can be pressed
    cy.get('#startButton').then(($el) => {
      expect($el).to.have.attr('disabled');
    });
    cy.get('#resetButton').then(($el) => {
      expect($el).to.not.have.attr('disabled');
    });
    //Check that the Background color is blue still
    cy.get('body').then(($el) => {
      expect($el).to.have.attr('state', 'pomo');
    });
    //Check that help is hidden
    cy.get('#help-modal').then(($el) => {
      expect($el).to.be.hidden;
    });
    //Check Counters are correct
    cy.get('#streak').should('have.text','1');
    cy.get('#total').should('have.text','1');

    //Hit that reset button
    cy.get('#resetButton').click();

    //Check current state is correct
    cy.get('#state').should('have.text','Work State');
    //Checks that the start button gets enabled
    cy.get('#startButton').then(($el) => {
      expect($el).to.not.have.attr('disabled');
    });
    //Checks that the restart button gets disabled
    cy.get('#resetButton').then(($el) => {
      expect($el).to.have.attr('disabled');
    });
    //Check current counters are correct after the reset click
    cy.get('#streak').should('have.text','0');
    cy.get('#total').should('have.text','1');
    //Check help cannot be seen
    cy.get('#help-modal').then(($el) => {
      expect($el).to.be.hidden;
    });
    //Check background color is blue
    cy.get('body').then(($el) => {
      expect($el).to.have.attr('state', 'pomo');
    });
  });
});

describe('Full Cycle Test', () => {
  beforeEach(() => {
    cy.visit('https://nidhigiridhar.github.io/cse110-w21-group35/source/productoro.html');
  });

  it('Testing Four Pomos Along with Short and Long Breaks', () => {
  });
});
