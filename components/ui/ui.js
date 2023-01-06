import tw from "twin.macro";

export const Card = tw.div`
	p-6 bg-white border border-gray-200 rounded-lg shadow-md
	dark:bg-gray-800 dark:border-gray-700
`;

export const TableItem = tw.td`
	px-6 py-2 text-sm text-gray-500
`;

export const TableHeadItem = tw.th`
	px-6 py-2 text-sm text-gray-700
`;

export const TableHead = tw.thead`
bg-gray-50
`;

export const TableBody = tw.tbody`
bg-white divide-y divide-gray-300
`;

export const Button = tw.button`
text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700
`;

export const NavItem = tw.div`
flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700
`;

export const ErrorWrapper = tw.div`
mt-2 text-xs text-red-600 dark:text-red-400
`;