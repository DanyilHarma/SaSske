import { MessageType } from "../../constants/messageTypes";

export interface IMessage {
    type: MessageType;
    site?: string;
    paused?: boolean;
    timeSpent?: number;
}
