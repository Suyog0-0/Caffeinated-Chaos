"use server";

import { createClient } from "@/supabase/client";

export interface PartnerRecord {
  id: string;
  name: string;
  description: string | null;
  website: string | null;
  logo_url: string | null;
  partner_type: string | null;
  publish_status: string | null;
  is_demo_data: boolean | null;
  created_at: string | null;
  // optional / future columns
  research_area_id?: string | null;
  research_area_name?: string | null;
  education?: string | null;
  google_scholar_url?: string | null;
  orcid?: string | null;
  email?: string | null;
  bio?: string | null;
}

export interface PartnerProjectLink {
  id: string;
  title: string;
  slug: string;
  status?: string | null;
}

export interface PartnerPublicationLink {
  id: string;
  title: string;
  year?: number | null;
}

export async function getPartners(): Promise<PartnerRecord[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("partner")
    .select("*")
    .eq("publish_status", "published")
    .order("name", { ascending: true })
    .limit(9);;

  if (error) {
    console.error("getPartners error:", error.message);
    return [];
  }
  return data ?? [];
}

export async function getPartnerById(id: string): Promise<PartnerRecord | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("partner")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("getPartnerById error:", error.message);
    return null;
  }
  return data;
}

// Cross-link lookups. These assume join tables such as
// `project_partner (project_id, partner_id)` and
// `publication_partner (publication_id, partner_id)` — swap the table
// and column names for whatever you actually use.
export async function getProjectsForPartner(
  partnerId: string
): Promise<PartnerProjectLink[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("project_partner")
    .select("project:project_id(id, title, slug, status)")
    .eq("partner_id", partnerId);

  if (error) {
    console.error("getProjectsForPartner error:", error.message);
    return [];
  }
  return (data ?? []).map((row: any) => row.project).filter(Boolean);
}

export async function getPublicationsForPartner(
  partnerId: string
): Promise<PartnerPublicationLink[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("publication_partner")
    .select("publication:publication_id(id, title, year)")
    .eq("partner_id", partnerId);

  if (error) {
    console.error("getPublicationsForPartner error:", error.message);
    return [];
  }
  return (data ?? []).map((row: any) => row.publication).filter(Boolean);
}
