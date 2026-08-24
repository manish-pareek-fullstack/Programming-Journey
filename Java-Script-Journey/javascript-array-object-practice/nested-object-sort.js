const data = [
  {
    schedule: {
      day: {
        timeSlots: {
          items: ["11:00", "08:00", "14:00", "16:30"],
        },
      },
    },
  },
  {
    schedule: {
      day: {
        timeSlots: {
          items: ["12:00", "15:00", "09:15", "17:00"],
        },
      },
    },
  },
];

let ans = data.map((x) => ({
  ...x,
  schedule: {
    ...x.schedule,
    day: {
      ...x.schedule.day,
      timeSlots: {
        ...x.schedule.day.timeSlots,
        items: [...x.schedule.day.timeSlots.items].sort((a, b) =>
          a.localeCompare(b),
        ),
      },
    },
  },
}));

console.log(ans);
