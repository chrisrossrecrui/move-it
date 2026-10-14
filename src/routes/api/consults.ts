import { createFileRoute } from "@tanstack/react-router";
import { consultInputSchema } from "@/lib/lead-schema";
import { buildConsultPayload, dispatchGithub } from "@/server/lead-dispatch.server";

export const Route = createFileRoute("/api/consults")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let raw: unknown;
        try {
          raw = await request.json();
        } catch {
          return Response.json({ error: "Invalid JSON." }, { status: 400 });
        }
        const parsed = consultInputSchema.safeParse(raw);
        if (!parsed.success) {
          return Response.json({ error: "Invalid consult.", issues: parsed.error.issues }, { status: 400 });
        }
        const built = buildConsultPayload(parsed.data);
        if ("error" in built) {
          return Response.json({ error: built.error }, { status: 400 });
        }
        await dispatchGithub("moveit.consult.selected", built.payload);
        return Response.json({ accepted: true, key: parsed.data.key }, { status: 202 });
      },
    },
  },
});
