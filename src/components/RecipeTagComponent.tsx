import {setFilterTag} from "../redux/slices/FilterTagSlice.ts";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

interface RecipeTagComponentProps {
    tag: string,
    index: number
}

export const RecipeTagComponent = ({tag, index}: RecipeTagComponentProps) => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    return (
        <span
            onClick={() => {
                dispatch(setFilterTag(tag))
                if (!location.pathname.includes('recipes')) {
                    navigate('/project.react/recipes')
                }
            }}
            className="bg-gray-400 rounded-2xl py-1 px-3 text-white text-center cursor-pointer transition-shadow duration-500 hover:shadow-lg"
            key={index}>
            #{tag}
        </span>
    )
};