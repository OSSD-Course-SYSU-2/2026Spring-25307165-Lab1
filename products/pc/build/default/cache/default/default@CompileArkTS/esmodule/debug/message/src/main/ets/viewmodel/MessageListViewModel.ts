import type { MessageModel } from '../model/MessageModel';
import MessageListModel from "@normalized:N&&&message/src/main/ets/model/MessageListModel&1.0.0";
@ObservedV2
export default class MessageListViewModel {
    @Trace
    public messages: MessageModel[] = [];
    loadMessages() {
        let messageList = new MessageListModel([]);
        messageList.loadMessages();
        for (let message of messageList.messages) {
            this.messages.push(message);
        }
    }
}
