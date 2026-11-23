import React from "react";
import Fields from "../Fields";
import { STATUS_OPTIONS } from "../../../utils/apiData";

export const COMMON_STATUS_OPTIONS = STATUS_OPTIONS;

const FilterForm = React.memo(({
    fields = [],
    children,
    cols = 4,
    gap = "gap-12",
    className = "",
    ...props
}) => {
    return (
        <div className={`grid-cols-${cols} ${gap} ${className}`.trim()} {...props}>
            {Array.isArray(fields) && fields.map((field, idx) => {
                if (!field) return null;
                const {
                    type = "select",
                    label,
                    placeholder,
                    options = [],
                    value,
                    onChange,
                    name,
                    id,
                    className: fieldClassName,
                    wrapperClassName,
                    disabled,
                    ...rest
                } = field;

                return (
                    <Fields
                        key={name || id || idx}
                        type={type}
                        name={name}
                        label={label}
                        placeholder={placeholder}
                        options={options}
                        value={value}
                        onChange={onChange}
                        className={fieldClassName}
                        wrapperClassName={wrapperClassName}
                        disabled={disabled}
                        {...rest}
                    />
                );
            })}
            {children}
        </div>
    );
});

FilterForm.displayName = "FilterForm";

export default FilterForm;

