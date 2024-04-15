import { createColumnHelper } from "@tanstack/react-table";
import moment from "moment";
import IndeterminateCheckbox from "../../components/IndeterminateCheckbox";

function myFn(row: any, columnId: any, filterValue: any) {}

myFn.autoRemove = (val: any) => console.log("yayay", val);

function myFn2(row: any) {
  if (row.first_name === "Tommy" || row.first_name === "Delila") {
    row.first_name = "Mah Man";
    return row.first_name;
    // return (<span style={{color: 'green'}}>{row.first_name}</span>);
  }
  return row.first_name;
}

function myFn3(cell: any) {
  return (
    <span style={{ color: "red" }}>
      {cell.getValue() + ` ${Math.random()}`}
    </span>
  );
}

const columnHelper = createColumnHelper();

export const columnDef: any = [
  columnHelper.accessor("id", {
    header: "Id",
  }),
  {
    accessorFn: myFn2,
    header: "First Name",
  },
  {
    accessorKey: "last_name",
    header: "Last Name",
    filterFn: myFn,
  },
  {
    accessorKey: "email",
    header: "Email",
    filterFn: myFn,
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: myFn3,
  },
];

// cell merge example
const columnDefWithCellMerge = [
  {
    accessorFn: (row: any) => `${row.first_name} ${row.last_name}`,
    header: "Name",
  },
];

export const columnDefWithGrouping = [
  columnHelper.accessor("id", {
    header: "Id",
  }),
  {
    header: "Name",
    columns: [
      {
        accessorFn: (row: any) => `${row.first_name}`,
        header: "First Name",
      },
      {
        accessorKey: "last_name",
        header: "Last Name",
      },
    ],
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
];

// columnDef with Filters

export const columnDefWithFilter = [
  columnHelper.accessor("id", {
    header: "Id",
    enableColumnFilter: false,
  }),
  {
    accessorFn: (row: any) => `${row.first_name}`,
    header: "First Name",
  },
  {
    accessorKey: "last_name",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email",
    enableColumnFilter: false,
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ getValue }: any) =>
      moment(new Date(getValue())).format("MMM Do YY"),
  },
];

export const columnDefWithCheckBox = [
  {
    id: "select",
    header: ({ table }: any) => (
      <IndeterminateCheckbox
        {...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }: any) => (
      <IndeterminateCheckbox
        {...{
          checked: row.getIsSelected(),
          disabled: !row.getCanSelect(),
          indeterminate: row.getIsSomeSelected(),
          onChange: row.getToggleSelectedHandler(),
        }}
      />
    ),
  },
  columnHelper.accessor("id", {
    header: "Id",
  }),
  {
    accessorFn: (row: any) => `${row.first_name}`,
    header: "First Name",
  },
  {
    accessorKey: "last_name",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ getValue }: any) =>
      moment(new Date(getValue())).format("MMM Do YY"),
  },
];
