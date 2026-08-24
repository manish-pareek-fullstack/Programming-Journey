const patients = [
  { name: "John", meds: ["Paracetamol", "Ibuprofen"] },
  { name: "Alice", meds: ["Amoxicillin"] },
  { name: "Michael", meds: ["Metformin", "Atorvastatin"] },
  { name: "Elena", meds: ["Lisinopril"] },
  { name: "David", meds: ["Levothyroxine", "Vitamin D3", "Paracetamol"] },
  { name: "Sophia", meds: ["Albuterol", "Fluticasone"] },
  { name: "James", meds: ["Amlodipine", "Hydrochlorothiazide"] },
  { name: "Isabella", meds: ["Sertraline"] },
  { name: "Robert", meds: ["Gabapentin", "Naproxen", "Omeprazole"] },
  { name: "Mia", meds: ["Losartan"] },
  { name: "William", meds: ["Warfarin"] },
  { name: "Charlotte", meds: ["Prednisone", "Azithromycin"] },
];
let ans = [...new Set(patients.flatMap((x) => x.meds))];

console.log(ans);
