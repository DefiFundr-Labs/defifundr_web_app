import { useEffect, useMemo } from "react";
import { CustomSelectProps, Option } from "../../../types/types";
import Flag from "react-world-flags";
import { countries } from "countries-list";
import CustomSelect from "../CustomSelect";

interface CountrySelect extends Omit<CustomSelectProps, "options"> {
  defaultCountry?: string;
}

const CountrySelect = ({
  defaultCountry = "NG",
  onChange,
  ...defaultProps
}: CountrySelect) => {
  const countryOptions: Option[] = useMemo(
    () =>
      Object.entries(countries).map(([code, { name }]) => ({
        label: name,
        value: code,
        icon: (
          <Flag code={code} className="object-cover w-5 h-5 rounded-full" />
        ),
      })),
    []
  );

  useEffect(() => {
    onChange(
      countryOptions.find((opt) => opt.value === defaultCountry) || null
    );
  }, [defaultCountry]);

  return (
    <CustomSelect
      options={countryOptions}
      onChange={onChange}
      {...defaultProps}
    />
  );
};

export default CountrySelect;
