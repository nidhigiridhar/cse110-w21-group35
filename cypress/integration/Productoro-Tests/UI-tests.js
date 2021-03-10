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

  it('Initial State Label', () => {
    cy.get('#state').should('have.text','Work State');
  });

  it('Initial Pomo Streak', () => {
    cy.get('#streak').should('have.text','0');
  });

  it('Initial Pomo Total', () => {
    cy.get('#total').should('have.text','0');
  });

  it('Help Not displayed', () => {
    cy.get('#helpModal').then(($el) => {
      expect($el).to.be.hidden
    });
  });

  it('Settings Not displayed', () => {
    cy.get('#settingsModal').then(($el) => {
      expect($el).to.be.hidden
    });
  });

  it('Initial Background Color: Blue', () => {
    cy.get('body').then(($el) => {
      expect($el).to.have.attr('state', 'pomo');
    });
  });

  it('Break Reminders Disabled Onload', () => {
    cy.get('#break-reminder').should('have.text', '');
    cy.get('#reminder').then(($el) => {
      expect($el).to.be.hidden;
    });
  });

  it('Progress Bar Fully Lit', () =>{
    cy.get('.circle.pomo').should('have.length', 4);
    cy.get('.circle.short').should('have.length', 3);
    cy.get('.circle.long').should('have.length', 1);
  });

  it('Warning Message: Not Displayed Initally', () => {
    cy.get('#settingsButton').click();
    cy.get('#warning').then(($el) => {
      expect($el).to.be.hidden;
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

    it('Start Button Clicked: Check State is Work State', () => {
      cy.get('#startButton').click();
      cy.get('#state').should('have.text','Work State');
    });

    it('Start Button Clicked: Check Help Not displayed', () => {
      cy.get('#startButton').click();
      cy.get('#helpModal').then(($el) => {
        expect($el).to.be.hidden
      });
    });
  
    it('Start Button Clicked: Check Background Color Unaffected', () => {
      cy.get('#startButton').click();
      cy.get('body').then(($el) => {
        expect($el).to.have.attr('state', 'pomo');
      });
    });

    it('Start Button Clicked: Check Break Reminders Still Disabled', () => {
      cy.get('#startButton').click();
      cy.get('#break-reminder').should('have.text', '');
      cy.get('#reminder').then(($el) => {
        expect($el).to.be.hidden;
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

  it('Reset Button Clicked: Check State is Work State', () => {
    cy.get('#startButton').click();
    cy.get('#resetButton').click();
    cy.get('#state').should('have.text','Work State');
  });

  it('Reset Button Clicked: Help Not displayed', () => {
    cy.get('#startButton').click();
    cy.get('#resetButton').click();
    cy.get('#helpModal').then(($el) => {
      expect($el).to.be.hidden
    });
  });

  it('Reset Button Clicked: Check Background Color Unaffected', () => {
    cy.get('#startButton').click();
    cy.get('#resetButton').click();
    cy.get('body').then(($el) => {
      expect($el).to.have.attr('state', 'pomo');
    });
  });

  it('Reset Button Clicked: Check Break Reminders still Disabled', () => {
    cy.get('#startButton').click();
    cy.get('#break-reminder').should('have.text', '');
    cy.get('#reminder').then(($el) => {
      expect($el).to.be.hidden;
    });

    cy.wait(1000*3);
    cy.get('#resetButton').click();
    cy.get('#break-reminder').should('have.text', '');
    cy.get('#reminder').then(($el) => {
      expect($el).to.be.hidden;
    });
  });
});








describe('Counters Tests', () => {
  beforeEach(() => {
    cy.visit('https://nidhigiridhar.github.io/cse110-w21-group35/source/productoro.html');

    //DOM Maninpulation to get short pomo/break times :)
    cy.get('#settingsButton').click();
    cy.get('#workOption60').invoke('prop', 'innerHTML', '.15');
    cy.get('#workOption60').invoke('prop', 'value', '.15');
    
    cy.get('#sbOption15').invoke('prop', 'innerHTML', '.1');
    cy.get('#sbOption15').invoke('prop', 'value', '.1');

    cy.get('#lbOption15').invoke('prop', 'innerHTML', '.1');
    cy.get('#lbOption15').invoke('prop', 'value', '.1');

    cy.get('#shortBreakTime').select('.1');
    cy.get('#longBreakTime').select('.1');
    cy.get('#workTime').select('.15');

    cy.get('#closeSettings').click();

    //Pomo: 9 Seconds
    //SB: 6 seconds
    //LB: 6 seconds
  });

  it('Counters: Streak and Total at 2 After 2 Pomos', () => {
    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);
    //start break
    cy.get('#startButton').click();
    //finish break
    cy.wait(6*1000);

    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);
    //start break
    cy.get('#startButton').click();
    //finish break
    cy.wait(6*1000);

    cy.get('#streak').should('have.text','2');
    cy.get('#total').should('have.text','2');
  });

  it('Counters: Streak and Total at 4 After 4 Pomos', () => {
    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);
    //start break
    cy.get('#startButton').click();
    //finish break
    cy.wait(6*1000);

    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);
    //start break
    cy.get('#startButton').click();
    //finish break
    cy.wait(6*1000);

    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);
    //start break
    cy.get('#startButton').click();
    //finish break
    cy.wait(6*1000);
    
    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);

    cy.get('#streak').should('have.text','4');
    cy.get('#total').should('have.text','4');
  });

  it('Counters: Streak 0 and Total at 1 After Reset at Second Pomo', () => {
    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);
    //start break
    cy.get('#startButton').click();
    //finish break
    cy.wait(6*1000);

    //start pomo
    cy.get('#startButton').click();
    cy.get('#resetButton').click();

    cy.get('#streak').should('have.text','0');
    cy.get('#total').should('have.text','1');
  });

  it('Counters: Streak 2 and Total at 3 After Reset at Second Pomo', () => {
    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);
    //start break
    cy.get('#startButton').click();
    //finish break
    cy.wait(6*1000);

    //start pomo
    cy.get('#startButton').click();
    //reset pomo
    cy.get('#resetButton').click();

    cy.get('#streak').should('have.text','0');
    cy.get('#total').should('have.text','1');

    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);
    //start break
    cy.get('#startButton').click();
    //finish break
    cy.wait(6*1000);

    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);

    cy.get('#streak').should('have.text','2');
    cy.get('#total').should('have.text','3');
  });
});










