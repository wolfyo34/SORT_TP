import {createRequire} from 'module';
const require = createRequire(import.meta.url);
require('@tensorflow/tfjs-node-gpu');
const cocoSsd = require('@tensorflow-models/coco-ssd');
const fs = require('fs-extra');
const jpeg = require('jpeg-js');
const Bromise = require('bluebird');
const R = require('ramda');

const PathListImg = [];
const TemporaryList = [];
const RootImg = './IMAGES/';

const readJpg = async (path) =>
  Bromise.props({
    imagePath: path,
    jpg: jpeg.decode(await fs.readFile(path), true)
  });

const createImageList = async (path) => {
  fs.readdir(path, (error, files) => {
    for (const file of files) {
      TemporaryList.push(file);
      PathListImg.push(path + file);
    }
  });
};

const loadModel = () => cocoSsd.load();

const predict = async (model, AList) =>
  Bromise.map(AList, async (x) => {
    const detection = await model.detect(x.jpg);
    return Bromise.props(R.assoc('prediction', detection, x));
  });

const arraytoObject = (tab1 = [], tab2 = []) => {
  return R.map((element) => {
    return {
      file: element,
      dir: tab2[R.indexOf(element, tab1)]
    };
  }, tab1);
};

const concatTab = (tab1 = [], tab2 = []) => {
  return R.map((element) => {
    return tab1[R.indexOf(element, tab2)] + '/' + element;
  }, tab2);
};

const createDirectory = (tab = []) => {
  return R.map((element) => {
    return fs.ensureDir(element);
  }, tab);
};

const movePic = (object = {}) => {
  fs.move(object.file, object.dir);
};

export {
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
};
