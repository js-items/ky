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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var SortOrder_1 = require("@js-items/foundation/dist/interfaces/SortOrder");
var isNil_1 = __importDefault(require("ramda/src/isNil"));
var mapObjIndexed_1 = __importDefault(require("ramda/src/mapObjIndexed"));
var pickBy_1 = __importDefault(require("ramda/src/pickBy"));
var formatItemsResponse_1 = __importDefault(require("../../utils/formatItemsResponse"));
exports.default = (function (config) {
    var defaultPagination = {
        after: undefined,
        before: undefined,
        limit: config.defaultPaginationLimit,
    };
    // tslint:disable-next-line:no-object-literal-type-assertion
    var defaultSort = { id: SortOrder_1.asc };
    return function (_a) {
        var _b = _a.filter, filter = _b === void 0 ? {} : _b, _c = _a.sort, sort = _c === void 0 ? defaultSort : _c, 
        /* istanbul ignore next */
        _d = _a.pagination, 
        /* istanbul ignore next */
        pagination = _d === void 0 ? defaultPagination : _d;
        return __awaiter(void 0, void 0, void 0, function () {
            var connection, options, createdFilter, createdSort, paginationParams, params, searchParams, queryParams, response, error_1;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _e.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, config.ky()];
                    case 1:
                        connection = _e.sent();
                        options = config.getItemsOptions();
                        createdFilter = config.createFilter(filter);
                        createdSort = config.createSort(sort);
                        paginationParams = pickBy_1.default(function (val) { return !isNil_1.default(val); }, pagination);
                        params = __assign(__assign({}, paginationParams), { filter: JSON.stringify(createdFilter), sort: JSON.stringify(createdSort) });
                        searchParams = !isNil_1.default(options) && !isNil_1.default(options.searchParams)
                            ? options.searchParams
                            : {};
                        queryParams = mapObjIndexed_1.default(String, __assign(__assign({ envelope: config.envelope }, searchParams), params));
                        return [4 /*yield*/, connection
                                .get(config.itemUrl, __assign(__assign({}, options), { searchParams: queryParams }))
                                .json()];
                    case 2:
                        response = _e.sent();
                        return [2 /*return*/, Promise.resolve(formatItemsResponse_1.default({
                                config: config,
                                envelope: queryParams.envelope === 'true',
                                response: response,
                            }))];
                    case 3:
                        error_1 = _e.sent();
                        return [2 /*return*/, Promise.reject(error_1)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
});
//# sourceMappingURL=index.js.map