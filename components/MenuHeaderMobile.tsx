"use client";
import { hasEnvVars } from "@/lib/utils";
import { X, MenuIcon, Box } from "lucide-react";
import Link from "next/link";
import React from "react";
import { EnvVarWarning } from "./env-var-warning";
import { AuthButton } from "./auth-button";

export default function MenuHeaderMobile() {
  const [openMenu, setOpenMenu] = React.useState(false);

  return (
    <details
      onToggle={(e) => {
        setOpenMenu(e.currentTarget.open);
      }}
      className="navbar-end flex md:hidden"
    >
      <summary tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        {openMenu ? <X /> : <MenuIcon />}
      </summary>
      <div
        className={"overflow-hidden absolute top-full bg-background shadow-md rounded-md w-full left-0 transition-all z-10 duration-300 ease-in-out "}
      >
        <ul className="menu menu-vertical px-1 w-full space-y-4">
          <li>
            <div className="">
              {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
            </div>
          </li>
          <li>
            <Link href={"/prestamos"}>Prestamos</Link>
          </li>
          <li>
            <Link href={"/servicios"}>Servicios</Link>
          </li>
          <li>
            <Link href={"/ayuda"}>Ayuda</Link>
          </li>
          <li>
            <details>
              <summary>Más</summary>
              <div>
                <ul className="menu menu-vertical gap-6 py-4">
                  <li>Recursos</li>
                  <li>
                    <div>
                      <Box className="" />
                      <b>Blog</b>
                    </div>
                  </li>
                  <li>
                    <div>
                      <Box className="" />
                      <b>Guías</b>
                    </div>
                  </li>
                  <li>
                    <div>
                      <Box className="" />
                      <b>Casos de éxito</b>
                    </div>
                  </li>
                  <li>
                    <div>
                      <Box className="" />
                      <b>Webinars</b>
                    </div>
                  </li>
                </ul>
              </div>
            </details>
          </li>
        </ul>
      </div>
    </details>
  );
}
