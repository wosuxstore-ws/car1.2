// Copies the exact three.js r160 files the game imports into www/lib so the app works fully offline.
import { cpSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';

const FILES = [
  'build/three.module.js',
  'examples/jsm/loaders/GLTFLoader.js',
  'examples/jsm/utils/BufferGeometryUtils.js',
  'examples/jsm/environments/RoomEnvironment.js',
];
for (const f of FILES) {
  const from = join('node_modules/three', f);
  const to = join('www/lib/three', f);
  if (!existsSync(from)) throw new Error('Missing ' + from + ' - did npm install run?');
  mkdirSync(dirname(to), { recursive: true });
  cpSync(from, to);
  console.log('copied', f);
}
