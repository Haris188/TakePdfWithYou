Take-pdf-with-you is an app that makes Pdfs portable so you can read them anywhere.

## Quick Start
Clone the repository and then you can

#### For UI
```
cd client
npm install && npm run dev
```
#### For Server
```
cd server
npm install && npm run dev
```
## Contribution
Currently we are using minimal version of GitFlow. In order to contribute you can:
1. Take a ticket(issue) and assign it to yourself
2. Create a branch named after ticket Id
3. Push the code
4. Create a pull request

for example the issue you are resolving has an id 22 then
```
git checkout -b feature/22
```
When you are want to push the code
```
git pull origin develop
git add .
git commit -am "message"
git push origin feature/22
```
And then open a pull request
## Architecture
Take-pdf-with-you follows a strict architecture that is flexible and extendable in nature. The main idea is that everything in the app depends on the business rules themselves hence makes everything replaceable. The following diagram demonstrates the architecture.

![TakePdfWithYou](https://user-images.githubusercontent.com/40364018/116459900-60290980-a834-11eb-825b-d1a89b6d624e.png)

### Server Architecture
Server architecture includes the following components

1. Interface Boundary
2. Interactors
3. Entities
4. FileStore
5. AuthenticationLib
6. DataStore

Note that everything has a dependecy flow on Entities and Entities are the business rules. Everything else is replacable

#### Interface Boudary
With the help of ExpressJS, we have established an interface boundary, which is nothing but simple REST API endpoint.
#### Interactors
Interactors are the dispatchers for a job to be done, e.g signup, signin. They use the entities to perform a task and return the result.
#### Entities
Entites are the components that deals with the logic of business rules. For example PDF entity deals with the actions performed on a PDF file e.g `saveBookmark()`
#### FileStore, DataStore and AuthenticationLib
These components provide an interface of the app to the 3rd party libraries or frameworks. This is because we do not want to be dependent on 3rd party libraries. This configration allows you to change from MongoDB to MySQL by just implementing the interfaces.
### Client Architecture
Client has a relatively simple architecture. It includes

1. API Boundary
2. Container
3. Views

#### API Boundary
These are just the functions that provides an interface for REST API (server). They make use of Axios to make calls
#### Container
Container is the logical component. It only contains the logic that a View needs. Redux slice in this case.
#### View
View is dumb. It does not have any logic and it only has the JSX code for React. It uses Container for its logic.
## Contributors
Ahmad Nadeem\
Haris Ahmad