describe('State Label Tests', () => {
  beforeEach(() => {
    cy.visit('https://nidhigiridhar.github.io/cse110-w21-group35/source/productoro.html');

    //DOM Maninpulation to get short pomo/break times :)
    cy.get('#settingsButton').click();
    cy.get('#workOption60').invoke('prop', 'innerHTML', '.15');
    cy.get('#workOption60').invoke('prop', 'value', '.15');
    
    cy.get('#sbOption15').invoke('prop', 'innerHTML', '.1');
    cy.get('#sbOption15').invoke('prop', 'value', '.1');

    cy.get('#lbOption15').invoke('prop', 'innerHTML', '.1');
    cy.get('#lbOption15').invoke('prop', 'value', '.1');

    cy.get('#shortBreakTime').select('.1');
    cy.get('#longBreakTime').select('.1');
    cy.get('#workTime').select('.15');

    cy.get('#closeSettings').click();

    //Pomo: 9 Seconds
    //SB: 6 seconds
    //LB: 6 seconds
  });

  it('State Label: On Work State After Start', () => {
    //press start
    cy.get('#startButton').click();

    //check state
    cy.get('#state').should('have.text','Work State');
  });

  it('State Label: On Work State After Reset', () => {
    //press start
    cy.get('#startButton').click();
    cy.wait(1000);
    cy.get('#resetButton').click();

    //check state
    cy.get('#state').should('have.text','Work State');
  });

  it('State Label: On Short Break State After Pomo', () => {
    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);

    //check state
    cy.get('#state').should('have.text','Short Break State');
  });

  it('State Label: Back on Work State After Break', () => {
    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);
    //start break
    cy.get('#startButton').click();
    //finish break
    cy.wait(6*1000);

    //check state
    cy.get('#state').should('have.text','Work State');
  });

  it('State Label: On Long Break State After 4 Pomo', () => {
    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);
    //start break
    cy.get('#startButton').click();
    //finish break
    cy.wait(6*1000);

    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);
    //start break
    cy.get('#startButton').click();
    //finish break
    cy.wait(6*1000);

    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);
    //start break
    cy.get('#startButton').click();
    //finish break
    cy.wait(6*1000);

    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);
    

    //check state
    cy.get('#state').should('have.text','Long Break State');
  });

  it('State Label: On Work State After LB', () => {
    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);
    //start break
    cy.get('#startButton').click();
    //finish break
    cy.wait(6*1000);

    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);
    //start break
    cy.get('#startButton').click();
    //finish break
    cy.wait(6*1000);

    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);
    //start break
    cy.get('#startButton').click();
    //finish break
    cy.wait(6*1000);

    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);
    //start break
    cy.get('#startButton').click();
    //finish break
    cy.wait(6*1000);

    //check state
    cy.get('#state').should('have.text','Work State');
  });
});











describe('Background Color Tests', () => {
  beforeEach(() => {
    cy.visit('https://nidhigiridhar.github.io/cse110-w21-group35/source/productoro.html');

    //DOM Maninpulation to get short pomo/break times :)
    cy.get('#settingsButton').click();
    cy.get('#workOption60').invoke('prop', 'innerHTML', '.15');
    cy.get('#workOption60').invoke('prop', 'value', '.15');
    
    cy.get('#sbOption15').invoke('prop', 'innerHTML', '.1');
    cy.get('#sbOption15').invoke('prop', 'value', '.1');

    cy.get('#lbOption15').invoke('prop', 'innerHTML', '.1');
    cy.get('#lbOption15').invoke('prop', 'value', '.1');

    cy.get('#shortBreakTime').select('.1');
    cy.get('#longBreakTime').select('.1');
    cy.get('#workTime').select('.15');

    cy.get('#closeSettings').click();

    //Pomo: 9 Seconds
    //SB: 6 seconds
    //LB: 6 seconds
  });

  it('Background Color: Orange at Short Break', () => {
    cy.get('#startButton').click();
    //Complete the pomo
    cy.wait(9*1000);

    //check background is orange
    cy.get('body').then(($el) => {
      expect($el).to.have.attr('state', 'short');
    });

  });

  it('Background Color: Blue after Short Break', () => {
    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);

    //start break
    cy.get('#startButton').click();
    //finish break
    cy.wait(6*1000);

    //now in work state
    //check background is orange
    cy.get('body').then(($el) => {
      expect($el).to.have.attr('state', 'pomo');
    });
  });

  it('Background Color: Green at Long Break', () => {
    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);
    //start break
    cy.get('#startButton').click();
    //finish break
    cy.wait(6*1000);

    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);
    //start break
    cy.get('#startButton').click();
    //finish break
    cy.wait(6*1000);

    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);
    //start break
    cy.get('#startButton').click();
    //finish break
    cy.wait(6*1000);

    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);

    //now in long break state
    //check background is green
    cy.get('body').then(($el) => {
      expect($el).to.have.attr('state', 'long');
    });
  });

  it('Background Color: Blue after Long Break', () => {
    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);
    //start break
    cy.get('#startButton').click();
    //finish break
    cy.wait(6*1000);

    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);
    //start break
    cy.get('#startButton').click();
    //finish break
    cy.wait(6*1000);

    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);
    //start break
    cy.get('#startButton').click();
    //finish break
    cy.wait(6*1000);

    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);
    //start Long break
    cy.get('#startButton').click();
    //finish Long break
    cy.wait(6*1000);
    
    //now in long break state
    //check background is blue
    cy.get('body').then(($el) => {
      expect($el).to.have.attr('state', 'pomo');
    });
  });
});











