import "../css/App.css";
import "../index.css";
import type { ReactNode } from "react";

export default function Page(props: {element: ReactNode}) {
    return (
        <div>
            <div>{props.element}</div>
        </div>
    )
}