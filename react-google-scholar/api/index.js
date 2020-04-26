const  express  =  require('express');
const ExpressGraphQL = require("express-graphql");
const schema = require("./graphql/post/post.js");
const  app  =  express();

const cors = require('cors')

app.use(cors()) // enable `cors` to set HTTP response header: Access-Control-Allow-Origin: *
//app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))

app.use("/graphql", ExpressGraphQL({ schema: schema.schema, graphiql: true}));

app.listen(PORT)

app.get('/', function (req, res) {
    res.render('index', {});
  });

app.listen(4000, () => {
    console.log("GraphQL server running at http://localhost:4000.");
});