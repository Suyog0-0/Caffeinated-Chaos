import Image from "next/image";
import { adminTw } from "@/components/admin/admin-tailwind";

export function AdminShellLoading() {
  return (
    <div className={adminTw.shell} aria-label="Loading admin workspace" role="status">
      <aside className={adminTw.sidebar}>
        <div className={adminTw.brand}>
          <Image alt="IJMR — Journal of Multidisciplinary Research" height={67} priority src="/ijmr-logo-white.svg" width={170} />
          <small>Admin workspace</small>
        </div>
        <div className="mt-[18px] grid gap-[9px]">{Array.from({ length: 6 }, (_, index) => <i className={`${adminTw.skeleton} h-[38px] rounded-md !bg-[#1a2d48]`} key={index} />)}</div>
      </aside>
      <main className={adminTw.main}><AdminPageLoading /></main>
    </div>
  );
}

export function AdminPageLoading() {
  return (
    <div className={adminTw.pageContent} aria-label="Loading page" role="status">
      <header className="flex items-end justify-between border-b border-[#d4d5ce] pb-6"><i className={`${adminTw.skeleton} h-[52px] w-[190px]`} /><b className={`${adminTw.skeleton} h-4 w-[100px]`} /></header>
      <section className="mt-[34px] grid grid-cols-4 gap-px border border-[#d4d5ce] bg-[#d4d5ce] max-[980px]:grid-cols-2">{Array.from({ length: 4 }, (_, index) => <i className={`${adminTw.skeleton} h-[170px] !bg-[#fffefb]`} key={index} />)}</section>
      <div className={`${adminTw.skeleton} mt-[30px] h-[220px]`} />
    </div>
  );
}

export function ResearcherListLoading() {
  return (
    <div className="mt-6 grid gap-px border-y border-[#d4d5ce] bg-[#d4d5ce]" aria-label="Loading researchers" role="status">
      {Array.from({ length: 6 }, (_, index) => <i className={`${adminTw.skeleton} h-[82px] !bg-[#fffefb]`} key={index} />)}
    </div>
  );
}

export function OverviewDataLoading() {
  return (
    <div aria-label="Loading overview data" role="status">
      <section className="mt-[34px] grid grid-cols-4 gap-px border border-[#d4d5ce] bg-[#d4d5ce] max-[980px]:grid-cols-2">{Array.from({ length: 4 }, (_, index) => <i className={`${adminTw.skeleton} h-[174px] !bg-[#fffefb]`} key={index} />)}</section>
      <div className={`${adminTw.skeleton} mt-[30px] h-[220px]`} />
    </div>
  );
}
