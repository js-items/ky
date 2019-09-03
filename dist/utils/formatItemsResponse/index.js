"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var defaultTo_1 = __importDefault(require("ramda/src/defaultTo"));
var formatItemsResponse = function (_a) {
    var convertDocumentIntoItem = _a.config.convertDocumentIntoItem, envelope = _a.envelope, response = _a.response;
    var _b = envelope
        ? response.body
        : response, data = _b.data, pagination = _b.pagination;
    return {
        cursor: __assign(__assign({}, pagination), { after: defaultTo_1.default(undefined)(pagination.after), before: defaultTo_1.default(undefined)(pagination.before) }),
        items: data.map(convertDocumentIntoItem),
    };
};
exports.default = formatItemsResponse;
//# sourceMappingURL=index.js.map