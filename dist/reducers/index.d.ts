/**
 * @ignore
 */
export const reducers: import("redux").Reducer<import("redux").CombinedState<{
    messages: {
        messages: any[];
        messageQueue: any[];
    };
    connection: {
        established: boolean;
        connecting: boolean;
        offline: boolean;
        listening: boolean;
    };
    config: {};
}>, import("redux").AnyAction>;
