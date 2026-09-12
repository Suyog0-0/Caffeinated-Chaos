import Image from "next/image";

export function AdminShellLoading() {
  return (
    <div className="admin-shell admin-loading-shell" aria-label="Loading admin workspace" role="status">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <Image alt="IJMR — Journal of Multidisciplinary Research" height={67} priority src="/ijmr-logo-white.svg" width={170} />
          <small>Admin workspace</small>
        </div>
        <div className="admin-loading-nav">{Array.from({ length: 6 }, (_, index) => <i key={index} />)}</div>
      </aside>
      <main className="admin-main"><AdminPageLoading /></main>
    </div>
  );
}

export function AdminPageLoading() {
  return (
    <div className="admin-page-content admin-loading-page" aria-label="Loading page" role="status">
      <header><i /><b /></header>
      <section>{Array.from({ length: 4 }, (_, index) => <i key={index} />)}</section>
      <div />
    </div>
  );
}

export function ResearcherListLoading() {
  return (
    <div className="admin-list-loading" aria-label="Loading researchers" role="status">
      {Array.from({ length: 6 }, (_, index) => <i key={index} />)}
    </div>
  );
}

export function OverviewDataLoading() {
  return (
    <div className="admin-overview-loading" aria-label="Loading overview data" role="status">
      <section>{Array.from({ length: 4 }, (_, index) => <i key={index} />)}</section>
      <div />
    </div>
  );
}
