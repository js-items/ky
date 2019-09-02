"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var formatItemsResponse = function (_a) {
    var convertDocumentIntoItem = _a.config.convertDocumentIntoItem, envelope = _a.envelope, response = _a.response;
    var _b = envelope
        ? response.body
        : response, data = _b.data, pagination = _b.pagination;
    return {
        cursor: pagination,
        items: data.map(convertDocumentIntoItem),
    };
};
exports.default = formatItemsResponse;
//# sourceMappingURL=index.js.map