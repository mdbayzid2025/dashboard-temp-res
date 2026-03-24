import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import Badge from "../../ui/badge/Badge";

interface Order {
  id: number;
  user: {
    image: string;
    name: string;
    role: string;
  };
  projectName: string;
  team: {
    images: string[];
  };
  status: string;
  budget: string;
}

const tableData: Order[] = [
  {
    id: 1,
    user: { image: "/images/user/user-17.jpg", name: "Lindsey Curtis", role: "Web Designer" },
    projectName: "Agency Website",
    team: { images: ["/images/user/user-22.jpg", "/images/user/user-23.jpg", "/images/user/user-24.jpg"] },
    budget: "3.9K",
    status: "Active",
  },
  {
    id: 2,
    user: { image: "/images/user/user-18.jpg", name: "Kaiya George", role: "Project Manager" },
    projectName: "Technology",
    team: { images: ["/images/user/user-25.jpg", "/images/user/user-26.jpg"] },
    budget: "24.9K",
    status: "Pending",
  },
  {
    id: 3,
    user: { image: "/images/user/user-17.jpg", name: "Zain Geidt", role: "Content Writing" },
    projectName: "Blog Writing",
    team: { images: ["/images/user/user-27.jpg"] },
    budget: "12.7K",
    status: "Active",
  },
  {
    id: 4,
    user: { image: "/images/user/user-20.jpg", name: "Abram Schleifer", role: "Digital Marketer" },
    projectName: "Social Media",
    team: { images: ["/images/user/user-28.jpg", "/images/user/user-29.jpg", "/images/user/user-30.jpg"] },
    budget: "2.8K",
    status: "Cancel",
  },
  {
    id: 5,
    user: { image: "/images/user/user-21.jpg", name: "Carla George", role: "Front-end Developer" },
    projectName: "Website",
    team: { images: ["/images/user/user-31.jpg", "/images/user/user-32.jpg", "/images/user/user-33.jpg"] },
    budget: "4.5K",
    status: "Active",
  },
];

type SortField = "name" | "projectName" | "budget" | "status" | "";
type SortDir = "asc" | "desc";

const STATUS_OPTIONS = ["All", "Active", "Pending", "Cancel"];

// Parse budget strings like "3.9K", "24.9K" to numbers for sorting
const parseBudget = (b: string) => parseFloat(b.replace("K", "")) * 1000;

