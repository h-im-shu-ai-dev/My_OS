import React from 'react';

/**
 * Image component with WCAG 2.2 Level A accessibility compliance.
 *
 * @param {Object} props
 * @param {string} [props.src] - Source URL of the image
 * @param {string} [props.alt] - Alternative text description for informative images
 * @param {boolean} [props.isDecorative=false] - Indicates whether the image is decorative
 */
export function Image({ src, alt = '', isDecorative = false, ...props }) {
  if (isDecorative) {
    return (
      <img
        src={src}
        alt=""
        aria-hidden="true"
        {...props}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      {...props}
    />
  );
}

export default Image;
