import {createRequire} from 'module';
const require = createRequire(import.meta.url);
require('@tensorflow/tfjs-node-gpu');
const Bromise = require('bluebird');
const R = require('ramda');

import {
  PathListImg,
  arraytoObject,
  readJpg,
  RootImg,
  movePic,
  predict,
  loadModel,
  concatTab,
  createDirectory,
  createImageList,
  TemporaryList
} from './functions.js';
import {find} from 'ramda';

const main = async () => {
  await createImageList(RootImg);

  const TabObjectImg = await Bromise.map(PathListImg, readJpg);

  const cocoSsdModel = await loadModel();

  const CreateClassPrediction = await predict(cocoSsdModel, TabObjectImg);

  const findPrediction = await R.pipe(R.pluck('prediction'));
  const getClass = await R.map(R.pipe(R.nth(0), R.prop('class')));

  const directoryPath = R.map(
    (a) => './' + a,
    getClass(findPrediction(CreateClassPrediction))
  );


  await createDirectory(directoryPath);

  R.map(
    movePic,
    arraytoObject(PathListImg, concatTab(directoryPath, TemporaryList))
  );
};

main();
