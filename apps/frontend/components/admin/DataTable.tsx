'use client';

import React from 'react';

export interface Column {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
}

export interface Action {
  label: string;
  onClick: (row: any) => void;
  variant?: 'primary' | 'secondary' | 'danger';
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  actions?: Action[];
  emptyMessage?: string;
}

export default function DataTable({
  columns,
  data,
  actions,
  emptyMessage = 'No data available',
}: DataTableProps) {
  const getVariantClass = (variant?: string) => {
    switch (variant) {
      case 'danger':
        return 'text-red-600 hover:text-red-800';
      case 'secondary':
        return 'text-gray-600 hover:text-gray-800';
      default:
        return 'text-[#267275] hover:text-[#1f5a5c]';
    }
  };

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center text-gray-500">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.label}
                </th>
              ))}
              {actions && actions.length > 0 && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                {columns.map((column) => (
                  <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                  </td>
                ))}
                {actions && actions.length > 0 && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-3">
                      {actions.map((action, actionIndex) => (
                        <button
                          key={actionIndex}
                          onClick={() => action.onClick(row)}
                          className={`font-medium ${getVariantClass(action.variant)}`}
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden divide-y divide-gray-200">
        {data.map((row, rowIndex) => (
          <div key={rowIndex} className="p-4">
            {columns.map((column) => (
              <div key={column.key} className="flex justify-between py-2">
                <span className="font-medium text-gray-700 text-sm">{column.label}:</span>
                <span className="text-gray-900 text-sm">
                  {column.render ? column.render(row[column.key], row) : row[column.key]}
                </span>
              </div>
            ))}
            {actions && actions.length > 0 && (
              <div className="flex gap-3 mt-3 pt-3 border-t border-gray-200">
                {actions.map((action, actionIndex) => (
                  <button
                    key={actionIndex}
                    onClick={() => action.onClick(row)}
                    className={`font-medium text-sm ${getVariantClass(action.variant)}`}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
