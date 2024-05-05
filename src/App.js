import React, { useState } from "react";
import "./App.css";

const ImageGallery = ({ images, onClick }) => (
  <div className="image-gallery">
    {images.map((src, index) => (
      <div key={index} className="image-item" onClick={() => onClick(src)}>
        <img src={src} alt={`Image ${index}`} />
      </div>
    ))}
  </div>
);

const ImagePreview = ({ preview, height, width }) => (
  <div className="image-preview" style={{height : height, width : width}}>
    <img src={preview} alt="preview" />
  </div>
);

const ImageSettings = ({
  width,
  height,
  quality,
  fit,
  format,
  position,
  onWidthChange,
  onHeightChange,
  onQualityChange,
  onFitChange,
  onFormatChange,
  onPositionChange,
  handleApply
}) => (
  <div className="image-settings">
    <div>
      <label htmlFor="width">Width</label>
      <input
        id="width"
        type="text"
        value={width}
        onChange={onWidthChange}
        placeholder="ex: 100px"
      />
    </div>
    <div>
      <label htmlFor="height">Height</label>
      <input
        id="height"
        type="text"
        value={height}
        onChange={onHeightChange}
        placeholder="ex: 100px"
      />
    </div>
    <div>
      <label htmlFor="quality">Quality</label>
      <input
        id="quality"
        type="text"
        value={quality}
        onChange={onQualityChange}
        placeholder="ex: 0.8"
      />
    </div>
    <div>
      <label htmlFor="fit">Fit</label>
      <select id="fit" onChange={onFitChange}>
        <option value="contain">contain</option>
        <option value="cover">cover</option>
        <option value="avif">avif</option>
        <option value="fill">fill</option>
      </select>
    </div>
    <div>
      <label htmlFor="format">Format</label>
      <select id="format" onChange={onFormatChange}>
        <option value="jpg">jpg</option>
        <option value="png">png</option>
        <option value="avif">avif</option>
        <option value="webp">webp</option>
      </select>
    </div>
    <div>
      <label htmlFor="position">Position</label>
      <select id="position" onChange={onPositionChange}>
        <option value="top">top</option>
        <option value="bottom">bottom</option>
        <option value="left">left</option>
        <option value="right">right</option>
        <option value="center">center</option>
      </select>
    </div>
    <button onClick={handleApply}>Apply</button>
  </div>
);

function App() {
  const [preview, setPreview] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [quality, setQuality] = useState("");
  const [fit, setFit] = useState("");
  const [format, setFormat] = useState("");
  const [position, setPosition] = useState("");
  const [images] = useState([
    "https://i.postimg.cc/YqHjDP2Y/clay-banks-WFpmfj-XWIO4-unsplash.jpg",
    "https://i.postimg.cc/KzTvJPd0/job-savelsberg-Fy-LS-n-QF5-Eg-unsplash.jpg",
    "https://i.postimg.cc/TY027Y4v/kristaps-ungurs-o-c-JHQf4-Gg-unsplash.jpg",
    "https://i.postimg.cc/KvBBRLjr/rafael-garcin-9qx-B694vc-BI-unsplash.jpg",
    "https://i.postimg.cc/q7bC9xD0/steve-busch-hvffnx3y-BY4-unsplash.jpg",
    "https://i.postimg.cc/J7bzXQ3n/valentin-lacoste-HDj-Igo-w-z-E-unsplash.jpg",
  ]);

  const handleImgClick = (src) => {
    setImageUrl(src);
    setPreview(src);
  };

  const handleApply = async () => {
    try {
      const params = new URLSearchParams();
      if (preview) params.append("url", preview);
      if (width) params.append("w", width);
      if (height) params.append("h", height);
      if (fit) params.append("fit", fit);
      if (quality) params.append("q", quality);
      if (format) params.append("fm", format);
      if (position) params.append("position", position);
      
      const response = await fetch(`https://bejewelled-sable-5bf280.netlify.app/.netlify/images?${params}`);
      const data = await response.url;
      setPreview(data);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  return (
    <div className="app">
      <ImageGallery images={images} onClick={handleImgClick} />
      <div style={{display : "flex", flexWrap : "wrap", width : "100%"}}>

      URL {preview}
      </div>
      <div className="settings-and-preview">
        <ImageSettings
          width={width}
          height={height}
          quality={quality}
          fit={fit}
          format={format}
          position={position}
          onWidthChange={(e) => setWidth(e.target.value)}
          onHeightChange={(e) => setHeight(e.target.value)}
          onQualityChange={(e) => setQuality(e.target.value)}
          onFitChange={(e) => setFit(e.target.value)}
          onFormatChange={(e) => setFormat(e.target.value)}
          onPositionChange={(e) => setPosition(e.target.value)}
          handleApply={handleApply}
        />
        <ImagePreview preview={preview} height={height} width={height} />
      </div>
    </div>
  );
}

export default App;
