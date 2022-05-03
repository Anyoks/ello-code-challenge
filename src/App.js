import logo from './logo.svg';
import './App.css';
import { ApolloProvider } from "@apollo/client";
import { client } from "./services/ApolloClient/client";
import Book from "./components/Book/Book";

function App() {
  return (
    <ApolloProvider client={client}>
      <Book>
      </Book>
    </ApolloProvider>
  );
}

export default App;