describe('Help Button Tests', () => {
  beforeEach(() => {
    cy.visit('https://nidhigiridhar.github.io/cse110-w21-group35/source/productoro.html');
  });

  it('Help Button Clicked: Instructions Appear', () => {
    cy.get('#helpButton').click();
    cy.get('#helpModal').then(($el) => {
      expect($el).to.be.not.hidden
    });
  });

  it('Help Button Clicked: Timer Does not Start', () => {
    cy.get('#helpButton').click();
    cy.get('#helpModal').then(($el) => {
      expect($el).to.be.not.hidden
    });
    cy.get('#timer-display').should('have.text','25:00');
  });

  it('Help Button Clicked: Start Button Unaffected', () => {
    cy.get('#helpButton').click();
    cy.get('#helpModal').then(($el) => {
      expect($el).to.be.not.hidden
    });
    cy.get('#startButton').then(($el) => {
      expect($el).to.not.have.attr('disabled');
    });
  });

  it('Help Button Clicked: Reset Button Unaffected', () => {
    cy.get('#helpButton').click();
    cy.get('#helpModal').then(($el) => {
      expect($el).to.be.not.hidden
    });
    cy.get('#resetButton').then(($el) => {
      expect($el).to.have.attr('disabled');
    });
  });

  it('Help Button Clicked: Background Color Unaffected', () => {
    cy.get('#helpButton').click();
    cy.get('#helpModal').then(($el) => {
      expect($el).to.be.not.hidden
    });
    cy.get('body').then(($el) => {
      expect($el).to.have.attr('state', 'pomo');
    });
  });

  it('Help Button Clicked: Current State Unaffected', () => {
    cy.get('#helpButton').click();
    cy.get('#helpModal').then(($el) => {
      expect($el).to.be.not.hidden
    });
    cy.get('#state').should('have.text','Work State');
  });

  it('Help Button Clicked: Counters Unaffected', () => {
    cy.get('#helpButton').click();
    cy.get('#helpModal').then(($el) => {
      expect($el).to.be.not.hidden
    });
    cy.get('#streak').should('have.text','0');
    cy.get('#total').should('have.text','0');
  });

  it('Help Button Clicked: Check Break Reminders Still Disabled', () => {
    cy.get('#helpButton').click();
    cy.get('#break-reminder').should('have.text', '');
    cy.get('#reminder').then(($el) => {
      expect($el).to.be.hidden;
    });
  });

  it('Help Button Clicked: Settings not Displayed', () => {
    cy.get('#helpButton').click();
    cy.get('#settingsModal').then(($el) => {
      expect($el).to.be.hidden;
    });
  });
});













describe('Break Reminders Tests', () => {
  beforeEach(() => {
    cy.visit('https://nidhigiridhar.github.io/cse110-w21-group35/source/productoro.html');

    //DOM Maninpulation to get short pomo/break times :)
    cy.get('#settingsButton').click();
    cy.get('#workOption60').invoke('prop', 'innerHTML', '.15');
    cy.get('#workOption60').invoke('prop', 'value', '.15');
    
    cy.get('#sbOption15').invoke('prop', 'innerHTML', '.1');
    cy.get('#sbOption15').invoke('prop', 'value', '.1');

    cy.get('#lbOption15').invoke('prop', 'innerHTML', '.1');
    cy.get('#lbOption15').invoke('prop', 'value', '.1');

    cy.get('#shortBreakTime').select('.1');
    cy.get('#longBreakTime').select('.1');
    cy.get('#workTime').select('.15');

    cy.get('#closeSettings').click();

    //Pomo: 9 Seconds
    //SB: 6 seconds
    //LB: 6 seconds
  });

  it('Break Reminders: Check Enabled After Pomo', () => {
    cy.get('#startButton').click();
    //Complete the pomo

    cy.wait(9*1000);
    cy.get('#break-reminder').then(($el) => {
      expect($el).not.to.be.hidden;
    });
    cy.get('#break-reminder').should('not.be.empty');

    cy.get('#reminder').then(($el) => {
      expect($el).not.to.be.hidden;
    });
    cy.get('#reminder').should('not.be.empty');
  });

  it('Break Reminders: Check Disabled at New Pomo', () => {
    cy.get('#startButton').click();

    //finish pomo
    cy.wait(9*1000);
    //will fail rn but will work after fix
    cy.get('#break-reminder').then(($el) => {
      expect($el).not.to.be.hidden;
    });
    cy.get('#break-reminder').should('not.be.empty');

    cy.get('#reminder').then(($el) => {
      expect($el).not.to.be.hidden;
    });
    cy.get('#reminder').should('not.be.empty');

    //start break
    cy.get('#startButton').click();
    //finish break
    cy.wait(6*1000);

    //now in work state
    cy.get('#break-reminder').then(($el) => {
      expect($el).to.be.hidden;
    });
    cy.get('#break-reminder').should('not.be.empty');

    cy.get('#reminder').then(($el) => {
      expect($el).to.be.hidden;
    });
  });

  it('Break Reminders: Check Enabled at Long Break', () => {
    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);
    //start break
    cy.get('#startButton').click();
    //finish break
    cy.wait(6*1000);

    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);
    //start break
    cy.get('#startButton').click();
    //finish break
    cy.wait(6*1000);

    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);
    //start break
    cy.get('#startButton').click();
    //finish break
    cy.wait(6*1000);

    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);

    //now in long break state
    cy.get('#break-reminder').then(($el) => {
      expect($el).not.to.be.hidden;
    });
    cy.get('#break-reminder').should('not.be.empty');

    cy.get('#reminder').then(($el) => {
      expect($el).not.to.be.hidden;
    });
  });

  it('Break Reminders: Check Disabled after Long Break', () => {
    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);
    //start break
    cy.get('#startButton').click();
    //finish break
    cy.wait(6*1000);

    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);
    //start break
    cy.get('#startButton').click();
    //finish break
    cy.wait(6*1000);

    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);
    //start break
    cy.get('#startButton').click();
    //finish break
    cy.wait(6*1000);

    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);
    //start Long break
    cy.get('#startButton').click();
    //finish Long break
    cy.wait(6*1000);
    
    //now in long break state
    cy.get('#break-reminder').then(($el) => {
      expect($el).to.be.hidden;
    });
    cy.get('#break-reminder').should('not.be.empty');

    cy.get('#reminder').then(($el) => {
      expect($el).to.be.hidden;
    });
  });
});

















