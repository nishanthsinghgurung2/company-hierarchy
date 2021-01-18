# company-hierarchy

To install the dependencies run the command `npm install`.

To show the company hierarchy starting from rootCompany upto to the given companyId, please use the command similar to `./landtree.sh --mode=from_root {companyId}`. Example of companyId is `CR463634467464`.

To expand the company hierarchy(print the children companies) for the given companyId, please use the command similar to `./landtree.sh --mode=expand {companyId}`. Example of companyId is `CR463634467464`.

To run the unit tests run the command `npm run test`

NOTE
* In order to use ES6 features in unit tests I had to convert the javascript files extensions from .js to .mjs as i am using an old version of node.
* For the --mode=expand, I have made the assumption that we need to print the children of passed in company id and not its further grand children.