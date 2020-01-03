import {GraphQLServer} from 'graphql-yoga';

const posts = [{
    id: '1',
    title: 'Learn graphql',
    body: 'Learn how to learn graphql',
    published: true
}, {
    id: '2',
    title: 'Learn node',
    body: 'Learn how to learn node graphql',
    published: false
}, {
    id: '3',
    title: 'Learn react',
    body: 'Learn how to learn react',
    published: true
}];


// Type definitions (schema)
const typeDefs = `
    type Query {
        users: [User!]!
        posts(query: String): [Post!]
        me: User!
        post: Post!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
    }
`;

// Resolvers
const resolvers = {
    Query: {
        users(parent, args, ctx, info) {

        },
        me() {
            return {
                id: '123abc',
                name: 'Pratik',
                email: 'pratik@exmaple.com'
            }
        },
        posts(parent, args, ctx, info) {
            if(!args.query) {
                return posts
            }

            return posts.filter((post) => {
                return post.title.toLowerCase().includes(args.query.toLowerCase()) || post.body.toLowerCase().includes(args.query.toLowerCase())
            });
        }
    }
};

const server = new GraphQLServer({
    typeDefs: typeDefs,
    resolvers: resolvers
});

server.start(() => {
    console.log('Server running on port 4000');
});