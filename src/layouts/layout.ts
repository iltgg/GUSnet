export interface node {
  x: number;
  y: number;
  type: string;
  label?: string;
  props: { data: string; label: string; method?: method };
}

export interface method {
  data: Array<string>;
  conditions: Array<string>;
  calc: Array<string>;
  run: Array<Array<string>>;
}

interface condition {
    
}