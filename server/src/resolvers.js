const fetch = require('node-fetch')
const resolvers = {
    Query: {
        // returns an array of Tracks that populats homepage grids
        // single underscore means first, two underscore means second unused var
        tracksForHome: (_, __, {dataSources})=> {
            return dataSources.trackAPI.getTracksForHome()
        },

        // Using node fetch version to compare how fast data respond
        // tracksForHomeFetch: async () => {
        //     const baseUrl = "https://odyssey-lift-off-rest-api.herokuapp.com";
        //     const res = await fetch(`${baseUrl}/tracks`);
        //     return res.json();
        // },

        //get single track 
        track: (_, {id}, {dataSources})=> {
            return dataSources.trackAPI.getTrack(id);
        },
    },

    Mutation: {
        // increments a track's numberOfViews property
        incrementTrackViews: async (_, { id }, { dataSources }) => {
          try {
            const track = await dataSources.trackAPI.incrementTrackViews(id);
            return {
              code: 200,
              success: true,
              message: `Successfully incremented number of views for track ${id}`,
              track,
            };
          } catch (err) {
            return {
              code: err.extensions.response.status,
              success: false,
              message: err.extensions.response.body,
              track: null,
            };
          }
        },
      },

    Track: {
        author: ({authorId}, _, {dataSources})=> {
            // author: (parent, args, {dataSources})=> {
            // console.log(parent)
            // const {authorId} = parent;
            return dataSources.trackAPI.getAuthor(authorId);

        },

        // using fetch instead of dataSources
        // author: async ({ authorId }, _, { dataSources }) => {
        //     const baseUrl = "https://odyssey-lift-off-rest-api.herokuapp.com";
        //     const res = await fetch(`${baseUrl}/author/${authorId}`);
        //     return res.json();
        // },

        modules: ({id}, _, {dataSources} )=> {
            return dataSources.trackAPI.getTrackModules(id)
        }

    }

}

module.exports = resolvers