## Pomodoro Timer Project Roadmap
### Created by: Dream Team 

## Sprint 1 Tasks:
  * Documentation:  
    * ADRs
    * User centered thinking documents (personas, user stories, use cases)
    * System diagrams (C4 diagram, event modeling diagram, UML)
    * Project Roadmap
    * Style guideline
  * Interface:
    * Fat marker sketches
    * Wireframes
    * High fidelity prototype

## Sprint 2 - MVP Features:
  * Timer (25 min for pomo, 5 min for break) with
    * Start
    * Reset (restarts current pomo)
  * Notifications
    * Banner notifications
    * Audio notifications (one tone signaling end of pomo, one tone signaling end of break)
  * Static counter on the side of the screen tracking how many pomos were completed that day
  * Static counter on the side of the screen tracking how many pomos were completed in a row (without clicking reset)
  * Static instructions explaining how to use the timer

## Sprint 2 - GitHub Issues
  * Implement working clock that automatically follows this order: 25 min pomo -> 5 min break (with a 25 min break every four pomos)
    * story points:
  * Implement start button which begins a countdown from 25 min
    * story points:
  * Implement reset button which resets the timer to 25 min and stays at 25 min
    * story points:
  * Implement the banner notification notifying beginning of a short break
    * story points:
  * Implement the banner notification notifying beginning of a long break
    * story points:
  * Implement the audio notification notifying beginning of a short break
    * story points
  * Implement the audio notification notifying beginning of a long break
  * Create displayed counter showing number of pomos completed in a row (without pressing reset)
    * story points
  * Create displayed counter showing number of pomos completed for the day (in one browser session)
    * story points
  * Use CSS to set background font color
    * story points:
  * Use CSS to style start and reset button
    * story points:
  * Use CSS to style timer
    * story points
  * Use CSS to create tomato icon to hold counters
    * story points

## Sprint 3 Features:
  * Non-static instructions
  * Keyboard shortcuts (for start and reset)
  * Different screen colors depending on whether there is a pomo or break in progress
  * Progress bar
    * At the top of the screen
    * Shows how long until the next break begins
  * Reminder to step away from the screen during breaks

## Sprint 4 Features:
  * Customizable time limits
  * Task
    * Ability to create list of tasks
    * Ability to assign a number of pomos to each task
    * Ability to check mark 'finished' after completing a task
    * Ability to drag and drop to reorder the list of tasks
    * Ability to delete tasks
    * Ability to clear the tasks list

## Sprint 5 - beyond the quarter Features:
  * User profiles
  * Progress reports
    * Daily and weekly statistical reports on the number of pomos completed
  * Incentives
    * Points are awarded for pomos completed
    * Themes/colors/buzzer sounds can be unlocked after earning a certain number of points