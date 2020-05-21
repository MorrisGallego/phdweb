import { createHttpLink } from "apollo-link-http";
import { ApolloClient, InMemoryCache } from "apollo-boost";
import {ApolloProvider} from "react-apollo";
import React from "react";

const TOKEN = process.env.REACT_APP_OAUTH_TOKEN

const httpLink = createHttpLink({
    uri: 'https://api.github.com/graphql',
    headers: {
        'Authorization': `Bearer ${TOKEN}`
    },
})

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
})

export default function Apollo({children}){
    return <ApolloProvider client={client}>{children}</ApolloProvider>
}