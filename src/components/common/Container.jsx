import React from 'react';

const VERSION_CLASSES = {
  v0: "w-full",
  v1: "container mx-auto",
  v2: "container2",
  v3: "container3 mx-auto",
  v4: "p-10",
};

const Container = React.memo(
  React.forwardRef(
    (
      {
        children,
        version = "v2",
        className = "",
        style = {},
        as: Component = "section",
        ...props
      },
      ref
    ) => {
      const containerClass = VERSION_CLASSES[version] || "w-full";
      const hasBgInStyle = Boolean(style?.background || style?.backgroundImage);
      const hasHeightInStyle = Boolean(style?.height);

      const innerStyle = (hasBgInStyle || hasHeightInStyle)
        ? {
            ...(hasBgInStyle ? { background: "transparent" } : {}),
            ...(hasHeightInStyle ? { height: "100%" } : {}),
          }
        : undefined;

      return (
        <Component ref={ref} style={style} {...props}>
          <div className={`${containerClass} ${className}`} style={innerStyle}>{children}</div>
        </Component>
      );
    }
  )
);

Container.displayName = "Container";

export default Container;
