export default function Menu () {
    return (
        <>
        <div className="flex flex-col items-center justify-center">
           
            <ul className="flex flex-col gap-1 text-2xl text-teal-400" style={{fontFamily:'IBM PLEX MONO, monospace'}}>
                <li className="p-3 cursor-pointer hover:text-teal-100 transition-colors">Start New Quiz</li>
                <li className="p-3 cursor-pointer hover:text-teal-100 transition-colors">Browse Categories</li>
                <li className="p-3 cursor-pointer hover:text-teal-100 transition-colors">About</li>
            </ul>
        </div>
        </>

    )
}