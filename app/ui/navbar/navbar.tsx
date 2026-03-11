import style from "./navbar.module.css";
import NavLink from "../link/navlink";

export default function Navbar() {
  return (
    <div className={`${style.nav} border-b-2`}>
      <NavLink href="/">Home</NavLink>
      <NavLink href="/about">About</NavLink>
      <NavLink href="/dashboard">Dashboard</NavLink>
      <NavLink href="/contact">Contact</NavLink>
      <NavLink href="/dashboard/admin">Admin</NavLink>
      <div></div>
    </div>
  );
}
