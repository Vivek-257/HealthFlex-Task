A simple React Native app for managing multiple customizable timers. Users can create, start, pause, reset, and track timers categorized into different groups.
following feature are there in this app-:
 -Add timers with name, duration, and category.
 -Display timers grouped by category in collapsible sections.
 -Individual & bulk actions: Start, Pause, Reset.
 -Progress visualization using a progress bar.
 -Modal feedback when a timer completes.


Tech stack and dependencies used 

 React Native (CLI)....i haven't used expo here
AsyncStorage (Local data storage)
React Navigation (Screen navigation)
react-native-progress (Progress bar visualization)


-To run this project first clone it and switch to directory

 git clone https://github.com/Vivek-257/HealthFlex-Task.git
cd HealthFlex-Task

do npm install to install dependencies....i needed a dependency for navigation and progress bar thats all


run this command to start the app....i personally used my device . but it should work in emulator as well

npx react-native run-android

if metro bundler doesnt start in separate window run 

npx react-native start


