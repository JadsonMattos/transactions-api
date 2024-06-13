"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runHardTests = exports.runHardMockTests = void 0;
const fs_1 = __importDefault(require("fs"));
const util_1 = require("util");
const child_process_1 = require("child_process");
const execute = (0, util_1.promisify)(child_process_1.exec);
let newOriginalPath = '';
function hardMock(originalFilePath, mockFilePath) {
    newOriginalPath = (`${originalFilePath}.original`);
    fs_1.default.renameSync(originalFilePath, newOriginalPath);
    fs_1.default.writeFileSync(originalFilePath, fs_1.default.readFileSync(mockFilePath));
}
function unMock(originalFile) {
    fs_1.default.rmSync(originalFile);
    fs_1.default.renameSync(newOriginalPath, originalFile);
}
async function runHardMockTests(originalFile, mockFile, testType = 'integration') {
    hardMock(originalFile, mockFile);
    const { stdout } = await execute(`npx mocha --reporter json -r ts-node/register tests/${testType}/**/*.test.ts --exit -t 60000 --exit`).catch((error) => error);
    unMock(originalFile);
    return JSON.parse(stdout);
}
exports.runHardMockTests = runHardMockTests;
async function runHardTests(testType = 'integration') {
    const { stdout } = await execute(`npx mocha --reporter json -r ts-node/register tests/${testType}/**/*.test.ts --exit -t 60000 --exit`).catch((error) => error);
    return JSON.parse(stdout);
}
exports.runHardTests = runHardTests;
