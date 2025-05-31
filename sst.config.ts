/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "keizerworks",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
    };
  },
  async run() {
    new sst.aws.Nextjs("www", {
      domain:
        $app.stage === "production"
          ? {
              name: "keizerworks.com",
              // redirects: ["www.keizerworks.com"],
              dns: sst.cloudflare.dns({
                zone: process.env.CLOUDFLARE_ZONE_ID
              }),
            }
          : undefined,
      environment: {
        EMAIL: process.env.EMAIL!,
        EMAIL_APP_PASSWORD: process.env.EMAIL_APP_PASSWORD!,
        NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL!,
        NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL!,
        NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      },
    });
  },
});
