import { ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client";
import { createHttpLink } from "apollo-link-http";

const httpLink = new createHttpLink({
  uri: "https://fullstack-engineer-test-n4ouilzfna-uc.a.run.app/graphql"
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([httpLink]),
});
