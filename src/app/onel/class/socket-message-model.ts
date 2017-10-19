export class SocketMessageModel {
    command: string;
    source_id: string;
    destination_id: string;
    name: string;
    game_id: string;
    turn_id: string;
}

export class SocketWhosOnline {
    command: string;
    source_id: string;
}

export class ImOnline {
    command: string;
    source_id: string;
    name: string;
    destination_id?: string;
}

export class InviteFriend {
    command: string;
    source_id:  string;
    destination_id: string;
    name: string;
}

export class AcceptInvite {
    command: string;
    source_id:  string;
    destination_id: string;
    name: string;
    game_id: string;
    turn_id: string;
}

export class ImHovering {
    command: string;
    source_id: string;
    name: string;
    game_id: string;
    turn_id: string;
    selected_column: number;
}

export class IMakeMyMove {
    command: string;
    source_id: string;
    name: string;
    game_id: string;
    turn_id: string;
    selected_column: number;
}

export class PlayAgain {
    command: string;
    source_id: string;
    game_id: string;
    name: string;
}

export class IQuit {
    command: string;
    source_id: string;
    game_id: string;
    name?: string;
}
