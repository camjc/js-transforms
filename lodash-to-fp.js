// Do you want to do potentially unsafe transformations now? (We'll add comments for you to review them)
const shouldFixMutations = false;

// Gunar C. Gessner (@gunar) 2016
// https://github.com/gunar/js-transforms
//
// # Useful links
//
// - https://github.com/lodash/lodash/wiki/FP-Guide
// - http://astexplorer.net/#/ypBuZw7P0x/14
//
// # README
//
// It helps you refactor a codebase from lodash to lodash/fp.
// This scripts takes a "better safe than sorry" approach, as to try to minimize false positives.
//   e.g. `_.mapValues(myValues, myFunctions)` doesn't get converted because I'd need to confirm myFunction's arity
//        [lodash/fp's fixed arity](https://github.com/lodash/lodash/wiki/FP-Guide#fixed-arity)

// # TODO
// feat: add tests
// feat:  add Aliases
// feat: implement functions with custom argument order
// feat: try to find iteratee functions elsewhere in the code to check arity
// feat: implement Methods that accept an array of arguments as their second parameter
// feat: chaining
// feat: _.get(object, path, defaultValue) => fp.get(path, object) || defaultValue
// fix: handle files with require _ and fp
// fix: files = fp.remove (while both mutate the array, _.remove returns one thing, fp.remove returns other) use fp.reject?

const nonFpMutates = {
  assign: true,
  assignIn: true,
  assignInWith: true,
  assignWith: true,
  defaults: true,
  defaultsDeep: true,
  fill: true,
  merge: true,
  mergeWith: true,
  pull: true,
  pullAll: true,
  pullAllBy: true,
  pullAllWith: true,
  pullAt: true,
  remove: true,
  reverse: true,
  set: true,
  setWith: true,
  unset: true,
  update: true,
  updateWith: true,
};

const oneToOneRelation = {
  clone: true,
  cloneDeep: true,
  compact: true,
  constant: true,
  head: true,
  identity: true,
  isArguments: true,
  isArray: true,
  isArrayBuffer: true,
  isArrayLike: true,
  isArrayLikeObject: true,
  isBoolean: true,
  isBuffer: true,
  isDate: true,
  isElement: true,
  isEmpty: true,
  isError: true,
  isFinite: true,
  isFunction: true,
  isInteger: true,
  isLength: true,
  isMap: true,
  isNaN: true,
  isNative: true,
  isNil: true,
  isNull: true,
  isNumber: true,
  isObject: true,
  isObjectLike: true,
  isPlainObject: true,
  isRegExp: true,
  isSafeInteger: true,
  isSet: true,
  isString: true,
  isSymbol: true,
  isTypedArray: true,
  isUndefined: true,
  isWeakMap: true,
  isWeakSet: true,
  last: true,
  last: true,
  max: true,
  min: true,
  noop: true,
  property: true,
  propertyOf: true,
  sample: true,
  size: true,
  upperFirst: true,
  camelCase: true,
  capitalize: true,
  castArray: true,
  cond: true,
  conforms: true,
  conformsTo: true,
  deburr: true,
  escape: true,
  escapeRegExp: true,
  flatten: true,
  flattenDeep: true,
  flip: true,
  functions: true,
  initial: true,
  kebabCase: true,
  keys: true,
  keysIn: true,
  lowerCase: true,
  lowerFirst: true,
  matches: true,
  mean: true,
  negate: true,
  once: true,
  shuffle: true,
  snakeCase: true,
  sortedUniq: true,
  startCase: true,
  sum: true,
  tail: true,
  toArray: true,
  toUpper: true,
  toFinite: true,
  toInteger: true,
  toLength: true,
  toNumber: true,
  toPath: true,
  toPlainObject: true,
  toSafeInteger: true,
  toString: true,
  unescape: true,
  unzip: true,
  upperCase: true,
  values: true,
};

const iterateeCappedToOneArgument = {
  dropRightWhile: true,
  dropWhile: true,
  every: true,
  filter: true,
  find: true,
  findIndex: true,
  findKey: true,
  findLast: true,
  findLastIndex: true,
  findLastKey: true,
  flatMap: true,
  flatMapDeep: true,
  forEach: true,
  forEachRight: true,
  forIn: true,
  forInRight: true,
  forOwn: true,
  forOwnRight: true,
  map: true,
  mapKeys: true,
  mapValues: true,
  partition: true,
  reject: true,
  remove: true,
  some: true,
  takeRightWhile: true,
  takeWhile: true,
  times: true,
};

