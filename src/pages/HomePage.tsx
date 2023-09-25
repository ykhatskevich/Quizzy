import Menu from "../components/Menu";
import Logo from "../components/Logo";

export default function HomePage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <Logo/>
            <Menu />
        </div>
    )
}