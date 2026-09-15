import React, { useState, useCallback } from "react";

const AccordionItem = React.memo(
  ({ id, idx, item, isOpen, onToggle, itemClassName = "" }) => {
    const title = item.title || item.question || "";
    const content = item.content || item.answer || "";
    const numStr = String(idx + 1).padStart(2, "0");

    return (
      <div className={`bordb transition-all py-20 ${itemClassName}`}>
        <div
          className="flex items-start gap-24 cursor-pointer"
          onClick={() => onToggle(id)}
        >
          {/* Number Circle */}
          <p
            className="flex items-center justify-center rounded-full font-500 mini-text text-dark flex-shrink-0"
            style={{
              width: "46px",
              height: "46px",
              border: "1px solid #d1d5db",
              transition: "border-color 0.3s ease",
            }}
          >
            {numStr}
          </p>

          {/* Content Column */}
          <div className="flex-1" style={{ paddingTop: "10px" }}>
            <div className="flex justify-between items-center gap-16">
              <h3 className="text-dark mid-text font-500">{title}</h3>
              <span
                style={{
                  fontSize: isOpen ? "28px" : "22px",
                  fontWeight: "400",
                  lineHeight: "1",
                  color: isOpen ? "var(--warningtext)" : "var(--dark)",
                  userSelect: "none",
                  transition: "color 0.2s ease",
                  display: "inline-block",
                  transform: isOpen ? "translateY(-2px)" : "none",
                }}
              >
                {isOpen ? "−" : "+"}
              </span>
            </div>

            {/* Collapsible Content */}
            <div
              style={{
                maxHeight: isOpen ? "300px" : "0px",
                opacity: isOpen ? 1 : 0,
                overflow: "hidden",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <p className="font-400 small-text text-gray mt-8">{content}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

AccordionItem.displayName = "AccordionItem";

const Accordion = React.memo(
  ({
    items = [],
    allowMultiple = false,
    className = "",
    itemClassName = "",
  }) => {
    const [openState, setOpenState] = useState(allowMultiple ? [] : null);

    const toggleItem = useCallback(
      (id) => {
        if (allowMultiple) {
          setOpenState((prev) =>
            prev.includes(id)
              ? prev.filter((itemId) => itemId !== id)
              : [...prev, id]
          );
        } else {
          setOpenState((prev) => (prev === id ? null : id));
        }
      },
      [allowMultiple]
    );

    const isItemOpen = useCallback(
      (id) => {
        if (allowMultiple) {
          return openState.includes(id);
        }
        return openState === id;
      },
      [allowMultiple, openState]
    );

    return (
      <div className={`grid-cols-1 ${className}`}>
        {items.map((item, idx) => {
          const id = item.id !== undefined ? item.id : idx;
          return (
            <AccordionItem
              key={id}
              id={id}
              idx={idx}
              item={item}
              isOpen={isItemOpen(id)}
              onToggle={toggleItem}
              itemClassName={itemClassName}
            />
          );
        })}
      </div>
    );
  }
);

Accordion.displayName = "Accordion";

export default Accordion;
