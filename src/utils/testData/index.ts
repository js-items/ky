import { Item } from '@js-items/foundation';

export interface TestItem extends Item {
  readonly booleanProperty: boolean;
  readonly stringProperty: string;
  readonly numberProperty: number;
}

export const item = {
  booleanProperty: true,
  id: '1',
  numberProperty: 3,
  stringProperty: 'name',
};
