// Animation utility functions for Awwwards-style effects

export const easing = {
  // Custom cubic-bezier easing curves
  elastic: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  smooth: 'cubic-bezier(0.23, 1, 0.32, 1)',
  bounce: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
  power2: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  power3: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
  power4: 'cubic-bezier(0.77, 0, 0.175, 1)',
};

export const distance = (
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number => {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

export const lerp = (start: number, end: number, factor: number): number => {
  return start + (end - start) * factor;
};

export const clamp = (value: number, min: number, max: number): number => {
  return Math.max(min, Math.min(max, value));
};

export const map = (
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number => {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};

// Random number between min and max
export const random = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

// Split text into individual characters for animation
export const splitText = (text: string): string[] => {
  return text.split('').map((char) => (char === ' ' ? '\u00A0' : char));
};

// Generate smooth noise for organic animations
export const noise = (x: number, y: number = 0): number => {
  // Simple noise implementation
  const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return n - Math.floor(n);
};

// Elastic ease out function
export const elasticOut = (t: number): number => {
  if (t === 0 || t === 1) return t;
  const p = 0.3;
  const s = p / 4;
  return Math.pow(2, -10 * t) * Math.sin(((t - s) * (2 * Math.PI)) / p) + 1;
};

// Bounce ease out function
export const bounceOut = (t: number): number => {
  if (t < 1 / 2.75) {
    return 7.5625 * t * t;
  } else if (t < 2 / 2.75) {
    return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
  } else if (t < 2.5 / 2.75) {
    return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
  } else {
    return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
  }
};

// Get random point on circle
export const getRandomPointOnCircle = (
  centerX: number,
  centerY: number,
  radius: number
) => {
  const angle = Math.random() * Math.PI * 2;
  return {
    x: centerX + Math.cos(angle) * radius,
    y: centerY + Math.sin(angle) * radius,
  };
};
