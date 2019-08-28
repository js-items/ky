/// <reference types="jest" />
import { TestItem } from '@js-items/foundation/dist/functions/utils/testItem';
import FacadeConfig from '../../FacadeConfig';
export declare const defaultDocumentConverter: jest.Mock<{}, []>;
export declare const jsonOptions: jest.Mock<{
    json: {
        item: TestItem;
    };
}, []>;
export declare const config: FacadeConfig<TestItem>;
