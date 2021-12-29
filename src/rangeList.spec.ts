import { RangeList } from './rangeList';

test('basic', () => {
    const rangeList = new RangeList();

    rangeList.add([1, 5]);
    expect(rangeList.print()).toBe("[1, 5)");

    rangeList.add([10, 20]);
    expect(rangeList.print()).toBe("[1, 5) [10, 20)");

    rangeList.add([20, 20]);
    expect(rangeList.print()).toBe("[1, 5) [10, 20)");

    rangeList.add([20, 21]);
    expect(rangeList.print()).toBe("[1, 5) [10, 21)");

    rangeList.add([2, 4]);
    expect(rangeList.print()).toBe("[1, 5) [10, 21)");

    rangeList.add([3, 8]);
    expect(rangeList.print()).toBe("[1, 8) [10, 21)");

    rangeList.remove([10, 10]);
    expect(rangeList.print()).toBe("[1, 8) [10, 21)");

    rangeList.remove([10, 11]);
    expect(rangeList.print()).toBe("[1, 8) [11, 21)");

    rangeList.remove([15, 17]);
    expect(rangeList.print()).toBe("[1, 8) [11, 15) [17, 21)");

    rangeList.remove([3, 19]);
    expect(rangeList.print()).toBe("[1, 3) [19, 21)");
});