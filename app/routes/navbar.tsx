import { Link, NavLink } from "@remix-run/react";
import { useState } from "react";

export default function NavBar() {
    const [openSublist, setOpenSublist] = useState("");

    const handleClick = (item: string) => {
        if (item === openSublist) {
            setOpenSublist("");
        } else {
            setOpenSublist(item);
        }
    };

    const handleSublistItemClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        event.stopPropagation();
    };

    return (
        <div className="bg-primary h-16 w-full px-4 py-2 flex items-center justify-between">
            <Link to={"/"} onClick={() => handleClick("itemMain")}>
                <h1 className="text-muted text-2xl font-bold">My App</h1>
            </Link>

            <nav>
                <ul className="flex space-x-2">
                    <li className="text-muted cursor-pointer" onClick={() => handleClick("item1")}>
                        <NavLink
                            to={"login"}
                            className={({ isActive }) =>
                                isActive
                                    ? " border-accent text-secondary px-2"
                                    : "hover:text-accent transition duration-150 px-2"
                            }
                        >
                            Login
                        </NavLink>
                    </li>
                    <li className="text-muted cursor-pointer" onClick={() => handleClick("item2")}>
                        <NavLink
                            to={"register"}
                            className={({ isActive }) =>
                                isActive
                                    ? " border-accent text-secondary px-2"
                                    : "hover:text-accent transition duration-150 px-2"
                            }
                        >
                            Register
                        </NavLink>
                    </li>
                    <li className="text-muted cursor-pointer" onClick={() => handleClick("item3")}>
                        <NavLink
                            to={"profile"}
                            className={({ isActive }) =>
                                isActive
                                    ? " border-accent text-secondary px-2"
                                    : "hover:text-accent transition duration-150 px-2"
                            }
                        >
                            Profile
                        </NavLink>
                    </li>


                </ul>
            </nav>
        </div>
    )
}

