import { Item } from '@js-items/foundation';
import { ConvertItemIntoOptions } from '../../types/convertItemIntoOptions';

const defaultConvertItemToOptions: ConvertItemIntoOptions<Item> = item => ({
  json: item,
});

export default defaultConvertItemToOptions;
