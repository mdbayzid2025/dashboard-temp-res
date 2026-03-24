import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useState } from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { MoreDotIcon } from "../../icons";

interface StatItem {
  label: string;
  value: string;
  trend: "up" | "down";
}

interface MonthlyTargetProps {
  title?: string;
  subtitle?: string;
  progress?: number;
  badgeText?: string;
  description?: string;
  stats?: StatItem[];
}

const ArrowUp = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.60141 2.33683C7.73885 2.18084 7.9401 2.08243 8.16435 2.08243C8.16475 2.08243 8.16516 2.08243 8.16556 2.08243C8.35773 2.08219 8.54998 2.15535 8.69664 2.30191L12.6968 6.29924C12.9898 6.59203 12.9899 7.0669 12.6971 7.3599C12.4044 7.6529 11.9295 7.65306 11.6365 7.36027L8.91435 4.64004L8.91435 13.5C8.91435 13.9142 8.57856 14.25 8.16435 14.25C7.75013 14.25 7.41435 13.9142 7.41435 13.5L7.41435 4.64442L4.69679 7.36025C4.4038 7.65305 3.92893 7.6529 3.63613 7.35992C3.34333 7.06693 3.34348 6.59206 3.63646 6.29926L7.60141 2.33683Z"
      fill="#039855"
    />
  </svg>
);

const ArrowDown = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.26816 13.6632C7.4056 13.8192 7.60686 13.9176 7.8311 13.9176C7.83148 13.9176 7.83187 13.9176 7.83226 13.9176C8.02445 13.9178 8.21671 13.8447 8.36339 13.6981L12.3635 9.70076C12.6565 9.40797 12.6567 8.9331 12.3639 8.6401C12.0711 8.34711 11.5962 8.34694 11.3032 8.63973L8.5811 11.36L8.5811 2.5C8.5811 2.08579 8.24531 1.75 7.8311 1.75C7.41688 1.75 7.0811 2.08579 7.0811 2.5L7.0811 11.3556L4.36354 8.63975C4.07055 8.34695 3.59568 8.3471 3.30288 8.64009C3.01008 8.93307 3.01023 9.40794 3.30321 9.70075L7.26816 13.6632Z"
      fill="#D92D20"
    />
  </svg>
);

const defaultStats: StatItem[] = [
  { label: "Target", value: "$20K", trend: "down" },
  { label: "Revenue", value: "$20K", trend: "up" },
  { label: "Today", value: "$20K", trend: "up" },
];

export default function MonthlyTarget({
  title = "Monthly Target",
  subtitle = "Target you've set for each month",
  progress = 75.55,
  badgeText = "+10%",
  description = "You earn $3287 today, it's higher than last month. Keep up your good work!",
  stats = defaultStats,
}: MonthlyTargetProps) {
  const [isOpen, setIsOpen] = useState(false);

  const options: ApexOptions = {
    colors: ["#465FFF"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "radialBar",
      height: 330,
      sparkline: { enabled: true },
      background: "transparent",
    },
    plotOptions: {
      radialBar: {
        startAngle: -85,
        endAngle: 85,
        hollow: { size: "80%" },
        track: {
          background: "var(--th-border)",
          strokeWidth: "100%",
          margin: 5,
        },
        dataLabels: {
          name: { show: false },
          value: {
            fontSize: "36px",
            fontWeight: "600",
            offsetY: -40,
            color: "var(--th-text)",
            formatter: (val) => val + "%",
          },
        },
      },
    },
    fill: {
      type: "solid",
      colors: ["#465FFF"],
    },
    stroke: { lineCap: "round" },
    labels: ["Progress"],
  };

  return (
    <div className="rounded-2xl border border-[var(--th-border)] bg-[var(--th-icon-bg)]">
      {/* Card Top */}
      <div className="px-5 pt-5 bg-[var(--th-card)] shadow-default rounded-2xl pb-11 sm:px-6 sm:pt-6">
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

        {/* Chart */}
        <div className="relative">
          <div className="max-h-[330px]">
            <Chart options={options} series={[progress]} type="radialBar" height={330} />
          </div>
          <span className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-[95%] rounded-full bg-success-50 px-3 py-1 text-xs font-medium text-success-600 dark:bg-success-500/15 dark:text-success-500">
            {badgeText}
          </span>
        </div>

        {/* Description */}
        <p className="mx-auto mt-10 w-full max-w-[380px] text-center text-sm text-[var(--th-text-muted)] sm:text-base">
          {description}
        </p>
      </div>

      {/* Stats Footer */}
      <div className="flex items-center justify-center gap-5 px-6 py-3.5 sm:gap-8 sm:py-5">
        {stats.map((stat, index) => (
          <>
            {index > 0 && (
              <div
                key={`divider-${index}`}
                className="w-px h-7 bg-[var(--th-border)]"
              />
            )}
            <div key={stat.label}>
              <p className="mb-1 text-center text-[var(--th-text-muted)] text-theme-xs sm:text-sm">
                {stat.label}
              </p>
              <p className="flex items-center justify-center gap-1 text-base font-semibold text-[var(--th-text)] sm:text-lg">
                {stat.value}
                {stat.trend === "up" ? <ArrowUp /> : <ArrowDown />}
              </p>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}