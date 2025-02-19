"use strict";
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
var openai_1 = require("openai");
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)(); // Load environment variables
var openai = new openai_1.default({
    apiKey: process.env.API_KEY, // Use the API key from .env
    baseURL: 'https://integrate.api.nvidia.com/v1',
});
function generateTestCase(userStory) {
    return __awaiter(this, void 0, void 0, function () {
        var completion;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, openai.chat.completions.create({
                        model: "meta/llama-3.2-3b-instruct",
                        messages: [
                            {
                                "role": "user",
                                "content": "\n          You are an expert test case generation assistant. Your task is to generate a structured test case based on a given user story.\n\n          ### **Instructions:**\n          - Understand the user story and derive key functional steps.\n          - Provide **clear and concise steps** for test execution.\n          - Ensure the **expected outcome** aligns with the user story\u2019s intent.\n          - Output in **strict JSON format** as shown in the example.\n\n          ### **Example:**\n          **User Story:**  \n          \"As a user, I want to reset my password so I can regain access to my account.\"\n\n          **Expected Output:**\n          ```json\n          {\n            \"testCaseTitle\": \"Password Reset Functionality\",\n            \"steps\": [\n              \"Click on 'Forgot Password'\",\n              \"Enter the registered email\",\n              \"Check email for reset link\",\n              \"Follow link and set new password\"\n            ],\n            \"expectedOutcome\": \"Password is updated and login is successful.\"\n          }\n          ```\n\n          ### **User Story:**\n          \"".concat(userStory, "\"\n\n          ### **Expected Output:**\n        ")
                            }
                        ],
                        temperature: 0.2,
                        top_p: 0.7,
                        max_tokens: 1024,
                    })];
                case 1:
                    completion = _c.sent();
                    return [2 /*return*/, ((_b = (_a = completion.choices[0]) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.content) || "Error generating test case"];
            }
        });
    });
}
// Run a test
function test() {
    return __awaiter(this, void 0, void 0, function () {
        var userStory, testCase;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userStory = "As a language learner, I want an offline mode in the language learning app, so I can continue learning without an internet connection.";
                    return [4 /*yield*/, generateTestCase(userStory)];
                case 1:
                    testCase = _a.sent();
                    console.log("Generated Test Case: ");
                    console.log(testCase);
                    return [2 /*return*/];
            }
        });
    });
}
test();
