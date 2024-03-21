export type TType = "line" | "circle" | "dashboard";
export type TStatus = "success" | "error" | "warning";

export type TColor = { color: string; percent: number };
export type TColorArray = TColor[];

export const isArray = (data: any) => Array.isArray(data);
