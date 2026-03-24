import {
  ArrowDownIcon,
  ArrowUpIcon,
  BoxIconLine,
  GroupIcon,
} from "../../icons";
import Badge from "../ui/badge/Badge";

interface MetricItem {
  id: number;
  icon: React.ReactNode;
  label: string;
  value: string;
  badge: {
    color: "success" | "error" | "warning" | "info";
    icon: React.ReactNode;
    text: string;
  };
}

const metrics: MetricItem[] = [
  {
    id: 1,
    icon: <GroupIcon className="text-[var(--th-text)] size-6" />,
    label: "Customers",
    value: "3,782",
    badge: { color: "success", icon: <ArrowUpIcon />, text: "11.01%" },
  },
  {
    id: 2,
    icon: <BoxIconLine className="text-[var(--th-text)] size-6" />,
    label: "Orders",
    value: "5,359",
    badge: { color: "error", icon: <ArrowDownIcon />, text: "9.05%" },
  },
];

export default function EcommerceMetrics() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      {metrics.map((metric) => (
        <div
          key={metric.id}
          className="rounded-2xl border border-[var(--th-border)] bg-[var(--th-card)] p-5 md:p-6"
        >
          <div className="flex items-center justify-center w-12 h-12 bg-[var(--th-icon-bg)] rounded-xl">
            {metric.icon}
          </div>

          <div className="flex items-end justify-between mt-5">
            <div>
              <span className="text-sm text-[var(--th-text-muted)]">
                {metric.label}
              </span>
              <h4 className="mt-2 font-bold text-[var(--th-text)] text-title-sm">
                {metric.value}
              </h4>
            </div>
            <Badge color={metric.badge.color}>
              {metric.badge.icon}
              {metric.badge.text}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  );
}