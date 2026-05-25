import { d as create, p as persist } from "./router-Bieu8wEH.js";
import { f as format } from "./format-HuECJiab.js";
const useAdminFilter = create()(
  persist(
    (set) => ({
      selectedDate: format(/* @__PURE__ */ new Date(), "yyyy-MM-dd"),
      setSelectedDate: (date) => set({ selectedDate: date }),
      resetDate: () => set({ selectedDate: format(/* @__PURE__ */ new Date(), "yyyy-MM-dd") })
    }),
    {
      name: "rhb-admin-filter"
    }
  )
);
export {
  useAdminFilter as u
};
