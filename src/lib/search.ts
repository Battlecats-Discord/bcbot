import { google } from "googleapis";

const buildQuery = (query: string, website?: string) => {
  if (website) {
    return `site:${website} ${query}`;
  }
  return query;
};

export const search = async (query: string, website?: string) => {
  const res = await google.customsearch("v1").cse.list({
    cx: process.env.CX,
    q: buildQuery(query, website),
    auth: process.env.GOOGLE_API_KEY,
  });
  return res.data.items?.slice(0, 5).map((item) => ({
    title: item.title,
    link: item.link,
  }));
};
