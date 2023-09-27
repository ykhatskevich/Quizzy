import {Link, useLocation, useNavigate} from 'react-router-dom';

export default function SelectDifficulty () {
    const navigate = useNavigate();
    const location = useLocation();
    const category = new URLSearchParams(location.search).get('category');

    const handleDifficultySelect = (difficulty: string) => {
      navigate( `/quiz?category=${category}&difficulty=${difficulty}`);
    };


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
            <li className="text-3xl p-3 cursor-pointer hover:text-teal-100 transition-colors border border-teal-300 rounded-lg hover:border-teal-100 
            flex justify-center items-center"
            onClick={() => handleDifficultySelect('Easy')}>
              EASY
            </li>
            <li className="text-3xl p-3 cursor-pointer hover:text-teal-100 transition-colors border border-teal-300 rounded-lg hover:border-teal-100
            flex justify-center items-center"
            onClick={() => handleDifficultySelect('Medium')}>
              MEDIUM
            </li>
            <li className="text-3xl p-3 cursor-pointer hover:text-teal-100 transition-colors border border-teal-300 rounded-lg hover:border-teal-100
            flex justify-center items-center"
            onClick={() => handleDifficultySelect('Hard')}>
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