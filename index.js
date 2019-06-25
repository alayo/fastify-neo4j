const fp = require('fastify-plugin')
const neo4j = require('neo4j-driver').v1;

function fastifyNeo4j (fastify, opts, next) {
  const USERNAME = opts.username;
  const PASSWORD = opts.password;
  const URL = opts.url;
  const NAME = options.name;

  try {
    const driver = neo4j.driver(URL, neo4j.auth.basic(USERNAME, PASSWORD));
  }catch(e){
    return next(new Error('Error connecting to NEO4j database'))
  }
  const session = driver.session();

    const db = {
      connect:driver,
      session:session
    }
   fastify.addHook('onClose', (fastify, done) => driver.close(done))

   if (name) {
      if (!fastify.neo4j) {
        fastify.decorate('neo4j', {})
      }

        if (fastify.neo4j[name]) {
          return next(new Error(`fastify-neo4j '${name}' instance name has already been registered`))
        }

      fastify.neo4j[name] = db
    } else {
      if (fastify.neo4j) {
        return next(new Error('fastify-neo4j has already been registered'))
      } else {
        fastify.decorate('neo4j', db)
      }
}


  next()
}

module.exports = fp(fastifyNeo4j, {
  fastify: '1.0',
  name: 'fastifyNeo4j'
})
