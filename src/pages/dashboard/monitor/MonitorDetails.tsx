import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


import {
  useDeleteMonitor,
  useMonitorChecks,
  useMonitorDetails,
  useMonitorRecentIncidents,
  useMonitorResponseTimes,
  useMonitorStatistics,
  useMonitorUptimeBlocks,
  useToggleMonitor,
} from './hooks/use-monitor';

import { MonitorChartSkeleton } from './_components/skeleton/MonitorChartSkeleton';
import { MonitorDetailsHeaderSkeleton } from './_components/skeleton/MonitorDetailsHeaderSkeleton';
import { MonitorDetailsStatsSkeleton } from './_components/skeleton/MonitorDetailsStatsSkeleton';
import { MonitorLogsSkeleton } from './_components/skeleton/MonitorLogsSkeleton';

import { MonitorChecksTable } from './_components/MonitorChecksTable';
import { MonitorDetailsHeader } from './_components/MonitorDetailsHeader';
import { MonitorIncidentsSidebar } from './_components/MonitorIncidentsSidebar';
import { MonitorMetricCards } from './_components/MonitorMetricCards';
import { MonitorResponseChart } from './_components/MonitorResponseChart';
import { PATHS } from '@/src/utils/routes/paths';
import { ConfirmationModal } from '../components/ConfirmationModal';

export default function MonitorDetails() {
  const [range, setRange] = useState<'24h' | '7d' | '30d' | "1h">('24h');
  const [checksPage, setChecksPage] = useState(0);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const pageSize = 15;

  const { monitorId } = useParams<{ monitorId: string }>();
  const navigate = useNavigate();
  const safeMonitorId = monitorId || '';

  const detailsQuery = useMonitorDetails(safeMonitorId);
  const statsQuery = useMonitorStatistics(safeMonitorId);
  const responseTimesQuery = useMonitorResponseTimes(safeMonitorId, range);
  const uptimeBlocksQuery = useMonitorUptimeBlocks(safeMonitorId, range);
  const checksQuery = useMonitorChecks(safeMonitorId, checksPage, pageSize);
  const incidentsQuery = useMonitorRecentIncidents(safeMonitorId);

  const toggleMutation = useToggleMonitor();
  const deleteMutation = useDeleteMonitor();

  const monitor = detailsQuery.data;
  const stats = statsQuery.data;
  const responseTimes = responseTimesQuery.data || [];
  const uptimeBlocks = uptimeBlocksQuery.data || [];
  const checksData = checksQuery.data?.checks || [];
  const checksMeta = checksQuery.data?.meta;
  const incidents = incidentsQuery.data || [];

  const isMonitorLoading = detailsQuery.isLoading || statsQuery.isLoading;
  const isHistoryLoading = responseTimesQuery.isLoading || checksQuery.isLoading;

  const chartData = useMemo(() => {
    return responseTimes.map((pt) => {
      const timeStr = pt.timestamp ? pt.timestamp.split('T')[1]?.substring(0, 5) || '00:00' : '';
      return {
        time: timeStr,
        latency: pt.responseTimeMs ? Math.round(pt.responseTimeMs) : 0,
        status: pt.successfulCount > 0 ? 'UP' : 'DOWN',
        code: pt.successfulCount > 0 ? 200 : 500,
      };
    });
  }, [responseTimes]);

  const handleDownloadLogs = () => {
    if (!checksData || checksData.length === 0) return;

    try {
      const csvHeaders = 'Timestamp,Status,HTTP Code,Latency (ms),Error Message\n';
      const csvRows = checksData
        .map((c) => {
          const statusStr = c.successful ? 'SUCCESS' : 'FAILED';
          const errorMsg = (c.errorMessage || 'OK').replace(/"/g, '""');
          return `"${c.checkedAt}","${statusStr}",${c.statusCode ?? 'N/A'},${c.responseTimeMs},"${errorMsg}"`;
        })
        .join('\n');

      const blob = new Blob([csvHeaders + csvRows], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);

      const sanitizedFilename = (monitor?.name || 'monitor')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/(^_+|_+$)/g, '');

      link.setAttribute('download', `${sanitizedFilename}_checks_export.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Failed to export check logs:', error);
    }
  };


  const handleDeleteClick = () => {
    if (!monitor) return;
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteMutation.mutate(safeMonitorId, {
      onSuccess: () => navigate(PATHS.DASHBOARD.MONITORS.LIST),
    });
  };

  const handleToggle = () => {
    if (!monitor) return;
    toggleMutation.mutate(safeMonitorId);
  };

  if (!monitor && !detailsQuery.isLoading) {
    return (
      <div className="p-12 text-center text-zinc-400 font-mono text-xs space-y-4 max-w-5xl mx-auto">
        <p>Monitor not found or fails to exist in this workspace.</p>
        <button
          onClick={() => navigate(PATHS.DASHBOARD.MONITORS.LIST)}
          className="px-3 py-1.5 rounded bg-zinc-800 text-white font-semibold cursor-pointer transition-colors"
        >
          View All Monitors
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 lg:p-6 font-sans select-none text-zinc-100">
      {isMonitorLoading || !monitor ? (
        <MonitorDetailsHeaderSkeleton />
      ) : (
        <MonitorDetailsHeader
          monitor={monitor}
          onExportCsv={handleDownloadLogs}
          onToggle={handleToggle}
          onDelete={handleDeleteClick}
          isExportDisabled={checksData.length === 0}
          isTogglePending={toggleMutation.isPending}
          isDeletePending={deleteMutation.isPending}
        />
      )}

      {isMonitorLoading || !stats || !monitor ? (
        <MonitorDetailsStatsSkeleton count={4} />
      ) : (
        <MonitorMetricCards stats={stats} monitor={monitor} />
      )}

      {isHistoryLoading ? (
        <MonitorChartSkeleton />
      ) : (
        <MonitorResponseChart
          data={chartData}
          uptimeBlocks={uptimeBlocks}
          isUptimeBlocksLoading={uptimeBlocksQuery.isLoading}
          range={range}
          onRangeChange={setRange}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider font-mono">
              Raw Execution Checks Log
            </h2>
          </div>

          {checksQuery.isLoading ? (
            <MonitorLogsSkeleton count={5} />
          ) : (
            <MonitorChecksTable
              checks={checksData}
              meta={checksMeta}
              page={checksPage}
              onPageChange={setChecksPage}
            />
          )}
        </div>

        <MonitorIncidentsSidebar incidents={incidents} isLoading={incidentsQuery.isLoading} />
      </div>
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title={`Delete '${monitor?.name || 'Monitor'}'`}
        description="Are you sure you want to delete this monitor? All recorded health checks, latency history metrics, and incident records will be removed."
        confirmText="Delete Monitor"
        cancelText="Cancel"
        variant="danger"
      />
    </div>
  );
}

export { MonitorDetails };