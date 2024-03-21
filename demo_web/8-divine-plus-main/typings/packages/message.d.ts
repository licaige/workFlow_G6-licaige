import type { VNode } from "vue";

export type MessageType = "success" | "warning" | "info" | "error";

export declare class DvMessageComponent {
  close(): void;
}

export interface DvMessageOptions {
  message?: string | VNode;
  type?: MessageType;
  duration?: number;
  showClose?: boolean;
  id?: string;
  zIndex?: number;
  offset?: number;
  onClose?: () => void;
}

export interface DvMessage {
  (text: string): DvMessageComponent;
  (options: DvMessageOptions): DvMessageComponent;
  success(text: string): DvMessageComponent;
  success(options: DvMessageOptions): DvMessageComponent;
  warning(text: string): DvMessageComponent;
  warning(options: DvMessageOptions): DvMessageComponent;
  info(text: string): DvMessageComponent;
  info(options: DvMessageOptions): DvMessageComponent;
  error(text: string): DvMessageComponent;
  error(options: DvMessageOptions): DvMessageComponent;
}
