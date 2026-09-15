import Button from "./Button";

const BTN_STYLE = {
  width: "28px", height: "28px",
  border: "1px solid #ececec", display: "flex", alignItems: "center",
  justifyContent: "center", transition: "all 0.2s ease", borderRadius: "4px"
};

const Pagination = ({ page, totalItems, itemsPerPage, onPageChange, itemName = "items" }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startItem = totalItems === 0 ? 0 : (page - 1) * itemsPerPage + 1;
  const endItem = Math.min(page * itemsPerPage, totalItems);

  if (totalItems === 0) return null;

  const go = (pNum) => pNum >= 1 && pNum <= totalPages && pNum !== page && onPageChange(pNum);

  const NavBtn = ({ target, label, title, disabled }) => (
    <Button
      version="icon"
      bg="forth"
      color="gray"
      text={label}
      title={title}
      disabled={disabled}
      onClick={() => go(target)}
      style={{ ...BTN_STYLE, opacity: disabled ? 0.4 : 1, cursor: disabled ? "not-allowed" : "pointer" }}
    />
  );

  return (
    <div className="bg-white border-tertiary mt-4 w-full rounded-5">
      <div className="flex items-center justify-between p-10">
        <p className="text-gray mini-text">
          Showing {startItem} to {endItem} of {totalItems} {itemName}
        </p>
        <div className="flex items-center gap-4">
          <NavBtn target={1} label="«" title="First Page" disabled={page === 1} />
          <NavBtn target={page - 1} label="<" title="Previous Page" disabled={page === 1} />

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pNum) => {
            if (totalPages > 5 && Math.abs(pNum - page) > 2) {
              return (pNum === 1 || pNum === totalPages)
                ? <span key={pNum} className="text-gray px-4" style={{ fontSize: "0.775rem" }}>...</span>
                : null;
            }
            const active = page === pNum;
            return (
              <Button
                key={pNum}
                version="icon"
                bg={active ? "primary" : "white"}
                color={active ? "white" : "gray"}
                text={String(pNum)}
                onClick={() => go(pNum)}
                style={{
                  ...BTN_STYLE,
                  color: active ? "#ffffff" : "var(--gray)",
                }}
              />
            );
          })}

          <NavBtn target={page + 1} label=">" title="Next Page" disabled={page === totalPages} />
          <NavBtn target={totalPages} label="»" title="Last Page" disabled={page === totalPages} />
        </div>
      </div>
    </div>
  );
};

export default Pagination;

