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
import Cryptr from "cryptr";
import { createNewCard, deleteCardById, getCardById, getCards } from "../repositories/CardRepository.js";
import { checkIfUserHasThisTitle } from "../utils.js";
export function createNewCardEntry(newCard, user) {
    return __awaiter(this, void 0, void 0, function () {
        var cryptr, encryptedPassword, newCardInfo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, checkIfUserHasThisTitle(user, newCard.title, "card")];
                case 1:
                    if (_a.sent())
                        throw { type: "user_alreadyHasTitle", message: "You already have a card with this title!" };
                    cryptr = new Cryptr(process.env.CRYPTR_PASSWORD);
                    encryptedPassword = cryptr.encrypt(newCard.password);
                    newCardInfo = __assign(__assign({}, newCard), { userId: user.id, password: encryptedPassword });
                    return [4 /*yield*/, createNewCard(newCardInfo)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
export function getCardsService(user, cardId) {
    return __awaiter(this, void 0, void 0, function () {
        var cryptr, card, decryptedPassword, card;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cryptr = new Cryptr(process.env.CRYPTR_PASSWORD);
                    if (!cardId) return [3 /*break*/, 2];
                    return [4 /*yield*/, getCardById(user.id, cardId)];
                case 1:
                    card = _a.sent();
                    decryptedPassword = cryptr.decrypt(card.password);
                    return [2 /*return*/, __assign(__assign({}, card), { password: decryptedPassword })];
                case 2: return [4 /*yield*/, getCards(user.id)];
                case 3:
                    card = _a.sent();
                    return [2 /*return*/, decryptCardsPassword(card, cryptr)];
            }
        });
    });
}
export function deleteCardsService(user, cardId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, checkIfThisCardIsValid(user, cardId)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, deleteCardById(cardId)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
// auxiliary functions
function decryptCardsPassword(cards, cryptr) {
    var decryptedCards = [];
    for (var _i = 0, cards_1 = cards; _i < cards_1.length; _i++) {
        var card = cards_1[_i];
        var decryptedPassword = cryptr.decrypt(card.password);
        decryptedCards.push(__assign(__assign({}, card), { password: decryptedPassword }));
    }
    return decryptedCards;
}
function checkIfThisCardIsValid(user, cardId) {
    return __awaiter(this, void 0, void 0, function () {
        var card;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getCardById(user.id, cardId)];
                case 1:
                    card = _a.sent();
                    if (!card)
                        throw { type: "error_card_notYours", message: "This card doesn't exist or doesn't belong to you!" };
                    return [2 /*return*/];
            }
        });
    });
}
