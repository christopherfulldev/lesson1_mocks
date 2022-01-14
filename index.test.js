const { error } = require("./src/defaultErrors");
const File = require("./src/index");
const { rejects, deepStrictEqual } = require("assert");

(async() => {
    {
        const filePath = "./Mocks/emptyFile-invalid.csv";
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
        const results = File.csvToJson(filePath);
        await rejects(results, rejection);
    }
    
    {
        const filePath = "./Mocks/fourItems-invalid.csv";
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
        const results = File.csvToJson(filePath);
        await rejects(results, rejection);
    }

    {
        const filePath = "./Mocks/threeItem-valid.csv";
        const results = await File.csvToJson(filePath);
        const expected = [
            {
              "name": "Hugo(do jogo por telefone rs)",  
              "id": 123,
              "profession": "Fugitivo",
              "birthDay": 1997
            },
            {              
              "name": "Ninja Jiraya",
              "id": 321,
              "profession": "Ninja",
              "birthDay": 1987
            },
            {
              "name": "Gyodai",
              "id": 231,
              "profession": "Vilão",
              "birthDay": "0000"
            }
          ]

          deepStrictEqual(JSON.stringify(results), JSON.stringify(expected));

    }
})();