describe('KeyBoard Shortcut: Using Space to Start Button', () => {
  beforeEach(() => {
    cy.visit('https://nidhigiridhar.github.io/cse110-w21-group35/source/productoro.html');
  });

  it('Space Used as Start Button: Check Timer Display 24:50', () => {
    cy.get('body').trigger('keydown', { key: "(Space character)", code: "Space", which: 32 }); 
    //Cypress will wait a 10 seconds after the click
    cy.wait(10000);
    cy.get('#timer-display').should('have.text','24:50');
  });

  it('Space Used as Start Button: Check Start Button Gets Disabled', () => {
    cy.get('body').trigger('keydown', { key: "(Space character)", code: "Space", which: 32 }); 
    //Cypress will wait a second after the click
    cy.get('#startButton').then(($el) => {
      expect($el).to.have.attr('disabled');
    })
  });

  it('Space Used as Start Button: Check Reset Button Gets Enabled', () => {
    cy.get('body').trigger('keydown', { key: "(Space character)", code: "Space", which: 32 }); 
    //Cypress will wait a second after the click
    cy.get('#resetButton').then(($el) => {
      expect($el).to.not.have.attr('disabled');
    })
  });

  it('Space Used as Start Button: Check Counters Not Updated', () => {
    cy.get('body').trigger('keydown', { key: "(Space character)", code: "Space", which: 32 }); 
    //Cypress will wait 5 seconds after the click
    cy.wait(5000)
    cy.get('#streak').should('have.text','0');
    cy.get('#total').should('have.text','0');
  });

  it('Space Used as Start Button: Check State is Work State', () => {
    cy.get('body').trigger('keydown', { key: "(Space character)", code: "Space", which: 32 }); 
    //States need to be more consistent ... sometimes they have mode as a suffix sometimes not
    cy.get('#state').should('have.text','Work State');
  });

  it('Space Used as Start Button: Check Help Not displayed', () => {
    cy.get('body').trigger('keydown', { key: "(Space character)", code: "Space", which: 32 }); 
    cy.get('#helpModal').then(($el) => {
      expect($el).to.be.hidden
    });
  });

  it('Space Used as Start Button: Check Background Color Unaffected', () => {
    cy.get('body').trigger('keydown', { key: "(Space character)", code: "Space", which: 32 }); 
    cy.get('body').then(($el) => {
      expect($el).to.have.attr('state', 'pomo');
    });
  });

  it('Space Used as Start Button: Check Break Reminders Still Disabled', () => {
    cy.get('body').trigger('keydown', { key: "(Space character)", code: "Space", which: 32 }); 
    cy.get('#break-reminder').should('have.text', '');
    cy.get('#reminder').then(($el) => {
      expect($el).to.be.hidden;
    });
  });
});
















describe('Keyboard Shortcut: Using Space as Reset Button', () => {
  beforeEach(() => {
    cy.visit('https://nidhigiridhar.github.io/cse110-w21-group35/source/productoro.html');
  });

  it('Space Used as Reset Button: Timer Resets', () => {
    cy.get('body').trigger('keydown', { key: "(Space character)", code: "Space", which: 32 }); 
    //Cypress will wait a 10 seconds after the click
    cy.wait(10000);
    cy.get('#timer-display').should('have.text','24:50');
    cy.get('body').trigger('keydown', { key: "(Space character)", code: "Space", which: 32 }); 
    cy.get('#timer-display').should('have.text','25:00');
  });

  it('Space Used as Reset Button: Check Reset Button Gets Disabled', () => {
    cy.get('body').trigger('keydown', { key: "(Space character)", code: "Space", which: 32 }); 
    cy.get('body').trigger('keydown', { key: "(Space character)", code: "Space", which: 32 }); 
    cy.get('#resetButton').then(($el) => {
      expect($el).to.have.attr('disabled');
    })
  });

  it('Space Used as Reset Button: Check Start Button Gets Enabled', () => {
    cy.get('body').trigger('keydown', { key: "(Space character)", code: "Space", which: 32 }); 
    cy.get('body').trigger('keydown', { key: "(Space character)", code: "Space", which: 32 }); 
    cy.get('#startButton').then(($el) => {
      expect($el).to.not.have.attr('disabled');
    });
  });

  it('Space Used as Reset Button: Check Only Streak was Killed', () => {
    cy.get('body').trigger('keydown', { key: "(Space character)", code: "Space", which: 32 }); 
    //Cypress will wait 5 seconds after the click
    cy.wait(5000)
    //Not sure if this is the right way to set the inner html
    cy.get('#streak').invoke('prop', 'innerHTML', '1');
    cy.get('#total').invoke('prop', 'innerHTML', '1');
    cy.get('#streak').should('have.text','1');
    cy.get('#total').should('have.text','1');
    cy.wait(5000);
    //reset
    cy.get('body').trigger('keydown', { key: "(Space character)", code: "Space", which: 32 }); 
    cy.get('#streak').should('have.text','0');
  });

  it('Space Used as Reset Button: Check State is Work State', () => {
    //start
    cy.get('body').trigger('keydown', { key: "(Space character)", code: "Space", which: 32 }); 
    //reset
    cy.get('body').trigger('keydown', { key: "(Space character)", code: "Space", which: 32 }); 
    cy.get('#state').should('have.text','Work State');
  });

  it('Space Used as Reset Button: Help Not displayed', () => {
    cy.get('body').trigger('keydown', { key: "(Space character)", code: "Space", which: 32 }); 
    cy.get('body').trigger('keydown', { key: "(Space character)", code: "Space", which: 32 }); 
    cy.get('#helpModal').then(($el) => {
      expect($el).to.be.hidden
    });
  });

  it('Space Used as Reset Button: Check Background Color Unaffected', () => {
    cy.get('body').trigger('keydown', { key: "(Space character)", code: "Space", which: 32 }); 
    cy.get('body').trigger('keydown', { key: "(Space character)", code: "Space", which: 32 }); 
    cy.get('body').then(($el) => {
      expect($el).to.have.attr('state', 'pomo');
    });
  });

  it('Space Used as Reset Button: Check Break Reminders still Disabled', () => {
    cy.get('body').trigger('keydown', { key: "(Space character)", code: "Space", which: 32 }); 
    cy.get('#break-reminder').should('have.text', '');
    cy.get('#reminder').then(($el) => {
      expect($el).to.be.hidden;
    });

    cy.wait(1000*3);
    cy.get('body').trigger('keydown', { key: "(Space character)", code: "Space", which: 32 }); 
    cy.get('#break-reminder').should('have.text', '');
    cy.get('#reminder').then(($el) => {
      expect($el).to.be.hidden;
    });
  });
});














