"use client";

import { useCountries, ICountry } from "@/hooks";
import { useEffect } from "react";
import SelectionBox, { type ISelectOption } from "./SelectionBox";

const CountrySelector = ({ onCountrySelect }: { onCountrySelect: (country: ICountry) => void }) => {
  const countries = useCountries();

  // Convert country data into { label, value } format for SelectionBox
  const countryOptions: ISelectOption[] =
    countries.data?.map((country) => ({
      label: `(${country.dial_code}) ${country.name}`,
      value: country.dial_code,
    })) || [];

  const defaultCountry: ICountry = {
    name: "Bangladesh",
    dial_code: "+880",
    code: "BD",
  };

  useEffect(() => {
    onCountrySelect(defaultCountry);
  }, []);

  const handleSelect = (item: ISelectOption) => {
    const selectedCountry = countries.data?.find(
      (c) => c.dial_code === item.value && c.name === item.label
    );
    if (selectedCountry) {
      onCountrySelect(selectedCountry);
    }
  };

  return (
    <SelectionBox
      data={countryOptions}
      onSelect={handleSelect}
      defaultValue={{ label: defaultCountry.name, value: defaultCountry.dial_code }}
    />
  );
};

export default CountrySelector;
