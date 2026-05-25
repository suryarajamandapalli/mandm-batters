import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useAdminAuth } from "@/store/adminAuth";
import { Lock, ShieldCheck, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { AdminLogin } from "@/components/admin/AdminLogin";

export const Route = createFileRoute("/admin/login")({
  component: AdminLogin,
});
