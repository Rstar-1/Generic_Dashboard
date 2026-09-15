import React from "react";
import { NavLink } from "react-router-dom";

const Breadcrumb = React.memo(({ items = [], className = "" }) => {
  if (!items?.length) return null;

  return (
    <nav
      aria-label="breadcrumb"
      className={`flex items-center gap-10 w-full text-white flex-wrap small-text ${className}`}
    >
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          {idx > 0 && <span className="mx-4">&gt;</span>}
          {item.path ? (
            <NavLink to={item.path} className="text-white">
              {item.label}
            </NavLink>
          ) : (
            <span className="text-white font-500">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
});

Breadcrumb.displayName = "Breadcrumb";

export default Breadcrumb;
