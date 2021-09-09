import React, { useEffect } from "react";
import useSWR from "swr";
import Fetcher from "lib/fetcher";

export default function ViewsCounter({ slug }: { slug: string }): JSX.Element {
  const { data } = useSWR(`/api/views/${slug}`);
  const views = (data as unknown as Record<string, number>)?.total;

  useEffect(() => {
    const registerView = (): Promise<Response> =>
      fetch(`/api/views/${slug}`, { method: "POST" });

    registerView();
  }, [slug]);

  return <>{views ? views : "---"} views</>;
}
