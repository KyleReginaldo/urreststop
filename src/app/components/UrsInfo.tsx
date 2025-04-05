const UrsInfo = () => {
  const hours: string[] = [
    "Mon 09:00 am - 05:00 pm",
    "Tue 09:00 am - 05:00 pm",
    "Wed 09:00 am - 05:00 pm",
    "Thu 09:00 am - 05:00 pm",
    "Fri 09:00 am - 05:00 pm",
    "Sat Closed",
    "Sun Closed",
  ];
  const dayToday = new Date().getDay() - 1;

  return (
    <div className="flex flex-col md:flex-row justify-center gap-[48px] mb-[60px]">
      <div className="flex flex-col items-center gap-[20px]">
        <p className="text-[18px] font-bold">&apos;UR REST STOP</p>
        <p className="text-center text-[15px] text-gray-600">
          163 Sotto, General Trias, Cavite, Philippines
        </p>
        <p className="text-center text-[15px] text-gray-600">098517810689</p>
      </div>
      <div className="flex flex-col items-center gap-[20px]">
        <p className="text-[18px] font-bold">Hours</p>
        <div className="flex flex-col items-start gap-[8px]">
          {hours.map((hour) => {
            return (
              <p
                key={hour}
                className={`text-center text-[15px] text-gray-600 ${
                  dayToday === hours.indexOf(hour) ? "font-bold" : ""
                }`}
              >
                {hour}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UrsInfo;
