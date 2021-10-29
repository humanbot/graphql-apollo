const { RESTDataSource } = require('apollo-datasource-rest');

class TrackAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://odyssey-lift-off-rest-api.herokuapp.com/';
    }  
    //   async getTracksForHome(limit = 10) {
    //     const data = await this.get('tracks', {
    //       per_page: limit,
    //       order_by: 'most_viewed',
    //     });
    //     return data.results;
    //   }
    
    getTracksForHome() {
    return this.get('tracks');
    }
    
    getAuthor(authorId) {
        return this.get(`author/${authorId}`)
    }

    getTrack(trackId) {
        return this.get(`track/${trackId}`)
    }

    getTrackModules(trackId) {
        return this.get(`track/${trackId}/modules`)
    }

    incrementTrackViews(id) {
        return this.patch(`track/${id}/numberOfViews`);
    }
    
}

module.exports = TrackAPI;