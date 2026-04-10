import { useSortable } from "@dnd-kit/react/sortable"
import { RestrictToElement } from "@dnd-kit/dom/modifiers"
import { FaTimes } from "react-icons/fa"

const SkillsDraggableEditable = ({element, handleSkillsRemove, index}) => {
    const {ref, listeners, attributes} = useSortable({
        id: element, 
        index,
        modifiers: [RestrictToElement.configure({element: document.getElementById("drag_context")})]
    })
    return (
        <li className="max-w-min mr-5 mt-2 bg-base-300 rounded-md relative cursor-grab" ref={ref} {...listeners} {...attributes}>
            <p className="p-1 px-3 border border-gray-50/0 rounded-md select-none active:border active:border-gray-400/65 active:bg-base-200/70">
                {element} 
            </p>
            <button className="absolute p-0.5 bg-transparent border-none shadow-none cursor-pointer right-0 top-0 -translate-y-1/2 translate-x-1/2"
                type="button"
                value="cancel"
                onClick={()=>{handleSkillsRemove(index)}}>
                    <FaTimes />
            </button>
        </li>
    )
}

export default SkillsDraggableEditable