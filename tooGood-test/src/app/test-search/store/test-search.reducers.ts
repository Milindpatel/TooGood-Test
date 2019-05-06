import * as TestInfoActions from './test-search.actions';
import { TestsInfo } from '../test-search.model';

export const ADD_TEST = 'ADD_TEST';

const initialState = {
    selectedTestsInfo: [
        new TestsInfo(1, 'ram', 'hello'),
        new TestsInfo(2, 'syam', 'hello')
    ]
}


export function testSearchReducer(state = initialState, action: TestInfoActions.TestsInfoActions) {
    switch (action.type) {
        case TestInfoActions.ADD_TEST:
            return {
                ...state,
                selectedTestsInfo: [...state.selectedTestsInfo, action.payload]
            };
        default:
            return state;
    }
    return state;
}