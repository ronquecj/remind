export interface Task {
  fld_id: number;
  fld_day: string;
  fld_title: string;
  fld_is_done: number;
  fld_datecreated: string;
}

export interface RenderAccordionProps {
  days: string;
  data: Task[] | null;
}

export interface AddButtonProps {
  onTaskAdded: () => void;
}
