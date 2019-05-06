import { Action } from '@ngrx/store';
import { TestsInfo } from '../test-search.model';

export const ADD_TEST = 'ADD_TEST';

export class AddTest implements Action {
    readonly type = ADD_TEST;

    payload: TestsInfo;
}

export type TestsInfoActions = AddTest;