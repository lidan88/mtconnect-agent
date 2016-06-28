/**
  * Copyright 2016, System Insights, Inc.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *    http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  */

// Imports - External

const expect = require('expect.js');
const sinon = require('sinon');

// Imports - Internal

const log = require('../src/config/logger');
const common = require('../src/common');

// Tests

describe('processError', () => {
  describe('without exit', () => {
    it('should just log and return', () => {
      common.processError("Test", false);
    });
  });

  describe('with exit', () => {
    var save;
    var spy;

    before(() => {
      save = sinon.stub(process, 'exit');
      spy = sinon.spy(log, "error");
    });

    after(() => {
      save.restore();
    });
    
    it('should log and exit', () => {
      save.yields(common.processError("Test", true));
      expect(spy.callCount).to.be.equal(1);
    });
  });
});
