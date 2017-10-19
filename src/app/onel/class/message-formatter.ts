export class MessageFormatter<T> {
    formatSocketMessage(inputMessage: T): string {
        let returnString = '{"cmd":"none"}';
        returnString = JSON.stringify(inputMessage);
        return returnString;
    }
}
