export const categories = [
  { label: "Music", value: "music", icon: "music" },
  { label: "Sports", value: "sports", icon: "futbol" },
  { label: "Workshops", value: "workshops", icon: "tools" },
  { label: "Social", value: "social", icon: "users" },
  { label: "Conferences", value: "conferences", icon: "comments" },
];

export const getCategoryIcon = (category) => {
  const found = categories.find((c) => c.value === category);
  return found ? found.icon : "info";
};
