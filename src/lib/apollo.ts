import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: process.env.API_URL,
  headers: {
    Authorization: process.env.API_TOKEN
      ? `Bearer ${process.env.API_TOKEN}`
      : "",
  },
  cache: new InMemoryCache(),
});