export default function BasicTableOne() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortField, setSortField] = useState<SortField>("");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const processed = useMemo(() => {
    let data = [...tableData];

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter(
        (o) =>
          o.user.name.toLowerCase().includes(q) ||
          o.user.role.toLowerCase().includes(q) ||
          o.projectName.toLowerCase().includes(q) ||
          o.status.toLowerCase().includes(q)
      );
    }

    // Status filter
    if (statusFilter !== "All") {
      data = data.filter((o) => o.status === statusFilter);
    }

    // Sort
    if (sortField) {
      data.sort((a, b) => {
        let valA: string | number = "";
        let valB: string | number = "";
        if (sortField === "name") { valA = a.user.name; valB = b.user.name; }
        if (sortField === "projectName") { valA = a.projectName; valB = b.projectName; }
        if (sortField === "status") { valA = a.status; valB = b.status; }
        if (sortField === "budget") { valA = parseBudget(a.budget); valB = parseBudget(b.budget); }
        if (typeof valA === "number" && typeof valB === "number") {
          return sortDir === "asc" ? valA - valB : valB - valA;
        }
        return sortDir === "asc"
          ? String(valA).localeCompare(String(valB))
          : String(valB).localeCompare(String(valA));
      });
    }

    return data;
  }, [search, statusFilter, sortField, sortDir]);

  const SortIcon = ({ field }: { field: SortField }) => (
    <span className="inline-flex flex-col ml-1 gap-[2px]">
      <svg
        className={`w-2.5 h-2.5 transition-colors ${sortField === field && sortDir === "asc" ? "text-brand-500" : "text-th-text-muted/40"}`}
        viewBox="0 0 10 6" fill="currentColor"
      >
        <path d="M5 0L10 6H0L5 0Z" />
      </svg>
      <svg
        className={`w-2.5 h-2.5 transition-colors ${sortField === field && sortDir === "desc" ? "text-brand-500" : "text-th-text-muted/40"}`}
        viewBox="0 0 10 6" fill="currentColor"
      >
        <path d="M5 6L0 0H10L5 6Z" />
      </svg>
    </span>
  );

  return (
    <div className="overflow-hidden rounded-xl border border-th-border bg-th-card">

      {/* ── Toolbar ── */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 px-5 py-4 border-b border-th-border">

        {/* Search */}
        <div className="relative flex-1">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-th-text-muted"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by name, role, project..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-4 text-theme-sm rounded-lg border border-th-border bg-th-background text-th-text placeholder:text-th-text-muted focus:outline-none focus:border-brand-500 transition-colors"
          />
        </div>

        {/* Status Filter */}
        <div className="relative shrink-0 ">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="appearance-none pl-3 pr-8 py-4 w-[200px] text-theme-sm rounded-lg border border-th-border bg-th-background text-th-text focus:outline-none focus:border-brand-500 transition-colors cursor-pointer"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{s === "All" ? "All Status" : s}</option>
            ))}
          </select>
          <svg className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-th-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>       
      </div>

      {/* ── Table ── */}
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-th-border">
            <TableRow>
              {/* Sortable: User */}
              <TableCell isHeader className="px-5 py-3 text-start">
                <button
                  onClick={() => handleSort("name")}
                  className="inline-flex items-center font-medium text-th-text-muted text-theme-xs hover:text-th-text transition-colors"
                >
                  User <SortIcon field="name" />
                </button>
              </TableCell>

              {/* Sortable: Project */}
              <TableCell isHeader className="px-4 py-3 text-start">
                <button
                  onClick={() => handleSort("projectName")}
                  className="inline-flex items-center font-medium text-th-text-muted text-theme-xs hover:text-th-text transition-colors"
                >
                  Project Name <SortIcon field="projectName" />
                </button>
              </TableCell>

              {/* Non-sortable: Team */}
              <TableCell isHeader className="px-4 py-3 font-medium text-th-text-muted text-start text-theme-xs">
                Team
              </TableCell>

              {/* Sortable: Status */}
              <TableCell isHeader className="px-4 py-3 text-start">
                <button
                  onClick={() => handleSort("status")}
                  className="inline-flex items-center font-medium text-th-text-muted text-theme-xs hover:text-th-text transition-colors"
                >
                  Status <SortIcon field="status" />
                </button>
              </TableCell>

              {/* Sortable: Budget */}
              <TableCell isHeader className="px-4 py-3 text-start">
                <button
                  onClick={() => handleSort("budget")}
                  className="inline-flex items-center font-medium text-th-text-muted text-theme-xs hover:text-th-text transition-colors"
                >
                  Budget <SortIcon field="budget" />
                </button>
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-th-border">
            {processed.length === 0 ? (
              <TableRow>
                <TableCell className="px-5 py-10 text-center text-th-text-muted text-theme-sm" colSpan={5}>
                  No results found. Try adjusting your search or filters.
                </TableCell>
              </TableRow>
            ) : (
              processed.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 overflow-hidden rounded-full">
                        <img width={40} height={40} src={order.user.image} alt={order.user.name} />
                      </div>
                      <div>
                        <span className="block font-medium text-th-text text-theme-sm">{order.user.name}</span>
                        <span className="block text-th-text-muted text-theme-xs">{order.user.role}</span>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="px-4 py-3 text-th-text-muted text-start text-theme-sm">
                    {order.projectName}
                  </TableCell>

                  <TableCell className="px-4 py-3 text-start">
                    <div className="flex -space-x-2">
                      {order.team.images.map((img, i) => (
                        <div key={i} className="w-6 h-6 overflow-hidden border-2 border-th-card rounded-full">
                          <img width={24} height={24} src={img} alt={`Team member ${i + 1}`} className="size-6" />
                        </div>
                      ))}
                    </div>
                  </TableCell>

                  <TableCell className="px-4 py-3 text-start">
                    <Badge
                      size="sm"
                      color={
                        order.status === "Active" ? "success"
                        : order.status === "Pending" ? "warning"
                        : "error"
                      }
                    >
                      {order.status}
                    </Badge>
                  </TableCell>

                  <TableCell className="px-4 py-3 text-th-text-muted text-theme-sm">
                    {order.budget}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}