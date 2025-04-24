"use client";

import { useEffect } from "react";

export default function RemoveCZShortcut() {
  useEffect(() => {
    document.body.removeAttribute("cz-shortcut-listen");
  }, []);

  return null;
}
