const patients = [
  {
    name: "Ravi",
    critical: true,
    medical_cond: {
      disease: "corona",
      foundon: "26-11-2025",
    },
  },
  {
    name: "Anjali",
    critical: true,
    medical_cond: {
      disease: "pneumonia",
      foundon: "26-11-2025",
    },
  },
  {
    name: "Kushi",
    critical: true,
    medical_cond: {
      disease: "heart-attack",
      foundon: "26-11-2025",
    },
  },
  { name: "Neha", critical: false },
];

let medical_cond = {
  disease: "asthama",
  foundon: "26-11-2025",
};

const ans = patients.map((x) =>
  x.name === "Neha" ? { ...x, critical: true, medical_cond } : x,
);

console.log(ans);
