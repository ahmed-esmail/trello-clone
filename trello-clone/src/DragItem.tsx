export type ColumnDragItem = {
  id: string;
  text: string;
  type: "COLUMN";
};

export type CardDragItem = {
  columnId: string;
  id: string;
  text: string;
  type: "CARD";
};

export type DragItem = ColumnDragItem | CardDragItem;
