import React from 'react'

/**
 * LearnPulse Logo — A custom SVG logomark.
 * Combines a stylized open-book silhouette with a pulse/heartbeat line,
 * symbolising learning that's alive and energetic.
 *
 * @param {number} size  — icon dimensions (width & height), default 20
 * @param {string} className — extra Tailwind / CSS classes
 */
const Logo = ({ size = 20, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Open book pages */}
      <path
        d="M20 8C15 8 11 10 8 13V32C11 29 15 27 20 27C25 27 29 29 32 32V13C29 10 25 8 20 8Z"
        fill="white"
        fillOpacity="0.15"
      />
      <path
        d="M8 13C11 10 15 8 20 8V27C15 27 11 29 8 32V13Z"
        fill="white"
        fillOpacity="0.3"
      />
      <path
        d="M32 13C29 10 25 8 20 8V27C25 27 29 29 32 32V13Z"
        fill="white"
        fillOpacity="0.2"
      />

      {/* Spine / centre line */}
      <line x1="20" y1="8" x2="20" y2="27" stroke="white" strokeWidth="1.2" strokeOpacity="0.5" />

      {/* Pulse / heartbeat wave across the book */}
      <polyline
        points="6,20 12,20 14,14 17,26 20,16 23,24 26,18 28,20 34,20"
        fill="none"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Small dot accents */}
      <circle cx="6" cy="20" r="1.5" fill="white" fillOpacity="0.6" />
      <circle cx="34" cy="20" r="1.5" fill="white" fillOpacity="0.6" />
    </svg>
  )
}

export default Logo
