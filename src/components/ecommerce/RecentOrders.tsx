import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";

interface Product {
  id: number;
  name: string;
  variants: string;
  category: string;
  price: string;
  image: string;
  status: "Delivered" | "Pending" | "Canceled";
}

interface RecentOrdersProps {
  title?: string;
  products?: Product[];
  onFilter?: () => void;
  onSeeAll?: () => void;
}

const tableData: Product[] = [
  {
    id: 1,
    name: "MacBook Pro 13",
    variants: "2 Variants",
    category: "Laptop",
    price: "$2399.00",
    status: "Delivered",
    image: "/images/product/product-01.jpg",
  },
  {
    id: 2,
    name: "Apple Watch Ultra",
    variants: "1 Variant",
    category: "Watch",
    price: "$879.00",
    status: "Pending",
    image: "/images/product/product-02.jpg",
  },
  {
    id: 3,
    name: "iPhone 15 Pro Max",
    variants: "2 Variants",
    category: "SmartPhone",
    price: "$1869.00",
    status: "Delivered",
    image: "/images/product/product-03.jpg",
  },
  {
    id: 4,
    name: "iPad Pro 3rd Gen",
    variants: "2 Variants",
    category: "Electronics",
    price: "$1699.00",
    status: "Canceled",
    image: "/images/product/product-04.jpg",
  },
  {
    id: 5,
    name: "AirPods Pro 2nd Gen",
    variants: "1 Variant",
    category: "Accessories",
    price: "$240.00",
    status: "Delivered",
    image: "/images/product/product-05.jpg",
  },
];

const headers = ["Products", "Category", "Price", "Status"];

const FilterIcon = () => (
  <svg
    className="stroke-current fill-[var(--th-card)]"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M2.29004 5.90393H17.7067" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M17.7075 14.0961H2.29085" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12.0826 3.33331C13.5024 3.33331 14.6534 4.48431 14.6534 5.90414C14.6534 7.32398 13.5024 8.47498 12.0826 8.47498C10.6627 8.47498 9.51172 7.32398 9.51172 5.90415C9.51172 4.48432 10.6627 3.33331 12.0826 3.33331Z" fill="" stroke="" strokeWidth="1.5" />
    <path d="M7.91745 11.525C6.49762 11.525 5.34662 12.676 5.34662 14.0959C5.34661 15.5157 6.49762 16.6667 7.91745 16.6667C9.33728 16.6667 10.4883 15.5157 10.4883 14.0959C10.4883 12.676 9.33728 11.525 7.91745 11.525Z" fill="" stroke="" strokeWidth="1.5" />
  </svg>
);

export default function RecentOrders({
  title = "Recent Orders",
  products = tableData,
  onFilter,
  onSeeAll,
}: RecentOrdersProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--th-border)] bg-[var(--th-card)] px-4 pb-3 pt-4 sm:px-6">
      {/* Header */}
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-lg font-semibold text-[var(--th-text)]">
          {title}
        </h3>

        <div className="flex items-center gap-3">
          <button
            onClick={onFilter}
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--th-border)] bg-[var(--th-card)] px-4 py-2.5 text-theme-sm font-medium text-[var(--th-text-muted)] shadow-theme-xs hover:bg-[var(--th-icon-bg)] hover:text-[var(--th-text)]"
          >
            <FilterIcon />
            Filter
          </button>
          <button
            onClick={onSeeAll}
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--th-border)] bg-[var(--th-card)] px-4 py-2.5 text-theme-sm font-medium text-[var(--th-text-muted)] shadow-theme-xs hover:bg-[var(--th-icon-bg)] hover:text-[var(--th-text)]"
          >
            See all
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-[var(--th-border)] border-y">
            <TableRow>
              {headers.map((heading) => (
                <TableCell
                  key={heading}
                  isHeader
                  className="py-3 font-medium text-[var(--th-text-muted)] text-start text-theme-xs"
                >
                  {heading}
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-[var(--th-border)]">
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-[50px] w-[50px] overflow-hidden rounded-md">
                      <img
                        src={product.image}
                        className="h-[50px] w-[50px]"
                        alt={product.name}
                      />
                    </div>
                    <div>
                      <p className="font-medium text-[var(--th-text)] text-theme-sm">
                        {product.name}
                      </p>
                      <span className="text-[var(--th-text-muted)] text-theme-xs">
                        {product.variants}
                      </span>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="py-3 text-[var(--th-text-muted)] text-theme-sm">
                  {product.category}
                </TableCell>

                <TableCell className="py-3 text-[var(--th-text-muted)] text-theme-sm">
                  {product.price}
                </TableCell>

                <TableCell className="py-3">
                  <Badge
                    size="sm"
                    color={
                      product.status === "Delivered" ? "success"
                      : product.status === "Pending" ? "warning"
                      : "error"
                    }
                  >
                    {product.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}