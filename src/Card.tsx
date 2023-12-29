import { CardContainer } from "./styles";
import { useDrop } from "react-dnd";
import { useAppState } from "./state/AppStateContext";
import { useRef } from "react";
import { isHidden } from "./utils/isHidden";
import { useItemDrag } from "./utils/useItemDrag";
import { throttle } from "throttle-debounce-ts";
import { moveTask, setDraggedItem } from "./state/actions";

type CardProps = {
  text: string;
  columnId: string;
  id: string;
  isPreview?: boolean;
};

export const Card = ({ text, columnId, id, isPreview }: CardProps) => {
  const { draggedItem, dispatch } = useAppState();
  const ref = useRef<HTMLDivElement>(null);

  const { drag } = useItemDrag({ type: "CARD", id, text, columnId });

  const [, drop] = useDrop({
    accept: "CARD",
    hover: throttle(200, () => {
      if (!draggedItem) {
        return;
      }
      if (draggedItem.type === "CARD") {
        if (draggedItem.id === columnId) {
          return;
        }
        dispatch(setDraggedItem({ ...draggedItem, columnId: columnId }));
      }
    }),
  });

  drag(drop(ref));

  return (
    <CardContainer
      $isPreview={isPreview}
      $isHidden={isHidden(draggedItem, "CARD", id, isPreview)}
      ref={ref}
    >
      {text}
    </CardContainer>
  );
};
