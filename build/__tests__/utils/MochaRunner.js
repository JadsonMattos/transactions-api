"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const mocha_1 = __importDefault(require("mocha"));
const uuid_1 = require("uuid");
// https://github.com/mochajs/mocha/issues/995#issuecomment-359102213
const { EVENT_TEST_FAIL, EVENT_TEST_END, } = mocha_1.default.Runner.constants;
class MochaRunner {
    constructor(expectedTestTitle, options = {}) {
        this._tmps = [];
        this._mocha = new mocha_1.default(options);
        this.expectedTestTitle = expectedTestTitle;
        this.testResult = 'timeout';
    }
    /**
     * Run tests
     * @param {Array} tests
     * @returns {Promise}
     */
    async execute(tests) {
        await new Promise((resolve, _reject) => {
            tests.forEach((test) => {
                const testDir = path_1.default.dirname(test);
                const tmpTest = path_1.default.join(testDir, `${(0, uuid_1.v4)()}.test.ts`);
                fs_1.default.writeFileSync(tmpTest, fs_1.default.readFileSync(test));
                this._tmps.push(tmpTest);
                this._mocha.addFile(tmpTest);
            });
            this._mocha
                .run(() => resolve(this))
                .on(EVENT_TEST_END, (test) => {
                if (test.title === this.expectedTestTitle) {
                    // console.log(test);
                    this.testResult = test.state || 'x';
                }
            })
                .on(EVENT_TEST_FAIL, (test, error) => {
                if (test.title === this.expectedTestTitle) {
                    this.testResult = test.state || 'x';
                }
            });
        });
        this.cleanup();
        return this;
    }
    /**
     * Get mocha instance
     * @returns {Mocha}
     */
    getMocha() {
        return this._mocha;
    }
    /**
     * Remove tmp test files
     * @returns {Promise}
     */
    cleanup() {
        this._tmps.forEach((tmpTest) => {
            fs_1.default.unlinkSync(tmpTest);
        });
    }
}
exports.default = MochaRunner;