const iterateeCappedToTwoArguments = {
  reduce: true,
  reduceRight: true,
  transform: true,
};

const dataTypes = {
  Boolean: true,
  Null: true,
  Undefined: true,
  Number: true,
  String: true,
  Symbol: true,
  Object: true,
};

const fixedArityOne = {
  attempt: true,
  ceil: true,
  create: true,
  curry: true,
  curryRight: true,
  floor: true,
  fromPairs: true,
  invert: true,
  memoize: true,
  method: true,
  methodOf: true,
  over: true,
  overEvery: true,
  overSome: true,
  rest: true,
  reverse: true,
  round: true,
  spread: true,
  template: true,
  trim: true,
  trimEnd: true,
  trimStart: true,
  uniq: true,
  uniqueId: true,
  words: true,
};

const fixedArityTwo = {
  add: true,
  after: true,
  ary: true,
  assign: true,
  assignIn: true,
  at: true,
  before: true,
  bind: true,
  bindAll: true,
  bindKey: true,
  chunk: true,
  cloneDeepWith: true,
  cloneWith: true,
  concat: true,
  countBy: true,
  curryN: true,
  curryRightN: true,
  debounce: true,
  defaults: true,
  defaultsDeep: true,
  delay: true,
  difference: true,
  divide: true,
  drop: true,
  dropRight: true,
  dropRightWhile: true,
  dropWhile: true,
  endsWith: true,
  eq: true,
  every: true,
  filter: true,
  find: true,
  findIndex: true,
  findKey: true,
  findLast: true,
  findLastIndex: true,
  findLastKey: true,
  flatMap: true,
  flatMapDeep: true,
  flattenDepth: true,
  forEach: true,
  forEachRight: true,
  forIn: true,
  forInRight: true,
  forOwn: true,
  forOwnRight: true,
  get: true,
  groupBy: true,
  gt: true,
  gte: true,
  has: true,
  hasIn: true,
  includes: true,
  indexOf: true,
  intersection: true,
  invertBy: true,
  invoke: true,
  invokeMap: true,
  isEqual: true,
  isMatch: true,
  join: true,
  keyBy: true,
  lastIndexOf: true,
  lt: true,
  lte: true,
  map: true,
  mapKeys: true,
  mapValues: true,
  matchesProperty: true,
  maxBy: true,
  meanBy: true,
  merge: true,
  minBy: true,
  multiply: true,
  nth: true,
  omit: true,
  omitBy: true,
  overArgs: true,
  pad: true,
  padEnd: true,
  padStart: true,
  parseInt: true,
  partial: true,
  partialRight: true,
  partition: true,
  pick: true,
  pickBy: true,
  pull: true,
  pullAll: true,
  pullAt: true,
  random: true,
  range: true,
  rangeRight: true,
  rearg: true,
  reject: true,
  remove: true,
  repeat: true,
  restFrom: true,
  result: true,
  sampleSize: true,
  some: true,
  sortBy: true,
  sortedIndex: true,
  sortedIndexOf: true,
  sortedLastIndex: true,
  sortedLastIndexOf: true,
  sortedUniqBy: true,
  split: true,
  spreadFrom: true,
  startsWith: true,
  subtract: true,
  sumBy: true,
  take: true,
  takeRight: true,
  takeRightWhile: true,
  takeWhile: true,
  tap: true,
  throttle: true,
  thru: true,
  times: true,
  trimChars: true,
  trimCharsEnd: true,
  trimCharsStart: true,
  truncate: true,
  union: true,
  uniqBy: true,
  uniqWith: true,
  unset: true,
  unzipWith: true,
  without: true,
  wrap: true,
  xor: true,
  zip: true,
  zipObject: true,
  zipObjectDeep: true,
};

const fixedArityThree = {
  assignInWith: true,
  assignWith: true,
  clamp: true,
  differenceBy: true,
  differenceWith: true,
  flatMapDepth: true,
  getOr: true,
  inRange: true,
  intersectionBy: true,
  intersectionWith: true,
  invokeArgs: true,
  invokeArgsMap: true,
  isEqualWith: true,
  isMatchWith: true,
  mergeWith: true,
  orderBy: true,
  padChars: true,
  padCharsEnd: true,
  padCharsStart: true,
  pullAllBy: true,
  pullAllWith: true,
  reduce: true,
  reduceRight: true,
  replace: true,
  set: true,
  slice: true,
  sortedIndexBy: true,
  sortedLastIndexBy: true,
  transform: true,
  unionBy: true,
  unionWith: true,
  update: true,
  xorBy: true,
  xorWith: true,
  zipWith: true,
};

