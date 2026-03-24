import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { MoreDotIcon } from "../../icons";
import { useState } from "react";

interface SalesChartProps {
  title?: string;
  color?: string;
  series?: { name: string; data: number[] }[];
  categories?: string[];
}

const defaultCategories = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const defaultSeries = [
  {
    name: "Sales",
    data: [168, 385, 201, 298, 187, 195, 291, 110, 215, 390, 280, 112],
  },
];

export default function MonthlySalesChart({
  title = "Monthly Sales",
  color = "#465fff",
  series = defaultSeries,
  categories = defaultCategories,
}: SalesChartProps) {
  const [isOpen, setIsOpen] = useState(false);

  const options: ApexOptions = {
    colors: [color],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      height: 180,
      toolbar: { show: false },
      background: "transparent",
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "39%",
        borderRadius: 5,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: { enabled: false },
    stroke: {
      show: true,
      width: 4,
      colors: ["transparent"],
    },
    xaxis: {
      categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: { colors: "var(--th-text-muted)" },
      },
    },
    yaxis: {
      title: { text: undefined },
      labels: {
        style: { colors: "var(--th-text-muted)" },
      },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Outfit",
      labels: {
        colors: "var(--th-text-muted)",
      },
    },
    grid: {
      borderColor: "var(--th-border)",
      yaxis: { lines: { show: true } },
    },
    fill: { opacity: 1 },
    tooltip: {
      x: { show: false },
      y: { formatter: (val: number) => `${val}` },
    },
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--th-border)] bg-[var(--th-card)] px-5 pt-5 sm:px-6 sm:pt-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[var(--th-text)]">
          {title}
        </h3>
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

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="-ml-5 min-w-[650px] xl:min-w-full pl-2">
          <Chart options={options} series={series} type="bar" height={180} />
        </div>
      </div>
    </div>
  );
}