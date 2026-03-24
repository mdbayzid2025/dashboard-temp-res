import { useState } from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { MoreDotIcon } from "../../icons";
import CountryMap from "./CountryMap";

interface CountryItem {
  flag: string;
  name: string;
  customers: string;
  percentage: number;
}

interface DemographicCardProps {
  title?: string;
  subtitle?: string;
  countries?: CountryItem[];
}

const defaultCountries: CountryItem[] = [
  {
    flag: "./images/country/country-01.svg",
    name: "USA",
    customers: "2,379 Customers",
    percentage: 79,
  },
  {
    flag: "./images/country/country-02.svg",
    name: "France",
    customers: "589 Customers",
    percentage: 23,
  },
];

export default function DemographicCard({
  title = "Customers Demographic",
  subtitle = "Number of customer based on country",
  countries = defaultCountries,
}: DemographicCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-[var(--th-border)] bg-[var(--th-card)] p-5 sm:p-6">
      {/* Header */}
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-semibold text-[var(--th-text)]">
            {title}
          </h3>
          <p className="mt-1 text-[var(--th-text-muted)] text-theme-sm">
            {subtitle}
          </p>
        </div>
        <div className="relative inline-block">
          <button onClick={() => setIsOpen(!isOpen)}>
            <MoreDotIcon className="text-[var(--th-text-muted)] hover:text-[var(--th-text)] size-6" />
          </button>
          <Dropdown isOpen={isOpen} onClose={() => setIsOpen(false)} className="w-40 p-2">
            <DropdownItem
              onItemClick={() => setIsOpen(false)}
              className="flex w-full font-normal text-left text-[var(--th-text-muted)] rounded-lg hover:bg-[var(--th-icon-bg)] hover:text-[var(--th-text)]"
            >
              View More
            </DropdownItem>
            <DropdownItem
              onItemClick={() => setIsOpen(false)}
              className="flex w-full font-normal text-left text-[var(--th-text-muted)] rounded-lg hover:bg-[var(--th-icon-bg)] hover:text-[var(--th-text)]"
            >
              Delete
            </DropdownItem>
          </Dropdown>
        </div>
      </div>

      {/* Map */}
      <div className="px-4 py-6 my-6 overflow-hidden border border-[var(--th-border)] rounded-2xl sm:px-6">
        <div
          id="mapOne"
          className="mapOne map-btn -mx-4 -my-6 h-[212px] w-[252px] 2xsm:w-[307px] xsm:w-[358px] sm:-mx-6 md:w-[668px] lg:w-[634px] xl:w-[393px] 2xl:w-[554px]"
        >
          <CountryMap />
        </div>
      </div>

      {/* Country List */}
      <div className="space-y-5">
        {countries.map((country) => (
          <div key={country.name} className="flex items-center justify-between">
            {/* Flag & Name */}
            <div className="flex items-center gap-3">
              <div className="w-full rounded-full max-w-8">
                <img src={country.flag} alt={country.name} />
              </div>
              <div>
                <p className="font-semibold text-[var(--th-text)] text-theme-sm">
                  {country.name}
                </p>
                <span className="block text-[var(--th-text-muted)] text-theme-xs">
                  {country.customers}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="flex w-full max-w-[140px] items-center gap-3">
              <div className="relative block h-2 w-full max-w-[100px] rounded-sm bg-[var(--th-icon-bg)]">
                <div
                  className="absolute left-0 top-0 h-full rounded-sm bg-brand-500"
                  style={{ width: `${country.percentage}%` }}
                />
              </div>
              <p className="font-medium text-[var(--th-text)] text-theme-sm">
                {country.percentage}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}