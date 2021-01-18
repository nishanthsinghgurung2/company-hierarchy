import { getCompanyParcelInfo, getCompanyDetails } from "./src/helper.mjs";
    // Gives the list of children companies
  const getAllChildrenCompanies = (parentCompanyId) => {
      let childrenCompanies = [];
      companyDetails.map(company => {
        if(company.parentCompanyId === parentCompanyId) {
            childrenCompanies.push(company);
        }
      });
      return childrenCompanies;
  };

  // Get the company details for the passed companyId
  const getCompanyFromCompanyId = (companyId) => {
    const companyInfo = companyDetails.filter(company => (company.companyId === companyId));
    return companyInfo[0];
  };

  // Prints company details along with the symbols
 const printCompanyDetails = (companyDetails) => {
    let i = companyDetails.length - 1;
    while(i>0) {
        const { companyId, companyName, parentCompanyId, level } = companyDetails[i];
        let parcelCount = 0;
        if(companyParcelMap.get(companyId)) {
            parcelCount = companyParcelMap.get(companyId);
        }
        let printCompanyDetails = companyId + "; " + companyName + "; owner of " + parcelCount + " land parcels";
        let prefixSymbols = "";
        let countSymbols = companyDetails[companyDetails.length - 1].level - level;
        
        for( let index = 0; index < countSymbols ; index ++) {
            if(index === 0) {
                prefixSymbols = prefixSymbols + "| - "
            } else {
                prefixSymbols = "| " + prefixSymbols;
            }
        }
        printCompanyDetails = prefixSymbols + printCompanyDetails;
        console.log(printCompanyDetails);
        i = i - 1;
    }
  };

  // Prints just the passed in company details along with the symbols
 const printSingleLevelCompanyDetails = (companyDetails) => {
    let i = companyDetails.length - 1;
    while(i>0) {
        const { companyId, companyName } = companyDetails[i];
        let parcelCount = 0;
        if(companyParcelMap.get(companyId)) {
            parcelCount = companyParcelMap.get(companyId);
        }
        let printCompanyDetails = companyId + "; " + companyName + "; owner of " + parcelCount + " land parcels";
    
        printCompanyDetails = "| - " + printCompanyDetails;
        console.log(printCompanyDetails);
        i = i - 1;
    }
  };

  // Traverses the multiple company levels and prints them.
export const traverseAndPrintCompanyInfo = (inputCompanyId) => {
    if(typeof inputCompanyId !== 'string') {
        console.log('companyId needs to be string');
        return null;
    }
    let levelCount = 0;
    let levelOfCompanies = [];  

    // find the company info of the passed companyId
    let company = getCompanyFromCompanyId(inputCompanyId);

    // If the passed companyId is not found return the function
    if(!company) {
        console.log('companyId not found');
        return null;
    }
    
    levelOfCompanies.push({...company, level: levelCount});

    // find the parentCompany details of the passed parentCompanyId
    let parentCompany = getCompanyFromCompanyId(company.parentCompanyId);

    let rootCompany = null;

    // Loop through the companies hierarchy and print company details until the root company is encountered
    while(parentCompany) {

        // find the children of matched company parent
        let childrenofParentCompany = getAllChildrenCompanies(parentCompany.companyId);

        levelCount += 1;
        
        // find the children of the matched parentCompany
        childrenofParentCompany.map(childOfParentId => {
            company = getCompanyFromCompanyId(childOfParentId.companyId);
            levelOfCompanies.push({...company, level: levelCount});
        });

        rootCompany = parentCompany;
        parentCompany = getCompanyFromCompanyId(parentCompany.parentCompanyId);
    }

    levelCount += 1;

    company = getCompanyFromCompanyId(rootCompany.companyId);

    levelOfCompanies.push({...company, level: levelCount});

    printCompanyDetails(levelOfCompanies);

    return {
        levelOfCompanies,
        levelCount
    };
};

// Finds the company childrens and prints them.
export const expandCompany = (companyId) => {
    if(typeof companyId !== 'string') {
        console.log('companyId needs to be string');
        return null;
    }
    let childrenofCompany = getAllChildrenCompanies(companyId);
   
    printSingleLevelCompanyDetails(childrenofCompany);
    return childrenofCompany;
};

let inputCompanyId = process.argv[3]
let mode = process.argv[2]

const { companyParcelMap } = getCompanyParcelInfo("src/data/land_ownership.csv");
const companyDetails = getCompanyDetails("src/data/company_relations.csv");

if(mode === 'from_root') {
   traverseAndPrintCompanyInfo(inputCompanyId);
} else if(mode === 'expand') {
    expandCompany(inputCompanyId);
} else {
    console.log('invalid mode');
}
