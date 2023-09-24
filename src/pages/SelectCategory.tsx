import { Link } from "react-router-dom";

export default function SelectCategory() {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-6">
          <h1 className="text-4xl text-fuchsia-300" style={{fontFamily:"IBM PLEX MONO, monospace"}}>Please select a category</h1>

          <ul
            className="flex flex-col gap-1 text-2xl text-teal-400"
            style={{ fontFamily: "IBM PLEX MONO, monospace" }}
          >
            <li className="p-3 cursor-pointer hover:text-teal-100 transition-colors">
              LINUX
            </li>
            <li className="p-3 cursor-pointer hover:text-teal-100 transition-colors">
              DEV OPS
            </li>
            <li className="p-3 cursor-pointer hover:text-teal-100 transition-colors">
              NETWORKING
            </li>
            <li className="p-3 cursor-pointer hover:text-teal-100 transition-colors">
              PROGRAMMING
            </li>
            <li className="p-3 cursor-pointer hover:text-teal-100 transition-colors">
              CLOUD
            </li>
            <li className="p-3 cursor-pointer hover:text-teal-100 transition-colors">
              <Link to="/">Back to Home</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