describe('Settings Button Tests (Pressibility)', () => {
  beforeEach(() => {
    cy.visit('https://nidhigiridhar.github.io/cse110-w21-group35/source/productoro.html');
  });

  it('Settings Button Clicked: Settings Appear', () => {
    cy.get('#settingsButton').click();
    cy.get('#settingsModal').then(($el) => {
      expect($el).to.be.not.hidden
    });
  });

  it('Settings Button Clicked: Timer Does not Start', () => {
    cy.get('#settingsButton').click();
    cy.get('#settingsModal').then(($el) => {
      expect($el).to.be.not.hidden
    });
    cy.get('#timer-display').should('have.text','25:00');
  });

  it('Settings Button Clicked: Start Button Unaffected', () => {
    cy.get('#settingsButton').click();
    cy.get('#settingsModal').then(($el) => {
      expect($el).to.be.not.hidden
    });
    cy.get('#startButton').then(($el) => {
      expect($el).to.not.have.attr('disabled');
    });
  });

  it('Settings Button Clicked: Reset Button Unaffected', () => {
    cy.get('#settingsButton').click();
    cy.get('#settingsModal').then(($el) => {
      expect($el).to.be.not.hidden
    });
    cy.get('#resetButton').then(($el) => {
      expect($el).to.have.attr('disabled');
    });
  });

  it('Settings Button Clicked: Background Color Unaffected', () => {
    cy.get('#settingsButton').click();
    cy.get('#settingsModal').then(($el) => {
      expect($el).to.be.not.hidden
    });
    cy.get('body').then(($el) => {
      expect($el).to.have.attr('state', 'pomo');
    });
  });

  it('Settings Button Clicked: Current State Unaffected', () => {
    cy.get('#settingsButton').click();
    cy.get('#settingsModal').then(($el) => {
      expect($el).to.be.not.hidden
    });
    cy.get('#state').should('have.text','Work State');
  });

  it('Settings Button Clicked: Counters Unaffected', () => {
    cy.get('#settingsButton').click();
    cy.get('#settingsModal').then(($el) => {
      expect($el).to.be.not.hidden
    });
    cy.get('#streak').should('have.text','0');
    cy.get('#total').should('have.text','0');
  });

  it('Settings Button Clicked: Check Break Reminders Still Disabled', () => {
    cy.get('#settingsButton').click();
    cy.get('#settingsModal').then(($el) => {
      expect($el).to.be.not.hidden
    });

    cy.get('#break-reminder').should('have.text', '');
    cy.get('#reminder').then(($el) => {
      expect($el).to.be.hidden;
    });
  });

  it('Settings Button Clicked: Help Moal not Displayed', () => {
    cy.get('#settingsButton').click();
    cy.get('#helpModal').then(($el) => {
      expect($el).to.be.hidden;
    });
  });
});



















