import { Item } from '@js-items/foundation';
export interface TestItem extends Item {
    readonly booleanProperty: boolean;
    readonly stringProperty: string;
    readonly numberProperty: number;
}
export declare const item: {
    booleanProperty: boolean;
    id: string;
    numberProperty: number;
    stringProperty: string;
};
