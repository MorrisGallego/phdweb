import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const OWNER = process.env.REACT_APP_CONTENT_REPOSITORY_OWNER
const REPO = process.env.REACT_APP_CONTENT_REPOSITORY_NAME

const QUERY = gql`
  query($owner: String!, $name: String!) {
    repository(name: $name, owner: $owner) {
      object(expression: "master:") {
        ... on Tree {
          entries {
            name
            object {
              ... on Blob {
                text
              }
            }
          }
        }
      }
    }
  }
`;

function useData(){
    const { loading, data } = useQuery(QUERY, {
        variables: {
            name: REPO,
            owner: OWNER
        },
    });

    if (!loading){
        const parsed = data.repository.object.entries.filter(entry => entry.name.endsWith('.json')).map(entry => JSON.parse(entry.object.text))

        return {
            papers: parsed.filter(it => it.type === 'PAPER'),
            about: parsed.find(it => it.type === 'ABOUT'),
        }
    }
}

export default useData