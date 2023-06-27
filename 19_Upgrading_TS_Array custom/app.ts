
// associateBy

interface Array<T> {
  associateBy<K>(keySelector: (item: T) => K): { [key: string]: T };
}

Array.prototype.associateBy = function <T, K>(keySelector: (item: T) => K): { [key: string]: T } {
  const associatedObject: { [key: string]: T } = {};

  for (const item of this) {
    const key = keySelector(item);
    associatedObject[String(key)] = item;
  }

  return associatedObject;
};

// const users = [
//   { id: 1, name: 'John' },
//   { id: 2, name: 'Jane' },
//   { id: 3, name: 'Bob' },
// ];

// const usersById = users.associateBy((user) => user.id);
// console.log(usersById);

// ====================================================================================================

// average

    interface Array<T> {
      average()  :number;
    }
    Array.prototype.average = function () {
      let sum = 0;
      for (let i = 0; i < this.length; i++) {
          sum += this[i];
      }
      return sum / this.length;
    };

// const numbers = [2, 4, 6, 8, 10];
// console.log(numbers.average())
// ====================================================================================================

// chunked

interface Array<T> {
  Chunked(size: number): T[][];
}

Array.prototype.Chunked = function <T>(size: number) {
  const chunks: T[][] = [];
  let startIndex = 0;

  while (startIndex < this.length) {
    const chunk = this.slice(startIndex, startIndex + size);
    chunks.push(chunk);
    startIndex += size;
  }

  return chunks;
};

// const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// const chunkedArray = numbers.Chunked(3);
// console.log(chunkedArray);

// ====================================================================================================

// DistinctBy  ==== Не до конца понимаю принцип работы

interface Array<T> {
  distinctBy<K>(keySelector: (item: T) => K): T[];
}

Array.prototype.distinctBy = function <T, K>(keySelector: (item: T) => K): T[] {
  const distinctValues: K[] = [];
  const result: T[] = [];

  for (let i = 0; i < this.length; i++) {
    const key = keySelector(this[i]);
    if (distinctValues.indexOf(key) === -1) {
      distinctValues.push(key);
      result.push(this[i]);
    }
  }

  return result;
};


// const numbers = [1, 2, 2, 3, 3, 4, 5, 5];

// const distinctNumbers = numbers.distinctBy((number) => number);
// console.log(distinctNumbers);

//  // ======

// interface Person {
//   id: number;
//   name: string;
// }

// const people: Person[] = [
//   { id: 1, name: 'John' },
//   { id: 2, name: 'Alice' },
//   { id: 1, name: 'Bob' },
//   { id: 3, name: 'Alice' }
// ];

// const distinctPeople = people.distinctBy((person) => person.id);
// console.log(distinctPeople);


// ====================================================================================================

// 

interface Array<T> {
  cusFilter(predicate: (item: T) => boolean): T[];
}

Array.prototype.cusFilter = function <T>(predicate: (item: T) => boolean): T[] {
  const filteredArray: T[] = [];

  for (const item of this) {
    if (predicate(item)) {
      filteredArray.push(item);
    }
  }

  return filteredArray;
};

// const numbers = [1, 2, 3, 4, 5];

// const evenNumbers = numbers.cusFilter((number) => number % 2 === 0);
// console.log(evenNumbers); 

// ====================================================================================================

// filterIndexed

interface Array<T> {
  filterIndexed(predicate: (item: T, index: number) => boolean): T[];
}

Array.prototype.filterIndexed = function <T>(predicate: (item: T, index: number) => boolean): T[] {
  const filteredArray: T[] = [];

  for (let index = 0; index < this.length; index++) {
    if (predicate(this[index], index)) {
      filteredArray.push(this[index]);
    }
  }

  return filteredArray;
};
// const numbers = [1, 2, 3, 4, 5];

// const filteredNumbers = numbers.filterIndexed((number, index) => index % 2 === 0);
// console.log(filteredNumbers);

// ====================================================================================================

// filterNot

interface Array<T> {
  filterNot(predicate: (item: T) => boolean): T[];
}

Array.prototype.filterNot = function <T>(predicate: (item: T) => boolean): T[] {
  const filteredArray: T[] = [];

  for (let i = 0; i < this.length; i++) {
    if (!predicate(this[i])) {
      filteredArray.push(this[i]);
    }
  }

  return filteredArray;
};


// const numbers = [1, 2, 3, 4, 5];

// const filteredNumbers = numbers.filterNot(number => number % 2 === 0);
// console.log(filteredNumbers); // Вывод: [1, 3, 5]


// ====================================================================================================

// find

interface Array<T> {
  findCustom(predicate: (item: T) => boolean): T | undefined;
}

Array.prototype.findCustom = function <T>(predicate: (item: T) => boolean): T | undefined {
  for (let i = 0; i < this.length; i++) {
    const currentItem = this[i];
    if (predicate(currentItem)) {
      return currentItem;
    }
  }
  return undefined;
};

// const numbers = [1, 2, 3, 4, 5];

// const foundNumber = numbers.findCustom(number => number % 2 === 0);
// console.log(foundNumber);

// ====================================================================================================

// findLast

interface Array<T> {
  findLast(predicate: (item: T) => boolean): T | undefined;
}

Array.prototype.findLast = function <T>(predicate: (item: T) => boolean): T | undefined {
  for (let i = this.length - 1; i >= 0; i--) {
    const currentItem = this[i];
    if (predicate(currentItem)) {
      return currentItem;
    }
  }
  return undefined;
};

// const numbers = [1, 2, 3, 4, 5];

// const foundNumber = numbers.findLast(number => number % 2 === 0);
// console.log(foundNumber);


// ====================================================================================================

// flatten

