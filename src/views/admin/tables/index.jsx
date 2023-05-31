import CheckTable from "./components/CheckTable";

import {
  columnsDataDevelopment,
  columnsDataCheck,
  columnsDataColumns,
  columnsDataComplex,
} from "./variables/columnsData";
import tableDataDevelopment from "./variables/tableDataDevelopment.json";
import tableDataCheck from "./variables/tableDataCheck.json";
import tableDataColumns from "./variables/tableDataColumns.json";
import tableDataComplex from "./variables/tableDataComplex.json";
import DevelopmentTable from "./components/DevelopmentTable";
import ColumnsTable from "./components/ColumnsTable";
import ComplexTable from "./components/ComplexTable";

const Tables = () => {
  return (
    <div>
      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-2">
        <DevelopmentTable
          columnsData={columnsDataDevelopment}
          tableData={tableDataDevelopment}
        />
        <CheckTable
          columnsData={[
            {
              Header: "NAME",
              accessor: "name",
            },
            {
              Header: "PROGRESS",
              accessor: "progress",
            },
            {
              Header: "QUANTITY",
              accessor: "quantity",
            },
            {
              Header: "DATE",
              accessor: "date",
            },
          ]}
          tableData={[
            {
              name: ["Marketplace", false],
              quantity: 2458,
              date: "12.Jan.2021",
              progress: 75.5,
            },
            {
              name: ["Venus DB PRO", true],
              quantity: 1485,
              date: "21.Feb.2021",
              progress: 35.4,
            },
            {
              name: ["Venus DS", true],
              quantity: 1024,
              date: "13.Mar.2021",
              progress: 25,
            },
            {
              name: ["Venus 3D Asset", true],
              quantity: 858,
              date: "24.Jan.2021",
              progress: 100,
            },
            {
              name: ["Marketplace", false],
              quantity: 258,
              date: "Oct 24, 2022",
              progress: 75.5,
            },
            {
              name: ["Marketplace", false],
              quantity: 258,
              date: "Oct 24, 2022",
              progress: 75.5,
            },
            {
              name: ["Marketplace", false],
              quantity: 258,
              date: "12.Jan.2021",
              progress: 75.5,
            },
            {
              name: ["Venus DB PRO", false],
              quantity: 858,
              date: "21.Feb.2021",
              progress: 35.4,
            },
            {
              name: ["Venus DS", false],
              quantity: 1024,
              date: "13.Mar.2021",
              progress: 25,
            },
            {
              name: ["Venus 3D Asset", false],
              quantity: 258,
              date: "24.Jan.2021",
              progress: 100,
            },
            {
              name: ["Marketplace", false],
              quantity: 1024,
              date: "Oct 24, 2022",
              progress: 75.5,
            },
            {
              name: ["Marketplace", false],
              quantity: 258,
              date: "Oct 24, 2022",
              progress: 75.5,
            },
            {
              name: ["Marketplace", false],
              quantity: 258,
              date: "Oct 24, 2022",
              progress: 75.5,
            },
          ]}
        />
      </div>

      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-2">
        <ColumnsTable
          columnsData={columnsDataColumns}
          tableData={tableDataColumns}
        />

        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        />
      </div>
    </div>
  );
};

export default Tables;
