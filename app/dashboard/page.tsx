import { Suspense } from 'react';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData, fetchLatestInvoices, fetchRevenue } from '@/app/lib/data';
import { formatCurrency, generateYAxis } from '@/app/lib/utils';

export default async function Page() {
  const revenue = await fetchRevenue();
  const latestInvoices = await fetchLatestInvoices();
  const {
    numberOfCustomers,
    numberOfInvoices,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();

  const { yAxisLabels, topLabel } = generateYAxis(revenue);
  const chartHeight = 350;

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>

      {/* Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card title="Total Customers" value={numberOfCustomers} type="customers" />
      </div>

      {/* Charts & Latest Invoices */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        {/* Revenue Chart */}
        <div className="w-full md:col-span-4">
          <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
            Recent Revenue
          </h2>
          <div className="rounded-xl bg-gray-50 p-4">
            <div className="flex items-end gap-2 rounded-md bg-white p-4 min-h-[400px]">
              <div
                className="mb-6 flex flex-col justify-between text-sm text-gray-400"
                style={{ height: `${chartHeight}px` }}
              >
                {yAxisLabels.map((label) => (
                  <p key={label}>{label}</p>
                ))}
              </div>
              <div className="flex w-full items-end gap-2" style={{ height: `${chartHeight}px` }}>
                {revenue.map((month) => (
                  <div key={month.month} className="flex flex-col items-center gap-2 flex-1">
                    <div
                      className="w-full rounded-md bg-blue-300"
                      style={{
                        height: `${(chartHeight / topLabel) * month.revenue}px`,
                      }}
                    ></div>
                    <p className="-rotate-90 text-sm text-gray-400 sm:rotate-0">
                      {month.month}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Latest Invoices */}
        <div className="flex w-full flex-col md:col-span-4">
          <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
            Latest Invoices
          </h2>
          <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
            <div className="bg-white px-6">
              {latestInvoices.map((invoice, i) => (
                <div
                  key={invoice.id}
                  className={`flex flex-row items-center justify-between py-4 ${i !== 0 ? 'border-t' : ''
                    }`}
                >
                  <div className="flex items-center">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold md:text-base">
                        {invoice.name}
                      </p>
                      <p className="hidden text-sm text-gray-500 sm:block">
                        {invoice.email}
                      </p>
                    </div>
                  </div>
                  <p className={`${lusitana.className} truncate text-sm font-medium md:text-base`}>
                    {invoice.amount}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'invoices' | 'customers' | 'pending' | 'collected';
}) {
  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p className={`${lusitana.className} truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}>
        {value}
      </p>
    </div>
  );
}