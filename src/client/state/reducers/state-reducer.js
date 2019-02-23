const defaultState = {};

export const USER_ACTIONS = {
    CLEAR_ALL: 'CLEAR_ALL_STATE',
    CLEAR_FIELD: 'CLEAR_FIELD_STATE',
    GET: 'GET_STATE',
    OVERRIDE: 'OVERRIDE_STATE',
};

const UserNavigationStateReducer = (state = defaultState, action = {}) => {
    switch(action.type) {
        case USER_ACTIONS.CLEAR_ALL:
            return defaultState;
        case USER_ACTIONS.CLEAR_FIELD_STATE:
            return _.omit(state, action.field);
        case USER_ACTIONS.GET:
            return state;
        case USER_ACTIONS.OVERRIDE:
            return action.state;
    };
    return state;
};

export default UserNavigationStateReducer;