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
import { createNewUser, getUserByEmail } from "../repositories/UserRepository.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
dotenv.config();
export function createNewUserService(newUser) {
    return __awaiter(this, void 0, void 0, function () {
        var password, hashedPassword, newUserWithHashedPassword;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, checkNewEmailAvailability(newUser)];
                case 1:
                    _a.sent();
                    password = newUser.password;
                    hashedPassword = bcrypt.hashSync(password, 10);
                    newUserWithHashedPassword = __assign(__assign({}, newUser), { password: hashedPassword });
                    return [4 /*yield*/, createNewUser(newUserWithHashedPassword)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
export function createNewLoginService(newLogin) {
    return __awaiter(this, void 0, void 0, function () {
        var SECRET_KEY, EXPIRATION, user, payload, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    SECRET_KEY = process.env.JWT_SECRET;
                    EXPIRATION = process.env.TOKEN_EXPIRES_IN;
                    return [4 /*yield*/, checkIfUserExists(newLogin)];
                case 1:
                    user = _a.sent();
                    verifyLoginPassword(newLogin, user);
                    payload = {
                        id: user.id,
                        email: user.email
                    };
                    token = jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRATION });
                    return [2 /*return*/, token];
            }
        });
    });
}
// auxiliary functions
function checkNewEmailAvailability(newLogin) {
    return __awaiter(this, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getUserByEmail(newLogin.email)];
                case 1:
                    user = _a.sent();
                    if (user)
                        throw { type: "error_user_inUse", message: "This e-mail is already in use!" };
                    return [2 /*return*/];
            }
        });
    });
}
function checkIfUserExists(newLogin) {
    return __awaiter(this, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getUserByEmail(newLogin.email)];
                case 1:
                    user = _a.sent();
                    if (!user)
                        throw { type: "error_wrongLogin", message: "Wrong e-mail or password!" };
                    return [2 /*return*/, user];
            }
        });
    });
}
function verifyLoginPassword(newLogin, userFromDatabase) {
    var verify = bcrypt.compareSync(newLogin.password, userFromDatabase.password);
    if (!verify)
        throw { type: "error_wrongLogin", message: "Wrong e-mail or password!" };
}
