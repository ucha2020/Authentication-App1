import NavLink from "./navlink";

export default function Navbar() {
  return (
    <div className="border-b-2} flex justify-between">
      <NavLink href="/">Home</NavLink>
      <NavLink href="/about">About</NavLink>
      <NavLink href="/dashboard">Dashboard</NavLink>
      <NavLink href="/contact">Contact</NavLink>
      <NavLink href="/dashboard/admin">Admin</NavLink>
      <div></div>
    </div>
  );
}
