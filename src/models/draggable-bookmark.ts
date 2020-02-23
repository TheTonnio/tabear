import { DraggableItemType } from "./types";


export default interface DraggableBookmark {
  type: DraggableItemType
  id: string
  draggableId: string
  index: number
}
