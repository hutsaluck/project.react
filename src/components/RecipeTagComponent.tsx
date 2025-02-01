interface RecipeTagComponentProps {
    tag: string,
    index: number,
    setSelectedTag: (value: (((prevState: string) => string) | string)) => void
}

export const RecipeTagComponent = ({tag, index, setSelectedTag}: RecipeTagComponentProps) => {
    return (
        <span
            onClick={() => setSelectedTag(tag)}
            className="bg-gray-300 rounded-2xl py-1 px-3 text-white text-center cursor-pointer transition-shadow duration-500 hover:shadow-lg"
            key={index}>
            #{tag}
        </span>
    )
};