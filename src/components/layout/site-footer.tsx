import Link from "next/link";

export function SiteFooter() {
  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
/* Footer base */
.site-footer {
  background: #0d2a20;
  color: #fffefb;
}
.footer-grid {
  padding-block: 62px 52px;
  display: grid;
  grid-template-columns: 1.7fr repeat(3, 1fr);
  gap: 54px;
}
.footer-brand {
  display: flex;
  gap: 15px;
}
/* Footer refinements */
.footer-brand strong {
  font-size: 24px;
}
.footer-brand p,
.footer-grid > div > p {
  color: #c3d0c9;
  font-size: 16px;
}
.footer-grid h3 {
  color: #d9e2dd;
  font-size: 12px;
}
.footer-grid > div > a {
  display: block;
  margin: 9px 0;
  color: #edf2ef;
  font-size: 16px;
}
.footer-bottom {
  padding-block: 20px 28px;
  color: #b8c7bf;
  font-size: 11px;
}
.footer-seal {
  width: 62px;
  height: 70px;
  flex: 0 0 62px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #9db0a6;
  color: var(--white);
}
.footer-seal b {
  font-size: 26px;
  line-height: 1;
  font-weight: 500;
}
.footer-seal small {
  margin-top: 8px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 7px;
  letter-spacing: 0.08em;
}

/* Directory and detail pages */
.directory-page {
  padding-bottom: 100px;
}
.page-hero {
  padding-block: 92px 65px;
  border-bottom: 1px solid var(--ink);
}
.page-hero h1,
.image-page-hero h1,
.detail-banner h1,
.profile-hero h1,
.project-detail-hero h1,
.about-hero h1,
.search-page-head h1,
.admin-title h1,
.login-page h1 {
  max-width: 900px;
  margin: 0;
  font-size: clamp(54px, 7vw, 92px);
  font-weight: 400;
  line-height: 0.94;
  letter-spacing: -0.045em;
}
.page-hero > p:last-child,
.image-page-hero p,
.detail-banner > p,
.project-detail-hero > div > p,
.about-hero > div > p,
.admin-title > div > p {
  max-width: 650px;
  color: var(--ink-soft);
  font-size: 20px;
}
.directory-list {
  border-top: 0;
}
.directory-row {
  min-height: 190px;
  display: grid;
  grid-template-columns: 55px 1fr 220px auto;
  gap: 28px;
  align-items: center;
  border-bottom: 1px solid var(--line);
}
.directory-row > span,
.directory-row > b,
.directory-row dt {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 10px;
}
.directory-row h2 {
  margin: 0;
  font-size: 32px;
  font-weight: 500;
}
.directory-row p {
  max-width: 650px;
  margin: 7px 0 0;
  color: var(--ink-soft);
  font-size: 15px;
}
.directory-row dl {
  display: flex;
  gap: 28px;
  margin: 0;
}
.directory-row dl div {
  min-width: 65px;
}
.directory-row dt {
  color: var(--ink-soft);
}
.directory-row dd {
  margin: 4px 0 0;
  font-size: 22px;
}
.directory-row > b {
  text-decoration: underline;
  text-underline-offset: 5px;
}
.filter-strip {
  margin: 42px 0;
  display: grid;
  grid-template-columns: 1fr 220px 220px;
  border: 1px solid var(--line);
  background: var(--white);
}
.filter-strip input,
.filter-strip select {
  min-height: 54px;
  padding: 0 18px;
  border: 0;
  border-right: 1px solid var(--line);
  border-radius: 0;
  background: transparent;
  color: var(--ink);
  font-family: Arial, Helvetica, sans-serif;
  font-size: 12px;
}
.filter-strip select:last-child {
  border-right: 0;
}
.profile-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-top: 1px solid var(--ink);
  border-left: 1px solid var(--line);
}
.profile-card {
  min-height: 360px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  background: var(--white);
}
.large-avatar,
.portrait-placeholder {
  display: grid;
  place-items: center;
  background: var(--forest);
  color: #fff;
  border-radius: 50%;
  font-family: Arial, Helvetica, sans-serif;
}
.large-avatar {
  width: 80px;
  height: 80px;
  margin-bottom: 48px;
  font-size: 15px;
}
.profile-card > p {
  margin: 0;
  color: var(--forest);
  font-family: Arial, Helvetica, sans-serif;
  font-size: 10px;
}
.profile-card h2 {
  margin: 10px 0 2px;
  font-size: 25px;
  line-height: 1.1;
  font-weight: 500;
}
.profile-card > small {
  color: var(--ink-soft);
}
.profile-card > div {
  margin-top: auto;
  display: flex;
  gap: 18px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 9px;
}
.image-page-hero {
  padding-block: 65px;
  background: var(--forest-deep);
  color: var(--white);
}
.image-page-hero > .shell {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8vw;
  align-items: center;
}
.image-page-hero p {
  color: #c5d2cb;
}
.image-page-hero img {
  width: 100%;
  height: 390px;
  object-fit: cover;
  filter: saturate(0.7) contrast(1.05);
}
.project-list,
.library-list {
  border-top: 1px solid var(--ink);
}
.project-row {
  min-height: 155px;
  display: grid;
  grid-template-columns: 16px 1fr 220px 55px;
  gap: 25px;
  align-items: center;
  border-bottom: 1px solid var(--line);
}
.status-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #87918c;
}
.status-dot.ongoing {
  background: #267457;
}
.status-dot.completed {
  background: #2a5776;
}
.project-row p,
.library-row p {
  margin: 0;
  color: var(--forest);
  font-family: Arial, Helvetica, sans-serif;
  font-size: 9px;
}
.project-row h2,
.library-row h2 {
  margin: 6px 0;
  font-size: 25px;
  font-weight: 500;
  line-height: 1.2;
}
.project-row small {
  display: block;
  max-width: 680px;
  color: var(--ink-soft);
  font-size: 14px;
}
.project-row > b,
.project-row > i {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 10px;
  font-style: normal;
}
.library-row {
  min-height: 170px;
  display: grid;
  grid-template-columns: 45px 1fr 230px 115px;
  gap: 24px;
  align-items: center;
  border-bottom: 1px solid var(--line);
}
.library-row > span,
.library-row small,
.library-row button {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 10px;
}
.library-row > div:nth-child(3) {
  display: grid;
  gap: 8px;
}
.library-row > div:nth-child(3) b {
  font-size: 13px;
  font-weight: 500;
}
.library-row button {
  padding: 11px;
  border: 1px solid var(--ink);
  background: transparent;
  cursor: pointer;
}
.detail-page {
  padding-bottom: 100px;
}
.detail-banner {
  padding-block: 82px;
  border-bottom: 1px solid var(--ink);
}
.detail-banner > p:first-child,
.project-detail-hero > div > p:first-child {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 10px;
}
.detail-banner dl,
.project-detail-hero dl {
  display: flex;
  gap: 60px;
  margin: 50px 0 0;
}
.detail-banner dt,
.project-detail-hero dt,
.stacked-facts dt {
  color: var(--ink-soft);
  font-family: Arial, Helvetica, sans-serif;
  font-size: 9px;
}
.detail-banner dd,
.project-detail-hero dd {
  margin: 4px 0 0;
  font-size: 18px;
}
.detail-columns {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 330px;
  gap: 9vw;
  padding-top: 72px;
}
.detail-columns h2 {
  margin: 0 0 24px;
  font-size: 35px;
  font-weight: 500;
}
.detail-columns section > h2:not(:first-child),
.detail-columns aside > h2:not(:first-child) {
  margin-top: 55px;
}
.simple-record {
  display: block;
  padding: 24px 0;
  border-top: 1px solid var(--line);
}
.simple-record small,
.aside-record small {
  color: var(--forest);
  font-family: Arial, Helvetica, sans-serif;
  font-size: 9px;
}
.simple-record h3 {
  margin: 5px 0;
  font-size: 23px;
  font-weight: 500;
}
.simple-record p {
  margin: 0;
  color: var(--ink-soft);
  font-size: 14px;
}
.mini-person {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-top: 1px solid var(--line);
}
.mini-person span {
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: var(--paper-warm);
  font-family: Arial, Helvetica, sans-serif;
  font-size: 9px;
}
.mini-person b {
  font-size: 16px;
  font-weight: 500;
}
.aside-record {
  padding: 15px 0;
  border-top: 1px solid var(--line);
}
.aside-record p {
  margin: 4px 0 0;
  font-size: 15px;
  line-height: 1.25;
}
.profile-hero {
  padding-block: 80px;
  display: flex;
  align-items: center;
  gap: 45px;
  border-bottom: 1px solid var(--ink);
}
.portrait-placeholder {
  width: 150px;
  height: 150px;
  flex: 0 0 150px;
  font-size: 27px;
}
.profile-hero h1 {
  font-size: clamp(52px, 6vw, 80px);
}
.profile-hero > div > p:last-child {
  color: var(--ink-soft);
}
.lead-copy {
  max-width: 760px;
  font-size: 22px;
}
.stacked-facts {
  margin: 0;
}
.stacked-facts div {
  padding: 14px 0;
  border-top: 1px solid var(--line);
}
.stacked-facts dd {
  margin: 4px 0 0;
  font-size: 15px;
}
.project-detail-hero {
  padding-block: 70px;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 7vw;
  align-items: center;
  border-bottom: 1px solid var(--ink);
}
.project-detail-hero h1 {
  font-size: clamp(48px, 5.5vw, 75px);
}
.project-detail-hero img {
  width: 100%;
  height: 430px;
  object-fit: cover;
}
.objective-list {
  padding-left: 22px;
}
.objective-list li {
  padding: 9px 0;
  border-bottom: 1px solid var(--line);
}
.status-note {
  display: inline-block;
  padding: 8px 12px;
  background: var(--paper-warm);
  font-family: Arial, Helvetica, sans-serif;
  font-size: 11px;
}
.search-page-head {
  padding-block: 75px;
  background: var(--forest-deep);
  color: var(--white);
}
.search-page-head h1 {
  font-size: clamp(50px, 6vw, 80px);
}
.large-search {
  margin-top: 35px;
  display: grid;
  grid-template-columns: 1fr auto;
  background: var(--white);
}
.large-search input {
  min-height: 64px;
  padding: 0 20px;
  border: 0;
  outline: 0;
  color: var(--ink);
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
}
.large-search button {
  margin: 7px;
  padding: 0 25px;
  border: 0;
  background: var(--yellow);
  color: var(--ink);
  font-family: Arial, Helvetica, sans-serif;
  font-size: 12px;
  font-weight: 700;
}
.search-results {
  padding-block: 60px 100px;
}
.result-summary {
  padding-bottom: 25px;
  border-bottom: 1px solid var(--ink);
}
.search-results section {
  display: grid;
  grid-template-columns: 220px repeat(3, 1fr);
  border-bottom: 1px solid var(--ink);
}
.search-results section > h2 {
  margin: 0;
  padding: 28px 20px 28px 0;
  font-size: 25px;
  font-weight: 500;
}
.search-results section > h2 span {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 9px;
}
.search-result {
  padding: 28px 22px;
  border-left: 1px solid var(--line);
}
.search-result small {
  color: var(--forest);
  font-family: Arial, Helvetica, sans-serif;
  font-size: 9px;
}
.search-result h3 {
  margin: 7px 0;
  font-size: 18px;
  line-height: 1.2;
  font-weight: 500;
}
.search-result p {
  margin: 0;
  color: var(--ink-soft);
  font-size: 13px;
  line-height: 1.35;
}
.about-hero {
  padding-block: 80px;
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  gap: 8vw;
  align-items: center;
}
.about-hero img {
  width: 100%;
  height: 500px;
  object-fit: cover;
}
.statement-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-block: 1px solid var(--ink);
}
.statement-grid article {
  padding: 70px 7vw 70px 0;
}
.statement-grid article + article {
  padding-left: 7vw;
  border-left: 1px solid var(--line);
}
.statement-grid span {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 10px;
}
.statement-grid h2,
.leadership-section h2,
.partners h2 {
  margin: 15px 0;
  font-size: 42px;
  line-height: 1.05;
  font-weight: 500;
}
.statement-grid p {
  color: var(--ink-soft);
}
.leadership-section {
  padding-block: 85px;
  background: var(--forest-deep);
  color: #fff;
}
.leadership-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 50px;
  border-top: 1px solid #536b61;
}
.leadership-list > div {
  padding: 30px 25px 0 0;
}
.leadership-list span {
  width: 58px;
  height: 58px;
  display: grid;
  place-items: center;
  border: 1px solid #799087;
  border-radius: 50%;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 10px;
}
.leadership-list h3 {
  margin: 18px 0 3px;
  font-size: 22px;
  font-weight: 500;
}
.leadership-list p {
  margin: 0;
  color: #b7c6be;
  font-size: 14px;
}
.partners {
  padding-block: 90px;
}
.partners > div {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin-top: 35px;
  border-top: 1px solid var(--ink);
}
.partners > div span {
  padding: 25px 20px 25px 0;
  border-bottom: 1px solid var(--line);
  font-size: 18px;
}
.admin-page {
  padding-block: 70px 100px;
  background: #f1f0eb;
}
.admin-title {
  display: flex;
  justify-content: space-between;
  align-items: end;
}
.admin-title h1 {
  font-size: 58px;
}
.admin-title button,
.manager button,
.login-page button {
  padding: 12px 18px;
  border: 0;
  background: var(--forest);
  color: #fff;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 11px;
}
.admin-stats {
  margin-top: 45px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  background: var(--white);
  border: 1px solid var(--line);
}
.admin-stats > div {
  padding: 25px;
  border-right: 1px solid var(--line);
}
.admin-stats > div:last-child {
  border: 0;
}
.admin-stats span,
.admin-table,
.manager nav {
  font-family: Arial, Helvetica, sans-serif;
}
.admin-stats span {
  font-size: 10px;
}
.admin-stats strong {
  display: block;
  margin-top: 10px;
  font-size: 34px;
  font-weight: 500;
}
.attention-panel,
.manager {
  margin-top: 35px;
  padding: 30px;
  background: var(--white);
  border: 1px solid var(--line);
}
.attention-panel > div,
.manager-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.attention-panel h2,
.manager h2 {
  margin: 0;
  font-size: 30px;
  font-weight: 500;
}
.attention-panel ul {
  margin: 20px 0 0;
  padding: 0;
  list-style: none;
}
.attention-panel li {
  display: grid;
  grid-template-columns: 280px 1fr;
  padding: 16px 0;
  border-top: 1px solid var(--line);
}
.attention-panel li b {
  font-size: 16px;
}
.attention-panel li p {
  margin: 0;
  color: var(--ink-soft);
  font-size: 14px;
}
.manager nav {
  display: flex;
  gap: 5px;
}
.manager nav button {
  padding: 8px 10px;
  background: transparent;
  color: var(--ink);
  border: 1px solid var(--line);
}
.admin-table {
  margin-top: 25px;
  border-top: 1px solid var(--ink);
  font-size: 11px;
}
.admin-tr {
  min-height: 54px;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 70px;
  align-items: center;
  border-bottom: 1px solid var(--line);
}
.admin-th {
  color: var(--ink-soft);
  font-size: 9px;
}
.admin-tr button {
  justify-self: start;
  padding: 6px 9px;
  background: transparent;
  color: var(--ink);
  border: 1px solid var(--line);
}
.admin-note {
  color: var(--ink-soft);
  font-size: 13px;
}
.admin-exit {
  margin-top: 25px;
  font-size: 14px;
}
.login-page {
  min-height: 75vh;
  display: grid;
  place-items: center;
  padding: 60px 20px;
}
.login-page > section {
  width: min(100%, 470px);
  padding: 45px;
  background: var(--white);
  border: 1px solid var(--line);
  box-shadow: 9px 9px 0 var(--paper-warm);
}
.login-page h1 {
  font-size: 54px;
}
.login-page > section > p {
  color: var(--ink-soft);
}
.login-page form {
  display: grid;
  gap: 17px;
  margin: 30px 0 15px;
}
.login-page label {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 10px;
}
.login-page input {
  width: 100%;
  min-height: 48px;
  margin-top: 7px;
  padding: 0 12px;
  border: 1px solid var(--line);
  font-family: Arial, Helvetica, sans-serif;
  font-size: 12px;
}
.login-page button {
  min-height: 48px;
}
.login-page small,
.login-page a {
  display: block;
  margin-top: 16px;
  color: var(--ink-soft);
  font-size: 12px;
}
.login-page a {
  text-decoration: underline;
}

