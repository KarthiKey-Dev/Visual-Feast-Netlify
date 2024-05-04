import React, { useEffect, useState } from "react";
// import ImageUploader from "./component/ImageUploader";
import "./App.css";

function App() {
  const [preview, setPreview] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [quality, setQuality] = useState("");
  const [fit, setFit] = useState("");
  const [format, setFormat] = useState("");
  const [position, setPosition] = useState("");

  const imgList = [
    "https://i.postimg.cc/YqHjDP2Y/clay-banks-WFpmfj-XWIO4-unsplash.jpg",
    "https://i.postimg.cc/KzTvJPd0/job-savelsberg-Fy-LS-n-QF5-Eg-unsplash.jpg",
    "https://i.postimg.cc/TY027Y4v/kristaps-ungurs-o-c-JHQf4-Gg-unsplash.jpg",
    "https://i.postimg.cc/KvBBRLjr/rafael-garcin-9qx-B694vc-BI-unsplash.jpg",
    "https://i.postimg.cc/q7bC9xD0/steve-busch-hvffnx3y-BY4-unsplash.jpg",
    "https://i.postimg.cc/J7bzXQ3n/valentin-lacoste-HDj-Igo-w-z-E-unsplash.jpg",
  ];
  const URl = "https://bejewelled-sable-5bf280.netlify.app/";
  const handleImgOnclick = (e) => {
    setPreview(e.target.src);
  };

  /**
   * url: /owl.png
w: 80
h: 60
fit: cover
q: 2
position: right
   */

  useEffect(() => {
    const data = new URLSearchParams();
    const options = {
        "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
        "accept-language": "en-US,en;q=0.9,ta;q=0.8,hi;q=0.7",
        "referer": "https://image-cdn-playground.netlify.app/",
        "sec-ch-ua": "\"Chromium\";v=\"124\", \"Google Chrome\";v=\"124\", \"Not-A.Brand\";v=\"99\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "image",
        "sec-fetch-mode": "no-cors",
        "sec-fetch-site": "same-origin",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "*",
        "Content-type": "application/json; charset=UTF-8"
    }
    // Conditionally append query parameters only if they have values
    if (width) data.append("w", width);
    if (height) data.append("h", height);
    if (fit) data.append("fit", fit);
    if (quality) data.append("q", quality);
    if (position) data.append("position", position);
    if (format) data.append("fm", format);
    // if (preview) data.append("url", preview);
    const url = `https://bejewelled-sable-5bf280.netlify.app/.netlify/images?url=${preview}` + data.toString();
    fetch(url, {
      method: "GET",
      headers:options,
    }).then((response) => response.json());
  }, [width, height, fit, position, format, preview, quality]);
  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          display: "flex",
          width: "40%",
          padding: "10px",
          height: "75%",
          gap: "5px",
          flexWrap: "wrap",
          margin: "2%",
        }}
      >
        {imgList.map((src, index) => (
          <div
            key={index}
            style={{ cursor: "pointer", height: "200px", width: "200px" }}
          >
            <img
              src={src}
              height="200px"
              width="200px"
              onClick={handleImgOnclick}
              alt={`Image ${index}`}
            />
          </div>
        ))}
      </div>
      <div style={{ display: "flex", margin: "2%" }}>
        <img src={preview} alt="preview" height="400" width="400px" />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          margin: "2%",
        }}
      >
        <div>Width</div>
        <div>
          <input
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            placeholder="ex: 100px"
          />
        </div>
        <div>Height</div>
        <div>
          <input
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="ex: 100px"
          />
        </div>
        <div>Quality</div>
        <div>
          <input
            value={quality}
            onChange={(e) => setQuality(e.target.value)}
            placeholder="ex: 0.8"
          />
        </div>
        <div>Fit</div>
        <div>
          <select onChange={(e) => setFit(e.target.value)} name="fit" id="fit">
            <option value="contain">contain</option>
            <option value="cover">cover</option>
            <option value="avif">avif</option>
            <option value="fill">fill</option>
          </select>
        </div>
        <div>Format</div>
        <div>
          <select
            onChange={(e) => setFormat(e.target.value)}
            name="format"
            id="format"
          >
            <option value="jpg">jpg</option>
            <option value="png">png</option>
            <option value="avif">avif</option>
            <option value="webp">webp</option>
          </select>
        </div>
        <div>Position</div>
        <div>
          <select
            onChange={(e) => setPosition(e.target.value)}
            name="position"
            id="position"
          >
            <option value="top">top</option>
            <option value="bottom">bottom</option>
            <option value="left">left</option>
            <option value="right">right</option>
            <option value="center ">center </option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default App;
