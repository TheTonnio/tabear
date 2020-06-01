import { DnDSource } from "../../models/dnd-source";
import { DnDDestination } from "../../models/dnd-destination";

export const moveCollection = (
  source: DnDSource,
  destination: DnDDestination,
  draggableId: string,
  onMoveCB: (id: string, fromIndex: number, toIndex: number) => any
) => {
  if (!destination) {
    return
  }

  if (
    destination.id === source.id &&
    destination.index === source.index
  ) {
    return
  }

  onMoveCB(draggableId, source.index as number, destination.index);
};
