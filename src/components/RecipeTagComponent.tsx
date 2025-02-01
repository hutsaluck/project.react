import {setFilterTag} from "../redux/slices/FilterTagSlice.ts";
import {useDispatch} from "react-redux";

interface RecipeTagComponentProps {
    tag: string,
    index: number
}

export const RecipeTagComponent = ({tag, index}: RecipeTagComponentProps) => {
    const dispatch = useDispatch();

    return (
        <span
            onClick={() => dispatch(setFilterTag(tag))}
            className="bg-gray-300 rounded-2xl py-1 px-3 text-white text-center cursor-pointer transition-shadow duration-500 hover:shadow-lg"
            key={index}>
            #{tag}
        </span>
    )
};