interface Array<T> {
  flatten(): T[];
}

Array.prototype.flatten = function <T>(): T[] {
  const flattenedArray: T[] = [];

  function flattenArray(array: any[]): void {
    for (let i = 0; i < array.length; i++) {
      if (Array.isArray(array[i])) {
        flattenArray(array[i]);
      } else {
        flattenedArray.push(array[i]);
      }
    }
  }

  flattenArray(this);

  return flattenedArray;
};


// const nestedArray = [1, [2, [3, 4], 5], 6];

// const flattenedArray = nestedArray.flatten();
// console.log(flattenedArray);



// ====================================================================================================

// fold  === Не понимаю как работает и что оно такое

interface Array<T> {
  fold<R>(accumulator: (acc: R, item: T) => R, initialValue: R): R;
}

Array.prototype.fold = function <T, R>(accumulator: (acc: R, item: T) => R, initialValue: R): R {
  let result = initialValue;

  for (let i = 0; i < this.length; i++) {
    result = accumulator(result, this[i]);
  }

  return result;
};

// const numbers = [1, 2, 3, 4, 5];

// const sum = numbers.fold((acc, number) => acc + number, 0);
// console.log(sum); // Вывод: 15

// const product = numbers.fold((acc, number) => acc * number, 1);
// console.log(product); // Вывод: 120


// ====================================================================================================

//  maxBy === Не до конца понятен

interface Array<T> {
  maxBy<R>(selector: (item: T) => R): T | undefined;
}

Array.prototype.maxBy = function <T, R>(selector: (item: T) => R): T | undefined {
  if (this.length === 0) {
    return undefined;
  }

  let maxItem = this[0];
  let maxValue = selector(maxItem);

  for (let i = 1; i < this.length; i++) {
    const currentItem = this[i];
    const currentValue = selector(currentItem);

    if (currentValue > maxValue) {
      maxItem = currentItem;
      maxValue = currentValue;
    }
  }

  return maxItem;
};

// const students = [
//   { name: 'Alice', score: 85 },
//   { name: 'Bob', score: 92 },
//   { name: 'Charlie', score: 78 },
// ];

// const topStudent = students.maxBy((student) => student.score);
// console.log(topStudent); // Вывод: { name: 'Bob', score: 92 }


// ====================================================================================================

//  minBy === Не до конца понятен

interface Array<T> {
  minBy<R>(selector: (item: T) => R): T | undefined;
}

Array.prototype.minBy = function <T, R>(selector: (item: T) => R): T | undefined {
  if (this.length === 0) {
    return undefined;
  }

  let minItem = this[0];
  let minValue = selector(minItem);

  for (let i = 1; i < this.length; i++) {
    const currentItem = this[i];
    const currentValue = selector(currentItem);

    if (currentValue < minValue) {
      minItem = currentItem;
      minValue = currentValue;
    }
  }

  return minItem;
};

// const students = [
//   { name: 'Alice', score: 85 },
//   { name: 'Bob', score: 92 },
//   { name: 'Charlie', score: 78 },
// ];

// const lowestScoreStudent = students.minBy((student) => student.score);
// console.log(lowestScoreStudent); // Вывод: { name: 'Charlie', score: 78 }


// ====================================================================================================

//  count

interface Array<T> {
  sum(selector: (item: T) => number): number;
}

Array.prototype.sum = function <T>(selector: (item: T) => number): number {
  let sum = 0;

  for (let i = 0; i < this.length; i++) {
    sum += selector(this[i]);
  }

  return sum;
};


const cities = [
  { name: 'New York', population: 8500000 },
  { name: 'Los Angeles', population: 4000000 },
  { name: 'Chicago', population: 2700000 },
];

// const totalPopulation = cities.sum((city) => city.population);
// console.log(totalPopulation); // Вывод: 15200000


// ====================================================================================================

//  

interface Array<T> {
  groupBy<K>(keySelector: (item: T) => K): { [key: string]: T[] };
  groupByMultiple<K1, K2>(keySelector1: (item: T) => K1, keySelector2: (item: T) => K2): { [key: string]: { [key: string]: T[] } };
}

Array.prototype.groupBy = function <T, K>(keySelector: (item: T) => K): { [key: string]: T[] } {
  const grouped: { [key: string]: T[] } = {};

  for (let i = 0; i < this.length; i++) {
    const key = String(keySelector(this[i]));

    if (grouped[key]) {
      grouped[key].push(this[i]);
    } else {
      grouped[key] = [this[i]];
    }
  }

  return grouped;
};

Array.prototype.groupByMultiple = function <T, K1, K2>(keySelector1: (item: T) => K1, keySelector2: (item: T) => K2): { [key: string]: { [key: string]: T[] } } {
  const grouped: { [key: string]: { [key: string]: T[] } } = {};

  for (let i = 0; i < this.length; i++) {
    const key1 = String(keySelector1(this[i]));
    const key2 = String(keySelector2(this[i]));

    if (!grouped[key1]) {
      grouped[key1] = {};
    }

    if (!grouped[key1][key2]) {
      grouped[key1][key2] = [];
    }

    grouped[key1][key2].push(this[i]);
  }

  return grouped;
};

// const numbers = [1, 2, 3, 4, 5, 6];

// const groupedNumbers = numbers.groupBy((number) => number % 2 === 0 ? 'even' : 'odd');
// console.log(groupedNumbers);

//    // =======

// const people = [
//   { name: 'John', age: 25 },
//   { name: 'Alice', age: 30 },
//   { name: 'Bob', age: 25 },
//   { name: 'Eve', age: 30 }
// ];

// const groupedPeople = people.groupByMultiple((person) => person.age, (person) => person.name);
// console.log(groupedPeople);
// ====================================================================================================
