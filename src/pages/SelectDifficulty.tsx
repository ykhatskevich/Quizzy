import {Link} from 'react-router-dom';

export default function SelectDifficulty () {
    return (
        <>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-6">
          <h1
            className="text-4xl text-fuchsia-300"
            style={{ fontFamily: "IBM PLEX MONO, monospace" }}
          >
            Please select difficulty
          </h1>

          <ul
            className="flex flex-col gap-1 text-2xl text-teal-400"
            style={{ fontFamily: "IBM PLEX MONO, monospace" }}
          >
            <li className="text-3xl p-3 cursor-pointer hover:text-teal-100 transition-colors border border-teal-300 rounded-lg hover:border-teal-100 ">
              EASY
            </li>
            <li className="text-3xl p-3 cursor-pointer hover:text-teal-100 transition-colors border border-teal-300 rounded-lg hover:border-teal-100">
              MEDIUM
            </li>
            <li className="text-3xl p-3 cursor-pointer hover:text-teal-100 transition-colors border border-teal-300 rounded-lg hover:border-teal-100">
              HARD
            </li>
            
            <li className="p-3 cursor-pointer hover:text-teal-100 transition-colors ">
              <Link to="/category">Back to Categories</Link>
            </li>
          </ul>
        </div>
      </div>
    </>

    )
}