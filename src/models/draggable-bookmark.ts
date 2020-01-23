import { DraggableItemType } from "./types";


export default interface DraggableBookmark {
  type: DraggableItemType
  id: string
  collectionId: string
  index: number
}