describe('Custom Time Limits and Warning Tests', () => {
  beforeEach(() => {
    cy.visit('https://nidhigiridhar.github.io/cse110-w21-group35/source/productoro.html');

    //DOM Maninpulation to get short pomo/break times :)
    cy.get('#settingsButton').click();
    cy.get('#workOption60').invoke('prop', 'innerHTML', '.15');
    cy.get('#workOption60').invoke('prop', 'value', '.15');
    
    cy.get('#sbOption15').invoke('prop', 'innerHTML', '.1');
    cy.get('#sbOption15').invoke('prop', 'value', '.1');

    cy.get('#lbOption15').invoke('prop', 'innerHTML', '.1');
    cy.get('#lbOption15').invoke('prop', 'value', '.1');

    cy.get('#shortBreakTime').select('.1');
    cy.get('#longBreakTime').select('.1');
    cy.get('#workTime').select('.15');

    cy.get('#closeSettings').click();

    //Pomo: 9 Seconds
    //SB: 6 seconds
    //LB: 6 seconds
  });

  it('Custom Time Limits: Set New Times and Ensure Timer and Display is reflected', () => {
    cy.get('#state').should('have.text','Work State');
    //display is what ever the custom time is with :00 appended at the end 
    //no leading 0 since the pomo without maniplulation is always >= 10 
    cy.get('#timer-display').should('have.text','.15:00');
    cy.get('#startButton').click();
    //Cypress will wait a 9 seconds to finish pomo
    cy.wait(9*1000);

    cy.get('#state').should('have.text','Short Break State');
    //display is what ever the custom time is with :00 appended at the end and extra 0 appened since < 10
    cy.get('#timer-display').should('have.text','0.1:00');
    cy.get('#startButton').click();
    //Cypress will wait a 9 seconds to finish break
    cy.wait(6*1000);

    //repeat 3 more times
    //2nd Pomo
    cy.get('#state').should('have.text','Work State');
    cy.get('#timer-display').should('have.text','.15:00');
    cy.get('#startButton').click();
    cy.wait(9*1000);

    cy.get('#state').should('have.text','Short Break State');
    cy.get('#timer-display').should('have.text','0.1:00');
    cy.get('#startButton').click();
    cy.wait(6*1000);

    //3rd Pomo
    cy.get('#state').should('have.text','Work State');
    cy.get('#timer-display').should('have.text','.15:00');
    cy.get('#startButton').click();
    cy.wait(9*1000);

    cy.get('#state').should('have.text','Short Break State');
    cy.get('#timer-display').should('have.text','0.1:00');
    cy.get('#startButton').click();
    cy.wait(6*1000);

    //4th Pomo
    cy.get('#state').should('have.text','Work State');
    cy.get('#timer-display').should('have.text','.15:00');
    cy.get('#startButton').click();
    cy.wait(9*1000);

    cy.get('#state').should('have.text','Long Break State');
    //display is what ever the custom time is with :00 appended at the end 
    //no leading 0 since in real code we are assure LB > 10 
    cy.get('#timer-display').should('have.text','.1:00');
    cy.get('#startButton').click();
    cy.wait(6*1000);

    //Back to first pomo
    cy.get('#state').should('have.text','Work State');
    cy.get('#timer-display').should('have.text','.15:00');
  });

  it('Custom Time Limits: Test Invalid Options', () => {
    //Current
    //Pomo: 9 Seconds Out of: [.15,25,30,45]
    //SB: 6 seconds Out of: [.1,5,10]
    //LB: 6 seconds Out of: [.1,20,25,30]

    cy.get('#settingsButton').click();
    //try to set these times but times will not actually change
    cy.get('#shortBreakTime').select('5');
    cy.get('#longBreakTime').select('20');

    //Check that the text didnt change
    cy.get('#workOption60').then(($el) => {
      expect($el).to.have.prop('selected', true);
    });
    cy.get('#sbOption15').then(($el) => {
      expect($el).to.have.prop('selected', true);
    });
    cy.get('#lbOption15').then(($el) => {
      expect($el).to.have.prop('selected', true);
    });

    cy.get('#closeSettings').click();

    //repeat previous tests
    cy.get('#state').should('have.text','Work State');
    cy.get('#timer-display').should('have.text','.15:00');
    cy.get('#startButton').click();
    //Cypress will wait a 9 seconds to finish pomo
    cy.wait(9*1000);

    cy.get('#state').should('have.text','Short Break State');
    cy.get('#timer-display').should('have.text','0.1:00');
    cy.get('#startButton').click();
    //Cypress will wait a 9 seconds to finish break
    cy.wait(6*1000);

    //repeat 3 more times
    //2nd Pomo
    cy.get('#state').should('have.text','Work State');
    cy.get('#timer-display').should('have.text','.15:00');
    cy.get('#startButton').click();
    cy.wait(9*1000);

    cy.get('#state').should('have.text','Short Break State');
    cy.get('#timer-display').should('have.text','0.1:00');
    cy.get('#startButton').click();
    cy.wait(6*1000);

    //3rd Pomo
    cy.get('#state').should('have.text','Work State');
    cy.get('#timer-display').should('have.text','.15:00');
    cy.get('#startButton').click();
    cy.wait(9*1000);

    cy.get('#state').should('have.text','Short Break State');
    cy.get('#timer-display').should('have.text','0.1:00');
    cy.get('#startButton').click();
    cy.wait(6*1000);

    //4th Pomo
    cy.get('#state').should('have.text','Work State');
    cy.get('#timer-display').should('have.text','.15:00');
    cy.get('#startButton').click();
    cy.wait(9*1000);

    cy.get('#state').should('have.text','Long Break State');
    //display is what ever the custom time is with :00 appended at the end 
    //no leading 0 since in real code we are assure LB > 10 
    cy.get('#timer-display').should('have.text','.1:00');
    cy.get('#startButton').click();
    cy.wait(6*1000);

    //Back to first pomo
    cy.get('#state').should('have.text','Work State');
    cy.get('#timer-display').should('have.text','.15:00');
  });
});















