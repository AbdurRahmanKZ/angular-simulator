export enum messageTypes {
  SUCCESS="Success",
  INFO="Info",
  WARNING="Warning",
  ERROR="Error"
}

export interface IMessage {
  id: number;
  text: string;
  type: messageTypes
}