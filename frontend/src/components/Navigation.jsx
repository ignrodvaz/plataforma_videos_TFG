import { Link } from "react-router-dom"

export function Navigation() {
    return (
        <div>
            <Link to={"/videos"}>
                <h1>Video App</h1>
            </Link>
            <Link to={"/videos-create"}>Create Video</Link>
        </div>
    )
}