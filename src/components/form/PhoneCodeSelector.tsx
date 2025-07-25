import { FC } from "react";

type Country = {
  name: string;
  code: string;
  flag: string; // Emoji or SVG src
};

interface PhoneCodeSelectorProps {
  value: string;
  onChange: (code: string) => void;
}

const countries: Country[] = [
  { name: "Nigeria", code: "+234", flag: "🇳🇬" },
  { name: "United States", code: "+1", flag: "🇺🇸" },
  { name: "United Kingdom", code: "+44", flag: "🇬🇧" },
  { name: "India", code: "+91", flag: "🇮🇳" },
  // Add more countries here
];

export const PhoneCodeSelector: FC<PhoneCodeSelectorProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="relative h-full w-30 form-control">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className=""
      >
        {countries.map((country) => (
          <option key={country.code} value={country.code}>
            <div className="overflow-hidden bg-red-200 rounded-full size-3">
              {country.flag}
            </div>
            {country.code}
          </option>
        ))}
      </select>
    </div>
  );
};
