import { Cookie, Shapes, TableRowsSplit } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
type CustomProps = {
  closed: boolean;
};

const SideBar = (props: CustomProps) => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <div
      className={`hidden md:block bg-[#BF9264] pt-[24px] ${
        props.closed ? "w-0" : "w-60 px-[24px]"
      }  transition-all delay-150 duration-300 `}
    >
      <ul className="flex flex-col gap-[16px] text-white">
        <Link
          href="/admin/"
          className={`${
            isActive("/admin") || isActive("/admin/add-product")
              ? "text-[white] font-medium"
              : "text-[#DBDBDB]"
          } flex items-center gap-[8px]`}
        >
          <Cookie />
          Product
        </Link>
        <Link
          href="/admin/category"
          className={`${
            isActive("/admin/category")
              ? "text-[white] font-medium"
              : "text-[#DBDBDB]"
          } flex items-center gap-[8px]`}
        >
          <Shapes />
          Category
        </Link>
        <Link
          href="/admin/type"
          className={`${
            isActive("/admin/type")
              ? "text-[white] font-medium"
              : "text-[#DBDBDB]"
          } flex items-center gap-[8px]`}
        >
          <TableRowsSplit />
          Type
        </Link>
      </ul>
    </div>
  );
};

export default SideBar;
