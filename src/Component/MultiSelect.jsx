import React, { useState, useRef, useEffect } from "react";

const MultiSelect = ({
    options,
    selectedValues,
    onChange,
    placeholder = "Select options",
    disabled = false,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const safeSelectedValues = Array.isArray(selectedValues)
        ? selectedValues
        : selectedValues
            ? [selectedValues]
            : [];

    const toggleOption = (value) => {
        if (safeSelectedValues.includes(value)) {
            onChange(safeSelectedValues.filter((v) => v !== value));
        } else {
            onChange([...safeSelectedValues, value]);
        }
    };

    console.log("selectedValues:", selectedValues);
    console.log("type:", typeof selectedValues);

    const removeOption = (value) => {
        onChange(selectedValues.filter((v) => v !== value));
    };

    return (
        <div className="relative w-[280px]" ref={dropdownRef}>
            <div
                onClick={() => !disabled && setIsOpen(!isOpen)}
                className={`min-h-[42px] border border-[#C4C4C4] rounded-[8px] px-3 py-2 flex flex-wrap items-center gap-2 ${disabled ? "bg-gray-100 cursor-not-allowed" : "cursor-pointer"
                    }`}
            >
                {selectedValues.length === 0 && (
                    <span className="text-gray-400">{placeholder}</span>
                )}

                {options
                    .filter((opt) => selectedValues.includes(opt.value))
                    .map((item) => (
                        <span
                            key={item.value}
                            className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-sm flex items-center gap-1"
                        >
                            {item.label}
                            {!disabled && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeOption(item.value);
                                    }}
                                    className="text-blue-500 hover:text-red-500"
                                >
                                    ✕
                                </button>
                            )}
                        </span>
                    ))}
            </div>

            {isOpen && !disabled && (
                <div className="absolute mt-2 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
                    {options.map((option) => (
                        <div
                            key={option.value}
                            onClick={() => toggleOption(option.value)}
                            className={`px-4 py-2 cursor-pointer hover:bg-blue-50 ${selectedValues.includes(option.value)
                                    ? "bg-blue-100"
                                    : ""
                                }`}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MultiSelect;