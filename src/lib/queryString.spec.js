const { queryString, parseQueryString} = require("../../src/lib/queryString");

describe("Object to query scring", () => {
  it("should create a valid querystring", () => {
    const obj = {
      name: "John",
      profession: "Developer",
    };

    expect(queryString(obj)).toBe("name=John&profession=Developer");
  });

  it("should create a valid querystring even when a array is passed as an argument", () => {
    const obj = {
      name: "John",
      profession: "Developer",
      abilities: ["HTML", "CSS", "JS"],
    };
    
    expect(queryString(obj)).toBe("name=John&profession=Developer&abilities=HTML,CSS,JS");
  });
  
  it('should throw an error when an object is passed as value', () => {
    const obj = {
        name: "John",
        profession: "Developer",
        abilities: { first: "HTML", second: "CSS"},
      };
      
      expect(() => queryString(obj)).toThrowError('Invalid input');
  });
});

describe('QueryString to Object', () => {
    it('should convert queryString to object', () => {
        const qs = 'name=John&profession=Developer'
        expect(parseQueryString(qs)).toEqual({ name: 'John', profession: 'Developer' });
    });
    
    it('should convert single-valued queryString to object', () => {
        const qs = 'name=John'
        expect(parseQueryString(qs)).toEqual({ name: 'John' });
    });
    
    it('should convert single-valued queryString to object', () => {
        const qs = 'name=John&abilities=HTML,CSS,JS'
        expect(parseQueryString(qs)).toEqual({ name: 'John', abilities: ["HTML", "CSS", "JS"]});
    });
});