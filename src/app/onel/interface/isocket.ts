export interface ISocket {
    sendMessage(msg: string): void;
    getMessage(): any;
    closeSocketConnection();
}
