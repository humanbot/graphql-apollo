import React from 'react';
import { Layout } from '../components';
import {useQuery, gql} from '@apollo/client';
import TrackCard from '../containers/track-card'
import QueryResult from '../components/query-result'

/**
 * Tracks Page is the Catstronauts home page.
 * We display a grid of tracks fetched with useQuery with the TRACKS query
 */
export const TRACKS = gql`
#query goes here
query getTracks {
  tracksForHome {
    id
    title
    thumbnail
    length
    modulesCount
    author {
      id
      name
      photo
    }
  }
}
`;


const Tracks = () => {
  const {loading, error, data} = useQuery(TRACKS)
  // console.log(`Tracks: ${data}`);
  if(loading) return 'Loading...';
  if(error) return `Error ${error.message}`;

  return <Layout grid> 
  <QueryResult error={error} loading={loading} data={data}>
    {data?.tracksForHome?.map((track)=> (
      <TrackCard key={track.id} track={track} />
    ))}
    </QueryResult>
  </Layout>;
};

export default Tracks;
