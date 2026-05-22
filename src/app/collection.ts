export class Collection<T> {
  private collection: T[];
  constructor(arr: T[]) {
    this.collection = arr;
  }
  getAllElements():T[] {
    return this.collection;
  }
  getDefinedElement(index: number): T {
    return this.collection[index];
  }
  clearCollection(): void {
    this.collection = [];
  }
  deleteDefinedElement(index: number): void {
    this.collection.splice(index, 1);
  }
  replaceDefinedElement(index: number, item: T): void {
    this.collection[index] = item;
  }
}

export class CollectionWithLocalKey<T> extends Collection<T> {
  constructor(src: T[] | string) {
    if (Array.isArray(src)) {
      super(src);
      return;
    }  
    const data = localStorage.getItem(src);
    super(data ? JSON.parse(data) : [])
  }

}
const numbers = new Collection<number>([1, 2, 3]);
console.log(numbers.getAllElements());
console.log(numbers.getDefinedElement(2));
numbers.clearCollection();
console.log(numbers.getAllElements());
const strings = new Collection<string>(['a', 'b', 'c']);
strings.deleteDefinedElement(0);
console.log(strings.getAllElements());
strings.replaceDefinedElement(0, 'h');
console.log(strings.getAllElements());

localStorage.setItem('test', JSON.stringify([4, 5, 6]));
const numbersFromLocal = new CollectionWithLocalKey<string>('test');
console.log(numbersFromLocal.getAllElements());