import { test } from './';

describe('index', function () {
    describe('test', function () {
        it('should return 42', function () {
            const result = test();

            expect(result).toEqual(42);
        });
    });
});