describe('Warning Messages Tests', () => {
  beforeEach(() => {
    cy.visit('https://nidhigiridhar.github.io/cse110-w21-group35/source/productoro.html');
  });

  it('Warning Message: Check Warning When Timer is Running', () => {
    cy.get('#startButton').click();
    cy.get('#settingsButton').click();
    //checks displayed
    cy.get('#warning').then(($el) => {
      expect($el).to.not.be.hidden;
    });
    //checks correct message
    cy.get('#warning').should('have.text', 'Wait until the end of your next break to change the times!');
    cy.get('#closeSettings').click();

    //repeat a few times to check persistence
    cy.get('#settingsButton').click();
    cy.get('#warning').then(($el) => {
      expect($el).to.not.be.hidden;
    });
    cy.get('#warning').should('have.text', 'Wait until the end of your next break to change the times!');
    cy.get('#closeSettings').click();


    cy.get('#settingsButton').click();
    cy.get('#warning').then(($el) => {
      expect($el).to.not.be.hidden;
    });
    cy.get('#warning').should('have.text', 'Wait until the end of your next break to change the times!');
    cy.get('#closeSettings').click();
  });

  it('Warning Message: Check Warning When Input Invalid Time', () => {
    // Current Pomo: 25 min
    // Current SB : 5 mim
    // Current LB: 15 min
    //INPUT INVALID LB TIME
    cy.get('#settingsButton').click();
    cy.get('#longBreakTime').select('30');
    
    

    //checks displayed
    cy.get('#warning').then(($el) => {
      expect($el).to.not.be.hidden;
    });
    //checks correct message
    cy.get('#warning').should('have.text', 'Work Periods must be greater than Break Periods');
  });

  it('Warning Message: Check Timer Warning Disappears After Reset', () => {
    cy.get('#startButton').click();
    cy.get('#settingsButton').click();
    //Warning will appear as seen in last tests
    cy.get('#closeSettings').click();
    //hit reset
    cy.get('#resetButton').click();

    cy.get('#settingsButton').click();
    //checks not displayed
    cy.get('#warning').then(($el) => {
      expect($el).to.be.hidden;
    });
  });

  it('Warning Message: Check Invalid Times Warning Disappears After Closing', () => {
    // Current Pomo: 25 min
    // Current SB : 5 mim
    // Current LB: 15 min
    //INPUT INVALID TIME
    cy.get('#settingsButton').click();
    cy.get('#longBreakTime').select('30');
    //Warning will appear as seen in last tests
    cy.get('#closeSettings').click();
    
    //Reopen Settings
    cy.get('#settingsButton').click();
    //checks not displayed
    cy.get('#warning').then(($el) => {
      expect($el).to.be.hidden;
    });
  });

  it('Warning Message: Check Invalid Times Warning Disappears After Putting Valid Time', () => {
    // Current Pomo: 25 min
    // Current SB : 5 mim
    // Current LB: 15 min
    //INPUT INVALID TIME
    cy.get('#settingsButton').click();
    cy.get('#longBreakTime').select('30');
    //Warning will appear as seen in last tests
    
    //Input Valid Time
    cy.get('#workTime').select('45');
    cy.get('#warning').then(($el) => {
      expect($el).to.be.hidden;
    });
  });
});















/*
describe('Banner Notifications Tests', () => {
  beforeEach(() => {
    cy.visit('https://nidhigiridhar.github.io/cse110-w21-group35/source/productoro.html');
  });

  it('Testing Four Pomos Along with Short and Long Breaks', () => {
  });
});

describe('Alarm Notifications Tests', () => {
  beforeEach(() => {
    cy.visit('https://nidhigiridhar.github.io/cse110-w21-group35/source/productoro.html');
  });

  it('Testing Four Pomos Along with Short and Long Breaks', () => {
  });
});


describe('Audio Slider Tests', () => {
  beforeEach(() => {
    cy.visit('https://nidhigiridhar.github.io/cse110-w21-group35/source/productoro.html');
  });

  it('Testing Four Pomos Along with Short and Long Breaks', () => {
  });
});*/















describe('Keyboard Shortcuts Disabled Tests', () => {
  beforeEach(() => {
    cy.visit('https://nidhigiridhar.github.io/cse110-w21-group35/source/productoro.html');
    //Turn off the keyboard shortcuts
    cy.get('#settingsButton').click();
    cy.get('#keyboardToggle').invoke('attr', 'checked', false);
    cy.get('#closeSettings').click();
  });

  it('Keyboard Shortcuts Disabled: Space Clicked, Timer Unaffected', () => {
    cy.get('body').trigger('keydown', { key: "(Space character)", code: "Space", which: 32 }); 
    //Cypress will wait a 5 seconds after the click
    cy.wait(5000)
    cy.get('#timer-display').should('have.text','25:00');
  });


  it('Keyboard Shortcuts Disabled: Space Clicked, Start Button Still Enabled', () => {
    cy.get('body').trigger('keydown', { key: "(Space character)", code: "Space", which: 32 }); 
    cy.get('#startButton').then(($el) => {
      expect($el).to.not.have.attr('disabled');
    })
  });

  it('Keyboard Shortcuts Disabled: Space Clicked, Reset Button Still Disabled', () => {
    cy.get('body').trigger('keydown', { key: "(Space character)", code: "Space", which: 32 }); 
    cy.get('#resetButton').then(($el) => {
      expect($el).to.have.attr('disabled');
    })
  });

  it('Keyboard Shortcuts Disabled: Space Clicked, Check Counters Not Updated', () => {
    cy.get('body').trigger('keydown', { key: "(Space character)", code: "Space", which: 32 }); 
    //Cypress will wait 5 seconds after the click
    cy.wait(5000)
    cy.get('#streak').should('have.text','0');
    cy.get('#total').should('have.text','0');
  });

  it('Keyboard Shortcuts Disabled: Space Clicked, Check State is Work State', () => {
    cy.get('body').trigger('keydown', { key: "(Space character)", code: "Space", which: 32 }); 
    cy.get('#state').should('have.text','Work State');
  });

  it('Keyboard Shortcuts Disabled: Space Clicked, Check Help Not displayed', () => {
    cy.get('body').trigger('keydown', { key: "(Space character)", code: "Space", which: 32 }); 
    cy.get('#helpModal').then(($el) => {
      expect($el).to.be.hidden
    });
  });

  it('Keyboard Shortcuts Disabled: Space Clicked, Check Settings Not displayed', () => {
    cy.get('body').trigger('keydown', { key: "(Space character)", code: "Space", which: 32 }); 
    cy.get('#settingsModal').then(($el) => {
      expect($el).to.be.hidden
    });
  });

  it('Keyboard Shortcuts Disabled: Space Clicked, Check Background Color Unaffected', () => {
    cy.get('body').trigger('keydown', { key: "(Space character)", code: "Space", which: 32 }); 
    cy.get('body').then(($el) => {
      expect($el).to.have.attr('state', 'pomo');
    });
  });

  it('Keyboard Shortcuts Disabled: Space Clicked, Check Break Reminders Still Disabled', () => {
    cy.get('body').trigger('keydown', { key: "(Space character)", code: "Space", which: 32 }); 
    cy.get('#break-reminder').should('have.text', '');
    cy.get('#reminder').then(($el) => {
      expect($el).to.be.hidden;
    });
  });

  it('Keyboard Shortcuts Disabled: Space Clicked, Progress Bar Unaffected', () => {
    cy.get('.circle.pomo').should('have.length', 4);
    cy.get('.circle.short').should('have.length', 3);
    cy.get('.circle.long').should('have.length', 1);
  });
});
















