import React, { useRef, useEffect } from 'react';

const Member = ({ name, role, imageUrl, imageAlt }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.crossOrigin = "Anonymous"; 
    img.src = imageUrl;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      pixelate(ctx, img.width, img.height, 2); 
    };
  }, [imageUrl]);

  const pixelate = (ctx, width, height, scale) => {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;

   
    for (let y = 0; y < height; y += scale) {
      for (let x = 0; x < width; x += scale) {
        const red = data[((y * width + x) * 4)];
        const green = data[((y * width + x) * 4) + 1];
        const blue = data[((y * width + x) * 4) + 2];

        for (let n = 0; n < scale; n++) {
          for (let m = 0; m < scale; m++) {
            if (x + m < width && y + n < height) {
              data[(((y + n) * width + (x + m)) * 4)] = red;
              data[(((y + n) * width + (x + m)) * 4) + 1] = green;
              data[(((y + n) * width + (x + m)) * 4) + 2] = blue;
            }
          }
        }
      }
    }

    ctx.putImageData(imageData, 0, 0);
  };

  return (
    <div className="text-center">
      <canvas ref={canvasRef} className="mx-auto rounded-full"></canvas>
      <h3 className="mt-2 font-semibold">{name}</h3>
      <p className="text-sm">{role}</p>
    </div>
  );
};

export default Member;
