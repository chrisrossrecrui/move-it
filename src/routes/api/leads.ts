import { createFileRoute } from "@tanstack/react-router";
import { leadInputSchema } from "@/lib/lead-schema";
import { buildLeadPayload, dispatchGithub } from "@/server/lead-dispatch.server";

export const Route = createFileRoute("/api/leads")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let raw: unknown;
        try {
          raw = await request.json();
        } catch {
          return Response.json({ error: "Invalid JSON." }, { status: 400 });
        }
        const parsed = leadInputSchema.safeParse(raw);
        if (!parsed.success) {
          return Response.json({ error: "Invalid lead.", issues: parsed.error.issues }, { status: 400 });
        }
        const built = await buildLeadPayload(parsed.data);
        if ("error" in built) {
          return Response.json({ error: built.error }, { status: 400 });
        }
        await dispatchGithub("moveit.lead.created", built.payload);
        return Response.json({ accepted: true, key: built.key }, { status: 202 });
      },
    },
  },
});
