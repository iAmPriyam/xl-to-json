const xlsx = require("xlsx");

const workbook = xlsx.readFile("POP-v3.xlsx", { cellDates: true });

let worksheet = workbook.Sheets["Pest & Diseases_English"];

data = xlsx.utils.sheet_to_json(worksheet);

payload = data.map((record) => {
    record.name = record["PESTS & DISEASES MANAGEMENT IN PADDY (KAMMAREDDY)"];
    record.season = record["__EMPTY"];
    record.time = record["__EMPTY_1"];
    record.symptoms = record["__EMPTY_2"];
    record.control_measures = record["__EMPTY_4"];
    record.symptoms ? (record.symptoms = record.symptoms.split("\n")) : null;
    record.control_measures
        ? (record.control_measures = record.control_measures.split("\n"))
        : null;
    delete record["PESTS & DISEASES MANAGEMENT IN PADDY (KAMMAREDDY)"];
    delete record["__EMPTY"];
    delete record["__EMPTY_1"];
    delete record["__EMPTY_2"];
    delete record["__EMPTY_3"];
    delete record["__EMPTY_4"];
});
module.exports = data;
