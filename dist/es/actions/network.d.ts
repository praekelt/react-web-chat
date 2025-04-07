import { Action } from 'redux';
export declare const NETWORK_ATTEMPT = "NETWORK_ATTEMPT";
export declare const NETWORK_DROP = "NETWORK_DROP";
export declare const NETWORK_ESTABLISH = "NETWORK_ESTABLISH";
export declare const NETWORK_LISTENING = "NETWORK_LISTENING";
interface NetworkAttemptAction extends Action {
    type: typeof NETWORK_ATTEMPT;
}
interface NetworkDropAction extends Action {
    type: typeof NETWORK_DROP;
}
interface NetworkEstablishAction extends Action {
    type: typeof NETWORK_ESTABLISH;
}
interface NetworkListeningAction extends Action {
    type: typeof NETWORK_LISTENING;
}
export type NetworkActionTypes = NetworkAttemptAction | NetworkDropAction | NetworkEstablishAction | NetworkListeningAction;
export declare const attempted: () => NetworkAttemptAction;
export declare const dropped: () => NetworkDropAction;
export declare const established: () => NetworkEstablishAction;
export declare const listening: () => NetworkListeningAction;
export {};
