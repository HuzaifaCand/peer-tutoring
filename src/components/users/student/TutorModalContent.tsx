import { SlotsRow } from "@/lib/computedtypes";
import { SubjectTutorType } from "./getSubjectTutors";
import { BadgeCheck, GraduationCap } from "lucide-react";
import { colors, Tag } from "@/components/ui/Tag";
import { CardCTA } from "@/components/ui/CardCTA";
import clsx from "clsx";

type dayOfWeek = "Monday" | "Tuesday" | "Wednesday" | "Thursday";

const dayOrder: Record<dayOfWeek, number> = {
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
};
export function TutorModalContent({ tutor }: { tutor: SubjectTutorType }) {
  const {
    name,
    grade,
    subject_credentials,
    about,
    verified,
    available_online,
    slots,
    subject,
  } = tutor;

  // Group slots by day
  const grouped = slots.reduce((acc: any, slot: any) => {
    (acc[slot.day] ||= []).push(slot);
    return acc;
  }, {});

  return (
    <div className="space-y-8 p-4">
      {/* TOP SECTION */}
      <div className="flex flex-col lg:flex-row lg:gap-8 items-start lg:items-start">
        {/* ICON / AVATAR */}
        <div
          className="flex items-center justify-center 
          w-32 h-32 lg:w-36 lg:h-36 shrink-0 
          rounded-xl bg-gradient-to-br from-[#111] via-[#16161a] to-[#1c1c21]
          border border-white/5 shadow-sm"
        >
          <GraduationCap className="w-14 h-14 text-blue" />
        </div>

        {/* DETAILS */}
        <div className="flex flex-col gap-4 w-full py-4 mt-4 lg:mt-0">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-semibold text-textWhite">{name}</h2>
              {verified && <BadgeCheck className="text-green-400" size={22} />}
            </div>

            {/* TAGS */}
            <div className="flex items-center gap-2 flex-wrap">
              <Tag value={`${grade} Student`} color="gray" textSize="text-xs" />
              <Tag
                value={subject.label}
                color={subject.color as colors}
                textSize="text-xs"
              />
              {available_online && (
                <Tag value="Online" color="green" textSize="text-xs" />
              )}
            </div>
          </div>

          {/* CREDENTIALS */}
          <div className="space-y-2">
            <h3 className="text-textWhite font-semibold text-lg">
              Subject Credentials
            </h3>
            <p className="text-textMuted/80 text-sm leading-relaxed max-w-prose">
              {subject_credentials || "Not added yet."}
            </p>
          </div>
        </div>
      </div>

      <div className="h-px bg-white/5" />

      {/* ABOUT SECTION */}
      <div className="space-y-3">
        <h3 className="text-textWhite font-semibold text-lg">
          About the Tutor
        </h3>
        <p className="text-textMuted/80 text-sm leading-relaxed max-w-prose">
          {about || "No description provided."}
        </p>
      </div>

      <div className="h-px bg-white/5" />

      {/* AVAILABILITY */}
      <div className="space-y-4">
        <h3 className="text-textWhite font-semibold text-lg">
          Onsite Availability
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.keys(grouped)
            .sort((a, b) => dayOrder[a as dayOfWeek] - dayOrder[b as dayOfWeek])
            .map((day) => (
              <div key={day} className="space-y-2">
                <p className="text-textWhite/90 text-sm font-medium">{day}</p>

                <div className="grid grid-cols-2 gap-2">
                  {grouped[day]
                    .sort(
                      (a: SlotsRow, b: SlotsRow) =>
                        parseInt(a.hour.split(":")[0]) -
                        parseInt(b.hour.split(":")[0])
                    )
                    .map((slot: SlotsRow) => {
                      const start = slot.hour.slice(0, 5);

                      return (
                        <div
                          title={`${!slot.available ? "Booked" : "Available "}`}
                          key={`${slot.day}-${slot.hour}`}
                          className={clsx(
                            "px-3 py-1.5 rounded-md text-xs shadow-sm whitespace-nowrap shrink-0 transition-colors duration-200 border",
                            slot.available
                              ? "bg-green-500/15 border-green-600/40 text-green-300 hover:bg-green-500/25"
                              : "bg-elevatedBg border-white/10 text-textMuted/40 line-through"
                          )}
                        >
                          {start}
                        </div>
                      );
                    })}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* CTA */}
      <div className="pt-4 flex justify-end">
        <button className="cursor-pointer">
          <CardCTA
            cta="Book a Session"
            textSize="text-sm"
            padding="py-2 px-4"
          />
        </button>
      </div>
    </div>
  );
}
