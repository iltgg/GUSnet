export interface node {
  x: number;
  y: number;
  type: string;
  data?: string;
  label: string;
  style?: string;

  method?: string;
  watch?: string[];
}
