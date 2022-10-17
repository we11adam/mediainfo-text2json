'use strict';
import {readFile} from 'node:fs/promises';
import test from 'node:test';
import {strict as assert} from 'node:assert';
import medianinfoText2json from '../index.mjs';

test('Love.Letter.1995.BluRay.Remux.1080p.AVC.TrueHD.5.1-ZQ.mkv', async t => {

  const content = await readFile('./test/fixtures/Love.Letter.1995.BluRay.Remux.1080p.AVC.TrueHD.5.1-ZQ.txt', 'utf-8');
  const json = medianinfoText2json(content);

  await t.test('general', async () => {
    assert.equal(json['general']['overall_bit_rate_mode'], 'Variable');
    assert.equal(json['general']['writing_library'], 'libebml v1.3.4 + libmatroska v1.4.5');
  });

  await t.test('video', async () => {
    assert.equal(json['video'][0]['bit_rate'], '25.9 Mb/s');
    assert.equal(json['video'][0]['title'], 'MPEG-4 AVC Video / 25993 kbps / 1080p / 23.976 fps / 16:9 / High Profile 4.1');
    assert.equal(json['video'][0]['frame_rate'], 23.976);
  });

  await t.test('audio', async () => {
    assert.equal(json['audio'][0]['channel_positions'], 'Front: L C R, Side: L R, LFE');
    assert.equal(json['audio'][1]['language'], 'Japanese');
    assert.equal(json['audio'][2]['title'], 'Commentary by Director Shunji Iwai / FLAC Audio / 2.0 / 48 kHz / 570 kbps / 16-bit');
  });

  await t.test('subtitle', async () => {
    assert.equal(json['text'][0]['format'], 'UTF-8');

    assert.equal(json['text'][1]['codec_id_info'], 'Picture based subtitle format used on BDs/HD-DVDs');
  });

  await t.test('chapter', async () => {
    assert.equal(json['menu'][16], '01:16:07.980 : en:Chapter 17');
  });
});
