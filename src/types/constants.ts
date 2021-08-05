export const enum DragOperations {
  OrbatDrag = "OrbatDrag",
}

export const enum UnitActions {
  Delete = "Delete",
  AddSubordinate = "AddSubordinate",
  Expand = "Expand",
  Zoom = "Zoom",
  Edit = "Edit",
  Copy = "Copy",
  Paste = "Paste",
  Clone = "Clone",
  MoveUp = "MoveUp",
  MoveDown = "MoveDown",
}

export const enum SideActions {
  Delete = "Delete",
  AddSubordinate = "AddSubordinate",
  Expand = "Expand",
  AddGroup = "AddGroup",
  Edit = "Edit",
  Add = "Add",
}

export interface SymbolValue {
  code: string;
  text: string;
}

export interface SymbolItem extends SymbolValue {
  sidc: string;
  entity?: string;
  entityType?: string;
  entitySubtype?: string;
}