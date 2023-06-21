import React, { useEffect, useState } from 'react';

const ImageComponent = ({ imageUrl }) => {
  const [imageSize, setImageSize] = useState({width: 0, height: 0});

  useEffect(() => {
    const img = new Image();

    img.onload = function() {
      setImageSize({
        width: this.naturalWidth,
        height: this.naturalHeight
      });
    };
    
    img.src = imageUrl;
  }, [imageUrl]);

  return (
    <div>
      <img src={imageUrl} alt="My Image"/>
      <p>Original Image Width: {imageSize.width}px</p>
      <p>Original Image Height: {imageSize.height}px</p>
    </div>
  );
}

export default ImageComponent;