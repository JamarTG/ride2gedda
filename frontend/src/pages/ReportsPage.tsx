import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconThumbUp,
  IconPlus,
  IconSend
} from "@tabler/icons-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useReports, useSubmitReport } from "@/hooks/useReports";
import { ReportCategory, ReportStatus } from "@/types";
import { cn } from "@/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";
import { categoryMeta } from "@/constants/reportCategories";

const statusColors: Record<ReportStatus, string> = {
  [ReportStatus.Open]: "bg-warning text-warning-foreground",
  [ReportStatus.Acknowledged]: "bg-primary text-primary-foreground",
  [ReportStatus.Resolved]: "bg-success text-success-foreground",
};

export default function ReportsPage() {
  const { data: reports, isLoading } = useReports();
  const submitReport = useSubmitReport();
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<ReportCategory>(ReportCategory.Delay);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitReport.mutateAsync({
      userId: "u1",
      userName: "You",
      category,
      title,
      description,
    });
    setTitle("");
    setDescription("");
    setShowForm(false);
    toast({ title: "Report submitted", description: "Thank you for keeping the community informed!" });
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold">Community Reports</h1>
          <p className="mt-1 text-sm text-muted-foreground">Report issues and view community updates</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} size="sm" className="gap-1 text-sm font-medium">
          <IconPlus className="h-4 w-4" /> Report
        </Button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
            <Card className="border">
              <CardContent className="p-4">
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(categoryMeta).map(([key, meta]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setCategory(key as ReportCategory)}
                        className={cn(
                          "rounded-full px-3 py-1 text-xs font-medium transition-colors border",
                          category === key
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-muted text-muted-foreground border-transparent hover:border-border"
                        )}
                      >
                        <meta.Icon className="mr-1.5 inline-block h-5 w-5" />
                        {meta.label}
                      </button>
                    ))}
                  </div>
                  <Input placeholder="Report title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                  <Textarea placeholder="Describe the issue…" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} required />
                  <Button type="submit" disabled={submitReport.isPending} className="gap-1">
                    <IconSend className="h-4 w-4" /> Submit
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-3">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-24 w-full rounded-lg" />)
          : reports?.map((r) => (
              <Card key={r.id} className="border">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="inline-flex items-center gap-1.5 text-md">
                          {(() => {
                            const meta = categoryMeta[r.category];
                            const Icon = meta.Icon;
                            return <Icon className="h-5" />;
                          })()}
                          {categoryMeta[r.category].label}
                        </span>
                        <Badge className={cn("text-[10px] px-1.5 py-0", statusColors[r.status])}>{r.status}</Badge>
                      </div>
                      <p className="text-sm font-semibold">{r.title}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{r.description}</p>
                      <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{r.userName}</span>
                        <span>·</span>
                        <span>{new Date(r.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 rounded-lg bg-muted px-2 py-1 text-xs">
                      <IconThumbUp fill="" className="text-gray-200 h-" />
                      <span className="font-medium text-lg">{r.upvotes}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
      </div>
    </div>
  );
}
