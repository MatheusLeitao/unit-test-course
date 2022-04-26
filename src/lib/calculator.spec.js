const {sum} = require('./calculator');

it('should sum 2 and 2 and the result must be 4', () => {
    expect(sum(2, 2)).toBe(4);
});

it('should sum 2 and 2 and the result must be 4 even if one of them is string', () => {
    expect(sum('2', '2')).toBe(4);
});

it('should throw error if one of the values is empty', () => {
    expect(() => sum('', 2)).toThrowError();
    expect(() => sum([2,2])).toThrowError();
    expect(() => sum({})).toThrowError();
    expect(() => sum()).toThrowError();
});