@media (max-width: 900px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 34px;
  }
  .profile-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .directory-row {
    grid-template-columns: 40px 1fr auto;
  }
  .directory-row dl {
    grid-column: 2;
  }
  .directory-row > b {
    grid-column: 3;
    grid-row: 1 / span 2;
  }
  .image-page-hero > .shell,
  .about-hero,
  .project-detail-hero {
    grid-template-columns: 1fr;
  }
  .search-results section {
    grid-template-columns: 1fr 1fr;
  }
  .search-results section > h2 {
    grid-column: 1/-1;
  }
  .search-result {
    border-top: 1px solid var(--line);
    border-left: 0;
  }
  .admin-title {
    display: block;
  }
  .admin-title button {
    margin-top: 20px;
  }
  .admin-stats {
    grid-template-columns: repeat(2, 1fr);
  }
  .manager-head {
    display: block;
  }
  .manager nav {
    margin-top: 15px;
    flex-wrap: wrap;
  }
}
@media (max-width: 650px) {
  .footer-grid {
    grid-template-columns: 1fr;
  }
  .page-hero {
    padding-block: 60px 45px;
  }
  .page-hero h1,
  .image-page-hero h1,
  .about-hero h1 {
    font-size: 52px;
  }
  .directory-row {
    grid-template-columns: 30px 1fr;
    padding-block: 28px;
  }
  .directory-row dl {
    grid-column: 2;
  }
  .directory-row > b {
    grid-column: 2;
    grid-row: auto;
  }
  .filter-strip {
    grid-template-columns: 1fr;
  }
  .filter-strip input,
  .filter-strip select {
    border-right: 0;
    border-bottom: 1px solid var(--line);
  }
  .profile-grid {
    grid-template-columns: 1fr;
  }
  .profile-card {
    min-height: 300px;
  }
  .image-page-hero img,
  .about-hero img,
  .project-detail-hero img {
    height: 300px;
  }
  .project-row {
    grid-template-columns: 14px 1fr;
    padding-block: 24px;
  }
  .project-row > b,
  .project-row > i {
    grid-column: 2;
  }
  .library-row {
    grid-template-columns: 28px 1fr;
    padding-block: 25px;
  }
  .library-row > div:nth-child(3),
  .library-row button {
    grid-column: 2;
  }
  .detail-columns {
    grid-template-columns: 1fr;
  }
  .detail-banner dl,
  .project-detail-hero dl {
    display: grid;
    gap: 15px;
  }
  .profile-hero {
    align-items: flex-start;
    gap: 22px;
  }
  .portrait-placeholder {
    width: 80px;
    height: 80px;
    flex-basis: 80px;
  }
  .profile-hero h1 {
    font-size: 43px;
  }
  .statement-grid {
    grid-template-columns: 1fr;
  }
  .statement-grid article,
  .statement-grid article + article {
    padding: 50px 0;
    border-left: 0;
    border-top: 1px solid var(--line);
  }
  .leadership-list {
    grid-template-columns: 1fr;
  }
  .partners > div {
    grid-template-columns: 1fr 1fr;
  }
  .search-results section {
    grid-template-columns: 1fr;
  }
  .admin-stats {
    grid-template-columns: 1fr 1fr;
  }
  .attention-panel li {
    grid-template-columns: 1fr;
  }
  .attention-panel li p {
    margin-top: 5px;
  }
  .admin-table {
    overflow-x: auto;
  }
  .admin-tr {
    min-width: 650px;
  }
  .login-page > section {
    padding: 30px;
  }
  .footer-seal {
    width: 52px;
    height: 60px;
    flex-basis: 52px;
  }
}
.library-action {
  padding: 11px;
  border: 1px solid var(--ink);
  font-family: Arial, Helvetica, sans-serif;
  font-size: 10px;
  text-align: center;
}
@media (max-width: 760px) {
  .detail-columns {
    grid-template-columns: 1fr;
  }
  .library-action {
    grid-column: 2;
  }
  .detail-banner dl,
  .project-detail-hero dl {
    display: grid;
    gap: 15px;
  }
}
      ` }} />
      <footer className="site-footer" id="contact" style={{ marginTop: 'auto' }}>
        <div className="shell footer-grid">
          <div className="footer-brand">
            <span className="footer-seal">
              <b>IR</b>
              <small>EST. 2026</small>
            </span>
            <div>
              <strong>Islington Research</strong>
              <p>Open inquiry. Shared evidence. Meaningful change.</p>
            </div>
          </div>
          <div>
            <h3>Discover</h3>
            <Link href="/research-areas">Research areas</Link>
            <Link href="/people">Researchers</Link>
            <Link href="/projects">Projects</Link>
            <Link href="/publications">Publications</Link>
          </div>
          <div>
            <h3>R&amp;D Hub</h3>
            <Link href="/aboutsection">About us</Link>
            <Link href="/aboutsection">Vision &amp; mission</Link>
            <Link href="/aboutsection">Partners</Link>
            <Link href="/admin">Admin workspace</Link>
          </div>
          <div>
            <h3>Islington College</h3>
            <p>
              Kamal Marg, Kamal Pokhari
              <br />
              Kathmandu, Nepal
            </p>
            <a href="mailto:research@islingtoncollege.edu.np">research@islingtoncollege.edu.np</a>
          </div>
        </div>
        <div className="shell footer-bottom">
          <span>© 2026 Islington College Research &amp; Development</span>
          <span>Built for curiosity</span>
        </div>
      </footer>
    </>
  );
}
