import React from 'react'
import {gql, useQuery} from '@apollo/client'
import {Layout, QueryResult} from '../components'
import TrackDetail from '../components/track-detail';

const GET_TRACK = gql`
query getTrack($trackId: ID!) {
  track(id: $trackId) {
    id
    title
    author {
      id
      name
      photo
    }
    thumbnail
    length
    modulesCount
    description
    numberOfViews
    modules {
      id
      title
      length
    }
  }
}
`;


const Track = ({trackId}) => {
    const {loading, error, data} = useQuery(GET_TRACK, {
        variables: {trackId}
    });
    console.log(`SingleTrack: ${JSON.stringify(data, null, 2)}`);
    if(loading) return 'Loading...';
    if(error) return `Error ${error.message}`;

    return (
        <div>
            <Layout>
                <QueryResult error={error} loading={loading} data={data} >
                    <TrackDetail track={data?.track} />
                </QueryResult>
            </Layout>
        </div>
    )
}
export default Track;
