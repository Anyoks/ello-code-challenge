import React, { useEffect, useState } from "react";
import "./Book.css";
import { useQuery, gql } from "@apollo/client";
import Page from "../Page/Page";

const BOOK_QUERY = gql`
  query {
    book {
      title
      pages {
        content
        tokens {
          position
          value
        }
      }
    }
  }
`;

export default function Book() {
  const { data, loading, error } = useQuery(BOOK_QUERY);
  const [pages, setPages] = useState([]);
  const [pageA, setPageA] = useState(0);

  useEffect(() => {
    if (data) {
      setPages(data.book.pages);
    }
  });

  if (loading) {
    return (
      <>
        {" "}
        <div className="loader">Getting your book ...</div>
      </>
    );
  }

  function next() {
    if (pageA < pages.length) {
      setPageA(pageA + 2);
    }
  }

  function back() {
    if (pageA >= 2) {
      setPageA(pageA - 2);
    } else {
      setPageA(0);
    }
  }

  return (
    <>
      <div className="title"> {data.book.title}</div>
      {
        <div className="doublePageView">
          <div className="flex-child"></div>
          <div className="flex-child"></div>
        </div>
      }
      <div className="nav-buttons">
        <button onClick={() => back()}>Back</button>
        <button onClick={() => next()}>Next</button>
      </div>
    </>
  );
}
