# Example of unit-testing an Angular 6 application

Each resource must be tested in complete isolation from the rest of the world. 
All dependencies should be mocked, e.g. when testing a component, we should not 
relay at all on any injected services. 

## Examples:
1. Component with a custom service dependency.
2. Custom service with Angular service dependency. 
3. Custom service, dependent on another custom service and an Angular service.
4. Filters.

## Step #1 - Clone the project
```
git clone https://github.com/vmanchev/angular6-unit-test.git
```

## Step #2 - Install node/npm and karma-cli
```
sudo apt-get install node
sudo npm install -g karma-cli
```

## Step #3 - Install project dependencies
```
npm install 
```

### To run the project:
```
npm start
```

### To run the unit tests:
```
npm test
```

### To run the e2e tests:
```
npm run e2e
```

### To generate the code coverage report:
```
npm run coverage
```

### Code coverage
Find the code coverage in the ./coverage folder. Just run the index.html file in a browser.


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.7.