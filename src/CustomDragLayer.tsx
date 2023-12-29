import { useAppState } from "./state/AppStateContext";
import { useDragLayer } from "react-dnd";
import { CustomDragLayerContainer } from "./styles";
import { Column } from "./Column";

export const CustomDragLayer = () => {
  const { draggedItem } = useAppState();
  const { currentOffset } = useDragLayer((monitor) => ({
    currentOffset: monitor.getSourceClientOffset(),
  }));

  return draggedItem && currentOffset ? (
    <CustomDragLayerContainer>
      <Column text={draggedItem.text} id={draggedItem.id} isPreview />
    </CustomDragLayerContainer>
  ) : null;
};
