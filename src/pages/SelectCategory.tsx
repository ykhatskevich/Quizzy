import { Link, useNavigate } from "react-router-dom";

export default function SelectCategory() {
  const navigate = useNavigate();

  const handleCategorySelect = (category: string) => {
    navigate(`/difficulty?category=${category}`);
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-6">
          <h1
            className="text-4xl text-fuchsia-300"
            style={{ fontFamily: "IBM PLEX MONO, monospace" }}
          >
            Please select a category
          </h1>

          <ul
            className="flex flex-col gap-1 text-2xl text-teal-400"
            style={{ fontFamily: "IBM PLEX MONO, monospace" }}
          >
            <li
              className="p-3 cursor-pointer hover:text-teal-100 transition-colors border border-teal-300 rounded-lg hover:border-teal-100"
              onClick={() => handleCategorySelect("Linux")}
            >
              LINUX
            </li>
            <li className="p-3 cursor-pointer hover:text-teal-100 transition-colors border border-teal-300 rounded-lg hover:border-teal-100">
              DEV OPS
            </li>
            <li className="p-3 cursor-pointer hover:text-teal-100 transition-colors border border-teal-300 rounded-lg hover:border-teal-100">
              NETWORKING
            </li>
            <li className="p-3 cursor-pointer hover:text-teal-100 transition-colors border border-teal-300 rounded-lg hover:border-teal-100">
              PROGRAMMING
            </li>
            <li className="p-3 cursor-pointer hover:text-teal-100 transition-colors border border-teal-300 rounded-lg hover:border-teal-100">
              CLOUD
            </li>
            <li className="p-3 cursor-pointer hover:text-teal-100 transition-colors ">
              <Link to="/">Back to Home</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
