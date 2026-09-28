"use client";
import { useEffect,useState } from "react";
export function ThemeToggle(){const[dark,setDark]=useState(false);useEffect(()=>{const d=localStorage.getItem("gymorbit-theme")==="dark";setDark(d);document.documentElement.dataset.theme=d?"dark":"light"},[]);function toggle(){const d=!dark;setDark(d);document.documentElement.dataset.theme=d?"dark":"light";localStorage.setItem("gymorbit-theme",d?"dark":"light")}return <button className="theme-toggle" onClick={toggle}>{dark?"☀ Light":"◐ Dark"}</button>}
