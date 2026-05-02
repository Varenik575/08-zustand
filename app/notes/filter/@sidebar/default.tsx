import { categoryTagArray } from "@/types/note";
import css from "./SideBarNotes.module.css";
import Link from "next/link";

const SidebarNotes = () => {
  return (
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <Link href={`/notes/filter/All`} className={css.menuLink}>
          All notes
        </Link>
      </li>
      {categoryTagArray.map((tag) => {
        return (
          <li key={tag} className={css.menuItem}>
            <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
              {tag}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default SidebarNotes;
