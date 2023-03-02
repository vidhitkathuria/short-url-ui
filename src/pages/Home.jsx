import React, { useState } from "react";

import axios from "axios";
const Home = () => {
  const [url, setUrl] = useState("");
  const [urlArr, setURLArr] = useState([]);

  const handleSubmit = async (e) => {
    try {
      //   console.log(url);
      //   console.log("hi this is", save);
      e.preventDefault();
      const res = await axios.post("http://localhost:5000/url", {
        url,
      });
      const obj = {
        longURL: url,
        shortURL: res.data.id,
        noOfClick: 0,
      };
      setURLArr([...urlArr, obj]);
      //   setUrls([...urls, url]);
      //   console.log(urls);
      //   console.log("url saved", res.data);
      //   setShort(res.data);

      setUrl("");
      //   console.log("hello", short.id);
      //   console.log("hi", urlArr);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = async(id) => {
    const updatedURLArr = [...urlArr];

    const res = await axios.get("")
    updatedURLArr[id].noOfClick++;

    setURLArr(updatedURLArr);
  };

  return (
    <div>
      <h1>URL Shrinker</h1>
      <form className="form-inline d-flex " onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter URL"
          className="form-control mx-3 col"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button type="submit" className="btn btn-success mx-2">
          Submit
        </button>
      </form>
      {/* <ul>
        {urlArr.map((short) => (
          <li key={short.id}>
            Short URL:{" "}
            <a
              href={`http://localhost:5000/${short.id}`}
              target="_blank"
              rel="noreferrer"
            >
              {`http://localhost:5000/${short.id}`}
            </a>
          </li>
        ))}
      </ul> */}
      <table>
        <thead>
          <tr>
            <th>Full URL</th>
            <th>Short URL</th>
            <th>Number of times visited</th>
          </tr>
        </thead>
        <tbody>
          {urlArr.map((short, id) => (
            <tr key={short.shortURL}>
              <td>{short.longURL}</td>
              <td>
                <a
                  href={`http://localhost:5000/${short.shortURL}`}
                  target="_blank"
                  onClick={() => handleClick(id)}
                >
                  {"http://localhost:5000/" + short.shortURL}
                </a>
              </td>
              <td>User {short.noOfClick} clicks</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
