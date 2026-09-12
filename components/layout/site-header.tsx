"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SiteHeader() {
  const path = usePathname();
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
:root {
  --ink: #17251f;
  --ink-soft: #405149;
  --forest: #153c2e;
  --forest-deep: #0d2a20;
  --paper: #f7f5ef;
  --paper-warm: #eeeae0;
  --white: #fffefb;
  --line: #d7d5cd;
  --yellow: #e1c451;
  --max: 1240px;
}
* {
  box-sizing: border-box;
}
html {
  scroll-behavior: smooth;
}
body {
  margin: 0;
  color: var(--ink);
  background: var(--paper);
  font-family: Garamond, "EB Garamond", "Times New Roman", serif;
  font-size: 18px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}
a {
  color: inherit;
  text-decoration: none;
}
button,
input {
  font: inherit;
}
.shell {
  width: min(calc(100% - 48px), var(--max));
  margin-inline: auto;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
.site-header {
  position: sticky;
  top: 0;
  z-index: 20;
  background: rgba(255, 254, 251, 0.96);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--line);
}
.utility-bar {
  background: var(--forest-deep);
  color: #dfe9e3;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 11px;
  letter-spacing: 0.02em;
}
.utility-inner {
  min-height: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.utility-inner nav {
  display: flex;
  gap: 22px;
}
.utility-inner a:hover {
  color: var(--white);
}
.masthead {
  min-height: 82px;
  display: flex;
  align-items: center;
  gap: 34px;
}
.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 0 0 auto;
}
.brand-mark {
  width: 43px;
  aspect-ratio: 1;
  display: grid;
  place-items: center;
  background: var(--forest);
  color: var(--white);
  font-size: 20px;
  line-height: 1;
}
.brand-name strong {
  display: block;
  font-size: 20px;
  line-height: 1.05;
  font-weight: 600;
  letter-spacing: -0.01em;
}
.brand-name small {
  display: block;
  color: var(--ink-soft);
  font-family: Arial, Helvetica, sans-serif;
  font-size: 10px;
  margin-top: 5px;
}
.primary-nav {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 28px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 13px;
}
.primary-nav a,
.header-search-link {
  position: relative;
}
.primary-nav a:after {
  content: "";
  position: absolute;
  left: 0;
  right: 100%;
  bottom: -8px;
  height: 1px;
  background: var(--forest);
  transition: right 0.2s ease;
}
.primary-nav a:hover:after,
.primary-nav a.active:after {
  right: 0;
}
.primary-nav a.active {
  font-weight: 700;
}
.header-search-link {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 11px 14px;
  border-left: 1px solid var(--line);
  font-family: Arial, Helvetica, sans-serif;
  font-size: 12px;
  font-weight: 600;
}
.mobile-menu {
  display: none;
  margin-left: auto;
  font-family: Arial, Helvetica, sans-serif;
}
.mobile-menu summary {
  cursor: pointer;
  list-style: none;
  font-size: 13px;
  font-weight: 700;
  padding: 10px;
}
.mobile-menu summary::-webkit-details-marker {
  display: none;
}
.hero {
  background: var(--white);
  border-bottom: 1px solid var(--line);
  overflow: hidden;
}
.hero-grid {
  min-height: 650px;
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(430px, 0.75fr);
  gap: 6vw;
  align-items: center;
  padding-block: 64px 72px;
}
.section-kicker {
  margin: 0 0 16px;
  color: var(--forest);
  font-family: Arial, Helvetica, sans-serif;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.01em;
}
.hero h1 {
  max-width: 780px;
  margin: 0;
  font-size: clamp(58px, 6.5vw, 94px);
  line-height: 0.91;
  letter-spacing: -0.045em;
  font-weight: 400;
  text-wrap: balance;
}
.hero-intro {
  max-width: 630px;
  margin: 28px 0;
  color: var(--ink-soft);
  font-size: 21px;
  line-height: 1.45;
}
.discovery-search {
  max-width: 690px;
  min-height: 62px;
  display: grid;
  grid-template-columns: 24px 1fr auto;
  align-items: center;
  gap: 13px;
  padding: 6px 7px 6px 18px;
  border: 1px solid #b7b9b3;
  background: var(--white);
  box-shadow: 7px 7px 0 var(--paper-warm);
}
.discovery-search:focus-within {
  outline: 2px solid var(--forest);
  outline-offset: 3px;
}
.discovery-search input {
  width: 100%;
  min-width: 0;
  border: 0;
  outline: 0;
  background: transparent;
  color: var(--ink);
  font-family: Arial, Helvetica, sans-serif;
  font-size: 15px;
}
.discovery-search input::placeholder {
  color: #727a75;
  opacity: 1;
}
.discovery-search button {
  min-height: 48px;
  padding: 0 24px;
  border: 0;
  background: var(--forest);
  color: var(--white);
  cursor: pointer;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 13px;
  font-weight: 700;
}
.discovery-search button:hover {
  background: var(--forest-deep);
}
.popular-searches {
  margin-top: 22px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px 16px;
  color: var(--ink-soft);
  font-family: Arial, Helvetica, sans-serif;
  font-size: 11px;
}
.popular-searches span {
  font-weight: 700;
}
.popular-searches a {
  text-decoration: underline;
  text-decoration-color: #9ba39e;
  text-underline-offset: 4px;
}
.paper-stage {
  position: relative;
  min-height: 500px;
  isolation: isolate;
}
.paper {
  position: absolute;
  background: var(--white);
  border: 1px solid #c9c7bd;
  box-shadow: 0 24px 60px rgba(27, 39, 33, 0.12);
}
.paper-back {
  inset: 58px 5px 44px 84px;
  transform: rotate(7deg);
  background: var(--yellow);
  border: 0;
  box-shadow: none;
}
.paper-middle {
  inset: 28px 41px 68px 45px;
  transform: rotate(-5deg);
  background: var(--paper-warm);
  display: flex;
  align-items: flex-end;
  padding: 23px;
  color: var(--ink-soft);
  font-family: Arial, Helvetica, sans-serif;
  font-size: 10px;
}
.paper-front {
  inset: 24px 35px 54px 34px;
  z-index: 2;
  padding: 34px 38px;
  transform: rotate(0.8deg);
}
.paper-masthead {
  padding-bottom: 13px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--ink);
  font-family: Arial, Helvetica, sans-serif;
  font-size: 9px;
  font-weight: 700;
}
.paper-subject {
  margin: 28px 0 8px;
  color: var(--forest);
  font-family: Arial, Helvetica, sans-serif;
  font-size: 10px;
  font-weight: 700;
}
.paper-front h2 {
  max-width: 410px;
  margin: 0;
  font-size: clamp(33px, 3.6vw, 46px);
  line-height: 1;
  letter-spacing: -0.025em;
  font-weight: 500;
}
.paper-front > p:not(.paper-subject) {
  max-width: 390px;
  margin: 18px 0;
  color: var(--ink-soft);
  font-size: 15px;
  line-height: 1.45;
}
.paper-author {
  display: flex;
  align-items: center;
  gap: 11px;
  margin-top: 24px;
}
.mini-portrait {
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: var(--forest);
  color: #fff;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 10px;
}
.paper-author strong,
.paper-author small {
  display: block;
}
.paper-author strong {
  font-size: 13px;
}
.paper-author small {
  color: var(--ink-soft);
  font-family: Arial, Helvetica, sans-serif;
  font-size: 9px;
}
.paper-lines {
  position: absolute;
  left: 38px;
  right: 38px;
  bottom: 25px;
  display: grid;
  gap: 5px;
}
.paper-lines i {
  height: 1px;
  background: #dbd9d1;
}
.paper-lines i:last-child {
  width: 64%;
}
.stage-caption {
  position: absolute;
  right: 20px;
  bottom: 0;
  z-index: 4;
  margin: 0;
  color: var(--ink-soft);
  font-family: Arial, Helvetica, sans-serif;
  font-size: 10px;
}
.stage-caption span {
  color: var(--ink);
  font-weight: 700;
  margin-right: 13px;
}
.metrics-strip {
  background: var(--paper-warm);
  border-bottom: 1px solid var(--line);
}
.metrics-grid {
  min-height: 125px;
  display: grid;
  grid-template-columns: 1.5fr repeat(4, 1fr);
  align-items: center;
}
.metrics-intro {
  max-width: 250px;
  font-size: 20px;
  line-height: 1.25;
}
.metrics-grid > div {
  min-height: 58px;
  padding-left: 28px;
  border-left: 1px solid #c7c4ba;
}
.metrics-grid strong,
.metrics-grid span {
  display: block;
}
.metrics-grid strong {
  font-size: 34px;
  line-height: 1;
  font-weight: 500;
}
.metrics-grid span {
  margin-top: 9px;
  color: var(--ink-soft);
  font-family: Arial, Helvetica, sans-serif;
  font-size: 10px;
}
.section {
  padding-block: 104px;
}
.section-heading h2,
.featured-copy h2,
.people-intro h2,
.final-cta h2 {
  margin: 0;
  font-size: clamp(43px, 5vw, 66px);
  line-height: 0.98;
  letter-spacing: -0.035em;
  font-weight: 400;
}
.split-heading {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 72px;
  align-items: end;
  margin-bottom: 52px;
}
.split-heading > p {
  max-width: 470px;
  margin: 0 0 5px;
  color: var(--ink-soft);
}
.area-list {
  border-top: 1px solid var(--ink);
}
.area-row {
  min-height: 150px;
  display: grid;
  grid-template-columns: 70px minmax(0, 1fr) 230px 52px;
  align-items: center;
  gap: 20px;
  border-bottom: 1px solid var(--line);
}
.area-index {
  align-self: start;
  padding-top: 34px;
  color: #7e8782;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 11px;
}
.area-copy strong,
.area-copy small {
  display: block;
}
.area-copy strong {
  font-size: 29px;
  font-weight: 500;
}
.area-copy small {
  max-width: 590px;
  margin-top: 6px;
  color: var(--ink-soft);
  font-size: 15px;
}
.area-counts {
  display: flex;
  gap: 30px;
  color: var(--ink-soft);
  font-family: Arial, Helvetica, sans-serif;
}
.area-counts small {
  font-size: 10px;
}
.area-arrow {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border: 1px solid var(--line);
  transition:
    background 0.2s,
    color 0.2s;
}
.area-row:hover .area-arrow {
  background: var(--forest);
  color: var(--white);
  border-color: var(--forest);
}
.text-link,
.light-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 32px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 12px;
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 6px;
}
.ink-section {
  padding-block: 108px;
  background: var(--forest-deep);
  color: var(--white);
}
.featured-grid {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 10vw;
  align-items: center;
}
.section-kicker.light {
  color: #b6c7bd;
}
.featured-copy > p:not(.section-kicker) {
  max-width: 550px;
  margin: 25px 0;
  color: #c9d4ce;
  font-size: 18px;
}
.project-facts {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 42px 0 0;
  border-block: 1px solid #496057;
}
.project-facts div {
  padding: 18px 12px 18px 0;
}
.project-facts dt {
  color: #9eb0a6;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 9px;
}
.project-facts dd {
  margin: 5px 0 0;
  font-size: 15px;
}
.light-link {
  color: var(--white);
}
.data-figure {
  min-height: 410px;
  padding: 30px 34px;
  display: flex;
  flex-direction: column;
  background: #15372c;
  border: 1px solid #416055;
  box-shadow: 16px 16px 0 #0a2119;
}
.figure-head {
  display: flex;
  justify-content: space-between;
  color: #b7c7bf;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 10px;
}
.figure-value {
  margin-top: 44px;
  display: flex;
  align-items: baseline;
  gap: 14px;
}
.figure-value strong {
  font-size: clamp(76px, 8vw, 110px);
  line-height: 0.8;
  font-weight: 400;
  letter-spacing: -0.06em;
}
.figure-value span {
  color: #bdcbc4;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 11px;
}
.chart {
  height: 125px;
  margin-top: auto;
  display: flex;
  align-items: end;
  gap: 10px;
  border-bottom: 1px solid #769087;
}
.chart i {
  flex: 1;
  background: var(--yellow);
}
.data-figure > p {
  margin: 13px 0 0;
  color: #aebeb6;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 9px;
}
.publication-heading {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 40px;
  margin-bottom: 48px;
}
.outline-link {
  padding: 12px 16px;
  border: 1px solid var(--ink);
  font-family: Arial, Helvetica, sans-serif;
  font-size: 11px;
  font-weight: 700;
}
.publication-list {
  border-top: 1px solid var(--ink);
}
.publication-row {
  min-height: 160px;
  display: grid;
  grid-template-columns: 54px minmax(0, 1fr) 230px 40px;
  gap: 25px;
  align-items: center;
  border-bottom: 1px solid var(--line);
}
.publication-icon {
  width: 42px;
  height: 54px;
  display: grid;
  place-items: center;
  background: var(--white);
  border: 1px solid var(--line);
  color: var(--forest);
}
.publication-copy > p {
  display: flex;
  gap: 18px;
  margin: 0 0 7px;
  color: var(--forest);
  font-family: Arial, Helvetica, sans-serif;
  font-size: 9px;
  font-weight: 700;
}
.publication-copy h3 {
  max-width: 740px;
  margin: 0;
  font-size: 22px;
  line-height: 1.25;
  font-weight: 500;
}
.publication-copy h3 a:hover {
  text-decoration: underline;
  text-underline-offset: 4px;
}
.publication-copy small {
  display: block;
  margin-top: 8px;
  color: var(--ink-soft);
  font-size: 13px;
}
.journal-name {
  margin: 0;
  color: var(--ink-soft);
  font-size: 13px;
  line-height: 1.3;
}
.publication-open {
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  border: 1px solid var(--line);
}
.people-section {
  padding-block: 100px;
  background: var(--white);
  border-block: 1px solid var(--line);
}
.people-grid {
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 10vw;
  align-items: center;
}
.people-intro > svg {
  margin-bottom: 26px;
}
.people-intro > p:not(.section-kicker) {
  max-width: 420px;
  color: var(--ink-soft);
}
.people-list {
  border-top: 1px solid var(--ink);
}
.person-row {
  min-height: 110px;
  display: grid;
  grid-template-columns: 54px 1fr auto 24px;
  gap: 18px;
  align-items: center;
  border-bottom: 1px solid var(--line);
}
.person-avatar {
  width: 46px;
  height: 46px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: var(--paper-warm);
  color: var(--forest);
  font-family: Arial, Helvetica, sans-serif;
  font-size: 10px;
  font-weight: 700;
}
.person-row strong,
.person-row small {
  display: block;
}
.person-row strong {
  font-size: 19px;
  font-weight: 500;
}
.person-row small,
.paper-count {
  color: var(--ink-soft);
  font-family: Arial, Helvetica, sans-serif;
  font-size: 10px;
}
.final-cta {
  padding-block: 92px;
  text-align: center;
}
.final-cta-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.final-cta h2 {
  margin-top: 18px;
}
.final-cta p {
  margin: 16px 0 23px;
  color: var(--ink-soft);
}
.final-cta a {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 22px;
  background: var(--forest);
  color: var(--white);
  font-family: Arial, Helvetica, sans-serif;
  font-size: 12px;
  font-weight: 700;
}
@media (max-width: 1020px) {
  .primary-nav {
    display: none;
  }
  .header-search-link {
    margin-left: auto;
  }
  .hero-grid {
    grid-template-columns: 1fr 420px;
    gap: 28px;
  }
  .hero h1 {
    font-size: 68px;
  }
  .metrics-grid {
    grid-template-columns: repeat(4, 1fr);
    padding-block: 28px;
  }
  .metrics-intro {
    grid-column: 1/-1;
    max-width: none;
    margin: 0 0 20px;
  }
}
@media (max-width: 760px) {
  .shell {
    width: min(calc(100% - 32px), var(--max));
  }
  .utility-bar {
    display: none;
  }
  .masthead {
    min-height: 70px;
  }
  .brand-mark {
    width: 38px;
  }
  .brand-name strong {
    font-size: 17px;
  }
  .brand-name small {
    display: none;
  }
  .header-search-link {
    display: none;
  }
  .mobile-menu {
    display: block;
  }
  .mobile-menu[open] nav {
    position: absolute;
    left: 0;
    right: 0;
    top: 70px;
    display: grid;
    padding: 12px 16px 18px;
    background: var(--white);
    border-bottom: 1px solid var(--line);
    box-shadow: 0 18px 30px rgba(23, 37, 31, 0.1);
  }
  .mobile-menu nav a {
    padding: 11px 4px;
    border-bottom: 1px solid var(--line);
    font-size: 13px;
  }
  .hero-grid {
    min-height: auto;
    grid-template-columns: 1fr;
    padding-block: 54px 44px;
  }
  .hero h1 {
    font-size: clamp(50px, 15vw, 68px);
  }
  .hero-intro {
    font-size: 18px;
  }
  .discovery-search {
    grid-template-columns: 20px 1fr;
    box-shadow: 5px 5px 0 var(--paper-warm);
  }
  .discovery-search button {
    grid-column: 1/-1;
  }
  .paper-stage {
    min-height: 430px;
    margin-top: 10px;
  }
  .paper-front {
    inset: 15px 20px 45px 14px;
    padding: 28px 26px;
  }
  .paper-middle {
    inset: 20px 22px 49px 25px;
  }
  .paper-back {
    inset: 46px 2px 33px 58px;
  }
  .paper-front h2 {
    font-size: 34px;
  }
  .metrics-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .metrics-grid > div {
    padding: 18px;
    border-top: 1px solid #c7c4ba;
  }
  .section {
    padding-block: 72px;
  }
  .split-heading,
  .featured-grid,
  .people-grid {
    grid-template-columns: 1fr;
    gap: 44px;
  }
  .split-heading {
    margin-bottom: 35px;
  }
  .area-row {
    grid-template-columns: 34px 1fr 42px;
    padding-block: 24px;
  }
  .area-index {
    padding-top: 6px;
  }
  .area-copy strong {
    font-size: 23px;
  }
  .area-counts {
    grid-column: 2;
    gap: 20px;
  }
  .area-arrow {
    grid-column: 3;
    grid-row: 1 / span 2;
  }
  .ink-section {
    padding-block: 74px;
  }
  .data-figure {
    min-height: 340px;
    padding: 25px;
  }
  .publication-heading {
    display: block;
  }
  .outline-link {
    display: inline-block;
    margin-top: 24px;
  }
  .publication-row {
    grid-template-columns: 45px 1fr 36px;
    padding-block: 24px;
  }
  .journal-name {
    grid-column: 2;
  }
  .publication-open {
    grid-column: 3;
    grid-row: 1 / span 2;
  }
  .people-section {
    padding-block: 72px;
  }
  .paper-count {
    display: none;
  }
  .person-row {
    grid-template-columns: 50px 1fr 22px;
  }
}
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  *,
  *:before,
  *:after {
    transition-duration: 0.01ms !important;
  }
}
      ` }} />
      <header className="site-header">
        <div className="shell masthead">
          <Link className="brand" href="/" aria-label="Islington Research home">
            <span className="brand-mark">IR</span>
            <span className="brand-name">
              <strong>Islington Research</strong>
              <small>Research &amp; Development Hub</small>
            </span>
          </Link>
          <nav className="primary-nav" aria-label="Primary navigation">
            <Link href="/research-areas" className={path.startsWith("/research-areas") ? "active" : ""}>Research areas</Link>
            <Link href="/people" className={path.startsWith("/people") ? "active" : ""}>People</Link>
            <Link href="/projects" className={path.startsWith("/projects") ? "active" : ""}>Projects</Link>
            <Link href="/publications" className={path.startsWith("/publications") ? "active" : ""}>Publications</Link>
            <Link href="/aboutsection" className={path.startsWith("/aboutsection") ? "active" : ""}>About R&amp;D</Link>
          </nav>
          <Link className="header-search-link" href="/search" aria-label="Search research">
            <svg
              aria-hidden="true"
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-4-4" />
            </svg>
            <span>Search</span>
          </Link>
          <details className="mobile-menu">
            <summary>Menu</summary>
            <nav aria-label="Mobile navigation">
              <Link href="/research-areas">Research areas</Link>
              <Link href="/people">People</Link>
              <Link href="/projects">Projects</Link>
              <Link href="/publications">Publications</Link>
              <Link href="/aboutsection">About R&amp;D</Link>
              <Link href="/search">Search</Link>
            </nav>
          </details>
        </div>
      </header>
    </>
  );
}
