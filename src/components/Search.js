import React, { useState, useEffect } from "react";
import axios from "axios";
import { className } from "postcss-selector-parser";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("Apple");
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);
  const [results, setResults] = useState([]);

  // const URL = 'https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=programming&format=json'
  // axios.create({
  //     baseURL = URL,
  //     params:{
  //         q='search'
  //     }
  // })

  // console.log(results);
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 1000);
    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  useEffect(() => {
    const search = async () => {
      const { data } = await axios.get("https://en.wikipedia.org/w/api.php", {
        params: {
          action: "query",
          list: "search",
          srsearch: debouncedTerm,
          format: "json",
          origin: "*",
        },
      });
      setResults(data.query.search);
    };
    search();
  }, [debouncedTerm]);

//   useEffect(() => {
//     if (searchTerm && !results.length) {
//       search();
//     } else {
//       const timeOutId = setTimeout(() => {
//         if (searchTerm) {
//           search();
//         }
//       }, 500);

//       return () => {
//         clearTimeout(timeOutId);
//       };
//     }
//     search();
//   }, [searchTerm]);

  const renderedResults = results.map((result) => {
    return (
      <div key={result.pageid} className="item">
        <div className="right floated content">
          <a
            className="ui button"
            href={`https://en.wikipedia.org?curid=${result.pageid}`}
          >
            Go
          </a>
        </div>
        <div className="content">
          <div className="header">{result.title}</div>
          <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
        </div>
      </div>
    );
  });
  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label>Enter search term</label>
          <input
            className="input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="ui celled list">{renderedResults}</div>
      </div>
    </div>
  );
};

export default Search;
