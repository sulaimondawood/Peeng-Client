import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Clock, Terminal } from "lucide-react";



import { IncidentAssigneeSelector } from "./_components/IncidentAssigneeSelector";
import { IncidentDetailsHeader } from "./_components/IncidentDetailsHeader";
import { IncidentDiagnosticPanel } from "./_components/IncidentDiagnosticPanel";
import { IncidentMetricsHud } from "./_components/IncidentMetricsHud";
import { IncidentNotificationChannels } from "./_components/IncidentNotificationChannels";
import {
  IncidentHeaderSkeleton,
  IncidentMetricsHudSkeleton,
  IncidentSidebarSkeleton,
  IncidentTimelineSkeleton,
} from "./_components/skeletons/InicidentSkeletons";
import { useAssignIncident, useIncidentActivity, useIncidentOverview, useRunDiagnostic, useTeamMembers } from "./hooks/use-incident";
import { IncidentDiagnosticTraceDTO } from "@/src/types/incident";
import { PATHS } from "@/src/utils/routes/paths";

export default function IncidentDetails() {
  const { incidentId } = useParams<{ incidentId: string }>();
  const navigate = useNavigate();
  const safeIncidentId = incidentId || "";

  const { data: overview, isLoading: isOverviewLoading } = useIncidentOverview(safeIncidentId);
  const { data: timeline = [], isLoading: isTimelineLoading } = useIncidentActivity(safeIncidentId);
  const { data: members = [] } = useTeamMembers();


  const traceMutation = useRunDiagnostic();
  const assignMutation = useAssignIncident();

  const [latestTrace, setLatestTrace] = useState<IncidentDiagnosticTraceDTO | undefined>(undefined);

  const handleRunTrace = () => {
    traceMutation.mutate(safeIncidentId, {
      onSuccess: (traceData) => {
        setLatestTrace(traceData);
      },
    });
  };

  const handleAssign = (memberId: string) => {
    if (memberId === "unassigned") return;
    assignMutation.mutate({
      incidentId: safeIncidentId,
      memberId,
    });
  };

  if (!overview && !isOverviewLoading) {
    return (
      <div className="p-12 text-center text-zinc-400 font-mono text-xs space-y-4 max-w-5xl mx-auto">
        <p>No active incident record found.</p>
        <button
          onClick={() => navigate(PATHS.DASHBOARD.INCIDENTS.LIST)}
          className="px-3 py-1.5 rounded bg-zinc-800 text-white font-semibold cursor-pointer transition-colors"
        >
          Return to Incidents
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 lg:p-6 font-sans select-none text-zinc-100 pb-16">
      {/* Header & Metrics */}
      {isOverviewLoading || !overview ? (
        <>
          <IncidentHeaderSkeleton />
          <IncidentMetricsHudSkeleton />
        </>
      ) : (
        <>
          <IncidentDetailsHeader incidentId={safeIncidentId} monitor={overview.monitor} />
          <IncidentMetricsHud overview={overview} />
        </>
      )}

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Activity Timeline */}
        <div className="lg:col-span-2 space-y-6">
          {isTimelineLoading ? (
            <IncidentTimelineSkeleton />
          ) : (
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 md:p-6 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h2 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 text-red-400" /> Activity Timeline
                </h2>
                <span className="text-[10px] font-mono text-zinc-500">
                  {timeline.length} entries recorded
                </span>
              </div>

              {timeline.length === 0 ? (
                <div className="p-8 text-center text-xs text-zinc-500 font-mono">
                  No activity records logged for this incident.
                </div>
              ) : (
                <div className="relative border-l border-zinc-800 ml-3 pl-5 space-y-6">
                  {timeline.map((act, idx) => (
                    <div key={idx} className="relative">
                      <span className="absolute -left-[29px] top-0.5 w-5 h-5 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-400 font-bold font-mono flex items-center justify-center">
                        {idx + 1}
                      </span>

                      <div className="p-3.5 bg-zinc-900/40 border border-zinc-800/80 rounded-lg space-y-1 overflow-x-auto">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <h3 className="font-semibold text-zinc-200 text-xs font-sans">{act.title}</h3>
                          <span className="text-[10px] text-zinc-500 font-mono flex items-center gap-1">
                            <Clock className="w-3 h-3 text-zinc-600" />
                            {new Date(act.occurredAt).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 font-mono leading-relaxed wrap-break-word">{act.message} {act.message}
                          {act.message}{act.message} Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus nesciunt quos nobis iure rem laboriosam molestiae animi deleniti sequi! Saepe voluptatibus quaerat ratione! A vero officia nobis nisi amet minima sed voluptatibus laudantium repellat, natus totam illo? Numquam accusantium, quod mollitia odio dicta soluta nemo reprehenderit maxime veniam. Recusandae alias corrupti laboriosam repellat ducimus molestiae iste officiis maxime molestias, voluptatibus repudiandae ratione quas et quisquam iusto ipsum quia dignissimos incidunt quaerat blanditiis numquam placeat ea. Quis, dolorem in perferendis illo ducimus qui ab facilis atque recusandae temporibus aliquam nisi maiores minima ea, voluptatum, accusamus doloremque itaque dolore eveniet dolor. Illum molestiae nobis delectus corrupti, odio ea suscipit amet, laborum dignissimos rerum fuga deserunt! Adipisci dicta eum dignissimos velit eaque voluptatum odit ad asperiores accusamus laudantium optio illum, minus excepturi iusto veritatis, est, animi repellat. Dolore cum ipsa exercitationem quam reprehenderit atque aliquam provident nulla temporibus deleniti officia magnam cumque, sed sapiente laborum perspiciatis delectus. Alias expedita incidunt aspernatur deserunt quidem doloribus inventore libero assumenda quo, esse aperiam tempore magni, neque possimus non? Dignissimos recusandae qui laborum, sit tempore iste nihil a atque magnam voluptatem itaque, cupiditate laboriosam! Sint laborum, voluptatibus voluptas eius exercitationem a nesciunt quisquam amet dolorum, eligendi, architecto porro blanditiis voluptate doloribus est. Obcaecati, facere recusandae. Nobis incidunt repudiandae, hic dolorum atque similique architecto. Dicta non veritatis cum fugiat doloribus, illum aspernatur animi earum tenetur placeat consequuntur in laudantium necessitatibus libero numquam perferendis nemo velit id molestiae sapiente odit laboriosam eaque, suscipit eius. Error repellat, veniam eius, beatae adipisci magnam cumque recusandae laudantium neque officia culpa quisquam aut eveniet ex perspiciatis. Vero voluptatem soluta vel quas culpa ipsa itaque doloribus nisi neque explicabo animi ex magnam molestiae velit, atque natus temporibus autem iure quo distinctio laboriosam, veniam quidem quam. Voluptatem, animi eligendi! Odit autem consequuntur nihil voluptatibus fugit obcaecati possimus laudantium quibusdam nobis, debitis nisi voluptas non, deserunt dignissimos vero soluta culpa animi necessitatibus perferendis expedita. Architecto magni iste ea nobis, aliquam laboriosam! Molestias tempora molestiae suscipit sit veritatis ut enim nesciunt voluptatem, esse ipsa blanditiis natus. Architecto accusantium exercitationem ut illo sed, facere hic minus quia rem illum blanditiis non ipsam, itaque a. Commodi hic amet suscipit adipisci eos sunt eligendi similique, ex porro odit cumque quia in aspernatur accusamus molestiae dolorem. Velit dolores quod ad, modi nam laudantium fuga facere cumque dolorem adipisci aliquam esse fugiat quo quae aliquid est iste rem dolor architecto voluptate sunt. Fugit, aliquam quos, qui aliquid ab ipsum aut reprehenderit debitis eaque blanditiis laudantium nesciunt voluptas dicta cumque obcaecati, eos doloremque? Eum atque dolore modi animi quae saepe, exercitationem debitis nesciunt, dolorem dolorum voluptas unde aspernatur id consequuntur soluta. Dignissimos maxime delectus quasi accusamus? Esse, debitis repellat, nisi sequi laboriosam sunt ex consectetur iusto ullam delectus molestias dignissimos perferendis porro harum voluptas non suscipit quam optio dicta natus ipsum repudiandae repellendus? Aspernatur, beatae! Pariatur cumque iure quasi tempore placeat recusandae necessitatibus veritatis ipsa. Accusantium qui vitae doloribus ducimus explicabo, quis rem, reprehenderit quae ipsam voluptatum similique obcaecati corrupti culpa vel delectus!

                        </p>
                        <span className="inline-block mt-1 text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">
                          {act.type}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar Controls & Escalations */}
        <div className="space-y-6">
          {isOverviewLoading || !overview ? (
            <IncidentSidebarSkeleton />
          ) : (
            <>
              <IncidentDiagnosticPanel
                onRunTrace={handleRunTrace}
                isTracing={traceMutation.isPending}
                latestTrace={latestTrace}
              />

              <IncidentAssigneeSelector
                currentAssignedTo={overview.assignedTo}
                members={members}
                onAssign={handleAssign}
                isAssigning={assignMutation.isPending}
              />

              {/* <IncidentNotificationChannels
                notifications={overview.notificationTrace}
              /> */}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export { IncidentDetails };