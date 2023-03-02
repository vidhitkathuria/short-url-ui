import React, { useState } from "react";

import axios from "axios";
const Home = () => {
  let save = "";
  const [url, setUrl] = useState("");
  const [short, setShort] = useState("");
  const [shorts, setShorts] = useState([]);
  const [urls, setUrls] = useState([]);
  const handleSubmit = async (e) => {
    try {
      //   console.log(url);
      save = url;
      console.log("hi this is", save);
      e.preventDefault();
      const res = await axios.post("http://localhost:5000/url", {
        url,
      });
      setUrls([...urls, url]);
      console.log(urls);
      //   console.log("url saved", res.data);
      setShort(res.data);
      setShorts([...shorts, res.data]);
      setUrl("");
      //   console.log("hello", short.id);
      //   console.log("hi", shorts);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <h1>URL Shrinker</h1>
      <form
        action=""
        className="form-inline d-flex "
        method="POST"
        onSubmit={handleSubmit}
      >
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
      <ul>
        {shorts.map((short) => (
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
      </ul>
      <table>
        <thead>
          <tr>
            <th>Full URL</th>
            <th>Short URL</th>
            <th>Number of times visited</th>
          </tr>
        </thead>
        <tbody>
          {shorts.map((short) => (
            <tr key={short.id}>
              <td>{save}</td>
              <td>
                <a href={`http://localhost:5000/${short.id}`}>
                  http://localhost:5000/${short.id}
                </a>
              </td>
              <td>User 1 clicks</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
