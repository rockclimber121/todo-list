import { generateNewId } from "./localStorage";

describe("generateNewId", () => {
    it("get first id", () => {
        const result = generateNewId([]);
        expect(result).toEqual(0);
    });

    it("get second id", () => {
        const result = generateNewId([
            {
                id: 0,
                name: "",
            },
        ]);
        expect(result).toEqual(1);
    });

    it("get third id", () => {
        const result = generateNewId([
            {
                id: 0,
                name: "",
            },
            {
                id: 1,
                name: "",
            },
        ]);
        expect(result).toEqual(2);
    });
});
