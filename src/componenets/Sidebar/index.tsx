import Image from "next/image";
import styles from "./sidebar.module.css";
import Link from "next/link";

const Sidebar = ({
  menus,
}: {
  menus: { title: string; link: string; icon: React.ReactNode }[];
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Image
          src={"/avatars/me.jpg"}
          alt="profile_picture"
          width={50}
          height={50}
        />
        <div>
          <h3>John Doe</h3>
          <h4>System Administrator</h4>
        </div>
      </div>
      <nav className={styles.nav}>
        <ul>
          {menus?.map((menu, index) => (
            <Link
              key={index}
              href={menu.link}
              style={{ textDecoration: "none" }}
            >
              <li>
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