const fixedArityFour = {
  fill: true,
  setWith: true,
  updateWith: true,
};

const shouldNotRotate = {
  add: true,
  assign: true,
  assignIn: true,
  bind: true,
  bindKey: true,
  concat: true,
  difference: true,
  divide: true,
  eq: true,
  gt: true,
  gte: true,
  isEqual: true,
  lt: true,
  lte: true,
  matchesProperty: true,
  merge: true,
  multiply: true,
  overArgs: true,
  partial: true,
  partialRight: true,
  random: true,
  range: true,
  rangeRight: true,
  subtract: true,
  without: true,
  zip: true,
  zipObject: true,
};

const customArgumentOrder = {
  assignInWith: true,
  assignWith: true,
  getOr: true,
  isEqualWith: true,
  isMatchWith: true,
  mergeWith: true,
  padChars: true,
  padCharsEnd: true,
  padCharsStart: true,
  pullAllBy: true,
  pullAllWith: true,
  setWith: true,
  sortedIndexBy: true,
  sortedLastIndexBy: true,
  updateWith: true,
  zipWith: true,
  // From many args to an array of args:
  assignAll: true,
  assignAllWith: true,
  assignInAll: true,
  assignInAllWith: true,
  defaultsAll: true,
  defaultsDeepAll: true,
  invokeArgs: true,
  invokeArgsMap: true,
  mergeAll: true,
  mergeAllWith: true,
  partial: true,
  partialRight: true,
  without: true,
  zipAll: true,
  // Bag of pain
  chain: true,
};

const rotate = (arr) => {
  const first = arr.shift();
  arr.push(first);
};

// TODO:
// - Convert chain `_(data).foo.bar` to flow

