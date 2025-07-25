import { useEffect, useRef, useState } from "react";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameMonth,
  isToday,
  parse,
  startOfToday,
} from "date-fns";
import { Calendar, CalendarIcon } from "../../assets/svg/svg";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FieldValues, useForm } from "react-hook-form";
import { FormInputProps } from "../../types/types";
import { useFormError } from "../../hooks/useFormError";
import ErrorMessage from "./ErrorMessage";

function classNames(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

const colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];

const DatePicker = <T extends FieldValues>({
  id,
  label,
  register,
  error,
  touched,
  placeholder,
  type = "text",
  validationRules,
  trigger,
  setValue,
}: FormInputProps<T> & { setValue: any; trigger: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement | null>(null);

  const today = startOfToday();
  const [selectedDay, setSelectedDay] = useState<Date | string>("");
  const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());
  const { message, hasError } = useFormError(error, touched);

  const days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  const toggleDatePicker = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const previousMonth = () => {
    const firstDayPrevMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayPrevMonth, "MMM-yyyy"));
  };

  const nextMonth = () => {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  };

  return (
    <div className="w-full form-control">
      {label !== "" && <label htmlFor={id}>{label}</label>}
      <div className="relative">
        <input
          type={type}
          onClick={toggleDatePicker}
          {...register(id, validationRules)}
          value={
            selectedDay === ""
              ? placeholder
              : typeof selectedDay === "string"
              ? selectedDay
              : selectedDay.toDateString()
          }
          readOnly
          id={id}
        />
        <div className="absolute -translate-y-1/2 top-1/2 right-4.5 text-gray-300">
          <CalendarIcon />
        </div>
      </div>

      {isOpen && (
        <div
          ref={calendarRef}
          className="absolute z-50 px-4 mx-auto bg-white shadow-md rounded-2xl w-fit dark:bg-gray-600"
        >
          <div className="px-2 py-2 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="flex-auto font-semibold text-gray-900 dark:text-gray-100">
                {format(firstDayCurrentMonth, "MMMM yyyy")}
              </h2>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={previousMonth}
                  className="p-1.5 text-gray-400 hover:text-gray-500 cursor-pointer dark:text-gray-100  dark:hover:text-gray-150"
                >
                  <span className="rotate-90">
                    <ChevronLeft />
                  </span>
                </button>
                <button
                  onClick={nextMonth}
                  type="button"
                  className="p-1.5 text-gray-400 hover:text-gray-500 cursor-pointer dark:text-gray-100  dark:hover:text-gray-150"
                >
                  <ChevronRight />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 text-xs leading-6 text-center text-gray-500 dark:text-gray-100">
              <div>S</div>
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>
            </div>

            <div className="grid grid-cols-7 mt-2 text-sm">
              {days.map((day, dayIdx) => (
                <div
                  key={day.toString()}
                  className={classNames(
                    dayIdx === 0 && colStartClasses[getDay(day)],
                    "py-1.5"
                  )}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedDay(day);
                      setValue(id, format(day, "yyyy-MM-dd"));
                      trigger(id);
                      setIsOpen(false);
                    }}
                    className={classNames(
                      isEqual(day, selectedDay) &&
                        "text-white dark:text-gray-50",
                      !isEqual(day, selectedDay) &&
                        isToday(day) &&
                        "text-primary-200 dark:text-primary-200",
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        isSameMonth(day, firstDayCurrentMonth) &&
                        "text-gray-900 dark:text-gray-300",
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        !isSameMonth(day, firstDayCurrentMonth) &&
                        "text-gray-50",
                      isEqual(day, selectedDay) && "bg-primary-200  text-white",
                      !isEqual(day, selectedDay) &&
                        "hover:bg-gray-300 dark:hover:bg-primary-500 dark:hover:text-gray-800",
                      "mx-auto flex h-8 w-8 items-center justify-center rounded-full"
                    )}
                  >
                    <time dateTime={format(day, "yyyy-MM-dd")}>
                      {format(day, "d")}
                    </time>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <ErrorMessage isVisible={hasError} errorMessage={message} />
    </div>
  );
};

export default DatePicker;
