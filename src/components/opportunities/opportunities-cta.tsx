export function OpportunitiesCTA() {
  return (
    <section className="bg-[#0d2a20] py-16 text-white sm:py-20">
      <div className="mx-auto grid w-[min(calc(100%_-_48px),1240px)] gap-10 max-sm:w-[calc(100%_-_32px)] lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-20">
        <div className="max-w-3xl">
          <p className="mb-5 text-sm font-semibold text-[#7fd4a5]">
            For research leads and industry partners
          </p>

          <h2
            className="max-w-2xl text-[clamp(2.35rem,4.5vw,4rem)] font-normal leading-[1.02] tracking-[-0.035em]"
            style={{
              fontFamily:
                'Garamond, "EB Garamond", "Times New Roman", serif',
            }}
          >
            Bring the next opportunity into the room.
          </h2>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-[#b7c6be] sm:text-base">
            Share a funded project, laboratory vacancy, doctoral call, or
            research partnership with the Islington community.
          </p>
        </div>

        <div>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSdG8Lb3SgR6PqoH6IYmZ8o9xGCdQDXtMgyl_l77-7DwuWCs-g/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center border border-[#7fd4a5] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#7fd4a5] hover:text-[#0d2a20] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d2a20] sm:px-7"
          >
            Submit an opportunity
          </a>
        </div>
      </div>
    </section>
  );
}
