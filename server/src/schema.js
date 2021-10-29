const {gql} = require('apollo-server')

const typeDefs = gql`

    type Query{
        "Query to get the tracks array for the homepage grid"
        tracksForHome: [Track!]!

        "Query using node fetch to get tracks array, just to compare"
        tracksForHomeFetch: [Track!]! 

        "Fetch a specific track, provided a track's ID"
        track(id: ID!) : Track

    }

    "A track is a group of modules that teaches specific topic"
    type Track {
        id: ID!
        title: String!
        "tracks main author"
        author: Author!
        thumbnail: String
        length: Int
        modulesCount: Int
        "The tracks complete description, can be markdown format"
        description: String
        "Number of times track has been viewed"
        numberOfViews: Int
        "The tracks complete array of modules"
        modules: [Module!]!
    }

    "Author of a complete Track or a Module"
    type Author {
        id: ID!
        name: String!
        photo: String
    }


    "A module is single uit of teching. Multiple modules compose a track"
    type Module {
        id: ID!
        "Modules title"
        title: String
        "Modules length in min"
        length: Int 
    }

    type Mutation {
        incrementTrackViews(id: ID!): IncrementTrackViewsResponse!
    }

    type IncrementTrackViewsResponse {
        "Similar to HTTP status code, represents the status of the mutation"
        code: Int!
        "Indicates whether the mutation was successful"
        success: Boolean!
        "Human-readable message for the UI"
        message: String!
        "Newly updated track after a successful mutation"
        track: Track
    }
`;

module.exports = typeDefs;