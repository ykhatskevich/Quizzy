export default function Logo () {
    return (
        <>
        <div className="flex-col items-center justify-center text-center">
        <div className="flex flex-row items-center justify-center gap-2">
            <h1 className="text-6xl font-bold text-teal-300" style={{ fontFamily: 'Fuggles, cursive' }}>Quizzy</h1>
            <img src='/public/question-mark.png' alt='question mark' className='w-10 h-10' />
        </div>
        <h3 className="text-teal-500 mt-2" style={{fontFamily:'IBM PLEX MONO, monospace'}}>Unleash Your Knowledge!</h3>
        </div>
        </>
    )
}