describe('Progress Bar Tests', () => {
  beforeEach(() => {
    cy.visit('https://nidhigiridhar.github.io/cse110-w21-group35/source/productoro.html');

    //DOM Maninpulation to get short pomo/break times :)
    cy.get('#settingsButton').click();
    cy.get('#workOption60').invoke('prop', 'innerHTML', '.15');
    cy.get('#workOption60').invoke('prop', 'value', '.15');
    
    cy.get('#sbOption15').invoke('prop', 'innerHTML', '.1');
    cy.get('#sbOption15').invoke('prop', 'value', '.1');

    cy.get('#lbOption15').invoke('prop', 'innerHTML', '.1');
    cy.get('#lbOption15').invoke('prop', 'value', '.1');

    cy.get('#shortBreakTime').select('.1');
    cy.get('#longBreakTime').select('.1');
    cy.get('#workTime').select('.15');

    cy.get('#closeSettings').click();

    //Pomo: 9 Seconds
    //SB: 6 seconds
    //LB: 6 seconds
  });

  //UNSURE HOW TO TEST IF CICLES DEACTIVATED IN CORRECT ORDER :: NEEDS WORK
  it('Testing Four Pomos with Short/Long Breaks and Check if Bar Resets After Long Break', () => {
    //cy.get('.circle.pomo').should('have.length', 4);
    //cy.get('.circle.short').should('have.length', 3);
    //cy.get('.circle.long').should('have.length', 1);
    cy.get('.circle.deactive').should('have.length', 0);

    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);

    //cy.get('.circle.pomo').should('have.length', 3);
    //cy.get('.circle.short').should('have.length', 3);
    //cy.get('.circle.long').should('have.length', 1);
    cy.get('.circle.deactive').should('have.length', 1);

    //start break
    cy.get('#startButton').click();
    //finish break
    cy.wait(6*1000);

    //cy.get('.circle.pomo').should('have.length', 3);
    //cy.get('.circle.short').should('have.length', 2);
    //cy.get('.circle.long').should('have.length', 1);
    cy.get('.circle.deactive').should('have.length', 2);


    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);

    //cy.get('.circle.pomo').should('have.length', 2);
    //cy.get('.circle.short').should('have.length', 2);
    //cy.get('.circle.long').should('have.length', 1);
    cy.get('.circle.deactive').should('have.length', 3);

    //start break
    cy.get('#startButton').click();
    //finish break
    cy.wait(6*1000);

    //cy.get('.circle.pomo').should('have.length', 2);
    //cy.get('.circle.short').should('have.length', 1);
    //cy.get('.circle.long').should('have.length', 1);
    cy.get('.circle.deactive').should('have.length', 4);


    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);

    //cy.get('.circle.pomo').should('have.length', 1);
    //cy.get('.circle.short').should('have.length', 1);
    //cy.get('.circle.long').should('have.length', 1);
    cy.get('.circle.deactive').should('have.length', 5);

    //start break
    cy.get('#startButton').click();
    //finish break
    cy.wait(6*1000);

    //cy.get('.circle.pomo').should('have.length', 1);
    //cy.get('.circle.short').should('have.length', 0);
    //cy.get('.circle.long').should('have.length', 1);
    cy.get('.circle.deactive').should('have.length', 6);

    //start pomo
    cy.get('#startButton').click();
    //finish pomo
    cy.wait(9*1000);

    //cy.get('.circle.pomo').should('have.length', 0);
    //cy.get('.circle.short').should('have.length', 0);
    //cy.get('.circle.long').should('have.length', 1);
    cy.get('.circle.deactive').should('have.length', 7);

    //start Long break
    cy.get('#startButton').click();
    //finish Long break
    cy.wait(6*1000);

    //cy.get('.circle.pomo').should('have.length', 4);
    //cy.get('.circle.short').should('have.length', 3);
    //cy.get('.circle.long').should('have.length', 1);
    cy.get('.circle.deactive').should('have.length', 0);
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
    //Checks that the reset button gets enabled
    cy.get('#resetButton').then(($el) => {
      expect($el).to.not.have.attr('disabled');
    });
    //Check current counters are correct
    cy.get('#streak').should('have.text','0');
    cy.get('#total').should('have.text','0');
    //Check help cannot be seen
    cy.get('#helpModal').then(($el) => {
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
    cy.get('#helpModal').then(($el) => {
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
    cy.get('#helpModal').then(($el) => {
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
    cy.get('#helpModal').then(($el) => {
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
    cy.get('#helpModal').then(($el) => {
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
    //Checks that the reset button gets disabled
    cy.get('#resetButton').then(($el) => {
      expect($el).to.have.attr('disabled');
    });
    //Check current counters are correct after the reset click
    cy.get('#streak').should('have.text','0');
    cy.get('#total').should('have.text','1');
    //Check help cannot be seen
    cy.get('#helpModal').then(($el) => {
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
