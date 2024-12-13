// ./kernel.js

// ./kernel.js

// a kernel here indicates a function GPU
export const kernelFunction = function (width, height, hue) {

  // Flattening the index
  const i = this.thread.x; 

  // computing y and x positions based on the flattened index
  const y = Math.floor(i / (width * 4));
  const x = Math.floor((i / 4) % width);

  // computing the channel when 0 = Red, 1 = Green, 2 = Blue, 3 = Alpha
  const channel = i % 4;

  // Normalizing x and y positions to [0, 1]
  const normalizedX = x / width;
  const normalizedY = y / height;

  // Computing the RGB values based on positions and hue
  let r, g, b;

  // Gradient
  const colorValue = (normalizedX + normalizedY) / 2; 

  // hue (0-1) to RGB color
  if (hue < 0.33) {
    // Red to Green gradient
    r = 1 - hue * 3;
    g = hue * 3;
    b = 0;
  } else if (hue < 0.66) {
    // Green to Blue gradient
    r = 0;
    g = 1 - (hue - 0.33) * 3;
    b = (hue - 0.33) * 3;
  } else {
    // Blue to Red gradient
    r = (hue - 0.66) * 3;
    g = 0;
    b = 1 - (hue - 0.66) * 3;
  }

  // Adjusting RGB values based on gradient intensity
  r *= colorValue;
  g *= colorValue;
  b *= colorValue;

  // conditional check for the the appropriate channel value
  switch (channel) {
    case 0:
      // Red
      return Math.floor(r * 255); 
    case 1:
      // Green
      return Math.floor(g * 255); 
    case 2:
      // Blue
      return Math.floor(b * 255); 
    case 3:
      // full opaque
      return 255; 
  }
};

