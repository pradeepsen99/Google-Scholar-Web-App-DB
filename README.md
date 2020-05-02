# Google-Scholar-Web-App-DB

A web-app to visualize the different researchers on Google Scholar along with their relationships to other researchers.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. The instructions are assuming you are using a macintosh machine. There should be similar commands for windows and linux.

### Prerequisites

You will need to have npm and sqlite3 installed

```
brew install npm
brew install sqlite3
```

### Installing

Go to the api directory and install the dependencies
```
cd api
npm intall
```

Go to the react-google-scholar directory and install the dependencies 
```
cd react-google-scholar
npm install
```

## Running Project

Go to the api directory and run the graphql server
```
cd api
npm start
```

Go to the react-google-scholar directory and run the react program
```
cd react-google-scholar
npm start
```

After doing this http://localhost:3000/ will open up in the default browser and you should be able to access the project.

## Built With

* [React.js](https://reactjs.org/) - The web framework used
* [Graphql](https://graphql.org/) - Backend 
* [Apollo](https://www.apollographql.com/) - Used to connect the graphql server with react

## Resources Used

### Apollo and Graphql
1) https://www.apollographql.com/docs/react/data/queries/
2) https://www.apollographql.com/docs/tutorial/queries/
3) https://www.apollographql.com/blog/full-stack-react-graphql-tutorial-582ac8d24e3b
4) https://www.sitepoint.com/how-to-build-a-web-app-with-graphql-and-react/

### CORS
1) https://www.prisma.io/blog/enabling-cors-for-express-graphql-apollo-server-1ef999bfb38d

### React and Grapql
1) https://medium.com/codingthesmartway-com-blog/getting-started-with-react-and-graphql-395311c1e8da
2) https://blog.logrocket.com/crud-with-node-graphql-react/

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
