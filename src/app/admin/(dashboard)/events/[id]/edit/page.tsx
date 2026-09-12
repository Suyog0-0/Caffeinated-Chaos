import { SecondaryContentEditorPage } from "@/components/admin/secondary-content-editor-page";

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <SecondaryContentEditorPage id={id} kind="event" />;
}
