import { Link } from "react-router-dom";

import Footer from "../components/Footer";
import TravelPlanForm from "../features/travelPlans/components/TravelPlanForm";

const CreateTravelPlanPage = () => {
  return (
    <>
      <main
        id="top"
        className="
          relative isolate min-h-screen
          overflow-hidden bg-[#17152e]
          text-white
        "
      >
        {/* Decorative background */}
        <span
          aria-hidden="true"
          className="
            pointer-events-none absolute
            -right-32 -top-32 h-[420px] w-[420px]
            rounded-full bg-[#ff7457]/15 blur-3xl
          "
        />

        <span
          aria-hidden="true"
          className="
            pointer-events-none absolute
            -bottom-40 -left-32 h-[460px] w-[460px]
            rounded-full bg-[#71d5b4]/15 blur-3xl
          "
        />

        <div
          className="
            relative z-[2] mx-auto
            max-w-[1180px] px-5
            py-12 sm:px-8 lg:py-16
          "
        >
          <Link
            to="/"
            className="
              inline-flex items-center gap-2
              rounded-full border border-white/15
              bg-white/[0.06] px-4 py-2.5
              text-xs font-bold text-white
              no-underline transition
              hover:border-[#71d5b4]/60
              hover:bg-white hover:text-[#17152e]
            "
          >
            <span aria-hidden="true">←</span>
            Back to countries
          </Link>

          <header className="mt-12 max-w-[720px]">
            <span
              className="
                text-[10px] font-black uppercase
                tracking-[0.2em] text-[#71d5b4]
              "
            >
              GlobeWise Travel Studio
            </span>

            <h1
              className="
                mb-5 mt-4 font-[Georgia,serif]
                text-5xl font-normal leading-[0.95]
                tracking-[-0.04em]
                sm:text-6xl lg:text-7xl
              "
            >
              Plan your next
              <span className="text-[#ff7457] italic">
                {" "}
                chapter.
              </span>
            </h1>

            <p
              className="
                max-w-[600px] text-sm
                leading-7 text-white/60
              "
            >
              Build a personal travel plan with your
              destination, dates, budget and notes.
            </p>
          </header>

          <div
            className="
              mt-12 overflow-hidden
              rounded-[32px] border border-white/10
              bg-[#f7f3eb] text-[#17152e]
              shadow-[0_35px_100px_rgba(0,0,0,0.35)]
            "
          >
            <TravelPlanForm />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default CreateTravelPlanPage;