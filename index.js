require('@tensorflow/tfjs-node-gpu');
const cocoSsd = require('@tensorflow-models/coco-ssd');
const fs = require('fs-extra');
const jpeg = require('jpeg-js');
const Bromise = require('bluebird');
const R = require('ramda');

const PathListImg = [];
const TempList = [];
const RootImg = './IMAGES/';

const readJpg = async (path) => Bromise.props({
    imagePath: path,
    jpg: jpeg.decode(await fs.readFile(path), true)
});

const create_imgList = async(path) => {
    fs.readdir(path, (err, files) => {
        files.forEach(file => {
            TempList.push(file);
            PathListImg.push(path + file);

        });
    })};

const loadModel = () => cocoSsd.load();

const predict = async(model, AList) => Bromise.map(AList, async (x) => {
    const detection = await model.detect(x.jpg);
    return Bromise.props(R.assoc('prediction', detection, x));
});


const ArraytoObject = (tab1 =[], tab2=[]) => {
    return R.map(el => {
            return obj = {
                file : el ,
                dir: tab2[R.indexOf( el , tab1)]
            }
        },
        tab1

    )};

const ConcatTab = (tab1=[], tab2=[]) => {
    return R.map( el => {
            return tab =
                tab1[R.indexOf(el, tab2)]
                +'/'+ el
        },
        tab2
    )};

const CreateDirectory = (tab=[]) => {
    return R.map( el => {
            return fs.ensureDir(el)
        },
        tab
    )};

const movePic = (obj = {file,dir}) => fs.move(String(obj.file),String(obj.dir));


const main = async () => {
    await create_imgList(RootImg);

    const TabObjectImg = await Bromise.map(
        PathListImg,
        readJpg
    );

    const cocoSsd_model = await loadModel();

    const assoc_predictions = await predict(cocoSsd_model, TabObjectImg);

    const find_prediction = await R.pipe(R.pluck('prediction'));
    const get_class = await R.map(R.pipe(R.nth(0),(R.prop('class'))));

    const path = R.map(a => './' + a,
        get_class(find_prediction(assoc_predictions)));

    await CreateDirectory(path);

    R.map(movePic, ArraytoObject(PathListImg,ConcatTab(path, TempList)));
};

main();