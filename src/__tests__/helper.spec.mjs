import { getCompanyDetails } from "../helper.mjs";
import { getCompanyParcelInfo } from "../helper.mjs";

describe('getCompanyDetails', () => {
    it('should get company details', () => {
        const companyDetails = getCompanyDetails("src/data/company_relations_less.csv");
        const expectedCompanyDetails = [{"companyId": "c100", "companyName": "Company A Plc", "parentCompanyId": "c200"}, {"companyId": "c101", "companyName": "Company B Plc", "parentCompanyId": "c201"}, {"companyId": "c102", "companyName": "Company C Plc", "parentCompanyId": "c200"}, {"companyId": "c103", "companyName": "Company D Plc", "parentCompanyId": "c201"}, {"companyId": "c201", "companyName": "Company E Plc", "parentCompanyId": "c300"}, {"companyId": "c200", "companyName": "Company F Plc", "parentCompanyId": "c301"}, {"companyId": "c104", "companyName": "Company G Plc", "parentCompanyId": "c200"}, {"companyId": "c301", "companyName": "Company H Plc", "parentCompanyId": ""}, {"companyId": "c203", "companyName": "Company I Plc", "parentCompanyId": "c301"}, {"companyId": "c204", "companyName": "Company J Plc", "parentCompanyId": "c301"}];
        expect(companyDetails).toEqual(expectedCompanyDetails);
    })

    it('should return empty result for invalid file path', () => {
        const companyDetails = getCompanyDetails("src/data/company_relations_less_blah.csv");
        const err = {
            errorMessage: 'Error accessing the file'
        };
        expect(companyDetails).toEqual(err);
    })
})

describe('getCompanyParcelInfo', () => {
    it('should get company parcel info', () => {
        const { companyParcelMap, countParcels } = getCompanyParcelInfo("src/data/land_ownership_less.csv");
        let expectedCompanyParcelMap = new Map();
        expectedCompanyParcelMap.set("R590980645905", 1);
        expectedCompanyParcelMap.set("C498567266942", 1);
        expectedCompanyParcelMap.set("R297805899175", 1);
        expectedCompanyParcelMap.set("R652026353427", 1);
        expect(companyParcelMap).toEqual(expectedCompanyParcelMap);
        expect(countParcels.length).toEqual(0);
    })

    it('should return empty result for invalid file path', () => {
        const result = getCompanyParcelInfo("src/data/land_ownership_less_blah.csv");
        const err = {
            errorMessage: 'Error accessing the file'
        };
        expect(result).toEqual(err);
    })
})