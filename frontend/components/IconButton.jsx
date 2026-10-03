import React from 'react';

/**
 * Helper to ensure icon / SVG elements have aria-hidden="true" and focusable="false"
 */
function makeDecorativeIcon(element) {
  if (!React.isValidElement(element)) {
    return element;
  }

  return React.cloneElement(element, {
    ...element.props,
    'aria-hidden': 'true',
    focusable: 'false',
  });
}

/**
 * IconButton component with WCAG 2.2 Level A accessibility compliance.
 *
 * @param {Object} props
 * @param {React.ReactNode} [props.icon] - Icon element or component
 * @param {React.ReactNode} [props.children] - Child elements (e.g. SVG icon)
 * @param {string} [props.aria-label] - Accessible label for the button
 * @param {string} [props.ariaLabel] - Alternative accessible label prop
 * @param {string} [props.label] - Alternative label prop
 * @param {string} [props.type='button'] - Button type
 */
export function IconButton({
  icon,
  children,
  'aria-label': ariaLabelProp,
  ariaLabel,
  label,
  type = 'button',
  ...props
}) {
  const accessibleLabel = ariaLabelProp || ariaLabel || label || '';

  let renderedIcon = null;

  if (icon) {
    if (React.isValidElement(icon)) {
      renderedIcon = makeDecorativeIcon(icon);
    } else if (typeof icon === 'function') {
      const IconComponent = icon;
      renderedIcon = <IconComponent aria-hidden="true" focusable="false" />;
    } else {
      renderedIcon = icon;
    }
  } else if (children) {
    renderedIcon = React.Children.map(children, (child) => makeDecorativeIcon(child));
  }

  return (
    <button
      type={type}
      aria-label={accessibleLabel}
      {...props}
    >
      {renderedIcon}
    </button>
  );
}

export default IconButton;
