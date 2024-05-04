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

  const handleImgOnclick = (e) => {
    setPreview(e.target.src);
  };

  // useEffect(()=>{

  // },[])
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
          <div key={index} style={{ cursor: "pointer", height: "200px", width: "200px" }}>
            <img src={src} height="200px" width="200px" onClick={handleImgOnclick} alt={`Image ${index}`} />
          </div>
        ))}
      </div>
      <div style={{ display: "flex", margin: "2%" }}>
        <img src={preview} alt="preview" height="400" width="400px" />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "5px", margin: "2%" }}>
        <div>Width</div>
        <div>
          <input value={width} onChange={(e) => setWidth(e.target.value)} placeholder="ex: 100px" />
        </div>
        <div>Height</div>
        <div>
          <input value={height} onChange={(e) => setHeight(e.target.value)} placeholder="ex: 100px" />
        </div>
        <div>Quality</div>
        <div>
          <input value={quality} onChange={(e) => setQuality(e.target.value)} placeholder="ex: 0.8" />
        </div>
        <div>Fit</div>
        <div>
          <input value={fit} onChange={(e) => setFit(e.target.value)} placeholder="ex: contain" />
        </div>
        <div>Format</div>
        <div>
          <input value={format} onChange={(e) => setFormat(e.target.value)} placeholder="ex: jpeg" />
        </div>
        <div>Position</div>
        <div>
          <input value={position} onChange={(e) => setPosition(e.target.value)} placeholder="ex: center" />
        </div>
      </div>
    </div>
  );
}

export default App;
