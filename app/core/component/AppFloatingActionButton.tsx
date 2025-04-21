export const FloatingActionButton = ({onClick}: { onClick: () => void }) => {
    return (
        <button
            onClick={onClick}
            className="fixed bottom-10 right-10 w-16 h-16 bg-blue-500 text-white rounded-full shadow-lg flex justify-center items-center hover:bg-blue-400 transition duration-300"
        >
            <span className="text-2xl font-bold">+</span>
        </button>
    );
};