import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useSidebarStore from "@/store/sidebar-store";
import { Moon, Sun } from "lucide-react";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = ({ menus }: { menus: Menus }) => {
  const { setTheme } = useTheme();
  const pathname = usePathname();
  const { isSidebarOpen } = useSidebarStore();
  return (
    <aside
      className={`absolute top-0 left-0 h-screen z-10 md:static flex flex-col p-4 gap-y-6 min-w-52 text-black bg-white shadow-md border border-white dark:border-slate-900 dark:bg-slate-900 dark:text-white ${
        !isSidebarOpen ? "hidden" : "visible"
      } `}
    >
      <div
        className={
          "flex items-center gap-x-3 p-2 border-[1px] border-black rounded-md"
        }
      >
        <Image
          className="object-cover rounded-full"
          src={"/avatars/me.jpg"}
          alt="profile_picture"
          width={50}
          height={50}
        />
        <div>
          <h3 className="font-bold text-sm">John Doe</h3>
          <h4 className="font-semibold text-xs">System Administrator</h4>
        </div>
      </div>
      <nav className="flex flex-col gap-y-1">
        {menus.map((item, index) => (
          <div key={index}>
            <h2 className="text-lg font-semibold tracking-tight">
              {item.title}
            </h2>
            <ul className="flex flex-col gap-y-1 list-none">
              {item.menus?.map((menu, index) => (
                <Link
                  key={index}
                  href={menu.link}
                  style={{ textDecoration: "none" }}
                >
                  <li
                    className={`flex items-center gap-x-3 p-2 rounded-md hover:bg-slate-200 text-sm ${
                      menu.link.includes(pathname) && "bg-slate-200"
                    }`}
                  >
                    {menu.icon}
                    {menu.label}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        ))}
      </nav>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="shadow-md w-full">
          <Button variant="outline" size="icon">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Button
        type="submit"
        variant={"outline"}
        className="hover:bg-red-400 hover:text-white"
        onClick={() => signOut({ redirectTo: "/sign-in" })}
      >
        Sign Out
      </Button>
    </aside>
  );
};

export default Sidebar;
