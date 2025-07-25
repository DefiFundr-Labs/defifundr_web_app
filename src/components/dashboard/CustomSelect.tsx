import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { ChevronDown, X } from "lucide-react";
import { CustomSelectProps, Option } from "../../types/types";

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "",
  isMulti = false,
  isSearchable = true,
  isDisabled = false,
  className = "",
  maxMenuHeight = 200,
  noOptionsMessage = "No options available",
  id = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [dropdownPosition, setDropdownPosition] = useState<"bottom" | "top">(
    "bottom"
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Filter options based on search term

  const filteredOptions = useMemo(
    () =>
      options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [options, searchTerm]
  );

  const calculateDropdownPosition = useCallback(() => {
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const spaceBelow = viewportHeight - containerRect.bottom;
    const spaceAbove = containerRect.top;

    // If there's not enough space below but enough space above, flip to top
    if (spaceBelow < maxMenuHeight && spaceAbove > maxMenuHeight) {
      setDropdownPosition("top");
    } else {
      setDropdownPosition("bottom");
    }
  }, [maxMenuHeight]);

  // Update position when dropdown opens
  useEffect(() => {
    if (isOpen) {
      calculateDropdownPosition();

      // Recalculate on window resize or scroll
      const handleResize = () => calculateDropdownPosition();
      const handleScroll = () => calculateDropdownPosition();

      window.addEventListener("resize", handleResize);
      window.addEventListener("scroll", handleScroll, true);

      return () => {
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("scroll", handleScroll, true);
      };
    }
  }, [isOpen, calculateDropdownPosition]);

  // Handle option selection
  const handleOptionSelect = (option: Option) => {
    if (option.disabled) return;

    onChange(option);
    setIsOpen(false);
    setSearchTerm("");
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isDisabled) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setFocusedIndex((prev) =>
            prev < filteredOptions.length - 1 ? prev + 1 : 0
          );
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        if (isOpen) {
          setFocusedIndex((prev) =>
            prev > 0 ? prev - 1 : filteredOptions.length - 1
          );
        }
        break;
      case "Escape":
        setIsOpen(false);
        setSearchTerm(""); // Clear search when pressing Escape
        break;
      default:
        break;
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm(""); // Clear search when closing
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Reset focused index when options change
  useEffect(() => {
    setFocusedIndex(-1);
  }, [filteredOptions]);

  // Check if option is selected
  const isOptionSelected = (option: Option) => {
    if (!value) return false;
    if (isMulti && Array.isArray(value)) {
      return value.some((v) => v.value === option.value);
    }
    return !Array.isArray(value) && value.value === option.value;
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* Main Input Container */}
      <button
        className={`
          focus:outline-none flex items-center px-3.5 py-1 w-full text-[15px] text-gray-300 border rounded-lg h-11 2xs:h-13 border-gray-200 focus:outline-0 focus:ring-0 appearance-none  cursor-pointer relative bg-gray-100 dark:text-gray-300 dark:bg-gray-500 dark:border-gray-400  dark:hover:border-primary-200 hover:border-gray-200 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-70 dark:disabled:bg-gray-500 overflow-hidden
        ${isOpen ? "!border-primary-200 dark:!border-primary-300" : ""}

        `}
        onClick={() => {
          if (!isDisabled) {
            setIsOpen(true);
            inputRef.current?.focus();
          }
        }}
        disabled={isDisabled}
        type="button"
      >
        {/* Selected Values Display */}
        <div className="flex-1 flex flex-wrap gap-1 min-h-[24px] items-center relative cursor-pointer">
          {/* Inline Search Input */}
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => {
              if (isSearchable) {
                setSearchTerm(e.target.value);
                if (!isOpen) setIsOpen(true);
              }
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              if (!isDisabled) {
                setIsOpen(true);
              }
            }}
            placeholder={
              (isMulti && Array.isArray(value) && value.length > 0) || value
                ? ""
                : placeholder
            }
            className={`flex-1 min-w-0 bg-transparent border-none outline-none text-gray-900 placeholder-gray-500 !px-0 ${
              !isOpen ? "cursor-pointer" : ""
            }`}
            disabled={isDisabled || !isSearchable}
            style={{ minWidth: "2px" }}
            id={id}
          />

          {/* Single select value display when not searching */}
          {value && searchTerm === "" && (
            <div className="absolute inset-0 flex items-center gap-2 pointer-events-none text-gray-400 dark:text-gray-200 text-ellipsis">
              {value.icon && value.icon}
              {value.label}
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1">
          <ChevronDown
            size={16}
            className={`text-gray-400 transform transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          ref={menuRef}
          className={`
        absolute z-50 w-full bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden top-full mt-1
        `}
          // ${dropdownPosition === "top" ? "bottom-full mb-1" : "top-full mt-1"}
          style={{ maxHeight: maxMenuHeight }}
        >
          {/* Options List */}
          <div className="max-h-48 overflow-y-auto">
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-2 text-gray-500 text-sm">
                {noOptionsMessage}
              </div>
            ) : (
              filteredOptions.map((option, index) => (
                <div
                  key={option.value}
                  onClick={() => handleOptionSelect(option)}
                  className={`
                    px-3 py-2 cursor-pointer text-sm flex items-center justify-between gap-2
                    ${
                      option.disabled
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-900 hover:bg-gray-100"
                    }
                    ${index === focusedIndex ? "bg-blue-50" : ""}
                    ${
                      isOptionSelected(option) ? "bg-blue-50 text-blue-900" : ""
                    }
                  `}
                >
                  <span className="flex items-center gap-2">
                    {option.icon && option.icon}
                    {option.label}
                  </span>
                  {isOptionSelected(option) && (
                    <span className="text-blue-600">✓</span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
