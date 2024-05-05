import React, { useEffect, useState } from "react";
import "./App.css";

const ImageGallery = ({ images, onClick }) => (
  <div
    style={{
      display: "flex",
      // width: "40%",
      padding: "10px",
      // height: "75%",
      gap: "5px",
      flexWrap: "wrap",
      margin: "2%",
    }}
  >
    {images.map((src, index) => (
      <div
        key={index}
        style={{ cursor: "pointer", height: "200px", width: "200px" }}
      >
        <img
          src={src}
          height="200px"
          width="200px"
          onClick={() => onClick(src)}
          alt={`Image ${index}`}
        />
      </div>
    ))}
  </div>
);

const ImagePreview = ({ preview, height, width }) => (
  <div style={{ height : height , width : width, margin: "2%", border : "2px solid black" }}>
    <img src={preview} alt="preview" height={height} width={width}  />
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
}) => (
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
        onChange={onWidthChange}
        placeholder="ex: 100px"
      />
    </div>
    <div>Height</div>
    <div>
      <input
        value={height}
        onChange={onHeightChange}
        placeholder="ex: 100px"
      />
    </div>
    <div>Quality</div>
    <div>
      <input
        value={quality}
        onChange={onQualityChange}
        placeholder="ex: 0.8"
      />
    </div>
    <div>Fit</div>
    <div>
      <select onChange={onFitChange} name="fit" id="fit">
        <option value="contain">contain</option>
        <option value="cover">cover</option>
        <option value="avif">avif</option>
        <option value="fill">fill</option>
      </select>
    </div>
    <div>Format</div>
    <div>
      <select onChange={onFormatChange} name="format" id="format">
        <option value="jpg">jpg</option>
        <option value="png">png</option>
        <option value="avif">avif</option>
        <option value="webp">webp</option>
      </select>
    </div>
    <div>Position</div>
    <div>
      <select onChange={onPositionChange} name="position" id="position">
        <option value="top">top</option>
        <option value="bottom">bottom</option>
        <option value="left">left</option>
        <option value="right">right</option>
        <option value="center ">center </option>
      </select>
    </div>
  </div>
);

function App() {
  const [preview, setPreview] = useState("");
  const [imageURl, setImageUrl] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [quality, setQuality] = useState("");
  const [fit, setFit] = useState("");
  const [format, setFormat] = useState("");
  const [position, setPosition] = useState("");
  const [size, setSize] = useState();
  const [images, setImages] = useState([
    "https://i.postimg.cc/YqHjDP2Y/clay-banks-WFpmfj-XWIO4-unsplash.jpg",
    "https://i.postimg.cc/KzTvJPd0/job-savelsberg-Fy-LS-n-QF5-Eg-unsplash.jpg",
    "https://i.postimg.cc/TY027Y4v/kristaps-ungurs-o-c-JHQf4-Gg-unsplash.jpg",
    "https://i.postimg.cc/KvBBRLjr/rafael-garcin-9qx-B694vc-BI-unsplash.jpg",
    "https://i.postimg.cc/q7bC9xD0/steve-busch-hvffnx3y-BY4-unsplash.jpg",
    "https://i.postimg.cc/J7bzXQ3n/valentin-lacoste-HDj-Igo-w-z-E-unsplash.jpg",
  ]);

  const handleImgClick = (src) => {
    setImageUrl(src)
    setPreview(src);
  };
  useEffect(() => {
    console.log("Effect triggered!");
    const fetchImage = async () => {
      try {
        // const params = new URLSearchParams({
        //   w: width,
        //   h: height,
        //   fit,
        //   q: quality,
        //   position,
        //   fm: format,
        // });
  
        // const response = await fetch(
        //   `https://bejewelled-sable-5bf280.netlify.app/.netlify/images?${preview && `url=${preview}`}&${width && `w=${width}`}`
        // );
        const url = `https://bejewelled-sable-5bf280.netlify.app/.netlify/images?` + 
        `${preview ? `url=${encodeURIComponent(preview)}&` : ''}` +
        `${width ? `w=${encodeURIComponent(width)}&` : ''}` +
        `${height ? `h=${encodeURIComponent(height)}&` : ''}` +
        `${fit ? `fit=${encodeURIComponent(fit)}&` : ''}` +
        `${quality ? `q=${encodeURIComponent(quality)}&` : ''}` +
        `${format ? `fm=${encodeURIComponent(format)}&` : ''}` +
        `${position ? `position=${encodeURIComponent(position)}&` : ''}`;
        const response = await fetch(url)
        console.log('response', response)
        const data = response.url;
        setPreview(data);
  
        // Only update preview if the fetched URL is different
        // if (data !== preview) {
        // }
        
        // console.log('data', data);
        // Process data if needed
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };
  
    // Check if preview is not already fetched
    // if (preview) {
      fetchImage();
    // }
  }, [width, height, fit, quality, format, position]);
  
  useEffect(()=>{
    setFit("")
    setWidth("")
    setHeight("")
    setPosition("")
    setFormat("")
    setQuality(100)
},[imageURl])
  

  return (
    <div style={{ display: "flex", flexDirection : "column" }}>
      <ImageGallery images={images} onClick={handleImgClick} />
      <div style={{margin : "0px 2%"}}>
        
      {preview}
      </div>
      <div style={{display : "flex"}}>
      <ImagePreview preview={preview} height={height} width={width} />
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
        />
        </div>
    </div>
  );
}

export default App;
