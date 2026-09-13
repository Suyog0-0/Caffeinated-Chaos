import { ShieldCheck } from "lucide-react";
import { requireSuperAdmin } from "@/app/admin/admin-auth";
import { StaffAccountForm } from "@/components/admin/staff-account-form";
import { adminTw } from "@/components/admin/admin-tailwind";

type StaffRecord = {
  id: string;
  name: string;
  email: string;
};

export default async function StaffPage({
  searchParams,
}: {
  searchParams: Promise<{ notice?: string }>;
}) {
  const [{ supabase }, { notice }] = await Promise.all([
    requireSuperAdmin(),
    searchParams,
  ]);

  const { data, error } = await supabase
    .from("admin")
    .select("id, name, email")
    .order("name", { ascending: true })
    .returns<StaffRecord[]>();

  const staff = data ?? [];

  return (
    <div className={adminTw.pageContent}>
      <header className={adminTw.pageHeader}>
        <div>
          <p>Access control</p>
          <h1>Staff accounts</h1>
        </div>
        <span>{staff.length} current staff</span>
      </header>

      {notice === "created" && (
        <p className={adminTw.notice} role="status">
          Super admin account created successfully.
        </p>
      )}

      {error && (
        <p className={`${adminTw.notice} ${adminTw.noticeError}`} role="alert">
          Staff accounts could not be loaded. Refresh the page to try again.
        </p>
      )}

      <div className="mt-8 grid items-start gap-8 xl:grid-cols-[minmax(360px,0.8fr)_minmax(460px,1.2fr)]">
        <StaffAccountForm />

        <section className="border border-[#d4d5ce] bg-[#fffefb]" aria-labelledby="current-staff-title">
          <div className={adminTw.formHeading}>
            <div>
              <h2 id="current-staff-title">Current staff</h2>
              <p>Administrators who can access the management workspace.</p>
            </div>
          </div>

          {staff.length > 0 ? (
            <ul className="divide-y divide-[#d4d5ce]">
              {staff.map((member) => {
                const initials = member.name
                  .split(/\s+/)
                  .filter(Boolean)
                  .slice(0, 2)
                  .map((part) => part[0]?.toUpperCase())
                  .join("");

                return (
                  <li
                    className="grid grid-cols-[42px_minmax(0,1fr)_auto] items-center gap-4 px-6 py-5 max-[720px]:grid-cols-[38px_minmax(0,1fr)] max-[720px]:px-5"
                    key={member.id}
                  >
                    <span
                      aria-hidden="true"
                      className="grid size-[42px] place-items-center rounded-full bg-[#e7e8e2] text-xs font-bold text-[#36594b] max-[720px]:size-[38px]"
                    >
                      {initials || "?"}
                    </span>
                    <span className="min-w-0">
                      <strong className="block truncate text-[15px] font-semibold text-[#17251f]">
                        {member.name}
                      </strong>
                      <small className="mt-1 block truncate text-xs text-[#68756f]">
                        {member.email}
                      </small>
                    </span>
                    <span className="inline-flex items-center gap-1.5 border border-[#aac2b7] bg-[#e9f0ec] px-2.5 py-1.5 text-[11px] font-semibold text-[#204e3a] max-[720px]:col-start-2 max-[720px]:w-fit">
                      <ShieldCheck aria-hidden="true" size={13} />
                      super_admin
                    </span>
                  </li>
                );
              })}
            </ul>
          ) : (
            !error && (
              <p className="px-6 py-12 text-center text-sm text-[#68756f]">
                No staff accounts are available.
              </p>
            )
          )}
        </section>
      </div>
    </div>
  );
}
