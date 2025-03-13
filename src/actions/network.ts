import { Action } from 'redux';

export const NETWORK_ATTEMPT = 'NETWORK_ATTEMPT';
export const NETWORK_DROP = 'NETWORK_DROP';
export const NETWORK_ESTABLISH = 'NETWORK_ESTABLISH';
export const NETWORK_LISTENING = 'NETWORK_LISTENING';

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

export type NetworkActionTypes =
  | NetworkAttemptAction
  | NetworkDropAction
  | NetworkEstablishAction
  | NetworkListeningAction;

export const attempted = (): NetworkAttemptAction => ({
  type: NETWORK_ATTEMPT,
});

export const dropped = (): NetworkDropAction => ({
  type: NETWORK_DROP,
});

export const established = (): NetworkEstablishAction => ({
  type: NETWORK_ESTABLISH,
});

export const listening = (): NetworkListeningAction => ({
  type: NETWORK_LISTENING,
}); 