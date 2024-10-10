import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

const Sidebar = ({
  menus,
}: {
  menus: { title: string; link: string; icon: React.ReactNode }[];
}) => {
  const { setTheme } = useTheme();
  return (
    <div
      className={
        "flex flex-col p-4 gap-y-6 min-w-52 text-black bg-white shadow-md border border-white dark:border-slate-900 dark:bg-slate-900 dark:text-white"
      }
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
      <nav>
        <ul className="flex flex-col gap-y-2 list-none">
          {menus?.map((menu, index) => (
            <Link
              key={index}
              href={menu.link}
              style={{ textDecoration: "none" }}
            >
              <li className="flex items-center gap-x-3 p-2 rounded-md border-[1px] border-black text-sm dark:border-white">
                {menu.icon}
                {menu.title}
              </li>
            </Link>
          ))}
        </ul>
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
    </div>
  );
};

export default Sidebar;
