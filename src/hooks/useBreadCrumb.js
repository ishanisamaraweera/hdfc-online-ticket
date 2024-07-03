import { useEffect } from "react";
import { useBreadcrumbStore } from "../store";

function useBreadCrumb(name, location, title, type) {
  const setBreadcrumb = useBreadcrumbStore((state) => state.setBreadcrumb);
  const breadcrumb = useBreadcrumbStore((state) => state.breadcrumb);

  useEffect(() => {
    if (type === "add") {
      var newBreadcrumb = [...breadcrumb];
      let flag = true;
      for (let x = 0; x < newBreadcrumb.length; x++) {
        if (newBreadcrumb[x].name === name) {
          flag = false;
          break;
        }
      }
      if (flag) {
        newBreadcrumb.push({ name: name, url: location });
      }
      setBreadcrumb(newBreadcrumb);
    } else {
      setBreadcrumb([
        {
          name: name,
          url: location,
          title: title,
        },
      ]);
    }
    // eslint-disable-next-line
  }, []);
}

export default useBreadCrumb;
