var expect = require('expect.js');
var util = require('util');
var fs = require('fs');
var xmltojson = require('../src/xmltojson');
var expectedjson = require('./checkfiles/samplejsonoutput');
var expecteduuid = 'innovaluesthailand_CINCOMA26-1_b77e26';
var xml1 = fs.readFileSync('./test/checkfiles/Devices2di.xml','utf8');

var insertedobject = {
          xmlns: { 'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
          xmlns: 'urn:mtconnect.org:MTConnectDevices:1.3',
          'xmlns:m': 'urn:mtconnect.org:MTConnectDevices:1.3',
          'xsi:schemaLocation': 'urn:mtconnect.org:MTConnectDevices:1.3 http://www.mtconnect.org/schemas/MTConnectDevices_1.3.xsd' } ,
           time: '2015-02-11T12:12:57Z',
           uuid: 'innovaluesthailand_CINCOMA26-1_b77e26',
           device: { '$':
           { name: 'innovaluesthailand_CINCOMA26-1',
             uuid: 'innovaluesthailand_CINCOMA26-1_b77e26',
             id: 'CINCOMA26-1_1' },
          Description:
           [ { _: 'Cincom A26 - CINCOM A26',
               '$': { model: 'Cincom A26', manufacturer: 'Citizen' } } ],
          DataItems:
           [ { DataItem:
                [ { '$':
                     { type: 'AVAILABILITY',
                       category: 'EVENT',
                       id: 'dtop_2',
                       name: 'avail' } },
                  { '$':
                     { type: 'EMERGENCY_STOP',
                       category: 'EVENT',
                       id: 'dtop_2',
                       name: 'estop' } } ] } ] }
        }

console.log(insertedobject.xmlns);


describe ('xml to json conversion', function() {
  describe('xmltojson()', function() {

      it('should convert xml with 2 dataitem correctly', function() {
        var check1 = xmltojson.xmltojson(xml1);
        expect(check1).to.eql(expectedjson);
      });

  });
});

var jsonfile =  fs.readFileSync('./test/checkfiles/jsonfile','utf8');

describe ('inserting device schema', function() {
  describe(' insertschematoDB()', function() {
    it('should insert the devices schema json correctly', function() {
      var insert1 = xmltojson.insertschematoDB(JSON.parse(jsonfile));
      //console.log(util.inspect(insert1.data[0].uuid, false, null))
      //var uuid = insert1.data[0].uuid;
      console.log(insert1.data[0].xmlns);
      expect(insert1.data[0].xmlns).to.eql(insertedobject.xmlns);
      expect(insert1.data[0].time).to.eql(insertedobject.time);
      expect(insert1.data[0].uuid).to.eql(insertedobject.uuid);
      expect(insert1.data[0].time).to.eql(insertedobject.time);
      expect(insert1.data[0].device).to.eql(insertedobject.device);
    });
  });
});
