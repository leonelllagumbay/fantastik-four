export class Friend {
    requestClass: string;
    requestAction: string;
    name: string;
    source_id: string;
    constructor(requestAction, requestClass, name, source_id) {
        this.requestAction = requestAction;
        this.requestClass = requestClass;
        this.name = name;
        this.source_id = source_id;
    }
}