export default function transformer(file, api) {
  const j = api.jscodeshift;
  const { expression, statement, statements } = j.template;

  let isNeedingLodashRegularStill = false;
  const fpMethodsForThisFile = new Set();

  const root = j(file.source);

  const getFirstNode = () => root.find(j.Program).get('body', 0).node;
  const firstNode = getFirstNode();
  const { comments } = firstNode;

  // const replaceWithRequire = p => {
  //   return j.variableDeclarator(
  //     j.identifier(allPossibleToDestructureFromModule),
  //     j.callExpression(j.identifier('require'), [j.literal('lodash/fp')]),
  //   );
  // };
  // root
  //   .find(j.VariableDeclarator, {
  //     id: { name: '_' },
  //     init: {
  //       callee: { name: 'require' },
  //     },
  //   })
  //   .replaceWith(replaceWithRequire);

  root
    .find(j.ImportDeclaration, {
      source: { value: 'lodash/fp' },
    })
    .replaceWith((p) => {
      // Add all the imported methods to the overall list for this file
      p.value.specifiers.map((specifier) => specifier.imported.name).forEach((item) => fpMethodsForThisFile.add(item));

      return undefined;
    });

  // remove lodash import, add back later if we need to
  root
    .find(j.ImportDeclaration, {
      source: { value: 'lodash' },
    })
    .replaceWith();

  for (const name in oneToOneRelation) {
    root
      .find(j.MemberExpression, {
        object: { name: '_' },
        property: {
          type: 'Identifier',
          name,
        },
      })
      .replaceWith((p) => {
        fpMethodsForThisFile.add(name);

        return j.identifier(p.node.property.name);
      });
  }

  // Find chains `_(data).foo().bar()`
  root
    .find(j.CallExpression, {
      callee: {
        name: '_',
      },
    })
    .replaceWith((p) => {
      isNeedingLodashRegularStill = true;
      return p.node;
    });

  root
    .find(j.CallExpression, {
      callee: {
        type: 'MemberExpression',
        object: { name: '_' },
      },
    })
    .replaceWith((p) => {

      if (!p.node.callee.property) {
        isNeedingLodashRegularStill = true;
        return p.node; // Complex case, not implemented
      }
      let args = p.node.arguments;

      const nodeName = p.node.callee.property.name;

      // Convert three arg `get` to `getOr`.
      const name = nodeName === 'get' && args.length === 3 ? 'getOr' : nodeName;

      const isFirstArgAnEmptyObject = args[0] && args[0].type === 'ObjectExpression' && args[0].properties.length === 0
      // Bail if we don't want to fix possible mutation scenarios
      if (nonFpMutates[name] && !shouldFixMutations && !isFirstArgAnEmptyObject) {
        isNeedingLodashRegularStill = true;
        return p.node;
      }

      if (customArgumentOrder[name]) {
        if (name !== 'getOr') {
          isNeedingLodashRegularStill = true;
          return p.node; // Not implemented
        }
        args = args.reverse() // Reverse args for getOr
      } else if (oneToOneRelation[name]) {
        // Use FP without changing anything
      } else if (iterateeCappedToOneArgument[name]) {
        const iteratee = args[1];
        const isDataType = dataTypes[iteratee && iteratee.name];
        const isLiteral = ['ArrayExpression', 'Literal', 'ObjectExpression'].indexOf(iteratee && iteratee.type) > -1;
        const isFunction = ['ArrowFunctionExpression', 'FunctionExpression'].indexOf(iteratee && iteratee.type) > -1;
        const isFunctionWithOneArg = isFunction && iteratee && iteratee.params.length === 1;
        const isIterateeALodashFunc = fpMethodsForThisFile.has(iteratee && iteratee.name) || iteratee && iteratee.object && iteratee.object.name === '_'
        const valid = isDataType || isLiteral || isFunctionWithOneArg || isIterateeALodashFunc;
        if (!valid) {
          isNeedingLodashRegularStill = true;
          return p.node;
        }

        args = args.reverse();
      } else if (iterateeCappedToTwoArguments[name]) {
        const iteratee = args[1];
        const isFunction = ['ArrowFunctionExpression', 'FunctionExpression'].indexOf(iteratee && iteratee.type) > -1;
        const isFunctionWithTwoArgs = isFunction && iteratee && iteratee.params.length === 2;
        const arityOfThree = args.length === 3;
        const valid = isFunctionWithTwoArgs && arityOfThree;
        if (!valid) {
          isNeedingLodashRegularStill = true;
          return p.node;
        }

        rotate(args);
      } else if (fixedArityOne[name]) {
        const valid = args.length === 1;
        if (!valid) {
          isNeedingLodashRegularStill = true;
          return p.node;
        }
      } else if (fixedArityTwo[name]) {
        const valid = args.length === 2;
        if (!valid) {
          isNeedingLodashRegularStill = true;
          return p.node;
        }

        if (!shouldNotRotate[name]) rotate(args);
      } else if (fixedArityThree[name]) {
        const valid = args.length === 3;
        if (!valid) {
          isNeedingLodashRegularStill = true;
          return p.node;
        }

        if (!shouldNotRotate[name]) rotate(args);
      } else if (fixedArityFour[name]) {
        const valid = args.length === 4;
        if (!valid) {
          isNeedingLodashRegularStill = true;
          return p.node;
        }

        if (!shouldNotRotate[name]) rotate(args);
      }
      fpMethodsForThisFile.add(name);

      const node = j.callExpression(j.identifier(name), args);

      if (nonFpMutates[name] && !isFirstArgAnEmptyObject) {
        node.comments = node.comments || [];
        node.comments.push(j.commentLine('TODO: Check Mutation'));
      }

      return node;
    });

  if (isNeedingLodashRegularStill) {
    console.log(file.path, 'still using regular lodash');
    root
      .find(j.Program)
      .get('body', 0)
      .insertAfter(j.importDeclaration([j.importDefaultSpecifier(j.identifier('_'))], j.literal('lodash')));
  }

  if (fpMethodsForThisFile.size > 0) {
    root
      .find(j.Program)
      .get('body', 0)
      .insertAfter(
        j.importDeclaration(
          [j.importDefaultSpecifier(j.identifier(`{ ${[...fpMethodsForThisFile].sort().join(', ')} }`))],
          j.literal('lodash/fp'),
        ),
      );
  }

  // If the first node has been modified or deleted, reattach the comments
  const firstNode2 = getFirstNode();
  if (firstNode2 !== firstNode) {
    firstNode2.comments = comments;
  }

  return root.toSource({ quote: 'single' });
}
