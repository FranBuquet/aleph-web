import { redirect } from "next/navigation";

export default async function MagicLinkPage({
  params,
  searchParams,
}: {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ r?: string }>;
}) {
  const { token } = await params;
  const { r } = await searchParams;
  const dest = r ? `/api/magic/${token}?r=${encodeURIComponent(r)}` : `/api/magic/${token}`;
  redirect(dest);
}
