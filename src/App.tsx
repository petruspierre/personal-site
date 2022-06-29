import { ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom"
import { client } from "./lib/apollo";
import { Router } from './router';

export const App = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ApolloProvider>
  )
}