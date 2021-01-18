import fs from 'fs';

export const getCompanyParcelInfo = (companyParcelInfoFilePath) => {
    try {
        let countParcels = [];
        let companyParcelMap = new Map();

        // Read the data from land_ownership.csv file and stores it in a Map
        fs.readFileSync(companyParcelInfoFilePath, "utf8")
        .split("\n")
        .slice(1) // header row
        .forEach((line) => {
            const [landId, companyId] = line.split(",");
            if(!countParcels[companyId]) {
                countParcels[companyId] = 0;
            }
            countParcels[companyId] += 1;
            companyParcelMap.set(companyId, countParcels[companyId]);
        });

        return { companyParcelMap, countParcels };
    }
    catch (err) {
        return {
            errorMessage: 'Error accessing the file'
        };
    }
}

export const getCompanyDetails = (companyRelationsFilePath) => {
    try {
        let companyDetails = [];

        // Reads the data from company_relations.csv file and stores it in an array
        fs.readFileSync(companyRelationsFilePath, "utf8")
        .split("\n")
        .slice(1) // header row
        .forEach((line) => {
            
            const [companyId, companyName, parentCompanyId] = line.split(",");
            companyDetails.push({ companyId, companyName, parentCompanyId });
        });
        return companyDetails;
    } catch (err) {
        return {
            errorMessage: 'Error accessing the file'
        };
    }
}
