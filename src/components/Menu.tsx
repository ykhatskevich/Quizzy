import {Link} from 'react-router-dom';
import AboutModal from './AboutModal';
import { useState } from 'react';


export default function Menu () {
    const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
    
    const openAboutModal = () => {
        setIsAboutModalOpen(true);
    };

    const closeAboutModal = () => {
        setIsAboutModalOpen(false);
    };

    const aboutContent = `

    Quizzy is an engaging and interactive quiz application designed to test your knowledge in various domains. Quizzy has a wide range of quiz categories to choose from.
    
    Key Features:
    
    Diverse Categories: Explore a variety of quiz categories, including Technology, History, Science, and more. There's something for everyone.
    
    Multiple Difficulty Levels: Challenge yourself with quizzes ranging from easy to expert levels. Test your knowledge at your own pace.
    
    Immediate Feedback: Receive instant feedback on your answers. Know whether you got it right or need to brush up on your facts.`
    
    return (
        <>
        <div className="flex flex-col items-center justify-center">
           
            <ul className="flex flex-col gap-1 text-3xl text-teal-400" style={{fontFamily:'IBM PLEX MONO, monospace'}}>
                <li className="p-3 cursor-pointer hover:text-teal-100 transition-colors">
                <Link to="/category">Start New Quiz</Link>
                </li>
                <li className="p-3 cursor-pointer hover:text-teal-100 transition-colors">Browse Categories</li>
                <li className="p-3 cursor-pointer hover:text-teal-100 transition-colors" onClick={openAboutModal}>About</li>
            </ul>
        </div>
        <AboutModal isOpen={isAboutModalOpen} closeModal={closeAboutModal} content={aboutContent} />
        </>

    )
}