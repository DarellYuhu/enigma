import Image from "next/image";
import Link from "next/link";

const Sidebar = ({
  menus,
}: {
  menus: { title: string; link: string; icon: React.ReactNode }[];
}) => {
  return (
    <div
      className={"flex flex-col p-4 text-white gap-y-10 min-w-52 bg-slate-900"}
    >
      <div
        className={
          "flex items-center gap-x-3 p-2 border-[1px] text-white rounded-md"
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
              <li className="flex items-center gap-x-3 p-2 rounded-md text-white border-[1px] border-white text-sm">
                {menu.icon}
                {menu.title}
              </li>
            </Link>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
