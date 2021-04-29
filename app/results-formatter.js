const R = require('ramda');

const minToSec_ = R.pipe(
  R.ifElse(R.pipe(R.length, R.equals(1)), R.always(0), R.nth(0)),
  Number,
  R.multiply(60)
);

const secToSec_ = R.pipe(R.last, Number);

const timeToSeconds_ = R.pipe(
  R.split(':'),
  R.converge(R.add, [minToSec_, secToSec_])
);

const getMeanFromStandingsResults_ = R.pipe(
  R.map(R.prop('result')),
  R.map(timeToSeconds_),
  R.mean,
  R.multiply(100),
  Math.round,
  R.multiply(0.01)
);

const resultPropToSeconds_ = R.pipe(R.prop('result'), timeToSeconds_);

const assocResultInSeconds_ = R.converge(R.assoc('resultInSeconds'), [
  resultPropToSeconds_,
  R.identity
]);

const sortStandings_ = R.pipe(
  R.map(assocResultInSeconds_),
  R.sortBy(R.prop('resultInSeconds')),
  R.map(R.dissoc('resultInSeconds'))
);

const getWinner_ = R.pipe(sortStandings_, R.head);

const getPodium_ = R.pipe(sortStandings_, R.slice(0, 3));

const computeStandings = R.applySpec({
  average: getMeanFromStandingsResults_,
  winner: getWinner_,
  podium: getPodium_,
  podiumAverage: R.pipe(getPodium_, getMeanFromStandingsResults_)
});

// String -> [{firstname, lastname, result}]
const formatResults = R.pipe(
  R.split('\n'),
  R.filter(R.complement(R.equals(''))),
  R.map(R.split(',')),
  R.map(
    R.applySpec({
      firstname: R.nth(0),
      lastname: R.nth(1),
      result: R.nth(2)
    })
  )
);

module.exports = {computeStandings, formatResults};
